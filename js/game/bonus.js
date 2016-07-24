SPRITE_BONUS_URL = "img/game/power/sprite_power.png";

BONUS_BOMB_ID = 0;
BONUS_FLAME_ID = 1;
BONUS_DOUBLE_FLAME_ID = 2;
BONUS_SPEED_ID = 3;
BONUS_CURSE_ID = 4;
BONUS_EXHAUST_ID = 5;
BONUS_DETONATOR_ID = 6;
BONUS_KICK_ID = 7;
BONUS_PUNCH_ID = 8;
BONUS_GRAB_ID = 9;
BONUS_RANDOM_ID = 10;

var g_bonuses = [];

function Bonus(bonus, posX, posY)
{
    this.bonus = bonus;
    this.posX = posX;
    this.posY = posY;
    this.draw = function(spriteBonusImage)
    {
        g_ctx.drawImage(
            spriteBonusImage,
            0,
            this.bonus * CELL_HEIGHT,
            CELL_WIDTH,
            CELL_HEIGHT,
            this.posX * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX,
            this.posY * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX,
            CELL_WIDTH,
            CELL_HEIGHT
        );
    };
}

function drawBonuses(spriteBonusImage)
{
    for (var i = 0; i < g_bonuses.length; i++)
    {
        g_bonuses[i].draw(spriteBonusImage);
    }
}
