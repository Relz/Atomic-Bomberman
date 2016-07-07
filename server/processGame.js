exports.processGame = function(io)
{
    COLOR_DEFAULT = "black";
    MAX_PLAYERS_COUNT = 2;
    var rooms = [];

    io.on("connection", function(socket)
    {
        socket.roomName = null;
        socket.on("playerConnect", function(roomName, playerName)
        {
            roomNamePos = getRoomNamePos(roomName);
            if (roomNamePos == -1)
            {
                rooms.push({roomName: roomName, mapIndex: 0, players: []});
                roomNamePos = rooms.length - 1;
            }
            var playerNamePos = getPlayerNamePos(roomNamePos, playerName);
            if (playerNamePos == -1)
            {
                if (rooms[roomNamePos].players.length >= MAX_PLAYERS_COUNT)
                {
                    io.emit("playerConnectRejected", socket.client.conn.id);
                }
                else
                {
                    var newId = -1;
                    for (var i = 0; i < rooms[roomNamePos].players.length + 1; i++)
                    {
                        var idFree = true;
                        for (var j = 0; j < rooms[roomNamePos].players.length; j++)
                        {
                            if (rooms[roomNamePos].players[j].playerId == i)
                            {
                                idFree = false;
                                break;
                            }
                        }
                        if (idFree)
                        {
                            newId = i;
                            break;
                        }
                    }
                    rooms[roomNamePos].players.push({playerId: newId, playerName: playerName, color: COLOR_DEFAULT});
                    io.emit("playerConnect", roomName, newId, playerName);
                }
            }
            else
            {
                io.emit("playerConnect", roomName, rooms[roomNamePos].players[playerNamePos].playerId, playerName);
            }
        });

        socket.on("playerDisconnect", function(roomName, playerId)
        {
            roomNamePos = getRoomNamePos(roomName);
            if (roomNamePos != -1)
            {
                playerIdPos = getPlayerIdPos(roomNamePos, playerId);
                if (playerIdPos != -1)
                {
                    rooms[roomNamePos].players.splice(playerIdPos, 1);
                    io.emit("playerDisconnect", roomName, playerId);
                    if (rooms[roomNamePos].players.length == 0)
                    {
                        rooms.splice(roomNamePos, 1);
                    }
                }
            }
        });

        socket.on("playerChoosedColor", function(roomName, playerId, color)
        {
            roomNamePos = getRoomNamePos(roomName);
            if (roomNamePos != -1)
            {
                playerIdPos = getPlayerIdPos(roomNamePos, playerId);
                if (playerIdPos != -1)
                {
                    rooms[roomNamePos].players[playerIdPos].color = color;
                    io.emit("playerChoosedColor", roomName, playerId, color);
                }
            }
        });

        socket.on("setMapIndex", function(roomName, mapIndex)
        {
            roomNamePos = getRoomNamePos(roomName);
            if (roomNamePos != -1)
            {
                rooms[roomNamePos].mapIndex = mapIndex;
                io.emit("getMapIndex", roomName, mapIndex);
            }
        });

        socket.on("getMapIndex", function(roomName)
        {
            roomNamePos = getRoomNamePos(roomName);
            if (roomNamePos != -1)
            {
                io.emit("getMapIndex", roomName, rooms[roomNamePos].mapIndex);
            }
        });

        socket.on("getPlayerNames", function(roomName)
        {
            roomNamePos = getRoomNamePos(roomName);
            if (roomNamePos != -1)
            {
                var players = [];
                for (var i = 0; i < rooms[roomNamePos].players.length; i++)
                {
                    players.push({id: rooms[roomNamePos].players[i].playerId, name: rooms[roomNamePos].players[i].playerName, color: rooms[roomNamePos].players[i].color});
                }
                io.emit("getPlayerNames", roomName, players);
            }
        });

        socket.on("startRoom", function(roomName)
        {
            roomNamePos = getRoomNamePos(roomName);
            if (roomNamePos != -1)
            {
                io.emit("startRoom", roomName, generateMap(rooms[roomNamePos].mapIndex));
            }
        });

        socket.on("playerUpKeyDown", function(roomName, clientData)
        {
            io.emit("playerUpKeyDown", roomName, clientData);
        });

        socket.on("playerRightKeyDown", function(roomName, clientData)
        {
            io.emit("playerRightKeyDown", roomName, clientData);
        });

        socket.on("playerDownKeyDown", function(roomName, clientData)
        {
            io.emit("playerDownKeyDown", roomName, clientData);
        });

        socket.on("playerLeftKeyDown", function(roomName, clientData)
        {
            io.emit("playerLeftKeyDown", roomName, clientData);
        });

        socket.on("playerPlateBomb", function(roomName, clientData)
        {
            io.emit("playerPlateBomb", roomName, clientData);
        });

        socket.on("canvasXChanged", function(roomName, playerId, canvasX)
        {
            io.emit("canvasXChanged", roomName, playerId, canvasX);
        });

        socket.on("canvasYChanged", function(roomName, playerId, canvasY)
        {
            io.emit("canvasYChanged", roomName, playerId, canvasY);
        });

        socket.on("playerDied", function(roomName, playerId)
        {
            io.emit("playerDied", roomName, playerId);
        });

        socket.on("sendMessage", function(roomName, playerName, message)
        {
            roomNamePos = getRoomNamePos(roomName);
            if (roomNamePos != -1)
            {
                playerIdPos = getPlayerNamePos(roomNamePos, playerName);
                if (playerIdPos != -1)
                {
                    io.emit("newMessage", roomName, playerName, message, rooms[roomNamePos].players[playerIdPos].color);
                }
            }
        });
    });

    function getRoomNamePos(roomName)
    {
        var result = -1;
        for (var i = 0; i < rooms.length; i++)
        {
            if (rooms[i].roomName == roomName)
            {
                result = i;
                break;
            }
        }
        return result;
    }

    function getPlayerIdPos(roomNamePos, playerId)
    {
        var result = -1;
        for (var i = 0; i < rooms[roomNamePos].players.length; i++)
        {
            if (rooms[roomNamePos].players[i].playerId == playerId)
            {
                result = i;
                break;
            }
        }
        return result;
    }

    function getPlayerNamePos(roomIndex, playerName)
    {
        var result = -1;
        for (var i = 0; i < rooms[roomIndex].players.length; i++)
        {
            if (rooms[roomIndex].players[i].playerName == playerName)
            {
                result = i;
                break;
            }
        }
        return result;
    }

    function generateMap(mapIndex)
    {
        CELLS_COUNT_HORIZONTAL = 15;
        CELLS_COUNT_VERTICAL = 11;
        BONUS_BOMB_ID = 1;
        BONUS_FLAME_ID = 2;
        BONUS_DOUBLE_FLAME_ID = 3;
        BONUS_SPEED_ID = 4;
        BONUS_CURSE_ID = 5;
        BONUS_EXHAUST_ID = 6;
        BONUS_DETONATOR_ID = 7;
        BONUS_KICK_ID = 8;
        BONUS_PUNCH_ID = 9;
        BONUS_GRAB_ID = 10;
        BONUS_RANDOM_ID = 11;

        BONUS_CONFIG =
        {
            "bomb" :
            {
                id: BONUS_BOMB_ID,
                count: 20,
                img: "img/game/power/bomb.png"
            },
            flame :
            {
                id: BONUS_FLAME_ID,
                count: 6,
                img: "img/game/power/flame.png"
            },
            "doubleFlame" :
            {
                id: BONUS_DOUBLE_FLAME_ID,
                count: 4,
                img: "img/game/power/double_flame.png"
            },
            "speed" :
            {
                id: BONUS_SPEED_ID,
                count: 8,
                img: "img/game/power/speed.png"
            },
            "curse" :
            {
                id: BONUS_CURSE_ID,
                count: 3,
                img: "img/game/power/curse.png"
            },
            "exhaust" :
            {
                id: BONUS_EXHAUST_ID,
                count: 3,
                img: "img/game/power/exhaust.png"
            },
            "detonator" :
            {
                id: BONUS_DETONATOR_ID,
                count: 2,
                img: "img/game/power/detonator.png"
            },
            "kick" :
            {
                id: BONUS_KICK_ID,
                count: 3,
                img: "img/game/power/kick.png"
            },
            "punch" :
            {
                id: BONUS_PUNCH_ID,
                count: 4,
                img: "img/game/power/punch.png"
            },
            "grab" :
            {
                id: BONUS_GRAB_ID,
                count: 5,
                img: "img/game/power/grab.png"
            },
            "random" :
            {
                id: BONUS_RANDOM_ID,
                count: 1,
                img: "img/game/power/random.png"
            }
        };

        var map = [
            [{x:mapIndex,y:-1,bonus:null},{x:mapIndex,y:-1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:-1,bonus:null},{x:mapIndex,y:-1,bonus:null}],
            [{x:mapIndex,y:-1,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:-1,bonus:null}],
            [{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null}],
            [{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null}],
            [{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null}],
            [{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null}],
            [{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null}],
            [{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null}],
            [{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null}],
            [{x:mapIndex,y:-1,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:1,bonus:null},{x:mapIndex,y:-1,bonus:null}],
            [{x:mapIndex,y:-1,bonus:null},{x:mapIndex,y:-1,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:0,bonus:null},{x:mapIndex,y:-1,bonus:null},{x:mapIndex,y:-1,bonus:null}]
        ];

        generateBonuses();
        return map;

        function generateBonuses()
        {
            var randPosX;
            var randPosY;
            for (var key in BONUS_CONFIG)
            {
                for (var i = 0; i < BONUS_CONFIG[key].count; i++)
                {
                    do
                    {
                        randPosX = Math.floor(Math.random() * CELLS_COUNT_HORIZONTAL);
                        randPosY = Math.floor(Math.random() * CELLS_COUNT_VERTICAL);
                    }
                    while (map[randPosY][randPosX].y !== 0 && map[randPosY][randPosX].bonus === null);
                    map[randPosY][randPosX].bonus = BONUS_CONFIG[key];
                }
            }
        }
    }
};
