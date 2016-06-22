PLAYER_DIRECTION_NONE = 0;
PLAYER_DIRECTION_UP = 1;
PLAYER_DIRECTION_RIGHT = 2;
PLAYER_DIRECTION_DOWN = 3;
PLAYER_DIRECTION_LEFT = 4;

PLAYER_DEATH_DURATION = 3000;
PLAYER_WALK_DURATION = 300;

PLAYER_SPEED = 3;
PLAYER_START_BOMB_ATTACK_RANGE = 3;

PLAYER_SPRITE_IMAGE_URL = "img/player/sprite_player.png";
PLAYER_SPRITE_ELEMENT_WIDTH = 47;
PLAYER_SPRITE_ELEMENT_HEIGHT = 73;

PLAYER_SPRITE_STAND_TOP_POS_Y = 0;
PLAYER_SPRITE_STAND_RIGHT_POS_Y = 1;
PLAYER_SPRITE_STAND_DOWN_POS_Y = 2;
PLAYER_SPRITE_STAND_LEFT_POS_Y = 3;

PLAYER_SPRITE_WALK_TOP_POS_Y = 4;
PLAYER_SPRITE_WALK_RIGHT_POS_Y = 19;
PLAYER_SPRITE_WALK_BOTTOM_POS_Y = 34;
PLAYER_SPRITE_WALK_LEFT_POS_Y = 49;
PLAYER_SPRITE_WALK_EACH_COUNT = 15;

PLAYER1_KEY_UP = 37;
PLAYER1_KEY_RIGHT = 38;
PLAYER1_KEY_DOWN = 39;
PLAYER1_KEY_LEFT = 40;
PLAYER1_KEY_PLATE_BOMB = 16;

PLAYER2_KEY_UP = 65;
PLAYER2_KEY_RIGHT = 87;
PLAYER2_KEY_DOWN = 68;
PLAYER2_KEY_LEFT = 83;
PLAYER2_KEY_PLATE_BOMB = 0;

PLAYER_DEATH_SPRITE_IMAGE_URL = "img/player/sprite_death.png";
PLAYER_DEATH_SPRITE_ELEMENT_WIDTH = 73;
PLAYER_DEATH_SPRITE_ELEMENT_HEIGHT = 73;
PLAYER_DEATH_SPRITE_ELEMENT_COUNT = 41;
PLAYER_DEATH_SPRITE_START = 0;

var g_players = [];

