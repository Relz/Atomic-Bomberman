function Flame(upperWallPos, rightWallPos, lowerWallPos, leftWallPos)
{
    this.horizontalFlameFromX = leftWallPos.x * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX + CELL_WIDTH / 2;
    this.horizontalFlameToX = rightWallPos.x * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX + CELL_WIDTH / 2;
    this.horizontalFlameFromY = leftWallPos.y * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX + CELL_HEIGHT / 2;
    this.horizontalFlameToY = rightWallPos.y * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX + CELL_HEIGHT / 2;
    this.verticalFlameFromX = upperWallPos.x * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX + CELL_WIDTH / 2;
    this.verticalFlameToX = lowerWallPos.x * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX + CELL_WIDTH / 2;
    this.verticalFlameFromY = upperWallPos.y * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX + CELL_HEIGHT / 2;
    this.verticalFlameToY = lowerWallPos.y * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX + CELL_HEIGHT / 2;
    this.draw = function()
    {
        g_ctx.lineWidth = 10;
        g_ctx.strokeStyle = "red";
        g_ctx.beginPath();
        g_ctx.moveTo(this.horizontalFlameFromX, this.horizontalFlameFromY);
        g_ctx.lineTo(this.horizontalFlameToX, this.horizontalFlameToY);
        g_ctx.moveTo(this.verticalFlameFromX, this.verticalFlameFromY);
        g_ctx.lineTo(this.verticalFlameToX, this.verticalFlameToY);
        g_ctx.stroke();
    }
}

function _drawFlames()
{
    for (var i = 0; i < g_flames.length; i++)
    {
        g_flames[i].draw();
    }
}