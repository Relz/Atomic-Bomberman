function bomb(color, posX, posY, cooldown)
{
    function tryToKillPlayer(self)
    {
        if ((self.posX == g_player.posX) && (self.posY - g_player.bombAttackRange <= g_player.posY) && (self.posY + g_player.bombAttackRange >= g_player.posY) ||
            (self.posY == g_player.posY) && (self.posX - g_player.bombAttackRange <= g_player.posX) && (self.posX + g_player.bombAttackRange >= g_player.posX))
        {
            g_player.die();
        }
    }
    
    function tryToDestroyWalls(self)
    {
        function tryToDestroyWall(self, dx, dy)
        {
            for (var i = 0; i <= g_player.bombAttackRange; i++)
            {
                if (((self.posY + i * dy > CELLS_COUNT_VERTICAL - 1) || (self.posX + i * dx > CELLS_COUNT_HORIZONTAL - 1)  || 
                     (self.posX + i * dx < 0) || (self.posY + i * dy < 0)) || (g_map[self.posY + i * dy][self.posX + i * dx].y == 1))
                {
                    break;
                }
                if (g_map[self.posY + i * dy][self.posX + i * dx].y == 0)
                {
                    g_map[self.posY + i * dy][self.posX + i * dx].y = -1;
                    break;
                }
            }
        }
        tryToDestroyWall(self, 0, -1);
        tryToDestroyWall(self, 1, 0);
        tryToDestroyWall(self, 0, 1);
        tryToDestroyWall(self, -1, 0);
    }
    
    function bombAttack(self)
    {
        tryToKillPlayer(self);
        tryToDestroyWalls(self);
    }
    function animateBomb(self)
    {
        var timerId = setInterval(function() {
            self.currTime = (self.currTime > 0) ? self.currTime - 0.05 : self.cooldown;
            if (self.currTime == self.cooldown)
            {
                clearInterval(timerId);
                g_bombs.pop();
                bombAttack(self);
            }
        }, 50);
    }
    
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.cooldown = cooldown;
    this.currTime = cooldown;
    animateBomb(this);
    this.draw = function() 
    {
        g_bombImage.src = getCurrentBombImage(this.currTime);
        g_ctx.drawImage(g_bombImage, this.posX * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX, this.posY * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX);
    }
}

function getCurrentBombImage(currTime)
{
    var result = "img/bomb/01.png";;
    switch (true)
    {
        case ((currTime < 3 && currTime >= 2.95) || (currTime < 2 && currTime >= 1.95) || currTime < 1 && currTime >= 0.95):
            result = "img/bomb/01.png";
            break;
        case ((currTime < 2.95 && currTime >= 2.9) || (currTime < 1.95 && currTime >= 1.9) || currTime < 0.95 && currTime >= 0.9):
            result = "img/bomb/02.png";
            break;
        case ((currTime < 2.9 && currTime >= 2.85) || (currTime < 1.9 && currTime >= 1.85) || (currTime < 0.9 && currTime >= 0.85)):
            result = "img/bomb/03.png";
            break;
        case ((currTime < 2.85 && currTime >= 2.8) || (currTime < 1.85 && currTime >= 1.8) || (currTime < 0.85 && currTime >= 0.8)):
            result = "img/bomb/04.png";
            break;
        case ((currTime < 2.8 && currTime >= 2.75) || (currTime < 1.8 && currTime >= 1.75) || (currTime < 0.8 && currTime >= 0.75)):
            result = "img/bomb/05.png";
            break;
        case ((currTime < 2.75 && currTime >= 2.7) || (currTime < 1.75 && currTime >= 1.7) || (currTime < 0.75 && currTime >= 0.7)):
            result = "img/bomb/06.png";
            break;
        case ((currTime < 2.7 && currTime >= 2.65) || (currTime < 1.7 && currTime >= 1.65) || (currTime < 0.7 && currTime >= 0.65)):
            result = "img/bomb/07.png";
            break;
        case ((currTime < 2.65 && currTime >= 2.6) || (currTime < 1.65 && currTime >= 1.6) || (currTime < 0.65 && currTime >= 0.6)):
            result = "img/bomb/08.png";
            break;
        case ((currTime < 2.6 && currTime >= 2.55) || (currTime < 1.6 && currTime >= 1.55) || (currTime < 0.6 && currTime >= 0.55)):
            result = "img/bomb/09.png";
            break;
        case ((currTime < 2.55 && currTime >= 2.5) || (currTime < 1.55 && currTime >= 1.5) || (currTime < 0.55 && currTime >= 0.5)):
            result = "img/bomb/10.png";
            break;
        case ((currTime < 2.5 && currTime >= 2.45) || (currTime < 1.5 && currTime >= 1.45) || (currTime < 0.5 && currTime >= 0.45)):
            result = "img/bomb/10.png";
            break;
        case ((currTime < 2.45 && currTime >= 2.4) || (currTime < 1.45 && currTime >= 1.4) || (currTime < 0.45 && currTime >= 0.4)):
            result = "img/bomb/09.png";
            break;
        case ((currTime < 2.4 && currTime >= 2.35) || (currTime < 1.4 && currTime >= 1.35) || (currTime < 0.4 && currTime >= 0.35)):
            result = "img/bomb/08.png";
            break;
        case ((currTime < 2.35 && currTime >= 2.3) || (currTime < 1.35 && currTime >= 1.3) || (currTime < 0.35 && currTime >= 0.3)):
            result = "img/bomb/07.png";
            break;
        case ((currTime < 2.3 && currTime >= 2.25) || (currTime < 1.3 && currTime >= 1.25) || (currTime < 0.3 && currTime >= 0.25)):
            result = "img/bomb/06.png";
            break;
        case ((currTime < 2.25 && currTime >= 2.2) || (currTime < 1.25 && currTime >= 1.2) || (currTime < 0.25 && currTime >= 0.2)):
            result = "img/bomb/05.png";
            break;
        case ((currTime < 2.2 && currTime >= 2.15) || (currTime < 1.2 && currTime >= 1.15) || (currTime < 0.2 && currTime >= 0.15)):
            result = "img/bomb/04.png";
            break;
        case ((currTime < 2.15 && currTime >= 2.1) || (currTime < 1.15 && currTime >= 1.1) || (currTime < 0.15 && currTime >= 0.1)):
            result = "img/bomb/03.png";
            break;
        case ((currTime < 2.1 && currTime >= 1.95) || (currTime < 1.1 && currTime >= 0.95) || (currTime < 0.1 && currTime >= 0)):
            result = "img/bomb/02.png";
            break;
        case ((currTime < 2.05 && currTime >= 2.0) || (currTime < 1.05 && currTime >= 1.0) || (currTime < 0.05 && currTime >= 0)):
            result = "img/bomb/01.png";
            break;
        defaut:
            result = "img/bomb/01.png";
            break;
    }
    return result;
}

function _drawBombs()
{
    for (var i = 0; i < g_bombs.length; i++)
    {
        g_bombs[i].draw();
    }
}