<?php
    function initIdByUsername($username)
    {
        session_start();
        dbInitialConnect();
        $result = dbQueryGetResult("SELECT id FROM user WHERE BINARY name='$username'");
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
        session_start();
        dbInitialConnect();
        $randomKey = randMD5(10);
        if (dbQuery("INSERT INTO user SET name='$username', random_key='$randomKey'"))
        {
            initSession($username, $randomKey);
        }
    }

    function loginUser($username)
    {
        session_start();
        dbInitialConnect();
        $randomKey = randMD5(10);
        if (dbQuery("UPDATE user SET random_key='$randomKey', random_key_expire=ADDTIME(NOW(), '00:05:00') WHERE BINARY name='$username'"))
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
        if (dbQuery("UPDATE user SET random_key='$myRandomKey', random_key_expire=NOW() WHERE BINARY name='$username'"))
        {
            unset($_SESSION["username"]);
            unset($_SESSION["random_key"]);
            unset($_SESSION["in_game"]);
            header("Location: ?lang=" . $lang);
        }
    }

    function isUserAuthorized()
    {
        session_start();
        return (isset($_SESSION["username"]) && !empty($_SESSION["username"])
               && isset($_SESSION["random_key"]) && isMyRandomKeyValid($_SESSION["username"]));
    }

    function isMyRandomKeyValid($username)
    {
        session_start();
        dbInitialConnect();
        $result = dbQueryGetResult("SELECT random_key, random_key_expire FROM user WHERE BINARY name='$username'");
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
