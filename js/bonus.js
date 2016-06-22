BONUS_CONFIG =
{
    "bomb" :
    {
        id: 1,
        count: 7,
        img: "img/power/bomb.png"
    },
    flame :
    {
        id: 2,
        count: 6,
        img: "img/power/flame.png"
    },
    "doubleFlame" :
    {
        id: 3,
        count: 4,
        img: "img/power/double_flame.png"
    },
    "speed" :
    {
        id: 4,
        count: 8,
        img: "img/power/speed.png"
    },
    "curse" :
    {
        id: 5,
        count: 7,
        img: "img/power/curse.png"
    },
    "exhaust" :
    {
        id: 6,
        count: 5,
        img: "img/power/exhaust.png"
    },
    "detonator" :
    {
        id: 7,
        count: 2,
        img: "img/power/detonator.png"
    },
    "kick" :
    {
        id: 8,
        count: 3,
        img: "img/power/kick.png"
    },
    "punch" :
    {
        id: 9,
        count: 4,
        img: "img/power/punch.png"
    },
    "grab" :
    {
        id: 10,
        count: 5,
        img: "img/power/grab.png"
    },
    "random" :
    {
        id: 11,
        count: 1,
        img: "img/power/random.png"
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
    var bonusCount = 0;
    for (var i = 0; i < CELLS_COUNT_HORIZONTAL; i++)
    {
        for (var j = 0; j < CELLS_COUNT_VERTICAL; j++)
        {
            if (g_map[j][i].y == 0)
            {
                freeSpaceForBonuses++;
            }
        }
    }
    console.log(freeSpaceForBonuses);
    for (var key in BONUS_CONFIG)
    {
        bonusCount += BONUS_CONFIG[key].count;
        for (var i = 0; i < BONUS_CONFIG[key].count; i++)
        {
            do
            {
                randPosX = Math.floor(Math.random() * CELLS_COUNT_HORIZONTAL);
                randPosY = Math.floor(Math.random() * CELLS_COUNT_VERTICAL);
            }
            while (g_map[randPosY][randPosX].y != 0 && g_map[randPosY][randPosX].bonus == null);
            g_map[randPosY][randPosX].bonus = BONUS_CONFIG[key];
        }
    }
    console.log(bonusCount);
}

function drawBonuses()
{
    for(var i = 0; i < g_bonuses.length; i++)
    {
        g_bonuses[i].draw();
    }
}
