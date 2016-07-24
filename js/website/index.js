KEYCODE_ENTER = 13;

initSocket();
var inputRoomName = document.getElementById("roomName");
var inputRoomPassword = document.getElementById("roomPassword");
var inputPlayerCount = document.getElementById("playerCount");
var btnCreateNewRoom = document.getElementById("btnCreateNewRoom");

btnCreateNewRoom.addEventListener("click", createNewRoom);

inputRoomName.addEventListener("keypress", function(event)
{
    if (event.keyCode == KEYCODE_ENTER)
    {
        createNewRoom();
    }
});

inputRoomPassword.addEventListener("keypress", function(event)
{
    if (event.keyCode == KEYCODE_ENTER)
    {
        createNewRoom();
    }
});

inputPlayerCount.addEventListener("keypress", function(event)
{
    if (event.keyCode == KEYCODE_ENTER)
    {
        createNewRoom();
    }
});

function createNewRoom()
{
    var roomName = inputRoomName.value;
    var password = inputRoomPassword.value;
    var playerCount = Math.ceil(inputPlayerCount.value);
    if (roomName !== "" && playerCount >= 1 && playerCount <= 4)
    {
        g_socket.emit("createNewRoom", roomName, g_socket.id, password, playerCount);
    }
}

function onGameRoomClick()
{
    var roomName = this.getAttribute("data-room_name");
    g_socket.emit("enterGameRoom", roomName, g_socket.id);
}
