var g_websiteSocket = null;

function initWebsiteSocket()
{
    g_websiteSocket = io.connect(":3001");

    var roomList = document.getElementById("room_list");
    var roomsEmptyText = document.getElementById("roomsEmptyText");

    g_websiteSocket.on("getRooms", function(id, rooms)
    {
        if (id == g_websiteSocket.id)
        {
            if (rooms.length > 0)
            {
                roomsEmptyText.className = "rooms_empty_hidden";
            }
            for (var i = 0; i < rooms.length; i++)
            {
                addGameRoomToList(rooms[i].roomName, rooms[i].playerCount, rooms[i].maxPlayerCount);
            }
        }
    });

    g_websiteSocket.on("createNewRoom", function(id, roomName, playerCount, maxPlayerCount)
    {
        if (g_websiteSocket.id == id)
        {
            setCookie("room_name", roomName);
            setCookie("room_owner", "true");
            location.reload();
        }
        else
        {
            roomsEmptyText.className = "rooms_empty_hidden";
            addGameRoomToList(roomName, playerCount, maxPlayerCount);
        }
    });

    g_websiteSocket.on("roomNameAlreadyExists", function(id, roomName)
    {
        if (g_websiteSocket.id == id)
        {
            alert("Game room '" + roomName + "' already exists!");
        }
    });

    g_websiteSocket.on("removeRoom", function(roomName)
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

    g_websiteSocket.on("gameRoomIsFull", function(roomName, id)
    {
        if (g_websiteSocket.id == id)
        {
            alert("Game room '" + roomName + "' is full!");
        }
    });

    g_websiteSocket.on("enterGameRoom", function(roomName, id)
    {
        if (g_websiteSocket.id == id)
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

    g_websiteSocket.on("playerLeftRoom", function(roomName)
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
