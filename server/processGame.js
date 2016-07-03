exports.processGame = function(io)
{
    COLOR_DEFAULT = "green";
    MAX_PLAYERS_COUNT = 4;
    var rooms = [];
    var g_playerNames = [];
    var g_mapIndex = null;

    io.on("connection", function(socket)
    {
        socket.roomName = null;
        socket.on("playerConnect", function(roomName, playerName)
        {
            if (socket.roomName === null)
            {
                socket.roomName = roomName;
            }
                var roomNameFound = false;
                for (var i = 0; i < rooms.length; i++)
                {
                    if (rooms[i].roomName == roomName)
                    {
                        roomNameFound = true;
                        break;
                    }
                }
                if (!roomNameFound)
                {
                    rooms.push({roomName: roomName, players: []});
                }
                for (var i = 0; i < rooms.length; i++)
                {
                    if (rooms[i].roomName == roomName)
                    {
                        var playerNameFound = false;
                        for (var j = 0; j < rooms[i].players.length; j++)
                        {
                            if (rooms[i].players[j].playerName == playerName)
                            {
                                io.emit("playerConnect", roomName, rooms[i].players[j].playerId, playerName);
                                playerNameFound = true;
                                break;
                            }
                        }
                        if (!playerNameFound)
                        {
                            rooms[i].players.push({playerId: rooms[i].players.length, playerName: playerName, color: COLOR_DEFAULT});
                            io.emit("playerConnect", roomName, rooms[i].players.length - 1, playerName);
                        }
                        break;
                    }
                }
        });

        socket.on("playerDisconnect", function(roomName, playerId)
        {
            for (var i = 0; i < rooms.length; i++)
            {
                if (rooms[i].roomName == roomName)
                {
                    for (var j = 0; j < rooms[i].players.length; j++)
                    {
                        if (rooms[i].players[j].playerId == playerId)
                        {
                            rooms[i].players.splice(j, 1);
                            io.emit("playerDisconnect", roomName, playerId);
                            break;
                        }
                    }
                    break;
                }

            }
        });

        socket.on("playerChoosedColor", function(roomName, playerId, color)
        {
            for (var i = 0; i < rooms.length; i++)
            {
                if (rooms[i].roomName == roomName)
                {
                    for (var j = 0; j < rooms[i].players.length; j++)
                    {
                        if (rooms[i].players[j].playerId == playerId)
                        {
                            rooms[i].players[j].color = color;
                            break;
                        }
                    }
                    io.emit("playerChoosedColor", roomName, playerId, color);
                    break;
                }
            }
        });

        socket.on("setMapIndex", function(mapIndex)
        {
            g_mapIndex = mapIndex;
        });

        socket.on("getPlayerNames", function(roomName)
        {
            for (var i = 0; i < rooms.length; i++)
            {
                if (rooms[i].roomName == roomName)
                {
                    var players = [];
                    for (var j = 0; j < rooms[i].players.length; j++)
                    {
                        players.push({id: rooms[i].players[j].playerId, name: rooms[i].players[j].playerName});
                    }
                    io.emit("getPlayerNames", roomName, players);
                }
            }
        });

        socket.on("startRoom", function(roomName)
        {
            for (var i = 0; i < rooms.length; i++)
            {
                if (rooms[i].roomName == roomName)
                {
                    io.emit("startRoom", roomName, generateMap(), g_mapIndex);
                    break;
                }
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
    });

    function generateMap()
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
            [{x:g_mapIndex,y:-1,bonus:null},{x:g_mapIndex,y:-1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:-1,bonus:null},{x:g_mapIndex,y:-1,bonus:null}],
            [{x:g_mapIndex,y:-1,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:-1,bonus:null}],
            [{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null}],
            [{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null}],
            [{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null}],
            [{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null}],
            [{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null}],
            [{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null}],
            [{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null}],
            [{x:g_mapIndex,y:-1,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:1,bonus:null},{x:g_mapIndex,y:-1,bonus:null}],
            [{x:g_mapIndex,y:-1,bonus:null},{x:g_mapIndex,y:-1,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:0,bonus:null},{x:g_mapIndex,y:-1,bonus:null},{x:g_mapIndex,y:-1,bonus:null}]
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
