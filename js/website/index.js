
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

function setCookie(name, value, options)
{
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires)
    {
        var date = new Date();
        date.setTime(date.getTime() + expires * 1000);
        expires = options.expires = date;
    }
    if (expires && expires.toUTCString)
    {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options)
    {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true)
        {
          updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

init();
