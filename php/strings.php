<?php
    require_once(INCLUDE_DIR . "common.inc.php");
    $supportedLanguages = ["ru_RU", "en_US"];
    $lang = getGetParam("lang");
    if (empty($lang) || !in_array($lang, $supportedLanguages))
    {
        $lang = "ru_RU";
    }
    require_once(TRANSLATION_DIR . $lang . ".php");

    function t($string)
    {
        global $translations;
        return $translations[$string];
    }
