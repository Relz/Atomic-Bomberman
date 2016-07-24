SERVER_NAME = "Server";
SERVER_COLOR = "#808080";

COLOR_NONE = "#808080";
MAX_PLAYERS_COUNT = 4;

MAP_INDEX_RANGE = {min: 0, max: 10};

CELL_WIDTH = 40;
CELL_HEIGHT = 36;

BOMB_DURATION = 3000;
FLAME_DURATION = 1000;

var globals = require("./globals.js").globals;
var getRoomNamePos = require("./functions.js").getRoomNamePos;
var getPlayerIdPos = require("./functions.js").getPlayerIdPos;
var getPlayerNamePos = require("./functions.js").getPlayerNamePos;
var generateClientMap = require("./generate_map.js").generateClientMap;
var generateServerMap = require("./generate_map.js").generateServerMap;
var playerModule = require("./player.js");

globals.io = initServer(3000);

function initServer(port)
{
    var httpServ = require("http").createServer();
    httpServ.listen(port);
    return require("socket.io").listen(httpServ);
}

globals.io.on("connection", function(socket)
{
    socket.on("getRooms", function()
    {
        globals.io.emit("getRooms", socket.client.conn.id, globals.roomList);
    });

    socket.on("enterGameRoom", function(roomName, id)
    {
        roomNamePos = getRoomNamePos(roomName);
        if (roomNamePos != -1)
        {
            if (globals.rooms[roomNamePos].players.length != globals.rooms[roomNamePos].maxPlayerCount)
            {
                if (!globals.rooms[roomNamePos].gameStarted)
                {
                    globals.io.emit("enterGameRoom", roomName, id);
                }
                else
                {
                    globals.io.emit("gameRoomAlreadyStarted", roomName, id);
                }
            }
            else
            {
                globals.io.emit("gameRoomIsFull", roomName, id);
            }
        }
        else
        {
            globals.io.emit("gameRoomNotFound", roomName, id);
        }
    });

    socket.on("createNewRoom", function(roomName, id, password, maxPlayerCount)
    {
        if (roomName !== "")
        {
                if (maxPlayerCount <= MAX_PLAYERS_COUNT)
                {
                    roomNamePos = getRoomNamePos(roomName);
                    if (roomNamePos == -1 || globals.rooms[roomNamePos].players.length == 0)
                    {
                            globals.rooms.push({roomName: roomName, maxPlayerCount: maxPlayerCount, gameStarted: false, mapIndex: 0, players: []});
                            globals.roomList.push({roomName: roomName, playerCount: 0, maxPlayerCount: maxPlayerCount});
                            globals.io.emit("createNewRoom", id, roomName, 0, maxPlayerCount);
                    }
                    else
                    {
                        globals.io.emit("roomNameAlreadyExists", id, roomName);
                    }
                }
                else
                {
                    globals.io.emit("maxPlayerCountOverflow", id, MAX_PLAYERS_COUNT);
                }
        }
    });

    socket.on("playerConnect", function(roomName, playerName)
    {
        socket.roomName = roomName;
        socket.join(roomName);
        socket.id = socket.client.conn.id;
        socket.player = new playerModule.Player(socket, playerName, COLOR_NONE);
        roomNamePos = getRoomNamePos(socket.roomName);
        if (roomNamePos != -1 && globals.rooms[roomNamePos].players.length < MAX_PLAYERS_COUNT)
        {
            socket.roomOwner = (globals.rooms[roomNamePos].players.length == 0) ? true : false;
            socket.player.setPosition(PLAYER_START_POSITIONS[globals.rooms[roomNamePos].players.length].posX, PLAYER_START_POSITIONS[globals.rooms[roomNamePos].players.length].posY);
            var playerNamePos = getPlayerNamePos(roomNamePos, socket.player.name);
            if (playerNamePos == -1)
            {
                globals.rooms[roomNamePos].players.push(socket.player);
                playerNamePos = globals.rooms[roomNamePos].players.length - 1;
                globals.roomList[roomNamePos].playerCount++;
                globals.io.to(socket.roomName).emit("newMessage", SERVER_NAME, socket.player.name + " Connected", SERVER_COLOR);
            }
            globals.rooms[roomNamePos].players[playerNamePos].roomOwner = socket.roomOwner;
            globals.io.emit("enterGameRoom", roomName, null);
            globals.io.to(socket.roomName).emit("playerConnect", socket.id, socket.roomOwner);
            if (globals.rooms[roomNamePos].players.length == 1)
            {
                globals.io.emit("newRoomCreated", socket.roomName, globals.rooms[roomNamePos].players.length, globals.rooms[roomNamePos].maxPlayerCount);
            }
        }
        else
        {
            globals.io.to(socket.roomName).emit("playerConnectRejected", socket.id);
        }
    });

    socket.on("playerChoosedColor", function(color)
    {
        roomNamePos = getRoomNamePos(socket.roomName);
        if (roomNamePos != -1)
        {
            playerIdPos = getPlayerIdPos(roomNamePos, socket.id);
            if (playerIdPos != -1)
            {
                globals.rooms[roomNamePos].players[playerIdPos].color = color;
                globals.io.to(socket.roomName).emit("playerChoosedColor", socket.id, globals.rooms[roomNamePos].players[playerIdPos].name, color);
            }
        }
    });

    socket.on("setMapIndex", function(mapIndex)
    {
        if (socket.roomOwner && mapIndex >= MAP_INDEX_RANGE.min && mapIndex <= MAP_INDEX_RANGE.max)
        {
            roomNamePos = getRoomNamePos(socket.roomName);
            if (roomNamePos != -1 && !globals.rooms[roomNamePos].gameStarted)
            {
                globals.rooms[roomNamePos].mapIndex = mapIndex;
                globals.io.to(socket.roomName).emit("getMapIndex", mapIndex);
            }
        }
    });

    socket.on("getMapIndex", function()
    {
        roomNamePos = getRoomNamePos(socket.roomName);
        if (roomNamePos != -1)
        {
            globals.io.to(socket.roomName).emit("getMapIndex", globals.rooms[roomNamePos].mapIndex);
        }
    });

    socket.on("getPlayers", function()
    {
        roomNamePos = getRoomNamePos(socket.roomName);
        if (roomNamePos != -1)
        {
            var players = [];
            for (var i = 0; i < globals.rooms[roomNamePos].players.length; i++)
            {
                players.push({id: globals.rooms[roomNamePos].players[i].id, name: globals.rooms[roomNamePos].players[i].name, color: globals.rooms[roomNamePos].players[i].color, posX: globals.rooms[roomNamePos].players[i].posX,  posY: globals.rooms[roomNamePos].players[i].posY, roomOwner: globals.rooms[roomNamePos].players[i].roomOwner});
            }
            globals.io.to(socket.roomName).emit("getPlayers", players);
        }
    });

    socket.on("startRoom", function()
    {
        if (socket.roomOwner)
        {
            roomNamePos = getRoomNamePos(socket.roomName);
            if (roomNamePos != -1)
            {
                globals.rooms[roomNamePos].gameStarted = true;
                allPlayersChoosedColor = true;
                for (var i = 0; i < globals.rooms[roomNamePos].players.length; i++)
                {
                    if (globals.rooms[roomNamePos].players[i].color == COLOR_NONE)
                    {
                        allPlayersChoosedColor = false;
                    }
                }
                if (allPlayersChoosedColor)
                {
                    var clientMap = generateClientMap(globals.rooms[roomNamePos].mapIndex);
                    globals.io.to(socket.roomName).emit("startRoom", clientMap);
                    globals.map = generateServerMap(clientMap);
                }
                else
                {
                    globals.io.to(socket.roomName).emit("notAllPlayersChoosedColor", socket.id);
                }
            }
        }
    });

    socket.on("sendKeyStates", function(upKeyDown, rightKeyDown, downKeyDown, leftKeyDown)
    {
        if (socket.player.upKeyDown != upKeyDown)
        {
            socket.player.upKeyDown = upKeyDown;
        }
        if (socket.player.rightKeyDown != rightKeyDown)
        {
            socket.player.rightKeyDown = rightKeyDown;
        }
        if (socket.player.downKeyDown != downKeyDown)
        {
            socket.player.downKeyDown = downKeyDown;
        }
        if (socket.player.leftKeyDown != leftKeyDown)
        {
            socket.player.leftKeyDown = leftKeyDown;
        }
        socket.player.update();
    });

    var isLastStateKeyDown = false;
    function isAllowToPlantBomb(posX, posY, state)
    {
        var result = false;
        if (state && !isLastStateKeyDown)
        {
            result = true;
            if (socket.player.bombCount == socket.player.maxBomb)
            {
                result = false;
            }
            else
            {
                for (var i = 0; i < globals.bombs.length; i++)
                {
                    if (globals.bombs[i].posX == posX && globals.bombs[i].posY == posY)
                    {
                        result = false;
                    }
                }
            }
        }
        isLastStateKeyDown = state;
        return result;
    }

    socket.on("playerPlateBomb", function(state)
    {
        var bombPosX = socket.player.posX;
        var bombPosY = socket.player.posY;
        if (isAllowToPlantBomb(bombPosX, bombPosY, state))
        {
            socket.player.bombCount++;
            globals.bombs.unshift({posX: bombPosX, posY: bombPosY});
            globals.io.to(socket.roomName).emit("playerPlateBomb", socket.id, bombPosX, bombPosY, state);
            setTimeout(function()
            {
                function tryToDestroyWallAndGetPos(dx, dy)
                {
                    var result = {x: bombPosX, y: bombPosY};
                    for (var i = 1; i <= socket.player.bombAttackRange; i++)
                    {
                        if (((bombPosY + i * dy > CELLS_COUNT_VERTICAL - 1) || (bombPosX + i * dx > CELLS_COUNT_HORIZONTAL - 1)  ||
                             (bombPosX + i * dx < 0) || (bombPosY + i * dy < 0)) || (globals.map[bombPosY + i * dy][bombPosX + i * dx].y == 1))
                        {
                            break;
                        }
                        if (globals.map[bombPosY + i * dy][bombPosX + i * dx].y === 0)
                        {
                            result = {x : bombPosX + i * dx, y: bombPosY + i * dy};
                            globals.map[bombPosY + i * dy][bombPosX + i * dx].y = -1;
                            globals.io.to(socket.roomName).emit("destroyWall", bombPosX + i * dx, bombPosY + i * dy);
                            if (globals.map[bombPosY + i * dy][bombPosX + i * dx].bonus !== null)
                            {
                                globals.io.to(socket.roomName).emit("showBonus", globals.map[bombPosY + i * dy][bombPosX + i * dx].bonus, bombPosX + i * dx, bombPosY + i * dy);
                            }
                            break;
                        }
                        else if (globals.map[bombPosY + i * dy][bombPosX + i * dx].y == -1)
                        {
                            result = {x : bombPosX + i * dx, y: bombPosY + i * dy};
                        }
                    }
                    return result;
                }

                globals.bombs.pop();
                socket.player.bombCount--;

                var upperWallPos = tryToDestroyWallAndGetPos(0, -1);
                var rightWallPos = tryToDestroyWallAndGetPos(1, 0);
                var lowerWallPos = tryToDestroyWallAndGetPos(0, 1);
                var leftWallPos = tryToDestroyWallAndGetPos(-1, 0);
                globals.io.to(socket.roomName).emit("addFlame", bombPosX, bombPosY, upperWallPos, rightWallPos, lowerWallPos, leftWallPos);
                globals.flames.unshift({posX: bombPosX, posY: bombPosY, upperWallPos: upperWallPos, rightWallPos: rightWallPos, lowerWallPos: lowerWallPos, leftWallPos: leftWallPos});
                setTimeout(function()
                {
                    globals.flames.pop();
                }, FLAME_DURATION);
            }, BOMB_DURATION);
        }
    });

    socket.on("sendMessage", function(message)
    {
        roomNamePos = getRoomNamePos(socket.roomName);
        if (roomNamePos != -1)
        {
            playerIdPos = getPlayerNamePos(roomNamePos, socket.player.name);
            if (playerIdPos != -1)
            {
                globals.io.to(socket.roomName).emit("newMessage", socket.player.name, message, globals.rooms[roomNamePos].players[playerIdPos].color);
            }
        }
    });

    socket.on("disconnect", function()
    {
        if (socket.roomName !== undefined)
        {
            roomNamePos = getRoomNamePos(socket.roomName);
            if (roomNamePos != -1)
            {
                playerIdPos = getPlayerIdPos(roomNamePos, socket.id);
                if (playerIdPos != -1)
                {
                    var changeRoomOwner = false;
                    if (!globals.rooms[roomNamePos].gameStarted && globals.rooms[roomNamePos].players[playerIdPos].roomOwner)
                    {
                        changeRoomOwner = true;
                    }
                    globals.rooms[roomNamePos].players.splice(playerIdPos, 1);
                    globals.roomList[roomNamePos].playerCount--;
                    if (globals.rooms[roomNamePos].players.length == 0)
                    {
                        globals.rooms.splice(roomNamePos, 1);
                        globals.roomList.splice(roomNamePos, 1);
                        globals.io.emit("removeRoom", socket.roomName);
                    }
                    else
                    {
                        if (!globals.rooms[roomNamePos].gameStarted)
                        {
                            recountPlayerPos(roomNamePos, playerIdPos);
                        }
                        globals.io.to(socket.roomName).emit("newMessage", SERVER_NAME, socket.player.name + " Disconnected", SERVER_COLOR);
                        if (changeRoomOwner)
                        {
                            globals.io.to(socket.roomName).emit("setNewRoomOwner", globals.rooms[roomNamePos].players[0].id);
                            globals.io.to(socket.roomName).emit("newMessage", SERVER_NAME, globals.rooms[roomNamePos].players[0].name + " became the room master", SERVER_COLOR);
                        }
                        globals.io.to(socket.roomName).emit("playerDisconnect", socket.id);
                        globals.io.emit("playerLeftRoom", socket.roomName);
                    }
                }
            }
        }

        function recountPlayerPos(roomNamePos, playerIdPos)
        {
            for (var i = playerIdPos; i < globals.rooms[roomNamePos].players.length; i++)
            {
                globals.rooms[roomNamePos].players[i].setPosition(PLAYER_START_POSITIONS[globals.rooms[roomNamePos].players.length - 1].posX, PLAYER_START_POSITIONS[globals.rooms[roomNamePos].players.length - 1].posY);
                globals.io.to(socket.roomName).emit("playerPosChanged", globals.rooms[roomNamePos].players[i].id, globals.rooms[roomNamePos].players[i].posX, globals.rooms[roomNamePos].players[i].posY);
            }
        }
    });

    socket.on("becomeRoomOwner", function()
    {
        roomNamePos = getRoomNamePos(socket.roomName);
        if (roomNamePos != -1)
        {
            roomOwnerAlreadyExists = false;
            for (var i = 0; i < globals.rooms[roomNamePos].players.length; i++)
            {
                if (globals.rooms[roomNamePos].players[i].roomOwner === true)
                {
                    roomOwnerAlreadyExists = true;
                    break;
                }
            }
            if (!roomOwnerAlreadyExists)
            {
                for (var i = 0; i < globals.rooms[roomNamePos].players.length; i++)
                {
                    if (globals.rooms[roomNamePos].players[i].id == socket.id)
                    {
                        globals.rooms[roomNamePos].players[i].roomOwner = true;
                        socket.roomOwner = true;
                        break;
                    }
                }
            }
        }
    });

    socket.on("stopBeingRoomOwner", function()
    {
        roomNamePos = getRoomNamePos(socket.roomName);
        if (roomNamePos != -1)
        {
            playerIdPos = getPlayerIdPos(roomNamePos, socket.id);
            if (playerIdPos != -1)
            {
                globals.rooms[roomNamePos].players[playerIdPos].roomOwner = false;
            }
        }
    });
});
