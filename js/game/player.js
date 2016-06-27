PLAYER_DIRECTION_NONE = 0;
PLAYER_DIRECTION_UP = 1;
PLAYER_DIRECTION_RIGHT = 2;
PLAYER_DIRECTION_DOWN = 3;
PLAYER_DIRECTION_LEFT = 4;

PLAYER_DEATH_DURATION = 3000;
PLAYER_WALK_DURATION = 300;

PLAYER_MAX_SPEED = 4;
PLAYER_START_SPEED = 2;
PLAYER_START_BOMB_ATTACK_RANGE = 1;

PLAYER_SPRITE_IMAGE_URL = "img/game/player/sprite_player.png";
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

PLAYER1_KEY_UP = 38;
PLAYER1_KEY_RIGHT = 39;
PLAYER1_KEY_DOWN = 40;
PLAYER1_KEY_LEFT = 37;
PLAYER1_KEY_PLATE_BOMB = 32;

/*PLAYER2_KEY_UP = 87;
PLAYER2_KEY_RIGHT = 68;
PLAYER2_KEY_DOWN = 83;
PLAYER2_KEY_LEFT = 65;
PLAYER2_KEY_PLATE_BOMB = 32;

PLAYER3_KEY_UP = 104;
PLAYER3_KEY_RIGHT = 102;
PLAYER3_KEY_DOWN = 101;
PLAYER3_KEY_LEFT = 100;
PLAYER3_KEY_PLATE_BOMB = 107;

PLAYER4_KEY_UP = 85;
PLAYER4_KEY_RIGHT = 75;
PLAYER4_KEY_DOWN = 74;
PLAYER4_KEY_LEFT = 72;
PLAYER4_KEY_PLATE_BOMB = 18;*/

PLAYER_DEATH_SPRITE_IMAGE_URL = "img/game/player/sprite_death.png";
PLAYER_DEATH_SPRITE_ELEMENT_WIDTH = 73;
PLAYER_DEATH_SPRITE_ELEMENT_HEIGHT = 73;
PLAYER_DEATH_SPRITE_ELEMENT_COUNT = 41;
PLAYER_DEATH_SPRITE_START = 0;

var g_players = [];

