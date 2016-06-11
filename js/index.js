CELL_WIDTH = 40;
CELL_HEIGHT = 36;

CELLS_COUNT_HORIZONTAL = 15;
CELLS_COUNT_VERTICAL = 11;

CANVAS_MARGIN_TOP_PX = 68;
CANVAS_MARGIN_LEFT_PX = 20;

var FPS = 1000 / 60;

g_ctx = null;

var g_player = new Player("green", 0, 0);

function init()
{
    var canvas = document.getElementById("canvas");
    g_ctx = canvas.getContext('2d');
    var lastDownTarget;
    document.addEventListener('mousedown', function(event) {
        lastDownTarget = event.target;
    }, false);

    document.addEventListener('keydown', function(event) {
        if(lastDownTarget == canvas) {
            onKeyDown(event);
        }
    }, false);

    setInterval(play, FPS);
}

function play()
{
    draw(); //Рисуем объекты
    //update(); //Расчитываем координаты
}

function draw()
{
    _drawBase();
    _drawMap();
    g_player.draw();
    //drawScore();
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

function onKeyDown(event) {
    switch(event.keyCode) {
    case 37: case 65: // left
        g_player.x -= 2;
        console.log('left');
    break;

    case 38: case 87: case 32: // up
        g_player.y -= 2;
        console.log('top');
    break;

    case 39: case 68: // right
        g_player.x += 2;
        console.log('right');
    break;

    case 40: case 83: // down
        g_player.y += 2;
        console.log('down');
    break;

    case 16: // sprint
        console.log('bomb');
    break;

    default: return;
    }
}


function Player(color, x, y)
{
    this.color = color;
    this.x = x;
    this.y = y;
    this.draw = function() {
        var self = this;
        playerImage = new Image();
        playerImage.src = "img/players/stand_bottom.png";
        playerImage.onload = function()
        {
            g_ctx.drawImage(playerImage, self.x + CANVAS_MARGIN_LEFT_PX, self.y + CANVAS_MARGIN_TOP_PX - playerImage.height / 2);
        };
    };
}

init();
