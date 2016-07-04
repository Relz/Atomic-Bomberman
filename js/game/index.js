CELL_WIDTH = 40;
CELL_HEIGHT = 36;

CANVAS_MARGIN_TOP_PX = 68;
CANVAS_MARGIN_LEFT_PX = 20;

KEYCODE_ENTER = 13;

var g_ctx = null;
var g_myColor = null;
var g_myRoomName = getCookie("room_name");
var g_myPlayerName = getCookie("player_name");

function setUpGame()
{
    var onPlayerModelsClick = function()
    {
        g_myColor = this.getAttribute("data-color");
        for (var i = 0; i < playerModels.length; i++)
        {
            if (playerModels[i] != this)
            {
                playerModels[i].style.display = "none";
            }
        }

    };

    var playerModels = document.getElementsByClassName("player_model");

    for (var i = 0; i < playerModels.length; i++)
    {
        playerModels[i].addEventListener('click', onPlayerModelsClick);
    }
    if (getCookie("room_owner") == "true")
    {
        var onMapPreviewsClick = function()
        {
            g_mapIndex = this.getAttribute("data-index");
            g_gameSocket.emit("setMapIndex", g_myRoomName, g_mapIndex);
        };

        var mapPreviews = document.getElementsByClassName("previews");

        for (var i = 0; i < mapPreviews.length; i++)
        {
            mapPreviews[i].addEventListener('click', onMapPreviewsClick);
        }
    }
    g_gameSocket.emit("getMapIndex", g_myRoomName);

    var exitRoom = document.getElementById("roomExit");
    exitRoom.addEventListener("click", function()
    {
        $.ajax({
            url: "php/exit_game_room.php",
            success: function(data)
            {
                var error = false;
                switch (data)
                {
                    case "error 0":
                        error = true;
                        break;
                }
                if (!error)
                {
                    if (data != "")
                    {
                        g_websiteSocket.emit("removeRoom", data);
                    }
                    g_gameSocket.emit("playerDisconnect", g_myRoomName, g_playerId);
                    location.reload();
                }
            }
        });
    });

    var startRoom = document.getElementById("roomStart");

    if (startRoom !== null)
    {
        startRoom.addEventListener("click", function()
        {
            if (g_mapIndex !== null && g_myColor !== null)
            {
                this.style.display = "none";
                g_gameSocket.emit("startRoom", g_myRoomName);
            }
            else
            {

            }
        });
    }

    var inputSendChatMessage = document.getElementById("chatInputMessage");
    inputSendChatMessage.addEventListener('keypress', function()
    {
        if (event.keyCode == KEYCODE_ENTER && this.value !== "")
        {
            g_gameSocket.emit("sendMessage", g_myRoomName, g_myPlayerName, this.value);
            this.value = "";
        }
    });
}

function initGame()
{
    var canvas = document.getElementById("canvas");
    g_ctx = canvas.getContext("2d");
    var baseImage = new Image();
    baseImage.src = "img/game/map/field" + g_mapIndex + ".png";
    var spriteMapImage = new Image();
    spriteMapImage.src = SPRITE_MAP;
    g_gameSocket.emit("playerChoosedColor", g_myRoomName, g_playerId, g_myColor);
    play(baseImage, spriteMapImage);
}

function play(baseImage, spriteMapImage)
{
    drawBase(baseImage);
    drawMap(spriteMapImage);
    drawBonuses();
    drawBombs();
    drawFlames();
    drawPlayers();
    window.requestAnimationFrame(function()
    {
        play(baseImage, spriteMapImage);
    });
}

initGameSocket();
initWebsiteSocket();
setUpGame();
