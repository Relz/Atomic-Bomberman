FLAME_COOLDOWN = 1;
FLAME_ANIMATION_COEF = 5;
FLAME_LINE_WIDTH = 10;
FLAME_COLOR = "red";

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
    this.cooldown = FLAME_COOLDOWN;
    this.currTime = FLAME_COOLDOWN;
    this.lineWidth = FLAME_LINE_WIDTH;
    animateFlame(this);
    this.draw = function()
    {
        g_ctx.lineWidth = this.lineWidth;
        g_ctx.lineCap = "round";
        g_ctx.strokeStyle = FLAME_COLOR;
        g_ctx.beginPath();
        g_ctx.moveTo(this.horizontalFlameFromX, this.horizontalFlameFromY);
        g_ctx.lineTo(this.horizontalFlameToX, this.horizontalFlameToY);
        g_ctx.moveTo(this.verticalFlameFromX, this.verticalFlameFromY);
        g_ctx.lineTo(this.verticalFlameToX, this.verticalFlameToY);
        g_ctx.stroke();
    }
    
    function animateFlame(self)
    {
        var timerId = setInterval(function() {
            self.currTime = (self.currTime > 0) ? self.currTime - 0.05 : self.cooldown;
            self.lineWidth = (self.lineWidth < FLAME_LINE_WIDTH ? self.lineWidth + FLAME_ANIMATION_COEF : self.lineWidth - FLAME_ANIMATION_COEF);
            if (self.currTime == self.cooldown)
            {
                clearInterval(timerId);
                g_flames.pop();
                //bombAttack(self);
            }
        }, 50);
    }
}

function _drawFlames()
{
    for (var i = 0; i < g_flames.length; i++)
    {
        g_flames[i].draw();
    }
}