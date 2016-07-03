FLAME_COOLDOWN = 1;
FLAME_ANIMATION_COEF = 5;
FLAME_LINE_WIDTH = 10;
FLAME_COLOR = "red";

var g_flames = [];

function Flame(posX, posY, upperWallPos, rightWallPos, lowerWallPos, leftWallPos)
{
    this.posX = posX;
    this.posY = posY;
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
    };

    function tryToKillPlayers(self, upperWallPos, rightWallPos, lowerWallPos, leftWallPos)
    {
        for (var i = 0; i < g_players.length; i++)
        {
            if (g_players[i].alive &&
                ((self.posX == g_players[i].posX) && (upperWallPos.y <= g_players[i].posY) && (lowerWallPos.y >= g_players[i].posY) ||
                (self.posY == g_players[i].posY) && (leftWallPos.x <= g_players[i].posX) && (rightWallPos.x >= g_players[i].posX)))
            {
                if (g_players[i].playerId == g_playerId)
                {
                    g_gameSocket.emit("playerDied", g_myRoomName, g_playerId);
                }
            }
        }
    }

    function animateFlame(self)
    {
        mySetInterval(function(animationFrame)
        {
            tryToKillPlayers(self, upperWallPos, rightWallPos, lowerWallPos, leftWallPos);
            self.currTime = (self.currTime > 0) ? self.currTime - 0.05 : self.cooldown;
            self.lineWidth = (self.lineWidth < FLAME_LINE_WIDTH ? self.lineWidth + FLAME_ANIMATION_COEF : self.lineWidth - FLAME_ANIMATION_COEF);
            if (self.currTime == self.cooldown)
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
