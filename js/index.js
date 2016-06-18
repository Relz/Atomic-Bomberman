CELL_WIDTH = 40;
CELL_HEIGHT = 36;

CELLS_COUNT_HORIZONTAL = 15;
CELLS_COUNT_VERTICAL = 11;

CANVAS_MARGIN_TOP_PX = 68;
CANVAS_MARGIN_LEFT_PX = 20;

PLAYER_DIRECTION_UP = 0;
PLAYER_DIRECTION_RIGHT = 1;
PLAYER_DIRECTION_DOWN = 2;
PLAYER_DIRECTION_LEFT = 3;

PLAYER_SPEED = 2;

g_ctx = null;

g_upKeyDown = false;
g_rightKeyDown = false;
g_downKeyDown = false;
g_leftKeyDown = false;

var g_bombs = [];

var g_player = new Player("green", 0, 0);

var g_bombImage;
var g_baseImage;

function init()
{
    var canvas = document.getElementById("canvas");
    g_ctx = canvas.getContext('2d');
    var lastDownTarget;
    window.addEventListener('keydown', function() {
        handleKey(event, true);
    }, true);
    window.addEventListener('keyup', function() {
        handleKey(event, false);
    }, true);
    
    g_bombImage = new Image();
    g_baseImage = new Image();
    
    play();
}

function play()
{
    draw();
    update();
    window.requestAnimationFrame(play);
}

function draw()
{
    _drawBase();
    _drawMap();
    _drawBombs();
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
