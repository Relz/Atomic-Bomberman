<?php
    require_once("include/common.inc.php");

    $result = "";
    session_start();
    if ($_SESSION["room_owner"] === true)
    {
        $result = $_SESSION["room_name"];
        dbInitialConnect();
        if (!dbQuery("DELETE FROM room WHERE title='" . $_SESSION["room_name"] . "'"))
        {
            die("error 0");
        }
    }
    unset($_SESSION["room_name"]);
    unset($_SESSION["room_owner"]);
    die($result);
