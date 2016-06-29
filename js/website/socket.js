var g_socket = null;

function initSocket()
{
    g_socket = io.connect(":3001");
    g_socket.emit("playerConnect");

    var ul = document.getElementById("room_list");
    var roomsEmptyText = document.getElementById("roomsEmptyText");

    g_socket.on("playerConnect", function()
    {

    });
    g_socket.on("createNewRoom", function(roomName)
    {
        roomsEmptyText.className = "rooms_empty_hidden";
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(roomName));
        ul.appendChild(li);
    });
}
