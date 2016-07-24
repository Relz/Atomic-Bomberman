<?php
    $RANDOM_KEY_TIMEOUT = "00:20:00";
    $SEC_TO_UTC = 3 * 60 * 60;

    function initIdByUsername($username)
    {
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
        $_SESSION["username"] = $username;
        $_SESSION["random_key"] = $randomKey;
        initIdByUsername($username);
    }

    function registerNewUser($username)
    {
        global $RANDOM_KEY_TIMEOUT;
        dbInitialConnect();
        $randomKey = randMD5(10);
        if (dbQuery("INSERT INTO user SET name='" . dbQuote($username) . "', random_key='$randomKey', random_key_expire=ADDTIME(NOW(), '$RANDOM_KEY_TIMEOUT')"))
        {
            initSession($username, $randomKey);
        }
    }

    function loginUser($username)
    {
        global $RANDOM_KEY_TIMEOUT;
        dbInitialConnect();
        $randomKey = isset($_SESSION["random_key"]) ? $_SESSION["random_key"] : randMD5(10);
        if (dbQuery("UPDATE user SET random_key='$randomKey', random_key_expire=ADDTIME(NOW(), '$RANDOM_KEY_TIMEOUT') WHERE BINARY name='" . dbQuote($username) . "'"))
        {
            initSession($username, $randomKey);
            header("Location: ?lang=" . $lang);
        }
    }

    function refreshUser($username)
    {
        global $RANDOM_KEY_TIMEOUT;
        dbInitialConnect();
        $randomKey = isset($_SESSION["random_key"]) ? $_SESSION["random_key"] : randMD5(10);
        if (dbQuery("UPDATE user SET random_key='$randomKey', random_key_expire=ADDTIME(NOW(), '$RANDOM_KEY_TIMEOUT') WHERE BINARY name='" . dbQuote($username) . "'"))
        {
            initSession($username, $randomKey);
        }
    }

    function logoutUser()
    {
        dbInitialConnect();
        $username = $_SESSION["username"];
        $myRandomKey = $_SESSION["random_key"];
        if (dbQuery("UPDATE user SET random_key='$myRandomKey', random_key_expire=NOW() WHERE BINARY name='" . dbQuote($username) . "'"))
        {
            unsetSessionAndCookies();
            header("Location: ?lang=" . $lang);
        }
    }

    function unsetSessionAndCookies()
    {
        unset($_SESSION["username"]);
        unset($_SESSION["random_key"]);
        unset($_COOKIE["room_name"]);
        unset($_COOKIE["player_name"]);
        unset($_COOKIE["room_owner"]);
        setcookie("room_name", null, -1);
        setcookie("player_name", null, -1);
        setcookie("room_owner", null, -1);
    }

    function isUserAuthorized()
    {
        return (isset($_SESSION["username"]) && !empty($_SESSION["username"])
               && isset($_SESSION["random_key"]) && isUserRandomKeyValid($_SESSION["username"]));
    }

    function isUserRandomKeyValid($username)
    {
        global $SEC_TO_UTC;
        dbInitialConnect();
        $result = dbQueryGetResult("SELECT random_key, random_key_expire FROM user WHERE BINARY name='" . dbQuote($username) . "'");
        $row = mysqli_fetch_assoc($result);
        mysqli_free_result($result);
        return ($row["random_key"] == $_SESSION["random_key"] && (strtotime($row["random_key_expire"]) -  $SEC_TO_UTC > time()));
    }

    function isUserInGame()
    {
        return (isset($_COOKIE["room_name"]) && !empty($_COOKIE["room_name"]));
    }

    function isUsernameFree($username)
    {
        global $SEC_TO_UTC;
        dbInitialConnect();
        $result = dbQueryGetResult("SELECT random_key,random_key_expire FROM user WHERE BINARY name='" . dbQuote($username) . "'");
        $row = mysqli_fetch_assoc($result);
        mysqli_free_result($result);
        return ($row["random_key"] == $_SESSION["random_key"]) || (strtotime($row["random_key_expire"]) -  $SEC_TO_UTC < time());
    }

    function randMD5($length)
    {
        $max = ceil($length / 32);
        $random = "";
        for ($i = 0; $i < $max; $i++)
        {
            $random .= md5(microtime(true) . mt_rand(10000, 90000));
        }
        return substr($random, 0, $length);
    }
