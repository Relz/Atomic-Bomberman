<?php
    function getGetParam($str)
    {
        $result = "";
        if (isset($_GET[$str]))
        {
            $result = $_GET[$str];
        }
        return $result;
    }

    function getPostParam($str)
    {
        $result = "";
        if (isset($_POST[$str]))
        {
            $result = $_POST[$str];
        }
        return $result;
    }
