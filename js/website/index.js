
function init()
{
    initWebsiteSocket();

    var inputRoomName = document.getElementById("roomName");
    var inputRoomPassword = document.getElementById("roomPassword");
    var inputPlayerCount = document.getElementById("playerCount");
    var btnCreateNewRoom = document.getElementById("btnCreateNewRoom");
    btnCreateNewRoom.addEventListener("click", function()
    {
        var roomName = inputRoomName.value;
        var password = inputRoomPassword.value;
        var playerCount = Math.ceil(inputPlayerCount.value);
        if (roomName !== "" && playerCount >= 1 && playerCount <= 4)
        {
            g_websiteSocket.emit("createNewRoom", g_websiteSocket.id, roomName, password, playerCount);
        }
    });
}

function onGameRoomClick()
{
    var roomName = this.getAttribute("data-room_name");
    g_websiteSocket.emit("enterGameRoom", g_websiteSocket.id, roomName);
}

init();
