var g_socket = null;
function initSocket()
{
    g_socket = io.connect(":3000");

    var roomList = document.getElementById("room_list");
    var roomsEmptyText = document.getElementById("roomsEmptyText");

    g_socket.emit("getRooms");

    g_socket.on("getRooms", function(id, roomList)
    {
        if (id == g_socket.id)
        {
            for (var i = 0; i < roomList.length; i++)
            {
                if (roomList[i].playerCount != 0)
                {
                    addGameRoomToList(roomList[i].roomName, roomList[i].playerCount, roomList[i].maxPlayerCount);
                    roomsEmptyText.className = "rooms_empty hidden";
                }
            }
        }
    });

    g_socket.on("createNewRoom", function(id, roomName)
    {
        if (g_socket.id == id)
        {
            setCookie("room_name", roomName);
            setCookie("room_owner", "true");
            location.reload();
        }
    });

    g_socket.on("newRoomCreated", function(roomName, playerCount, maxPlayerCount)
    {
        roomsEmptyText.className = "rooms_empty hidden";
        addGameRoomToList(roomName, playerCount, maxPlayerCount);
    });

    g_socket.on("roomNameAlreadyExists", function(id, roomName)
    {
        if (g_socket.id == id)
        {
            alert("Game room '" + roomName + "' already exists!");
        }
    });

    g_socket.on("removeRoom", function(roomName)
    {
        var roomNames = roomList.getElementsByClassName("room_name");
        for (var i = 0; i < roomNames.length; i++)
        {
            if (roomNames[i].innerHTML == roomName)
            {
                roomList.removeChild(roomNames[i].parentElement);
            }
        }
        if (roomNames.length === 0)
        {
            roomsEmptyText.className = "rooms_empty";
        }
    });

    g_socket.on("gameRoomIsFull", function(roomName, id)
    {
        if (g_socket.id == id)
        {
            alert("Game room '" + roomName + "' is full!");
        }
    });

    g_socket.on("gameRoomNotFound", function(roomName, id)
    {
        if (g_socket.id == id)
        {
            alert("Game room '" + roomName + "' not found!");
        }
    });

    g_socket.on("gameRoomAlreadyStarted", function(roomName, id)
    {
        if (g_socket.id == id)
        {
            alert("Game room '" + roomName + "' already started!");
        }
    });

    g_socket.on("maxPlayerCountOverflow", function(id, maxPlayerCount)
    {
        if (g_socket.id == id)
        {
            alert("Error: player limit in room is " + maxPlayerCount +"!");
        }
    });

    g_socket.on("enterGameRoom", function(roomName, id)
    {
        if (g_socket.id == id)
        {
            setCookie("room_name", roomName);
            setCookie("room_owner", "false");
            location.reload();
        }
        else
        {
            var rooms = roomList.getElementsByClassName("room");
            for (var i = 0; i < rooms.length; i++)
            {
                if (rooms[i].getAttribute("data-room_name") == roomName)
                {
                    var notFreeSpaces = rooms[i].getElementsByClassName("room_space free");
                    notFreeSpaces[0].className = "room_space not_free";
                }
            }
        }
    });

    g_socket.on("playerLeftRoom", function(roomName)
    {
        var rooms = roomList.getElementsByClassName("room");
        for (var i = 0; i < rooms.length; i++)
        {
            if (rooms[i].getAttribute("data-room_name") == roomName)
            {
                var notFreeSpaces = rooms[i].getElementsByClassName("room_space not_free");
                notFreeSpaces[notFreeSpaces.length - 1].className = "room_space free";
            }
        }
    });

    function addGameRoomToList(roomName, playerCount, maxPlayerCount)
    {
        var li = document.createElement("li");
        li.className = "room";
        li.setAttribute("data-room_name", roomName);

        var spanRoomName = document.createElement("span");
        spanRoomName.innerHTML = roomName;
        spanRoomName.className = "room_name";
        li.appendChild(spanRoomName);

        var blockRoomSpace = document.createElement("div");
        blockRoomSpace.className = "block_room_space";
        li.appendChild(blockRoomSpace);

        for (var j = 0; j < maxPlayerCount; j++)
        {
            var roomSpace = document.createElement("div");
            roomSpace.className = "room_space ";
            roomSpace.className += (j < playerCount) ? "not_free" : "free";
            blockRoomSpace.appendChild(roomSpace);
        }

        var clearBoth = document.createElement("div");
        clearBoth.className = "clearboth";
        li.appendChild(clearBoth);

        li.addEventListener("click", onGameRoomClick);
        roomList.appendChild(li);
    }
}
