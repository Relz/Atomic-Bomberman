CELLS_COUNT_HORIZONTAL = 15;
CELLS_COUNT_VERTICAL = 11;

var g_map = [
    [{x:0,y:-1,bonus:null},{x:0,y:-1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:-1,bonus:null},{x:0,y:-1,bonus:null}],
    [{x:0,y:-1,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:-1,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:-1,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:-1,bonus:null}],
    [{x:0,y:-1,bonus:null},{x:0,y:-1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:-1,bonus:null},{x:0,y:-1,bonus:null}]
];

SPRITE_MAP = "img/game/sprite_map.png";

function drawBase(baseImage)
{
    baseImage.src = "img/game/field0.png"; // В дальнейшем здесь возврат пути до базового файла по настройке пользователя
    baseImage.onload = function()
    {
        g_ctx.drawImage(baseImage, 0, 0);
    };
}

function drawMap(spriteMapImage)
{
    spriteMapImage.src = SPRITE_MAP;
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

                g_ctx.drawImage(
                    spriteMapImage,
                    xWhereToStartClipping,
                    yWhereToStartClipping,
                    clippedImageWidth,
                    clippedImageHeight,
                    xWhereToPlaceImage,
                    yWhereToPlaceImage,
                    imageWidth,
                    imageHeight
                );
            }
        }
    };
}
