CELL_WIDTH = 40;
CELL_HEIGHT = 36;

CANVAS_MARGIN_TOP_PX = 68;
CANVAS_MARGIN_LEFT_PX = 20;

var g_ctx = null;
var g_myColor = null;

function setUpGame()
{
    var onPlayerModelsClick = function()
    {
        g_myColor = this.getAttribute("data-color");
        if (g_mapIndex != null)
        {
            initGame();
        }
    };

    var playerModels = document.getElementsByClassName("player_model");

    for (var i = 0; i < playerModels.length; i++)
    {
        playerModels[i].addEventListener('click', onPlayerModelsClick, false);
    }

    var onMapPreviewsClick = function()
    {
        g_mapIndex = this.getAttribute("data-index");
        var chooseMapTable = document.getElementById("choose_map");
        chooseMapTable.style.display = "none";
        if (g_myColor != null)
        {
            initGame();
        }
    };

    var mapPreviews = document.getElementsByClassName("previews");

    for (var i = 0; i < mapPreviews.length; i++)
    {
        mapPreviews[i].addEventListener('click', onMapPreviewsClick, false);
    }
}

function initGame()
{
    initSocket();
    var canvas = document.getElementById("canvas");
    g_ctx = canvas.getContext("2d");
    var baseImage = new Image();
    var spriteMapImage = new Image();
    g_players.push(new Player("red", 0, 0));
    g_players.push(new Player("green", CELLS_COUNT_HORIZONTAL - 1, 0));
    g_players.push(new Player("blue", 0, CELLS_COUNT_VERTICAL - 1));
    g_players.push(new Player("black", CELLS_COUNT_HORIZONTAL - 1, CELLS_COUNT_VERTICAL - 1));
    //g_players[g_playerId].color = g_myColor;
    play(baseImage, spriteMapImage);
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

setUpGame();
