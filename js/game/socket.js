var SERVER_NAME = "Server";
var SERVER_COLOR = "grey";

var g_gameSocket = null;
var g_websiteSocket = null;

function initGameSocket()
{
    var playerListUl = document.getElementById("playerList");
    var chatTable = document.getElementById("chatTable");
    var chooseMapTable = document.getElementById("chooseMap");
    g_gameSocket = io.connect(":3000");
    g_gameSocket.emit("playerConnect", g_playerRoomName, g_playerName, g_roomOwner);
    g_gameSocket.on("playerConnect", function(roomName, playerId, playerName, playerColor)
    {
        if (g_playerRoomName == roomName)
        {
            if (g_playerId === null)
            {
                g_playerId = playerId;
                g_playerColor = playerColor;
                g_gameSocket.emit("getPlayers", g_playerRoomName);
            }
            else
            {
                sendMessageToChat(SERVER_NAME, playerName + " Connected", SERVER_COLOR);
            }
        }
    });

    g_gameSocket.on("playerConnectRejected", function(rejectedId)
    {
        if (g_gameSocket.id == rejectedId)
        {
            leaveRoom();
        }
    });

    g_gameSocket.on("playerDisconnect", function(roomName, id, roomOwner)
    {
        if (g_playerRoomName == roomName)
        {
            var playerName = "null";
            for (var i = 0; i < g_players.length; i++)
            {
                if (id == g_players[i].playerId)
                {
                    playerName = g_players[i].name;
                    var playerNamesLi = playerListUl.children;
                    for (var j = 0; j < playerNamesLi.length; j++)
                    {
                        if (playerNamesLi[j].innerHTML == playerName)
                        {
                            playerListUl.removeChild(playerNamesLi[j]);
                            break;
                        }
                    }
                    g_players[i].die();
                    g_players.splice(i, 1);
                    break;
                }
            }
            if (g_playerId == id)
            {
                changeRoomOwner(g_playerId, false);
            }
            else
            {
                sendMessageToChat(SERVER_NAME, playerName + " Disconnected", SERVER_COLOR);
            }
            if (roomOwner == "true" && g_players.length > 0 && !g_gameStarted)
            {
                changeRoomOwner(g_players[0].playerId, true);
                sendMessageToChat(SERVER_NAME, g_players[0].name + " became the room master", SERVER_COLOR);
            }
        }
    });

    g_gameSocket.on("startRoom", function(roomName, map)
    {
        if (g_playerRoomName == roomName)
        {
            g_map = map;
            chooseMapTable.style.display = "none";
            var waitMessage = document.getElementById("waitMessage");
            if (waitMessage !== null)
            {
                waitMessage.style.display = "none";
            }
            initGame();
        }
    });

    g_gameSocket.on("getMapIndex", function(roomName, mapIndex)
    {
        if (g_playerRoomName == roomName)
        {
            g_mapIndex = mapIndex;
            var rows = chooseMapTable.rows;
            var currMapIndex = 0;
            for (var i = 0; i < rows.length; i++)
            {
                for (var j = 0; j < rows[i].cells.length; j++)
                {
                    rows[i].cells[j].style.boxShadow = "";
                    if (currMapIndex == mapIndex)
                    {
                        rows[i].cells[j].style.boxShadow = "0 0 100px rgba(38, 38, 199, 1)";
                    }
                    currMapIndex++;
                }
            }
        }
    });

    g_gameSocket.on("playerChoosedColor", function(roomName, playerId, color)
    {
        if (g_playerRoomName == roomName)
        {
            g_players[playerId].setSpritePlayerImageByColor(color);
            var playerNames = playerListUl.children;
            playerNames[playerId].style.color = color;
        }
    });

    g_gameSocket.on("getPlayers", function(roomName, players)
    {
        if (g_playerRoomName == roomName)
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
                        g_players.push(new Player(players[i].id, players[i].name, players[i].color, startPlayerPos.x, startPlayerPos.y));
                    }
                }
                var li = document.createElement("li");
                li.className = "player_name";
                li.style.color = players[i].color;
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
        if (g_playerRoomName == roomName)
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
        if (g_playerRoomName == roomName)
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
        if (g_playerRoomName == roomName)
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
        if (g_playerRoomName == roomName)
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
        if (g_playerRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (object.playerId == g_players[i].playerId)
                {
                    addBombToPlayerPos(g_players[i], object.posX, object.posY, object.state);
                    break;
                }
            }
        }
    });

    g_gameSocket.on("canvasXChanged", function(roomName, playerId, canvasX)
    {
        if (g_playerRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (playerId == g_players[i].playerId)
                {
                    g_players[i].canvasX = canvasX;
                    break;
                }
            }
        }
    });

    g_gameSocket.on("canvasYChanged", function(roomName, playerId, canvasY)
    {
        if (g_playerRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (playerId == g_players[i].playerId)
                {
                    g_players[i].canvasY = canvasY;
                    break;
                }
            }
        }
    });

    g_gameSocket.on("playerDied", function(roomName, playerId)
    {
        if (g_playerRoomName == roomName)
        {
            for (var i = 0; i < g_players.length; i++)
            {
                if (playerId == g_players[i].playerId)
                {
                    var playerNames = document.getElementsByClassName("player_name");
                    for (var j = 0; j < playerNames.length; j++)
                    {
                        if (playerNames[j].innerHTML == g_players[i].name)
                        {
                            playerNames[j].style.textDecoration = "line-through";
                            break;
                        }
                    }
                    g_players[i].die();
                    break;
                }
            }
        }
    });

    g_gameSocket.on("newMessage", function(roomName, playerName, message, color)
    {
        if (g_playerRoomName == roomName)
        {
            sendMessageToChat(playerName, message, color);
        }
    });

    function sendMessageToChat(playerName, message, color)
    {
        var row = chatTable.insertRow(chatTable.rows.length);
        var nameCell = row.insertCell(0);
        var messageCell = row.insertCell(1);
        nameCell.innerHTML = "<span>" + playerName + "</span>";
        nameCell.className = "chat_name";
        nameCell.style.color = color;
        messageCell.innerHTML = "<span>" + message + "</span>";
        messageCell.className = "chat_message";
        chatTable.scrollTop = chatTable.scrollHeight;
    }
}

function changeRoomOwner(id, roomOwner)
{
    g_gameSocket.emit("becomeRoomOwner", roomOwner);
    setCookie("room_owner", roomOwner.toString());
    location.reload();
}

function initWebsiteSocket()
{
    g_websiteSocket = io.connect(":3001");
}
