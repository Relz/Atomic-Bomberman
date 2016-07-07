<?php
    $RANDOM_KEY_TIMEOUT = "00:05:00";

    function initIdByUsername($username)
    {
        session_start();
        dbInitialConnect();
        $result = dbQueryGetResult("SELECT id FROM user WHERE BINARY name='" . dbQuote($username) . "'");
        if (mysqli_num_rows($result) == 1)
        {
            $row = mysqli_fetch_assoc($result);
            $_SESSION["id"] = $row["id"];
        }
        mysqli_free_result($result);
    }

    function initSession($username, $randomKey)
    {
        session_start();
        $_SESSION["username"] = $username;
        $_SESSION["random_key"] = $randomKey;
        initIdByUsername($username);
    }

    function registerNewUser($username)
    {
        session_start();
        dbInitialConnect();
        $randomKey = randMD5(10);
        if (dbQuery("INSERT INTO user SET name='" . dbQuote($username) . "', random_key='$randomKey'"))
        {
            initSession($username, $randomKey);
        }
    }

    function loginUser($username)
    {
        global $RANDOM_KEY_TIMEOUT;
        session_start();
        dbInitialConnect();
        $randomKey = randMD5(10);
        if (dbQuery("UPDATE user SET random_key='$randomKey', random_key_expire=ADDTIME(NOW(), '$RANDOM_KEY_TIMEOUT') WHERE BINARY name='" . dbQuote($username) . "'"))
        {
            initSession($username, $randomKey);
        }
    }

    function logoutUser()
    {
        session_start();
        dbInitialConnect();
        $username = $_SESSION["username"];
        $myRandomKey = $_SESSION["random_key"];
        if (dbQuery("UPDATE user SET random_key='$myRandomKey', random_key_expire=NOW() WHERE BINARY name='" . dbQuote($username) . "'"))
        {
            unset($_SESSION["username"]);
            unset($_SESSION["random_key"]);
            unset($_SESSION["room_name"]);
            header("Location: ?lang=" . $lang);
        }
    }

    function isUserAuthorized()
    {
        session_start();
        return (isset($_SESSION["username"]) && !empty($_SESSION["username"])
               && isset($_SESSION["random_key"]) && isMyRandomKeyValid($_SESSION["username"]));
    }


    function isUserInGame()
    {
        session_start();
        return (isset($_SESSION["room_name"]) && !empty($_SESSION["room_name"]));
    }

    function isMyRandomKeyValid($username)
    {
        session_start();
        dbInitialConnect();
        $result = dbQueryGetResult("SELECT random_key, random_key_expire FROM user WHERE BINARY name='" . dbQuote($username) . "'");
        $row = mysqli_fetch_assoc($result);
        mysqli_free_result($result);
        return ($row["random_key"] == $_SESSION["random_key"] && (strtotime($row["random_key_expire"]) > time()));
    }

    function randMD5($length)
    {
        $max = ceil($length / 32);
        $random = "";
        for ($i = 0; $i < $max; $i++)
        {
            $random .= md5(microtime(true) . mt_rand(10000,90000));
        }
        return substr($random, 0, $length);
    }
