<?php
    require_once("include/common.inc.php");

    $roomId = getPostParam("room_id");

    session_start();
    if (!empty($roomId) && isUserAuthorized())
    {
        $result = dbQueryGetResult("SELECT * FROM room WHERE id='$roomId'");
        if (mysqli_num_rows($result) != 0)
        {
            die("error 0");
        }
        if (!dbQuery("INSERT INTO room SET title='$roomName', password='$roomPassword', owner_id='" . $_SESSION["id"] . "'"))
        {
            die("error 1");
        }
        $result = dbQueryGetResult("SELECT id FROM room WHERE BINARY title='$roomName'");
        if (mysqli_num_rows($result) == 1)
        {
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
            die($row["id"]);
        }
    }