function Player(color, posX, posY)
{
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.canvasX = posX * CELL_WIDTH;
    this.canvasY = posY * CELL_HEIGHT;
    this.direction = PLAYER_DIRECTION_DOWN;
    this.bombAttackRange = PLAYER_START_BOMB_ATTACK_RANGE;
    this.alive = true;

    var spritePlayerImage = new Image();
    spritePlayerImage.src = PLAYER_SPRITE_IMAGE_URL;
    var walking = false;
    var imageWidth = PLAYER_SPRITE_ELEMENT_WIDTH;
    var imageHeight = PLAYER_SPRITE_ELEMENT_HEIGHT;
    var imagePosX = 0;
    var imagePosY = 0;
    this.draw = function() 
    {
        var self = this;
        if (_isStaying())
        {
            switch(self.direction){
                case PLAYER_DIRECTION_UP:
                    imagePosY = PLAYER_SPRITE_STAND_TOP_POS_Y;
                break;
                case PLAYER_DIRECTION_RIGHT:
                    imagePosY = PLAYER_SPRITE_STAND_RIGHT_POS_Y;
                break;
                case PLAYER_DIRECTION_DOWN:
                    imagePosY = PLAYER_SPRITE_STAND_DOWN_POS_Y;
                break;
                case PLAYER_DIRECTION_LEFT:
                    imagePosY = PLAYER_SPRITE_STAND_LEFT_POS_Y;
                break;
            }
        }
        else if (!walking && self.alive)
        {
            _walkAnimation(self);
        }
        g_ctx.drawImage(spritePlayerImage,
          imageWidth * imagePosX,
          imageHeight * imagePosY,
          imageWidth,
          imageHeight,
          self.canvasX + CANVAS_MARGIN_LEFT_PX - (imageWidth - CELL_WIDTH) / 2,
          self.canvasY + CANVAS_MARGIN_TOP_PX - imageHeight / 2,
          imageWidth,
          imageHeight);
    };

    this.die = function()
    {
        self = this;
        self.alive = false;
        spritePlayerImage.src = PLAYER_DEATH_SPRITE_IMAGE_URL;
        imageWidth = PLAYER_DEATH_SPRITE_ELEMENT_WIDTH;
        imageHeight = PLAYER_DEATH_SPRITE_ELEMENT_HEIGHT;
        window.removeEventListener("keydown" , keyDownEventListener, true);
        window.removeEventListener("keyup", keyUpEventListener, true);
        g_upKeyDown = false;
        g_rightKeyDown = false;
        g_downKeyDown = false;
        g_leftKeyDown = false;
        self.direction = PLAYER_DIRECTION_NONE;
        var i = 0;
        var delay = PLAYER_DEATH_DURATION / PLAYER_DEATH_SPRITE_ELEMENT_COUNT;
        var timer = setInterval(function()
        {
            imagePosY = i + PLAYER_DEATH_SPRITE_START;
            i++;
            if (i == PLAYER_DEATH_SPRITE_ELEMENT_COUNT)
            {
                clearInterval(timer);
                delete(self);
            }
        }, delay);
    };

    this.tryToPickUpBonus = function()
    {
        if (g_map[this.posY][this.posX].bonus !== null)
        {
            var bonus = g_map[this.posY][this.posX].bonus;
            var bonusIndex = -1;
            for (var i = 0; i < g_bonuses.length; i++)
            {
                if (g_bonuses[i].posX == this.posX && g_bonuses[i].posY == this.posY)
                {
                    bonusIndex = i;
                }
            }
            if (bonusIndex >= 0)
            {
              g_bonuses.splice(bonusIndex, 1);
            }
        }
    };

    function _isStaying()
    {
        return !g_upKeyDown && !g_rightKeyDown && !g_downKeyDown && !g_leftKeyDown;
    }

    function _walkAnimation(self)
    {
        walking = true;
        var i = 0;
        var delay = PLAYER_WALK_DURATION / PLAYER_SPRITE_WALK_EACH_COUNT;
        var playerSpriteWalkStartPosY = PLAYER_SPRITE_WALK_BOTTOM_POS_Y;
        var timer = setInterval(function()
        {
            switch(self.direction){
                case PLAYER_DIRECTION_UP:
                    playerSpriteWalkStartPosY = PLAYER_SPRITE_WALK_TOP_POS_Y;
                    break;
                case PLAYER_DIRECTION_RIGHT:
                    playerSpriteWalkStartPosY = PLAYER_SPRITE_WALK_RIGHT_POS_Y;
                    break;
                case PLAYER_DIRECTION_DOWN:
                    playerSpriteWalkStartPosY = PLAYER_SPRITE_WALK_BOTTOM_POS_Y;
                    break;
                case PLAYER_DIRECTION_LEFT:
                    playerSpriteWalkStartPosY = PLAYER_SPRITE_WALK_LEFT_POS_Y;
                    break;
                default:
                    playerSpriteWalkStartPosY = PLAYER_SPRITE_WALK_BOTTOM_POS_Y;
                    break;
            }
            imagePosY = i + playerSpriteWalkStartPosY;
            i++;
            if (i == PLAYER_SPRITE_WALK_EACH_COUNT)
            {
                i = 0;
            }
            if (_isStaying() || !self.alive)
            {
                walking = false;
                clearInterval(timer);
            }
        }, delay);
    }
}

function keyDownEventListener()
{
    handleKey(event, true);
}

function keyUpEventListener()
{
    handleKey(event, false);
}

function handleKey(event, state)
{
    switch (event.keyCode)
    {
        case PLAYER1_KEY_UP:
            g_leftKeyDown = state;
        break;

        case PLAYER1_KEY_RIGHT:
            g_upKeyDown = state;
        break;

        case PLAYER1_KEY_DOWN:
            g_rightKeyDown = state;
        break;

        case PLAYER1_KEY_LEFT:
            g_downKeyDown = state;
        break;

        case PLAYER1_KEY_PLATE_BOMB:
            addBombToPlayerPos(g_player, state);
        break;

        default: return;
    }
}

var islastStateKeyDown = false;
function addBombToPlayerPos(player, state)
{
    if (state && !islastStateKeyDown)
    {
        var allowToPlantBomb = true;
        for (var i = 0; i < g_bombs.length; i++)
        {
            if (g_bombs[i].posX == player.posX &&  g_bombs[i].posY == player.posY)
            {
                allowToPlantBomb = false;
            }
        }
        if (allowToPlantBomb)
        {
            g_bombs.unshift(new Bomb("green", player.posX, player.posY, BOMB_DURATION));
        }
    }
    islastStateKeyDown = state;
}

function drawPlayers()
{
    for (var i = 0; i < g_players.length; i++)
    {
        g_players[i].draw();
    }
}
