var g_websiteSocket = null;

function initWebsiteSocket()
{
    g_websiteSocket = io.connect(":3001");
    g_websiteSocket.emit("playerConnect");

    var ul = document.getElementById("room_list");
    var roomsEmptyText = document.getElementById("roomsEmptyText");

    g_websiteSocket.on("playerConnect", function()
    {

    });

    g_websiteSocket.on("createNewRoom", function(roomName)
    {
        roomsEmptyText.className = "rooms_empty_hidden";
        var li = document.createElement("li");
        li.className = "room";
        li.appendChild(document.createTextNode(roomName));
        li.addEventListener('click', onGameRoomClick);
        ul.appendChild(li);
    });

    g_websiteSocket.on("removeRoom", function(roomName)
    {
        var collectionLi = ul.getElementsByTagName("li");
        for (var i = 0; i < collectionLi.length; i++)
        {
            if (collectionLi[i].innerHTML == roomName)
            {
                ul.removeChild(collectionLi[i]);
            }
        }
        if (collectionLi.length === 0)
        {
            roomsEmptyText.className = "rooms_empty";
        }
    });
}
