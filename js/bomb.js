BOMB_DURATION = 3000;
BOMB_ANIMATION_DURATION = 1000;

BOMB_SPRITE_IMAGE_URL = "img/sprite_bomb.png";
BOMB_SPRITE_ELEMENT_WIDTH = 36;
BOMB_SPRITE_ELEMENT_HEIGHT = 37;
BOMB_SPRITE_STANDART_COUNT = 10;

var g_bombs = [];

function Bomb(player, posX, posY, cooldown)
{
    this.color = player.color;
    this.posX = posX;
    this.posY = posY;
    this.cooldown = cooldown;
    this.currTime = cooldown;
    var bombImage = new Image();
    bombImage.src = BOMB_SPRITE_IMAGE_URL;
    var imagePosX = 0;
    var imagePosY = 0;
    animateBomb(this);
    this.draw = function() 
    {
        g_ctx.drawImage(bombImage,
          BOMB_SPRITE_ELEMENT_WIDTH * imagePosX,
          BOMB_SPRITE_ELEMENT_HEIGHT * imagePosY,
          BOMB_SPRITE_ELEMENT_WIDTH,
          BOMB_SPRITE_ELEMENT_HEIGHT,
          this.posX * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX,
          this.posY * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX,
          BOMB_SPRITE_ELEMENT_WIDTH,
          BOMB_SPRITE_ELEMENT_HEIGHT);
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
                if (g_map[self.posY + i * dy][self.posX + i * dx].y === 0)
                {
                    result = {x : self.posX + i * dx, y: self.posY + i * dy};
                    g_map[self.posY + i * dy][self.posX + i * dx].y = -1;
                    if (g_map[self.posY + i * dy][self.posX + i * dx].bonus !== null)
                    {
                        g_bonuses.push(new Bonus(g_map[self.posY + i * dy][self.posX + i * dx].bonus, self.posX + i * dx, self.posY + i * dy));
                    }
                    break;
                }
                else if (g_map[self.posY + i * dy][self.posX + i * dx].y == -1)
                {
                    result = {x : self.posX + i * dx, y: self.posY + i * dy};
                }
            }
            return result;
        }

        function addFlame(posX, posY, upperWallPos, rightWallPos, lowerWallPos, leftWallPos)
        {
            g_flames.unshift(new Flame(posX, posY, upperWallPos, rightWallPos, lowerWallPos, leftWallPos));
        }

        var upperWallPos = tryToDestroyWallAndGetPos(self, 0, -1);
        var rightWallPos = tryToDestroyWallAndGetPos(self, 1, 0);
        var lowerWallPos = tryToDestroyWallAndGetPos(self, 0, 1);
        var leftWallPos = tryToDestroyWallAndGetPos(self, -1, 0);
        addFlame(self.posX, self.posY, upperWallPos, rightWallPos, lowerWallPos, leftWallPos);
        player.bombCount--;
        delete(self);
    }

    function animateBomb(self)
    {
        var i = 0;
        var decrementMS = BOMB_ANIMATION_DURATION / (BOMB_SPRITE_STANDART_COUNT * 2);
        var inc = true;
        var timer = setInterval(function()
        {
            self.currTime = (self.currTime > 0) ? self.currTime - decrementMS : self.cooldown;
            if (self.currTime == self.cooldown)
            {
                clearInterval(timer);
                g_bombs.pop();
                bombAttack(self);
            }
            imagePosY = i;
            if (inc)
            {
                i++;
            }
            else
            {
                i--;
            }
            if (i == BOMB_SPRITE_STANDART_COUNT)
            {
                inc = false;
                i--;
            }
            else if (i === 0)
            {
                inc = true;
            }
        }, decrementMS);
    }
}

function drawBombs()
{
    for (var i = 0; i < g_bombs.length; i++)
    {
        g_bombs[i].draw();
    }
}
