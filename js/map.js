
var g_map = [
    [{x:0,y:-1},{x:0,y:-1},{x:0,y:-1},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:-1},{x:0,y:1},{x:0,y:-1},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0},{x:0,y:-1},{x:0,y:-1},{x:0,y:-1},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:1},{x:0,y:-1},{x:0,y:1},{x:0,y:-1},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:-1},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:-1},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:-1},{x:0,y:-1},{x:0,y:-1},{x:0,y:-1},{x:0,y:-1},{x:0,y:-1},{x:0,y:-1},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:-1},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0}],
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:-1},{x:0,y:-1},{x:0,y:-1},{x:0,y:-1},{x:0,y:-1}],
    [{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:0},{x:0,y:1},{x:0,y:-1}],
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:-1},{x:0,y:-1}]
];

function _drawBase()
{
    var baseImage = new Image();
    baseImage.src = "img/field0.png";
    baseImage.onload = function()
    {
        g_ctx.drawImage(baseImage, 0, 0);
    };
}

function _drawMap()
{
    var spriteMapImage = new Image();
    spriteMapImage.src = "img/sprite_map.png";

    spriteMapImage.onload = function() 
    {
        for (var j = 0; j < CELLS_COUNT_HORIZONTAL; j ++)
        {
            for (var i = 0; i < CELLS_COUNT_VERTICAL; i ++)
            {
                var xWhereToStartClipping = g_map[i][j].x * CELL_WIDTH;
                var yWhereToStartClipping = g_map[i][j].y * CELL_HEIGHT;
                var clippedImageWidth = CELL_WIDTH;
                var clippedImageHeight = CELL_HEIGHT;
                var xWhereToPlaceImage = j * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX;
                var yWhereToPlaceImage = i * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX;
                var imageWidth = CELL_WIDTH;
                var imageHeight = CELL_HEIGHT;

                g_ctx.drawImage(spriteMapImage,
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