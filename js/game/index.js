CELL_WIDTH = 40;
CELL_HEIGHT = 36;

CANVAS_MARGIN_TOP_PX = 68;
CANVAS_MARGIN_LEFT_PX = 20;

var g_ctx = null;
var g_myColor = null;
var myRoomName = null;

function setUpGame()
{
    var onPlayerModelsClick = function()
    {
        g_myColor = this.getAttribute("data-color");
    };

    var playerModels = document.getElementsByClassName("player_model");

    for (var i = 0; i < playerModels.length; i++)
    {
        playerModels[i].addEventListener('click', onPlayerModelsClick);
    }

    var onMapPreviewsClick = function()
    {
        g_mapIndex = this.getAttribute("data-index");
        var chooseMapTable = document.getElementById("choose_map");
        chooseMapTable.style.display = "none";
        g_gameSocket.emit("setMapIndex", g_mapIndex);
    };

    var mapPreviews = document.getElementsByClassName("previews");

    for (var i = 0; i < mapPreviews.length; i++)
    {
        mapPreviews[i].addEventListener('click', onMapPreviewsClick);
    }

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
                    g_gameSocket.emit("playerDisconnect", myRoomName, g_playerId);
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
                g_gameSocket.emit("startRoom", myRoomName);
            }
        });
    }
}

function initGame(playerCount)
{
    var canvas = document.getElementById("canvas");
    g_ctx = canvas.getContext("2d");
    var baseImage = new Image();
    var spriteMapImage = new Image();
    for (var i = 0; i < playerCount; i++)
    {
        var startPlayerPos = getStartPlayerPos(i);
        g_players.push(new Player(PLAYER_COLOR_DEFAULT, startPlayerPos.x, startPlayerPos.y));
    }
    g_gameSocket.emit("playerChoosedColor", myRoomName, g_playerId, g_myColor);
    play(baseImage, spriteMapImage);
}

function getStartPlayerPos(playerId)
{
    var result = {x: 0, y: 0};
    switch (playerId)
    {
        case 0:
            result = {x: 0, y: 0};
            break;
        case 1:
            result = {x: CELLS_COUNT_HORIZONTAL - 1, y: 0};
            break;
        case 2:
            result = {x: 0, y: CELLS_COUNT_VERTICAL - 1};
            break;
        case 3:
            result = {x: CELLS_COUNT_HORIZONTAL - 1, y: CELLS_COUNT_VERTICAL - 1};
            break;
        default:
            result.x = 0;
            break;
    }
    return result;
}

function play(baseImage, spriteMapImage)
{
    draw(baseImage, spriteMapImage);
    window.requestAnimationFrame(function()
    {
        play(baseImage, spriteMapImage);
    });
}

function draw(baseImage, spriteMapImage)
{
    drawBase(baseImage);
    drawMap(spriteMapImage);
    drawBonuses();
    drawBombs();
    drawFlames();
    drawPlayers();
}

initGameSocket();
initWebsiteSocket();
setUpGame();
