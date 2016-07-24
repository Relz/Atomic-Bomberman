module.exports.generateClientMap = function(mapIndex)
{
    var clientMap = [
        [{x:mapIndex,y:-1},{x:mapIndex,y:-1},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:-1},{x:mapIndex,y:-1}],
        [{x:mapIndex,y:-1},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:-1}],
        [{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0}],
        [{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0}],
        [{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0}],
        [{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0}],
        [{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0}],
        [{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0}],
        [{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0}],
        [{x:mapIndex,y:-1},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:0},{x:mapIndex,y:1},{x:mapIndex,y:-1}],
        [{x:mapIndex,y:-1},{x:mapIndex,y:-1},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:0},{x:mapIndex,y:-1},{x:mapIndex,y:-1}]
    ];

    return clientMap;
};
module.exports.generateServerMap = function(clientMap)
{
    CELLS_COUNT_HORIZONTAL = 15;
    CELLS_COUNT_VERTICAL = 11;

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

    BONUS_CONFIG =
    {
        "bomb" :
        {
            id: BONUS_BOMB_ID,
            count: 20,
        },
        flame :
        {
            id: BONUS_FLAME_ID,
            count: 6,
        },
        "doubleFlame" :
        {
            id: BONUS_DOUBLE_FLAME_ID,
            count: 4,
        },
        "speed" :
        {
            id: BONUS_SPEED_ID,
            count: 8,
        },
        "curse" :
        {
            id: BONUS_CURSE_ID,
            count: 3,
        },
        "exhaust" :
        {
            id: BONUS_EXHAUST_ID,
            count: 3,
        },
        "detonator" :
        {
            id: BONUS_DETONATOR_ID,
            count: 2,
        },
        "kick" :
        {
            id: BONUS_KICK_ID,
            count: 3,
        },
        "punch" :
        {
            id: BONUS_PUNCH_ID,
            count: 4,
        },
        "grab" :
        {
            id: BONUS_GRAB_ID,
            count: 5,
        },
        "random" :
        {
            id: BONUS_RANDOM_ID,
            count: 1,
        }
    };

    return generateBonuses(clientMap);

    function generateBonuses(clientMap)
    {
        var result = clientMap.slice(0);
        for (var i = 0; i < result.length; i++)
        {
            for (var j = 0; j < result[i].length; j++)
            {
                result[i][j].bonus = null;
            }
        }
        var randPosX;
        var randPosY;
        for (var key in BONUS_CONFIG)
        {
            for (var i = 0; i < BONUS_CONFIG[key].count; i++)
            {
                do
                {
                    randPosX = Math.floor(Math.random() * CELLS_COUNT_HORIZONTAL);
                    randPosY = Math.floor(Math.random() * CELLS_COUNT_VERTICAL);
                }
                while (result[randPosY][randPosX].y !== 0 && result[randPosY][randPosX].bonus === null);
                result[randPosY][randPosX].bonus = BONUS_CONFIG[key].id;
            }
        }
        for (var i = 0; i < result.length; i++)
        {
            for (var j = 0; j < result[i].length; j++)
            {
                if (result[i][j].bonus === null)
                {
                    result[i][j].bonus = null;
                }
            }
        }
        return result;
    }
};
