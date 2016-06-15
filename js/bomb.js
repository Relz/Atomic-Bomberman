function _drawBombs()
{
    for (var i = 0; i < g_bombs.length; i++)
    {
        g_ctx.drawImage(g_bombImage, g_bombs[i].x * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX, g_bombs[i].y * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX);
    }
}