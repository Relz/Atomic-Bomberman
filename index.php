<?php
    define("ROOT_DIR", "./");
    define("PHP_DIR",  "php/");
    define("INCLUDE_DIR", PHP_DIR . "include/");
    define("SMARTY_DIR", INCLUDE_DIR . "Smarty/libs/");
    define("TRANSLATION_DIR", ROOT_DIR . "translation/");

    require_once(SMARTY_DIR . "Smarty.class.php");
    require_once(PHP_DIR . "strings.php");
    require_once(INCLUDE_DIR . "common.inc.php");

    $BACKGROUND_IMAGES_COUNT = 2;

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
            //initSmartyVariables();
            $g_smarty->assign("rootDir", ROOT_DIR);
            $g_smarty->assign("lang", $lang);
            $g_smarty->assign("title", "Atomic Bomberman");
            $g_smarty->assign("btnLoginText", t("BTN_LOGIN_TEXT"));
            $g_smarty->assign("logoutText", t("LOGOUT_TEXT"));
            $g_smarty->assign("bodyClass", "background-image" . rand(0, $BACKGROUND_IMAGES_COUNT - 1));
            $g_smarty->assign("inputNamePlaceholder", t("INPUT_NAME_PLACEHOLDER"));
            $g_smarty->assign("username", "");
            if (isAuthorized())
            {
                $g_smarty->assign("username", $_SESSION["username"]);
                $g_smarty->display("game.tpl");
            }
            else
            {
                $g_smarty->display("login.tpl");
            }
            break;
        case "logout":
            logout();
            break;
    }

    function logout()
    {
        session_start();
        unset($_SESSION["username"]);
        header("Location: ?lang=" . $lang);
    }


    function processPostRequest()
    {
        if (isset($_POST["username"]) && !empty($_POST["username"]))
        {
            $_SESSION["username"] = $_POST["username"];
        }
    }

    /*function initSmartyVariables()
    {
        global $g_smarty;
        $g_smarty->assign("rootDir", ROOT_DIR);
        $g_smarty->assign("lang", $lang);
        $g_smarty->assign("title", "Atomic Bomberman");
        $g_smarty->assign("btnLoginText", $BTN_LOGIN_TEXT);
        $g_smarty->assign("logoutText", $LOGOUT_TEXT);
        $g_smarty->assign("bodyClass", "background-image" . rand(0, $BACKGROUND_IMAGES - 1));
        $g_smarty->assign("inputNamePlaceholder", $INPUT_NAME_PLACEHOLDER);
        $g_smarty->assign("username", "");
    }*/

    function isAuthorized()
    {
        return (isset($_SESSION["username"]) && !empty($_SESSION["username"]));
    }
