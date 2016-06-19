BOMB_DURATION = 3000;
BOMB_ANIMATION_DURATION = 1000;

var g_bombImages = ["img/bomb/01.png", "img/bomb/02.png", "img/bomb/03.png", "img/bomb/04.png", "img/bomb/05.png",
                    "img/bomb/06.png", "img/bomb/07.png", "img/bomb/08.png", "img/bomb/09.png", "img/bomb/10.png",
                    "img/bomb/10.png", "img/bomb/09.png", "img/bomb/08.png", "img/bomb/07.png", "img/bomb/06.png",
                    "img/bomb/05.png", "img/bomb/04.png", "img/bomb/03.png", "img/bomb/02.png", "img/bomb/01.png"];

function Bomb(color, posX, posY, cooldown)
{
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.cooldown = cooldown;
    this.currTime = cooldown;
    var g_bombImage = new Image();
    animateBomb(this);
    this.draw = function() 
    {
        g_ctx.drawImage(g_bombImage, this.posX * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX, this.posY * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX);
    };
    
    function bombAttack(self)
    {
        function tryToDestroyWallAndGetPos(self, dx, dy)
        {
            var result = {x: self.posX, y: self.posY};
            for (var i = 1; i <= g_player.bombAttackRange; i++)
            {
                if (((self.posY + i * dy > CELLS_COUNT_VERTICAL - 1) || (self.posX + i * dx > CELLS_COUNT_HORIZONTAL - 1)  || 
                     (self.posX + i * dx < 0) || (self.posY + i * dy < 0)) || (g_map[self.posY + i * dy][self.posX + i * dx].y == 1))
                {
                    break;
                }
                if (g_map[self.posY + i * dy][self.posX + i * dx].y == 0)
                {
                    result = {x : self.posX + i * dx, y: self.posY + i * dy};
                    g_map[self.posY + i * dy][self.posX + i * dx].y = -1;
                    break;
                }
                else if (g_map[self.posY + i * dy][self.posX + i * dx].y == -1)
                {
                    result = {x : self.posX + i * dx, y: self.posY + i * dy};
                }
            }
            return result;
        }

        function addFlame(upperWallPos, rightWallPos, lowerWallPos, leftWallPos)
        {
            g_flames.unshift(new Flame(upperWallPos, rightWallPos, lowerWallPos, leftWallPos));
        }

        function tryToKillPlayer(upperWallPos, rightWallPos, lowerWallPos, leftWallPos)
        {
            if ((self.posX == g_player.posX) && (upperWallPos.y <= g_player.posY) && (lowerWallPos.y >= g_player.posY) ||
                (self.posY == g_player.posY) && (leftWallPos.x <= g_player.posX) && (rightWallPos.x >= g_player.posX))
            {
                g_player.die();
            }
        }
        var upperWallPos = tryToDestroyWallAndGetPos(self, 0, -1);
        var rightWallPos = tryToDestroyWallAndGetPos(self, 1, 0);
        var lowerWallPos = tryToDestroyWallAndGetPos(self, 0, 1);
        var leftWallPos = tryToDestroyWallAndGetPos(self, -1, 0);
        addFlame(upperWallPos, rightWallPos, lowerWallPos, leftWallPos);
        tryToKillPlayer(upperWallPos, rightWallPos, lowerWallPos, leftWallPos);
    }

    function animateBomb(self)
    {
        var i = 0;
        var decrementMS = BOMB_ANIMATION_DURATION / g_bombImages.length;
        var timer = setInterval(function()
        {
            self.currTime = (self.currTime > 0) ? self.currTime - decrementMS : self.cooldown;
            if (self.currTime == self.cooldown)
            {
                clearInterval(timer);
                g_bombs.pop();
                bombAttack(self);
            }
            g_bombImage.src = g_bombImages[i];
            i++;
            if (i == g_bombImages.length)
            {
                i = 0;
            }
        }, decrementMS);
    }
}

function _drawBombs()
{
    for (var i = 0; i < g_bombs.length; i++)
    {
        g_bombs[i].draw();
    }
}
