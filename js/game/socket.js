var g_socket = null;
var first;
function initSocket()
{
    var playerListUl = document.getElementById("playerList");
    var chatTable = document.getElementById("chatTable");
    var chooseMapTable = document.getElementById("chooseMap");
    var waitMessage = document.getElementById("waitMessage");

    g_socket = io.connect(":3000");
    g_socket.emit("playerConnect", g_roomName, getCookie("player_name"));
    g_socket.emit("getMapIndex");

    g_socket.on("playerConnect", function(playerId, isRoomOwner)
    {
        if (g_playerId === null)
        {
            g_playerId = playerId;
            if (isRoomOwner)
            {
                waitMessage.style.display = "none";
                startRoom.className = "room_start";
            }
            g_socket.emit("getPlayers");
        }
    });

    g_socket.on("playerConnectRejected", function(rejectedId)
    {
        if (g_socket.id == rejectedId)
        {
            leaveRoom();
        }
    });

    g_socket.on("playerDisconnect", function(id)
    {
        var playerName = "null";
        for (var i = 0; i < g_players.length; i++)
        {
            if (id == g_players[i].id)
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
                break;
            }
        }
    });

    g_socket.on("setNewRoomOwner", function(id)
    {
        if (g_playerId == id)
        {
            waitMessage.style.display = "none";
            startRoom.className = "room_start";
            g_socket.emit("becomeRoomOwner");
        }
    });

    g_socket.on("startRoom", function(map)
    {
        g_map = map;
        startRoom.style.display = "none";
        chooseMapTable.style.display = "none";
        waitMessage.style.display = "none";
        initGame();
    });

    g_socket.on("notAllPlayersChoosedColor", function(id)
    {
        if (g_playerId == id)
        {
            alert("Not all players choosed their color, wait for them or kick them.");
        }
    });

    g_socket.on("getMapIndex", function(mapIndex)
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
    });

    g_socket.on("playerChoosedColor", function(id, name, color)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            g_players[playerIdPos].setSpritePlayerImageByColor(color);
            var playerNames = playerListUl.children;
            var playerPosInList = findPlayerPosInListByName(playerNames, name);
            if (playerPosInList != -1)
            {
                playerNames[playerPosInList].style.color = color;
            }
        }
    });

    g_socket.on("getPlayers", function(players)
    {
        playerListUl.innerHTML = "";
        console.log(players);
        for (var i = 0; i < players.length; i++)
        {
            if (players.length > g_players.length && getPlayerIdPos(players[i].id) == -1)
            {
                if (g_players.length == 0)
                {
                    first = players[i].id;
                }
                g_players.push(new Player(players[i].id, players[i].name, players[i].posX, players[i].posY));
                g_players[g_players.length - 1].setSpritePlayerImageByColor(players[i].color);
            }
            var li = document.createElement("li");
            li.className = "player_name";
            li.style.color = players[i].color;
            li.appendChild(document.createTextNode(players[i].name));
            playerListUl.appendChild(li);
        }
    });

    g_socket.on("playerPlateBomb", function(id, posX, posY, state)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            g_bombs.unshift(new Bomb(g_players[playerIdPos], posX, posY, BOMB_DURATION));
        }
    });

    g_socket.on("canvasXChanged", function(id, canvasX)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            g_players[playerIdPos].canvasX = canvasX;
        }
    });

    g_socket.on("canvasYChanged", function(id, canvasY)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            g_players[playerIdPos].canvasY = canvasY;
        }
    });

    g_socket.on("posXChanged", function(id, posX)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            g_players[playerIdPos].posX = posX;
        }
    });

    g_socket.on("posYChanged", function(id, posY)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            g_players[playerIdPos].posY = posY;
        }
    });

    g_socket.on("directionChanged", function(id, direction)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            g_players[playerIdPos].direction = direction;
        }
    });

    g_socket.on("stayingChanged", function(id, isStaying)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            if (id == first)
            console.log(id, isStaying);
            g_players[playerIdPos].staying = isStaying;
        }
    });

    g_socket.on("playerPosChanged", function(id, posX, posY)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            g_players[playerIdPos].setPosition(posX, posY);
        }
    });

    g_socket.on("showBonus", function(bonus, posX, posY)
    {
        g_bonuses.push(new Bonus(bonus, posX, posY));
    });

    g_socket.on("playerDied", function(id)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            var playerNames = document.getElementsByClassName("player_name");
            var playerPosInList = findPlayerPosInListByName(playerNames, g_players[playerIdPos].name);
            if (playerPosInList != -1)
            {
                playerNames[playerPosInList].style.textDecoration = "line-through";
            }
            g_players[playerIdPos].die();
        }
    });

    g_socket.on("newMessage", function(playerName, message, color)
    {
        sendMessageToChat(playerName, message, color);
    });

    g_socket.on("bonusUsed", function(id, posX, posY, playerParam, newValue)
    {
        var playerIdPos = getPlayerIdPos(id);
        if (playerIdPos != -1)
        {
            g_players[playerIdPos][playerParam] = newValue;
            if (playerParam == "cursed")
            {
                self.upKeyDown = false;
                self.rightKeyDown = false;
                self.downKeyDown = false;
                self.leftKeyDown = false;
            }
            removeBonusFromMap(posX, posY);
        }

        function removeBonusFromMap(posX, posY)
        {
            for (var i = 0; i < g_bonuses.length; i++)
            {
                if (g_bonuses[i].posX == posX && g_bonuses[i].posY == posY)
                {
                    g_bonuses.splice(i, 1);
                    break;
                }
            }
        }
    });

    g_socket.on("destroyWall", function(posX, posY){
        g_map[posY][posX].y = -1;
    });

    g_socket.on("addFlame", function(bombPosX, bombPosY, upperWallPos, rightWallPos, lowerWallPos, leftWallPos){
        g_flames.unshift(new Flame(upperWallPos, rightWallPos, lowerWallPos, leftWallPos));
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

function getPlayerIdPos(id)
{
    var result = -1;
    for (var i = 0; i < g_players.length; i++)
    {
        if (g_players[i].id == id)
        {
            result = i;
            break;
        }
    }
    return result;
}

function findPlayerPosInListByName(list, name)
{
    var result = -1;
    for (var i = 0; i < list.length; i++)
    {
        if (list[i].innerHTML == name)
        {
            result = i;
            break;
        }
    }
    return result;
}
