CELL_WIDTH = 40;
CELL_HEIGHT = 36;

CANVAS_MARGIN_TOP_PX = 68;
CANVAS_MARGIN_LEFT_PX = 20;

var g_ctx = null;

var g_upKeyDown = false;
var g_rightKeyDown = false;
var g_downKeyDown = false;
var g_leftKeyDown = false;

var g_player = new Player("green", 0, 0);

function init()
{
    var canvas = document.getElementById("canvas");
    g_ctx = canvas.getContext('2d');
    var baseImage = new Image();
    var spriteMapImage = new Image();
    window.addEventListener("keydown", keyDownEventListener, true);
    window.addEventListener("keyup", keyUpEventListener, true);
    generateBonuses();
    play(baseImage, spriteMapImage);
}

function play(baseImage, spriteMapImage)
{
    draw(baseImage, spriteMapImage);
    update();
    window.requestAnimationFrame(
    function()
    {
        play(baseImage, spriteMapImage);
    });
}

function draw(baseImage, spriteMapImage)
{
    _drawBase(baseImage);
    _drawMap(spriteMapImage);
    _drawBonuses();
    _drawBombs();
    _drawFlames();
    g_player.draw();
}

function update()
{
    if (g_upKeyDown)
    {
        g_player.direction = PLAYER_DIRECTION_UP;
        if ((g_player.posY !== 0 && (g_map[g_player.posY - 1][g_player.posX].y === -1)) ||
            (g_player.canvasY > g_player.posY * CELL_HEIGHT))
        {
            g_player.canvasY -= PLAYER_SPEED;
            if (g_player.canvasY < (g_player.posY - 0.5) * CELL_HEIGHT)
            {
                g_player.posY--;
            }
        }
    }
    else if (g_rightKeyDown)
    {
        g_player.direction = PLAYER_DIRECTION_RIGHT;
        if ((g_player.posX + 1 < CELLS_COUNT_HORIZONTAL && (g_map[g_player.posY][g_player.posX + 1].y == -1)) ||
            (g_player.canvasX  < g_player.posX * CELL_WIDTH))
        {
            g_player.canvasX += PLAYER_SPEED;
            if (g_player.canvasX > (g_player.posX + 0.5) * CELL_WIDTH)
            {
                g_player.posX++;
            }
        }
    }
    else if (g_downKeyDown)
    {
        g_player.direction = PLAYER_DIRECTION_DOWN;
        if ((g_player.posY + 1 < CELLS_COUNT_VERTICAL && (g_map[g_player.posY + 1][g_player.posX].y == -1)) ||
            (g_player.canvasY < g_player.posY * CELL_HEIGHT))
        {
            g_player.canvasY += PLAYER_SPEED;
            if (g_player.canvasY > (g_player.posY + 0.5) * CELL_HEIGHT)
            {
                g_player.posY++;
            }
        }
    }
    else if (g_leftKeyDown)
    {
        g_player.direction = PLAYER_DIRECTION_LEFT;
        if (g_player.posX !== 0 && (g_map[g_player.posY][g_player.posX - 1].y === -1) ||
            (g_player.canvasX > g_player.posX * CELL_WIDTH))
        {
            g_player.canvasX -= PLAYER_SPEED;
            if (g_player.canvasX < (g_player.posX - 0.5) * CELL_WIDTH)
            {
                g_player.posX--;
            }
        }
    }
}

init();
