<?php
    define("ROOT_DIR", "./");
    define("PHP_DIR",  "php/");
    define("INCLUDE_DIR", PHP_DIR . "include/");
    define("SMARTY_DIR", INCLUDE_DIR . "Smarty/libs/");
    define("TRANSLATION_DIR", ROOT_DIR . "translation/");

    require_once(SMARTY_DIR . "Smarty.class.php");
    require_once(PHP_DIR . "strings.php");
    require_once(INCLUDE_DIR . "common.inc.php");

    $g_smarty = new Smarty();
    $g_smarty->template_dir = ROOT_DIR . "template/";
    $g_smarty->compile_dir = ROOT_DIR . "template_c/";
    $g_smarty->config_dir = ROOT_DIR . "config/";
    $g_smarty->cache_dir = ROOT_DIR . "cache/";

    $action = getGetParam("action");
    switch ($action)
    {
        case "":
            session_start();
            processPostRequest();
            initSmartyVariables();
            if (isUserAuthorized())
            {
                $g_smarty->assign("username", $_SESSION["username"]);
                if (inGame())
                {
                    $g_smarty->display("game.tpl");
                }
                else
                {
                    $g_smarty->assign("rooms", getRooms());
                    $g_smarty->display("mainpage.tpl");
                }
            }
            else
            {
                $g_smarty->display("login.tpl");
            }
            break;
        case "logout":
            logoutUser();
            break;
        default:
            header("HTTP/1.1 404 Not Found");
            echo "404 NOT FOUND!";
            break;
    }

    function initSmartyVariables()
    {
        global $g_smarty;
        $BACKGROUND_IMAGES_COUNT = 2;
        $g_smarty->assign("rootDir", ROOT_DIR);
        $g_smarty->assign("lang", $lang);
        $g_smarty->assign("title", "Atomic Bomberman");
        $g_smarty->assign("symbolRequired", t("SYMBOL_REQUIRED"));
        $g_smarty->assign("btnLoginText", t("BTN_LOGIN_TEXT"));
        $g_smarty->assign("logoutText", t("LOGOUT_TEXT"));
        $g_smarty->assign("bodyClass", "background-image" . rand(0, $BACKGROUND_IMAGES_COUNT - 1));
        $g_smarty->assign("inputNamePlaceholder", t("INPUT_NAME_PLACEHOLDER"));
        $g_smarty->assign("headerCreateRoom", t("HEADER_CREATE_ROOM"));
        $g_smarty->assign("labelRoomName", t("LABEL_ROOM_NAME"));
        $g_smarty->assign("labelRoomPassword", t("LABEL_ROOM_PASSWORD"));
        $g_smarty->assign("btnCreateRoomText", t("BTN_CREATE_ROOM_TEXT"));
        $g_smarty->assign("username", "");
    }

    function processPostRequest()
    {
        if (isset($_POST["username"]) && !empty($_POST["username"]))
        {
            $username = $_POST["username"];
            dbInitialConnect();
            if (mysqli_num_rows(dbQueryGetResult("SELECT * FROM user WHERE BINARY name='$username'")) == 0)
            {
                registerNewUser($username);
            }
            else
            {
                loginUser($username);
            }
        }
    }

    function getRooms()
    {
        $result = [];
        dbInitialConnect();
        $queryResult = dbQueryGetResult("SELECT title FROM room");
        if (mysqli_num_rows($queryResult) > 0)
        {
            while ($row = mysqli_fetch_assoc($queryResult))
            {
                array_push($result, $row["title"]);
            }
            mysqli_free_result($queryResult);
        }
        return $result;
    }

    function inGame()
    {
        return (isset($_SESSION["in_game"]) && !empty($_SESSION["in_game"]));
    }
