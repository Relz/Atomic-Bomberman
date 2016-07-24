FLAME_COOLDOWN = 1;
FLAME_ANIMATION_COEF = 5;
FLAME_LINE_WIDTH = 10;
FLAME_COLOR = "red";

var g_flames = [];

function Flame(upperWallPos, rightWallPos, lowerWallPos, leftWallPos)
{
    var horizontalFlameFromX = leftWallPos.x * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX + CELL_WIDTH / 2;
    var horizontalFlameToX = rightWallPos.x * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX + CELL_WIDTH / 2;
    var horizontalFlameFromY = leftWallPos.y * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX + CELL_HEIGHT / 2;
    var horizontalFlameToY = rightWallPos.y * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX + CELL_HEIGHT / 2;
    var verticalFlameFromX = upperWallPos.x * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX + CELL_WIDTH / 2;
    var verticalFlameToX = lowerWallPos.x * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX + CELL_WIDTH / 2;
    var verticalFlameFromY = upperWallPos.y * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX + CELL_HEIGHT / 2;
    var verticalFlameToY = lowerWallPos.y * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX + CELL_HEIGHT / 2;
    var cooldown = FLAME_COOLDOWN;
    var currTime = FLAME_COOLDOWN;
    var lineWidth = FLAME_LINE_WIDTH;
    animateFlame();
    this.draw = function()
    {
        g_ctx.lineWidth = lineWidth;
        g_ctx.lineCap = "round";
        g_ctx.strokeStyle = FLAME_COLOR;
        g_ctx.beginPath();
        g_ctx.moveTo(horizontalFlameFromX, horizontalFlameFromY);
        g_ctx.lineTo(horizontalFlameToX, horizontalFlameToY);
        g_ctx.moveTo(verticalFlameFromX, verticalFlameFromY);
        g_ctx.lineTo(verticalFlameToX, verticalFlameToY);
        g_ctx.stroke();
    };

    function animateFlame()
    {
        mySetInterval(function(animationFrame)
        {
            currTime = (currTime > 0) ? currTime - 0.05 : cooldown;
            lineWidth = (lineWidth < FLAME_LINE_WIDTH ? lineWidth + FLAME_ANIMATION_COEF : lineWidth - FLAME_ANIMATION_COEF);
            if (currTime == cooldown)
            {
                g_flames.pop();
                cancelAnimationFrame(animationFrame);
            }
        }, 50);
    }
}

function drawFlames()
{
    for (var i = 0; i < g_flames.length; i++)
    {
        g_flames[i].draw();
    }
}
