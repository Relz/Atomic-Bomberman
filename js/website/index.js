
function init()
{
    initSocket();
    var inputRoomName = document.getElementById("roomName");
    var inputRoomPassword = document.getElementById("roomPassword");
    var btnCreateNewRoom = document.getElementById("btnCreateNewRoom");
    btnCreateNewRoom.addEventListener("click", function()
    {
        $.ajax({
            type: "POST",
            url: "php/add_game_room.php",
            data: "room_name=" + inputRoomName.value + "&room_password=" + inputRoomPassword.value,
            success: function(data)
            {
                var error = false;
                switch (data)
                {
                    case "error 0":
                        error = true;
                        break;
                    case "error 1":
                        error = true;
                        break;
                }
                if (!error)
                {
                    g_socket.emit("createNewRoom", data);
                    location.reload();
                }
            }
        });
    }, true);
}

init();
