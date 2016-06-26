<?php
    define("ROOT_DIR", "./");
    define("PHP_DIR",  "php/");
    define("INCLUDE_DIR", PHP_DIR . "include/");
    define("SMARTY_DIR", INCLUDE_DIR . "Smarty/libs/");
    define("TRANSLATION_DIR", ROOT_DIR . "translation/");

    require_once(SMARTY_DIR . "Smarty.class.php");
    require_once(PHP_DIR . "strings.php");
    require_once(INCLUDE_DIR . "common.inc.php");

    $BACKGROUND_IMAGES = 2;
    $smarty = new Smarty();

    $smarty->template_dir = ROOT_DIR . "template/";
    $smarty->compile_dir = ROOT_DIR . "template_c/";
    $smarty->config_dir = ROOT_DIR . "config/";
    $smarty->cache_dir = ROOT_DIR . "cache/";

    $action = getGetParam("action");
    switch ($action)
    {
        case "":
            session_start();
            if (isset($_SESSION["username"]))
            {
//                echo "Вы авторизированы, " . $_SESSION["username"];
            }
            else
            {
//                echo "Вы неавторизированы";
                $_SESSION["username"] = "Relz";
            }
            $smarty->assign("rootDir", ROOT_DIR);
            $smarty->assign("title", "Atomic Bomberman");
            $smarty->assign("btn_login_text", $BTN_LOGIN_TEXT);
            $smarty->assign("bodyClass", "background-image" . rand(0, $BACKGROUND_IMAGES - 1));
            $smarty->assign("input_name_placeholder", $INPUT_NAME_PLACEHOLDER);

            $smarty->display("mainpage.tpl");
            break;
        case "logout":
            session_start();
            unset($_SESSION["username"]);
            /*$smarty->assign("title", "Atomic Bomberman");
            $smarty->assign("btn_login_text", $BTN_LOGIN_TEXT);
            $smarty->assign("rand", rand(0, 2));
            $smarty->assign("input_name_placeholder", $INPUT_NAME_PLACEHOLDER);

            $smarty->display("mainpage.tpl");*/
            break;
        case "game":
            session_start();
            $smarty->assign("rootDir", ROOT_DIR);
            $smarty->assign("title", "Atomic Bomberman");
            $smarty->assign("btn_login_text", $BTN_LOGIN_TEXT);
            $smarty->assign("rand", rand(0, 2));
            $smarty->assign("input_name_placeholder", $INPUT_NAME_PLACEHOLDER);

            $smarty->display("game.tpl");
            break;
    }
