CELL_WIDTH = 40;
CELL_HEIGHT = 36;

CANVAS_MARGIN_TOP_PX = 68;
CANVAS_MARGIN_LEFT_PX = 20;

var g_ctx = null;
var g_playerId = null;

function init()
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

init();
