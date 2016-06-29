var g_socket = null;

function initSocket()
{
    g_socket = io.connect(":3000");
    g_socket.emit("playerConnect");
    g_socket.on("playerConnect", function(id)
    {
        if (g_playerId === null)
        {
            g_playerId = id;
            if (g_playerId === 0)
            {
                generateBonuses();
                g_socket.emit("sendMap", g_map);
            }
            else
            {
                g_socket.emit("getMap");
            }
        }
    });

    g_socket.on("playerUpKeyDown", function(object)
    {
        for (var i = 0; i < g_players.length; i++)
        {
            if (object.playerId == g_players[i].playerId)
            {
                g_players[i].upKeyDown = object.upKeyDown;
                break;
            }
        }
    });

    g_socket.on("playerRightKeyDown", function(object)
    {
        for (var i = 0; i < g_players.length; i++)
        {
            if (object.playerId == g_players[i].playerId)
            {
                g_players[i].rightKeyDown = object.rightKeyDown;
                break;
            }
        }
    });

    g_socket.on("playerDownKeyDown", function(object)
    {
        for (var i = 0; i < g_players.length; i++)
        {
            if (object.playerId == g_players[i].playerId)
            {
                g_players[i].downKeyDown = object.downKeyDown;
                break;
            }
        }
    });

    g_socket.on("playerLeftKeyDown", function(object)
    {
        for (var i = 0; i < g_players.length; i++)
        {
            if (object.playerId == g_players[i].playerId)
            {
                g_players[i].leftKeyDown = object.leftKeyDown;
                break;
            }
        }
    });

    g_socket.on("playerPlateBomb", function(object)
    {
        for (var i = 0; i < g_players.length; i++)
        {
            if (object.playerId == g_players[i].playerId)
            {
                addBombToPlayerPos(g_players[i], object.state);
                break;
            }
        }
    });

    g_socket.on("getMap", function(map)
    {
        g_map = map;
        console.log(g_map);
    });
}
