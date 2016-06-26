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
