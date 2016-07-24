CELL_WIDTH = 40;
CELL_HEIGHT = 36;

CANVAS_MARGIN_TOP_PX = 68;
CANVAS_MARGIN_LEFT_PX = 20;

KEYCODE_ENTER = 13;

var g_ctx = null;
var g_roomName = getCookie("room_name");

var startRoom = document.getElementById("roomStart");
var inputSendChatMessage = document.getElementById("chatInputMessage");

function setUpGame()
{
    var onPlayerModelsClick = function()
    {
        for (var i = 0; i < playerModels.length; i++)
        {
            if (playerModels[i] != this)
            {
                playerModels[i].style.display = "none";
            }
        }
        g_socket.emit("playerChoosedColor", this.getAttribute("data-color"));
    };

    var playerModels = document.getElementsByClassName("player_model");

    for (var i = 0; i < playerModels.length; i++)
    {
        playerModels[i].addEventListener("click", onPlayerModelsClick);
    }
    var onMapPreviewsClick = function()
    {
        g_mapIndex = this.getAttribute("data-index");
        g_socket.emit("setMapIndex", g_mapIndex);
    };

    var mapPreviews = document.getElementsByClassName("previews");

    for (var i = 0; i < mapPreviews.length; i++)
    {
        mapPreviews[i].addEventListener("click", onMapPreviewsClick);
    }

    var exitRoom = document.getElementById("roomExit");
    exitRoom.addEventListener("click", leaveRoom);

    var btnLogout = document.getElementById("logout");
    btnLogout.addEventListener("click", leaveRoom);

    startRoom.addEventListener("click", function() { g_socket.emit("startRoom"); });

    inputSendChatMessage.addEventListener("keypress", function(event)
    {
        if (event.keyCode == KEYCODE_ENTER && this.value !== "")
        {
            var message = removeExtraSpaces(this.value);
            if (message != " ")
            {
                g_socket.emit("sendMessage", message);
            }
            this.value = "";
        }
    });

    function removeExtraSpaces(value)
    {
        return value.replace(/\s+/g,' ');
    }
}

function leaveRoom()
{
    deleteCookie("room_name");
    deleteCookie("room_owner");
    location.reload();
}

function initGame()
{
    var canvas = document.getElementById("canvas");
    g_ctx = canvas.getContext("2d");
    var baseImage = new Image();
    baseImage.src = "img/game/map/field" + g_mapIndex + ".png";
    var spriteMapImage = new Image();
    spriteMapImage.src = SPRITE_MAP_URL;
    var spriteBonusImage = new Image();
    spriteBonusImage.src = SPRITE_BONUS_URL;
    draw(baseImage, spriteMapImage, spriteBonusImage);
}

function draw(baseImage, spriteMapImage, spriteBonusImage, spriteBombImage)
{
    drawBase(baseImage);
    drawMap(spriteMapImage);
    drawBonuses(spriteBonusImage);
    drawBombs();
    drawFlames();
    drawPlayers();
    window.requestAnimationFrame(function()
    {
        draw(baseImage, spriteMapImage, spriteBonusImage, spriteBombImage);
    });
}

initSocket();
setUpGame();
