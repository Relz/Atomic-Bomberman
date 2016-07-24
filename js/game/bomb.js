BOMB_DURATION = 3000;
BOMB_ANIMATION_DURATION = 1000;

SPRITE_BOMB_URL = "img/game/sprite_bomb.png";
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
    var imagePosX = 0;
    var imagePosY = 0;
    animateBomb(player, this);
    this.draw = function(spiteBombImage)
    {
        g_ctx.drawImage(
            spiteBombImage,
            BOMB_SPRITE_ELEMENT_WIDTH * imagePosX,
            BOMB_SPRITE_ELEMENT_HEIGHT * imagePosY,
            BOMB_SPRITE_ELEMENT_WIDTH,
            BOMB_SPRITE_ELEMENT_HEIGHT,
            this.posX * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX,
            this.posY * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX,
            BOMB_SPRITE_ELEMENT_WIDTH,
            BOMB_SPRITE_ELEMENT_HEIGHT
        );
    };

    function animateBomb(player, self)
    {
        var i = 0;
        var decrementMS = BOMB_ANIMATION_DURATION / (BOMB_SPRITE_STANDART_COUNT * 2);
        var inc = true;
        mySetInterval(function(animationFrame)
        {
            self.currTime = (self.currTime > 0) ? self.currTime - decrementMS : self.cooldown;
            if (self.currTime == self.cooldown)
            {
                cancelAnimationFrame(animationFrame);
                g_bombs.pop();
            }
            imagePosY = i;
            i += (inc ? 1 : -1);
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

function drawBombs(spiteBombImage)
{
    for (var i = 0; i < g_bombs.length; i++)
    {
        g_bombs[i].draw(spiteBombImage);
    }
}
