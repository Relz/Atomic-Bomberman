<?php
    require_once("include/common.inc.php");

    $playersInRoom = getPostParam("players_in_room");

    $result = "";
    session_start();
    if ($playersInRoom == 1)
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
