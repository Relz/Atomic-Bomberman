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

var FPS = 1000 / 60;

g_ctx = null;

g_upKeyDown = false;
g_rightKeyDown = false;
g_downKeyDown = false;
g_leftKeyDown = false;

var g_player = new Player("green", 0, 0);

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

    setInterval(play, FPS);
}

function play()
{
    draw();
    update();
}

function draw()
{
    _drawBase();
    _drawMap();
    g_player.draw();
}

function update()
{
    if (g_upKeyDown)
    {
        g_player.direction = PLAYER_DIRECTION_UP;
        console.log(g_player.y);
        console.log(g_player.matrixY * CELL_HEIGHT);
        if ((g_player.matrixY !== 0 && (map[g_player.matrixY - 1][g_player.matrixX].y === -1)) || (g_player.y > g_player.matrixY * CELL_HEIGHT))
        {
            g_player.y-=2;
            if (g_player.y < (g_player.matrixY - 0.5) * CELL_HEIGHT)
            {
                g_player.matrixY--;
            }
        }
    }
    else if (g_rightKeyDown)
    {
        g_player.direction = PLAYER_DIRECTION_RIGHT;
        console.log(g_player.x);
        console.log(g_player.matrixX * CELL_WIDTH + CELL_WIDTH);
        if ((g_player.matrixX + 1 < CELLS_COUNT_HORIZONTAL && (map[g_player.matrixY][g_player.matrixX + 1].y == -1)) || (g_player.x < g_player.matrixX * CELL_WIDTH))
        {
            g_player.x+=2;
            if (g_player.x > (g_player.matrixX + 0.5) * CELL_WIDTH)
            {
                g_player.matrixX++;
            }
        }
    }
    else if (g_downKeyDown)
    {
        g_player.direction = PLAYER_DIRECTION_DOWN;
        if ((g_player.matrixY + 1 < CELLS_COUNT_VERTICAL && (map[g_player.matrixY + 1][g_player.matrixX].y == -1)) || (g_player.y < g_player.matrixY * CELL_HEIGHT))
        {
            g_player.y+=2;
            if (g_player.y > (g_player.matrixY + 0.5) * CELL_HEIGHT)
            {
                g_player.matrixY++;
            }
        }
    }
    else if (g_leftKeyDown)
    {
        g_player.direction = PLAYER_DIRECTION_LEFT;
        console.log(g_player.x);
        console.log(g_player.matrixX * CELL_WIDTH);
        if (g_player.matrixX !== 0 && (map[g_player.matrixY][g_player.matrixX - 1].y === -1) || (g_player.x > g_player.matrixX * CELL_WIDTH))
        {
            g_player.x-=2;
            if (g_player.x < (g_player.matrixX - 0.5) * CELL_WIDTH)
            {
                g_player.matrixX--;
            }
        }
    }
}

function _drawBase()
{
    baseImage = new Image();
    baseImage.src = "img/field0.png";
    baseImage.onload = function()
    {
        g_ctx.drawImage(baseImage, 0, 0);
    };
}

function _drawMap()
{
    pic = new Image();
    pic.src = "img/sprite_map.png";

    map =
    [[{x:0,y:-1},{x:0,y:-1},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:-1},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:-1}],
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:-1},{x:0,y:-1}]];

    pic.onload = function() {
        for (var j = 0; j < CELLS_COUNT_HORIZONTAL; j ++)
        {
            for (var i = 0; i < CELLS_COUNT_VERTICAL; i ++)
            {
                var xWhereToStartClipping = map[i][j].x * CELL_WIDTH;
                var yWhereToStartClipping = map[i][j].y * CELL_HEIGHT;
                var clippedImageWidth = CELL_WIDTH;
                var clippedImageHeight = CELL_HEIGHT;
                var xWhereToPlaceImage = j * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX;
                var yWhereToPlaceImage = i * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX;
                var imageWidth = CELL_WIDTH;
                var imageHeight = CELL_HEIGHT;

                g_ctx.drawImage(pic,
                  xWhereToStartClipping,
                  yWhereToStartClipping,
                  clippedImageWidth,
                  clippedImageHeight,
                  xWhereToPlaceImage,
                  yWhereToPlaceImage,
                  imageWidth,
                  imageHeight);
            }
        }
    };
}

function handleKey(event, state)
{
    switch (event.keyCode)
    {
        case 37: case 65: // left
            g_leftKeyDown = state;
        break;

        case 38: case 87: // up
            g_upKeyDown = state;
        break;

        case 39: case 68: // right
            g_rightKeyDown = state;
        break;

        case 40: case 83: // down
            g_downKeyDown = state;
        break;

        case 16: // shift
            console.log('bomb');
        break;

        default: return;
    }
}

function Player(color, matrixX, matrixY)
{
    this.color = color;
    this.matrixX = matrixX;
    this.matrixY = matrixY;
    this.x = matrixX * CELL_WIDTH;
    this.y = matrixY * CELL_HEIGHT;
    this.direction = PLAYER_DIRECTION_DOWN;
    this.draw = function() {
        var self = this;
        playerImage = new Image();
        switch(self.direction){
            case PLAYER_DIRECTION_UP:
                playerImage.src = "img/players/stand_top.png";
            break;
            case PLAYER_DIRECTION_RIGHT:
                playerImage.src = "img/players/stand_right.png";
            break;
            case PLAYER_DIRECTION_DOWN:
                playerImage.src = "img/players/stand_bottom.png";
            break;
            case PLAYER_DIRECTION_LEFT:
                playerImage.src = "img/players/stand_left.png";
            break;
        }
        playerImage.onload = function()
        {
            g_ctx.drawImage(playerImage, self.x + CANVAS_MARGIN_LEFT_PX, self.y + CANVAS_MARGIN_TOP_PX - playerImage.height / 2);
        };
    };
}

init();
