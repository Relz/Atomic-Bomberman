exports.processWebsite = function(io)
{
    MAX_PLAYERS_COUNT = 4;

    var rooms = [];

    io.on("connection", function(socket)
    {
        io.emit("getRooms", socket.client.conn.id, rooms);

        socket.on("enterGameRoom", function(id, roomName)
        {
            for (var i = 0; i < rooms.length; i++)
            {
                if (rooms[i].roomName == roomName)
                {
                    if (rooms[i].playerCount != rooms[i].maxPlayerCount)
                    {
                        rooms[i].playerCount++;
                        io.emit("enterGameRoom", roomName, id);
                    }
                    else
                    {
                        io.emit("gameRoomIsFull", roomName, id);
                    }
                    break;
                }
            }
        });

        socket.on("createNewRoom", function(id, roomName, password, maxPlayerCount)
        {
            if (roomName !== "")
            {
                var roomNameFound = false;
                for (var i = 0; i < rooms.length; i++)
                {
                    if (rooms[i].roomName == roomName)
                    {
                        roomNameFound = true;
                    }
                }
                if (!roomNameFound)
                {
                    if (maxPlayerCount <= MAX_PLAYERS_COUNT)
                    {
                        io.emit("createNewRoom", id, roomName, 1, maxPlayerCount);
                        rooms.push({roomName: roomName, playerCount: 1, maxPlayerCount: maxPlayerCount});
                    }
                }
                else
                {
                    io.emit("roomNameAlreadyExists", id, roomName);
                }
            }
        });

        socket.on("playerLeftRoom", function(roomName)
        {
            for (var i = 0; i < rooms.length; i++)
            {
                if (rooms[i].roomName == roomName)
                {
                    if (rooms[i].playerCount == 1)
                    {
                        rooms.splice(i, 1);
                        io.emit("removeRoom", roomName);
                    }
                    else
                    {
                        rooms[i].playerCount--;
                        io.emit("playerLeftRoom", roomName);
                    }
                    break;
                }
            }
        });
    });
};
