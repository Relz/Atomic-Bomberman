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

PLAYER_SPRITE_IMAGE_URLS = {
    "black": "img/game/player/sprite_player_black.png",
    "red": "img/game/player/sprite_player_red.png",
    "green": "img/game/player/sprite_player_green.png",
    "blue": "img/game/player/sprite_player_blue.png",
    "purple": "img/game/player/sprite_player_purple.png"
};
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

PLAYER_DEATH_SPRITE_IMAGE_URL = "img/game/player/sprite_death.png";
PLAYER_DEATH_SPRITE_ELEMENT_WIDTH = 73;
PLAYER_DEATH_SPRITE_ELEMENT_HEIGHT = 73;
PLAYER_DEATH_SPRITE_ELEMENT_COUNT = 41;
PLAYER_DEATH_SPRITE_START = 0;

PLAYER_COLOR_DEFAULT = "green";

var g_players = [];
var g_playerId = null;
var g_playerNames = [];

function Player(id, name, posX, posY)
{
    this.id = id;
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.canvasX = posX * CELL_WIDTH;
    this.canvasY = posY * CELL_HEIGHT;
    this.upKeyDown = false;
    this.rightKeyDown = false;
    this.downKeyDown = false;
    this.leftKeyDown = false;
    this.staying = true;

    this.direction = PLAYER_DIRECTION_DOWN;
    this.alive = true;
    this.showing = true;
    var self = this;
    window.addEventListener("keydown", function(event)
    {
        if (self.id == g_playerId && self.alive)
        {
            handleKey(self, event.keyCode, true);
        }
    });
    window.addEventListener("keyup", function(event)
    {
        if (self.id == g_playerId && self.alive)
        {
            handleKey(self, event.keyCode, false);
        }
    });

    this.bombCount = 0;
    this.maxBomb = 1;
    this.bombAttackRange = PLAYER_START_BOMB_ATTACK_RANGE;
    this.speed = PLAYER_START_SPEED;
    this.cursed = false;

    var spritePlayerImage = new Image();
    var walking = false;
    var imageWidth = PLAYER_SPRITE_ELEMENT_WIDTH;
    var imageHeight = PLAYER_SPRITE_ELEMENT_HEIGHT;
    var imagePosX = 0;
    var imagePosY = 0;
    var playerOffsetX = CANVAS_MARGIN_LEFT_PX - (imageWidth - CELL_WIDTH) / 2;
    var playerOffsetY = CANVAS_MARGIN_TOP_PX - imageHeight / 2;

    this.setPosition = function(posX, posY)
    {
        this.posX = posX;
        this.posY = posY;
        this.canvasX = posX * CELL_WIDTH;
        this.canvasY = posY * CELL_HEIGHT;
    };

    this.setSpritePlayerImageByColor = function(color)
    {
        spritePlayerImage.src = PLAYER_SPRITE_IMAGE_URLS[color];
    };

    this.draw = function()
    {
        _setImagePosY(this);
        g_ctx.drawImage(
            spritePlayerImage,
            imageWidth * imagePosX,
            imageHeight * imagePosY,
            imageWidth,
            imageHeight,
            self.canvasX + playerOffsetX,
            self.canvasY + playerOffsetY,
            imageWidth,
            imageHeight
        );
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

        mySetInterval(function(animationFrame)
        {
            imagePosY = i + PLAYER_DEATH_SPRITE_START;
            i++;
            if (i == PLAYER_DEATH_SPRITE_ELEMENT_COUNT)
            {
                self.showing = false;
                g_players.splice(g_players.indexOf(self), 1);
                cancelAnimationFrame(animationFrame);
            }
        }, delay);
    };

    this.update = function()
    {
        g_socket.emit("sendKeyStates", this.upKeyDown, this.rightKeyDown, this.downKeyDown, this.leftKeyDown);
    };

    function _setImagePosY(self)
    {
        if (self.staying)
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

        function _walkAnimation(self)
        {
            walking = true;
            var i = 0;
            var delay = PLAYER_WALK_DURATION / PLAYER_SPRITE_WALK_EACH_COUNT;
            var playerSpriteWalkStartPosY = PLAYER_SPRITE_WALK_BOTTOM_POS_Y;

            mySetInterval(function(animationFrame)
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
                if (self.staying || !self.alive)
                {
                    walking = false;
                    cancelAnimationFrame(animationFrame);
                }
            }, delay);
        }
    }

}

function drawPlayers()
{
    for (var i = 0; i < g_players.length; i++)
    {
        if (g_players[i].showing)
        {
            g_players[i].draw();
        }
        if (g_players[i].id == g_playerId && g_players[i].alive)
        {
            g_players[i].update();
        }
    }
}
