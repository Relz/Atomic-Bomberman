var g_gameSocket = null;
var g_websiteSocket = null;

function initGameSocket()
{
    myRoomName = getCookie("room_name");
    g_gameSocket = io.connect(":3000");
    g_gameSocket.emit("playerConnect", myRoomName);
    g_gameSocket.on("playerConnect", function(roomName, id)
    {
        if (myRoomName == roomName)
        {
            if (g_playerId === null)
            {
                g_playerId = id;
            }
        }
    });

    g_gameSocket.on("playerDisconnect", function(roomName, id)
    {
        if (myRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (id == g_players[i].playerId)
                {
                    g_players.splice(i, 1);
                    break;
                }
            }
        }
    });

    g_gameSocket.on("startRoom", function(roomName, map, mapIndex, playerCount)
    {
        if (myRoomName == roomName)
        {
            g_map = map;
            g_mapIndex = mapIndex;
            initGame(playerCount);
        }
    });

    g_gameSocket.on("playerChoosedColor", function(roomName, playerId, color)
    {
        if (myRoomName == roomName)
        {
            g_players[playerId].setSpritePlayerImageByColor(color);
        }
    });

    g_gameSocket.on("playerUpKeyDown", function(roomName, object)
    {
        if (myRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (object.playerId == g_players[i].playerId)
                {
                    g_players[i].upKeyDown = object.upKeyDown;
                    break;
                }
            }
        }
    });

    g_gameSocket.on("playerRightKeyDown", function(roomName, object)
    {
        if (myRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (object.playerId == g_players[i].playerId)
                {
                    g_players[i].rightKeyDown = object.rightKeyDown;
                    break;
                }
            }
        }
    });

    g_gameSocket.on("playerDownKeyDown", function(roomName, object)
    {
        if (myRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (object.playerId == g_players[i].playerId)
                {
                    g_players[i].downKeyDown = object.downKeyDown;
                    break;
                }
            }
        }
    });

    g_gameSocket.on("playerLeftKeyDown", function(roomName, object)
    {
        if (myRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (object.playerId == g_players[i].playerId)
                {
                    g_players[i].leftKeyDown = object.leftKeyDown;
                    break;
                }
            }
        }
    });

    g_gameSocket.on("playerPlateBomb", function(roomName, object)
    {
        if (myRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (object.playerId == g_players[i].playerId)
                {
                    addBombToPlayerPos(g_players[i], object.state);
                    break;
                }
            }
        }
    });
}

function initWebsiteSocket()
{
    g_websiteSocket = io.connect(":3001");
}

function getCookie(name)
{
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0)
    {
        offset = cookie.indexOf(search);
        if (offset != -1)
        {
            offset += search.length;
            end = cookie.indexOf(";", offset);
            if (end == -1)
            {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}
