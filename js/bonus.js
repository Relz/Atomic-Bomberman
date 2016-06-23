BONUS_BOMB_ID = 1;
BONUS_FLAME_ID = 2;
BONUS_DOUBLE_FLAME_ID = 3;
BONUS_SPEED_ID = 4;
BONUS_CURSE_ID = 5;
BONUS_EXHAUST_ID = 6;
BONUS_DETONATOR_ID = 7;
BONUS_KICK_ID = 8;
BONUS_PUNCH_ID = 9;
BONUS_GRAB_ID = 10;
BONUS_RANDOM_ID = 11;

BONUS_CONFIG =
{
    "bomb" :
    {
        id: BONUS_BOMB_ID,
        count: 7,
        img: "img/game/power/bomb.png"
    },
    flame :
    {
        id: BONUS_FLAME_ID,
        count: 6,
        img: "img/game/power/flame.png"
    },
    "doubleFlame" :
    {
        id: BONUS_DOUBLE_FLAME_ID,
        count: 4,
        img: "img/game/power/double_flame.png"
    },
    "speed" :
    {
        id: BONUS_SPEED_ID,
        count: 8,
        img: "img/game/power/speed.png"
    },
    "curse" :
    {
        id: BONUS_CURSE_ID,
        count: 7,
        img: "img/game/power/curse.png"
    },
    "exhaust" :
    {
        id: BONUS_EXHAUST_ID,
        count: 5,
        img: "img/game/power/exhaust.png"
    },
    "detonator" :
    {
        id: BONUS_DETONATOR_ID,
        count: 2,
        img: "img/game/power/detonator.png"
    },
    "kick" :
    {
        id: BONUS_KICK_ID,
        count: 3,
        img: "img/game/power/kick.png"
    },
    "punch" :
    {
        id: BONUS_PUNCH_ID,
        count: 4,
        img: "img/game/power/punch.png"
    },
    "grab" :
    {
        id: BONUS_GRAB_ID,
        count: 5,
        img: "img/game/power/grab.png"
    },
    "random" :
    {
        id: BONUS_RANDOM_ID,
        count: 1,
        img: "img/game/power/random.png"
    }
};
var g_bonuses = [];

function Bonus(bonus, posX, posY)
{
    this.bonus = bonus;
    this.posX = posX;
    this.posY = posY;
    var bonusImage = new Image();
    bonusImage.src = bonus.img;
    this.draw = function()
    {
        g_ctx.drawImage(bonusImage, this.posX * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX, this.posY * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX);
    };
}

function generateBonuses()
{
    var randPosX;
    var randPosY;
    var freeSpaceForBonuses = 0;
    for (var i = 0; i < CELLS_COUNT_HORIZONTAL; i++)
    {
        for (var j = 0; j < CELLS_COUNT_VERTICAL; j++)
        {
            if (g_map[j][i].y === 0)
            {
                freeSpaceForBonuses++;
            }
        }
    }
    for (var key in BONUS_CONFIG)
    {
        for (var i = 0; i < BONUS_CONFIG[key].count; i++)
        {
            do
            {
                randPosX = Math.floor(Math.random() * CELLS_COUNT_HORIZONTAL);
                randPosY = Math.floor(Math.random() * CELLS_COUNT_VERTICAL);
            }
            while (g_map[randPosY][randPosX].y !== 0 && g_map[randPosY][randPosX].bonus === null);
            g_map[randPosY][randPosX].bonus = BONUS_CONFIG[key];
        }
    }
}

function drawBonuses()
{
    for (var i = 0; i < g_bonuses.length; i++)
    {
        g_bonuses[i].draw();
    }
}
