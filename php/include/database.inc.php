<?php
    require_once("config.inc.php");
    $g_dbLink = null;

    function dbInitialConnect()
    {
        global $g_dbLink;
        if ($g_dbLink == null)
        {
            $g_dbLink = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
            $error = mysqli_connect_error();
            if ($error)
            {
                die("Unable to connect to DB");
            }
        }
    }

    function dbQuery($query)
    {
        global $g_dbLink;
        $result = mysqli_query($g_dbLink, $query);
        return ($result !== false);
    }

    function dbQueryGetResult($query)
    {
        global $g_dbLink;
        return mysqli_query($g_dbLink, $query);
    }

    function dbQuote($value)
    {
        global $g_dbLink;
        return mysqli_real_escape_string($g_dbLink, $value);
    }

    function dbIsEmptyResult($result)
    {
        return mysqli_num_rows($result) == 0;
    }

    function dbGetRooms()
    {
        $result = [];
        dbInitialConnect();
        $queryResult = dbQueryGetResult("SELECT title FROM room");
        if (!dbIsEmptyResult($queryResult))
        {
            while ($row = mysqli_fetch_assoc($queryResult))
            {
                array_push($result, $row["title"]);
            }
            mysqli_free_result($queryResult);
        }
        return $result;
    }
