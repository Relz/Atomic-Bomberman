BOMB_DURATION = 3000;
BOMB_ANIMATION_DURATION = 1000;

SPRITE_BOMB_URLS = {
    "black": "img/game/bomb/sprite_bomb_black.png",
    "red": "img/game/bomb/sprite_bomb_red.png",
    "green": "img/game/bomb/sprite_bomb_green.png",
    "blue": "img/game/bomb/sprite_bomb_blue.png",
    "purple": "img/game/bomb/sprite_bomb_purple.png",
};
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
    var spriteBombImage = new Image();

    animateBomb(player, this);

    this.setSpriteBombImageByColor = function(color)
    {
        spriteBombImage.src = SPRITE_BOMB_URLS[color];
    };
    this.setSpriteBombImageByColor(this.color);

    this.draw = function()
    {
        g_ctx.drawImage(
            spriteBombImage,
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

function drawBombs()
{
    for (var i = 0; i < g_bombs.length; i++)
    {
        g_bombs[i].draw();
    }
}