function Player(color, posX, posY)
{
    this.playerId = g_players.length;
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.canvasX = posX * CELL_WIDTH;
    this.canvasY = posY * CELL_HEIGHT;
    this.upKeyDown = false;
    this.rightKeyDown = false;
    this.downKeyDown = false;
    this.leftKeyDown = false;

    this.direction = PLAYER_DIRECTION_DOWN;
    this.alive = true;
    var self = this;
    window.addEventListener("keydown", function()
    {
        if (self.alive && self.playerId == g_playerId)
        {
            handleKey(self, event.keyCode, true);
        }
    }, true);
    window.addEventListener("keyup", function()
    {
        if (self.alive && self.playerId == g_playerId)
        {
            handleKey(self, event.keyCode, false);
        }
    }, true);

    this.bombCount = 0;
    this.maxBomb = 1;
    this.bombAttackRange = PLAYER_START_BOMB_ATTACK_RANGE;
    this.speed = PLAYER_START_SPEED;
    this.cursed = false;

    var spritePlayerImage = new Image();
    spritePlayerImage.src = PLAYER_SPRITE_IMAGE_URL;
    var walking = false;
    var imageWidth = PLAYER_SPRITE_ELEMENT_WIDTH;
    var imageHeight = PLAYER_SPRITE_ELEMENT_HEIGHT;
    var imagePosX = 0;
    var imagePosY = 0;
    this.draw = function()
    {
        _setImagePosY(this);
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
        self.direction = PLAYER_DIRECTION_NONE;
        var i = 0;
        var delay = PLAYER_DEATH_DURATION / PLAYER_DEATH_SPRITE_ELEMENT_COUNT;
        var timer = setInterval(function()
        {
            imagePosY = i + PLAYER_DEATH_SPRITE_START;
            i++;
            if (i == PLAYER_DEATH_SPRITE_ELEMENT_COUNT)
            {
                g_players.splice(g_players.indexOf(self), 1);
                delete(self);
                clearInterval(timer);
            }
        }, delay);
    };

    this.tryToPickUpBonus = function()
    {
        if (g_map[this.posY][this.posX].bonus !== null)
        {
            _useBonus(this, g_map[this.posY][this.posX].bonus.id);
            _removeBonusFromMap(this);
        }

        function _useBonus(self, bonusId)
        {
            switch (bonusId)
            {
                case BONUS_BOMB_ID:
                    self.maxBomb++;
                    break;
                case BONUS_FLAME_ID:
                    self.bombAttackRange++;
                    break;
                case BONUS_DOUBLE_FLAME_ID:
                    self.bombAttackRange+=2;
                    break;
                case BONUS_SPEED_ID:
                    if (self.speed != PLAYER_MAX_SPEED)
                    {
                        self.speed++;
                    }
                    break;
                case BONUS_CURSE_ID:
                    self.upKeyDown = false;
                    self.rightKeyDown = false;
                    self.downKeyDown = false;
                    self.leftKeyDown = false;
                    self.cursed = true;
                    break;
                case BONUS_EXHAUST_ID:
                    self.upKeyDown = false;
                    self.rightKeyDown = false;
                    self.downKeyDown = false;
                    self.leftKeyDown = false;
                    self.cursed = true;
                    break;
                case BONUS_DETONATOR_ID:

                    break;
                case BONUS_KICK_ID:

                    break;
                case BONUS_PUNCH_ID:

                    break;
                case BONUS_GRAB_ID:

                    break;
                case BONUS_RANDOM_ID:

                    break;
            }
        }

        function _removeBonusFromMap(self)
        {
            var bonusIndex = -1;
            for (var i = 0; i < g_bonuses.length; i++)
            {
                if (g_bonuses[i].posX == self.posX && g_bonuses[i].posY == self.posY)
                {
                    bonusIndex = i;
                }
            }
            if (bonusIndex >= 0)
            {
                g_map[self.posY][self.posX].bonus = null;
                g_bonuses.splice(bonusIndex, 1);
            }
        }
    };

    this.update = function()
    {
        if (this.upKeyDown)
        {
            this.direction = PLAYER_DIRECTION_UP;
            if ((this.posY !== 0 && (g_map[this.posY - 1][this.posX].y === -1)) ||
                (this.canvasY > this.posY * CELL_HEIGHT))
            {
                this.canvasY -= this.speed;
                if (this.canvasY < (this.posY - 0.5) * CELL_HEIGHT)
                {
                    this.posY--;
                    this.tryToPickUpBonus();
                }
            }
        }
        else if (this.rightKeyDown)
        {
            this.direction = PLAYER_DIRECTION_RIGHT;
            if ((this.posX + 1 < CELLS_COUNT_HORIZONTAL && (g_map[this.posY][this.posX + 1].y == -1)) ||
                (this.canvasX  < this.posX * CELL_WIDTH))
            {
                this.canvasX += this.speed;
                if (this.canvasX > (this.posX + 0.5) * CELL_WIDTH)
                {
                    this.posX++;
                    this.tryToPickUpBonus();
                }
            }
        }
        else if (this.downKeyDown)
        {
            this.direction = PLAYER_DIRECTION_DOWN;
            if ((this.posY + 1 < CELLS_COUNT_VERTICAL && (g_map[this.posY + 1][this.posX].y == -1)) ||
                (this.canvasY < this.posY * CELL_HEIGHT))
            {
                this.canvasY += this.speed;
                if (this.canvasY > (this.posY + 0.5) * CELL_HEIGHT)
                {
                    this.posY++;
                    this.tryToPickUpBonus();
                }
            }
        }
        else if (this.leftKeyDown)
        {
            this.direction = PLAYER_DIRECTION_LEFT;
            if (this.posX !== 0 && (g_map[this.posY][this.posX - 1].y === -1) ||
                (this.canvasX > this.posX * CELL_WIDTH))
            {
                this.canvasX -= this.speed;
                if (this.canvasX < (this.posX - 0.5) * CELL_WIDTH)
                {
                    this.posX--;
                    this.tryToPickUpBonus();
                }
            }
        }
    };

    function _setImagePosY(self)
    {
        if (_isStaying(self))
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

        function _isStaying(self)
        {
            return !self.upKeyDown && !self.rightKeyDown && !self.downKeyDown && !self.leftKeyDown;
        }

        function _walkAnimation(self)
        {
            walking = true;
            var i = 0;
            var delay = PLAYER_WALK_DURATION / PLAYER_SPRITE_WALK_EACH_COUNT;
            var playerSpriteWalkStartPosY = PLAYER_SPRITE_WALK_BOTTOM_POS_Y;
            var timer = setInterval(function()
            {
                switch(self.direction)
                {
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
                if (_isStaying(self) || !self.alive)
                {
                    walking = false;
                    clearInterval(timer);
                }
            }, delay);
        }
    }

}

var isLastStateKeyDown = false;
function addBombToPlayerPos(player, state)
{
    if (state && !isLastStateKeyDown)
    {
        var allowToPlantBomb = true;
        if (player.bombCount == player.maxBomb)
        {
            allowToPlantBomb = false;
        }
        else
        {
            for (var i = 0; i < g_bombs.length; i++)
            {
                if (g_bombs[i].posX == player.posX &&  g_bombs[i].posY == player.posY)
                {
                    allowToPlantBomb = false;
                }
            }
        }
        if (allowToPlantBomb)
        {
            player.bombCount++;
            g_bombs.unshift(new Bomb(player, player.posX, player.posY, BOMB_DURATION));
        }
    }
    isLastStateKeyDown = state;
}

function drawPlayers()
{
    for (var i = 0; i < g_players.length; i++)
    {
        g_players[i].draw();
        if (g_players[i].alive)
        {
            g_players[i].update();
        }
    }
}