
function init()
{
    initWebsiteSocket();

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
                    case "error 2":
                        error = true;
                        break;
                }
                if (!error)
                {
                    g_websiteSocket.emit("createNewRoom", data);
                    setCookie("room_name", inputRoomName.value);
                    location.reload();
                }
            }
        });
    });

    var gameRooms = document.getElementsByClassName("room");

    for (var i = 0; i < gameRooms.length; i++)
    {
        gameRooms[i].addEventListener('click', onGameRoomClick);
    }
}


function onGameRoomClick()
{
    var roomName = this.innerHTML;
    $.ajax({
        type: "POST",
        url: "php/enter_game_room.php",
        data: "room_name=" + roomName + "&room_password=",
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
                g_websiteSocket.emit("enterRoom", data);
                setCookie("room_name", roomName);
                location.reload();
            }
        }
    });
}

init();
