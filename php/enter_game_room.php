<?php
    require_once("include/common.inc.php");

    $roomName = getPostParam("room_name");
    $roomPassword = getPostParam("room_password");

    session_start();
    if (!empty($roomName) && isUserAuthorized())
    {
        dbInitialConnect();
        $result = dbQueryGetResult("SELECT * FROM room WHERE BINARY title='" . dbQuote($roomName) . "'");
        if (mysqli_num_rows($result) == 0)
        {
            die("error 0");
        }
        else
        {
            mysqli_free_result($result);
            $_SESSION["room_name"] = $roomName;
            $_SESSION["room_owner"] = false;
            die($roomName);
        }
    }
    else
    {
        die("error 1");
    }
