var g_gameSocket = null;
var g_websiteSocket = null;

function initGameSocket()
{
    var playerListUl = document.getElementById("player_list");
    g_gameSocket = io.connect(":3000");
    g_gameSocket.emit("playerConnect", g_myRoomName, g_myPlayerName);
    g_gameSocket.on("playerConnect", function(roomName, playerId, playerName)
    {
        if (g_myRoomName == roomName)
        {
            if (g_playerId === null)
            {
                g_playerId = playerId;
                g_playerName = playerName;
                g_gameSocket.emit("getPlayerNames", g_myRoomName);
            }
        }
    });

    g_gameSocket.on("playerDisconnect", function(roomName, id)
    {
        if (g_myRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (id == g_players[i].playerId)
                {
                    var playerNamesLi = playerListUl.children;
                    for (var j = 0; j < playerNamesLi.length; j++)
                    {
                        if (playerNamesLi[j].innerHTML == g_players[i].name)
                        {
                            playerListUl.removeChild(playerNamesLi[j]);
                        }
                    }
                    g_players.splice(i, 1);
                    break;
                }
            }
        }
    });

    g_gameSocket.on("startRoom", function(roomName, map, mapIndex)
    {
        if (g_myRoomName == roomName)
        {
            g_map = map;
            g_mapIndex = mapIndex;
            initGame();
        }
    });

    g_gameSocket.on("playerChoosedColor", function(roomName, playerId, color)
    {
        if (g_myRoomName == roomName)
        {
            g_players[playerId].setSpritePlayerImageByColor(color);
            var playerNames = playerListUl.children;
            playerNames[playerId].style.color = color;
        }
    });

    g_gameSocket.on("getPlayerNames", function(roomName, players)
    {
        if (g_myRoomName == roomName)
        {
            playerListUl.innerHTML = "";
            for (var i = 0; i < players.length; i++)
            {
                if (players.length > g_players.length)
                {
                    playerIdFound = false;
                    for (var j = 0; j < g_players.length; j++)
                    {
                        if (g_players[j].playerId == players[i].id)
                        {
                            playerIdFound = true;
                        }
                    }
                    if (!playerIdFound)
                    {
                        var startPlayerPos = getStartPlayerPos(players[i].id);
                        g_players.push(new Player(players[i].id, players[i].name, PLAYER_COLOR_DEFAULT, startPlayerPos.x, startPlayerPos.y));
                    }
                }
                var li = document.createElement("li");
                li.className = "player_name";
                li.appendChild(document.createTextNode(players[i].name));
                playerListUl.appendChild(li);
            }
        }

        function getStartPlayerPos(playerId)
        {
            var result = {x: 0, y: 0};
            switch (playerId)
            {
                case 0:
                    result = {x: 0, y: 0};
                    break;
                case 1:
                    result = {x: CELLS_COUNT_HORIZONTAL - 1, y: 0};
                    break;
                case 2:
                    result = {x: 0, y: CELLS_COUNT_VERTICAL - 1};
                    break;
                case 3:
                    result = {x: CELLS_COUNT_HORIZONTAL - 1, y: CELLS_COUNT_VERTICAL - 1};
                    break;
                default:
                    result.x = 0;
                    break;
            }
            return result;
        }
    });

    g_gameSocket.on("playerUpKeyDown", function(roomName, object)
    {
        if (g_myRoomName == roomName)
        {
            g_players[object.playerId].upKeyDown = object.upKeyDown;
        }
    });

    g_gameSocket.on("playerRightKeyDown", function(roomName, object)
    {
        if (g_myRoomName == roomName)
        {
            g_players[object.playerId].rightKeyDown = object.rightKeyDown;
        }
    });

    g_gameSocket.on("playerDownKeyDown", function(roomName, object)
    {
        if (g_myRoomName == roomName)
        {
            g_players[object.playerId].downKeyDown = object.downKeyDown;
        }
    });

    g_gameSocket.on("playerLeftKeyDown", function(roomName, object)
    {
        if (g_myRoomName == roomName)
        {
            g_players[object.playerId].leftKeyDown = object.leftKeyDown;
        }
    });

    g_gameSocket.on("playerPlateBomb", function(roomName, object)
    {
        if (g_myRoomName == roomName)
        {
            addBombToPlayerPos(g_players[object.playerId], object.state);
        }
    });

    g_gameSocket.on("canvasXChanged", function(roomName, playerId, canvasX)
    {
        if (g_myRoomName == roomName)
        {
            g_players[playerId].canvasX = canvasX;
        }
    });

    g_gameSocket.on("canvasYChanged", function(roomName, playerId, canvasY)
    {
        if (g_myRoomName == roomName)
        {
            g_players[playerId].canvasY = canvasY;
        }
    });

    g_gameSocket.on("playerDied", function(roomName, playerId)
    {
        if (g_myRoomName == roomName)
        {
            g_players[playerId].die();
        }
    });
}

function initWebsiteSocket()
{
    g_websiteSocket = io.connect(":3001");
}
