var globals = require("./globals.js").globals;

PLAYER_DIRECTION_NONE = 0;
PLAYER_DIRECTION_UP = 1;
PLAYER_DIRECTION_RIGHT = 2;
PLAYER_DIRECTION_DOWN = 3;
PLAYER_DIRECTION_LEFT = 4;

PLAYER_MAX_SPEED = 4;
PLAYER_START_SPEED = 2;
PLAYER_START_BOMB_ATTACK_RANGE = 1;

PLAYER_START_POSITIONS =
[
    {posX: 0, posY: 0},
    {posX: 14, posY: 0},
    {posX: 0, posY: 10},
    {posX: 14, posY: 10}
];

module.exports.Player = function(thisSocket, name, color)
{
    var socket = thisSocket;
    this.id = socket.id;
    this.name = name;
    this.color = color;
    this.roomOwner = false;
    this.posX = 0;
    this.posY = 0;
    this.canvasX = this.posX * CELL_WIDTH;
    this.canvasY = this.posY * CELL_HEIGHT;

    this.upKeyDown = false;
    this.rightKeyDown = false;
    this.downKeyDown = false;
    this.leftKeyDown = false;
    this.staying = true;

    this.direction = PLAYER_DIRECTION_DOWN;
    this.alive = true;
    this.showing = true;

    this.bombCount = 0;
    this.maxBomb = 1;
    this.bombAttackRange = PLAYER_START_BOMB_ATTACK_RANGE;
    this.speed = PLAYER_START_SPEED;
    this.cursed = false;

    var walking = false;

    this.setPosition = function(posX, posY)
    {
        this.posX = posX;
        this.posY = posY;
        this.canvasX = posX * CELL_WIDTH;
        this.canvasY = posY * CELL_HEIGHT;
    };

    this.tryToPickUpBonus = function()
    {
        if (globals.map[this.posY][this.posX].bonus !== null)
        {
            _useBonus(this, globals.map[this.posY][this.posX].bonus);
            globals.map[this.posY][this.posX].bonus = null;
        }

        function _useBonus(self, bonusId)
        {
            var playerParam = null;
            var newValue = null;
            switch (bonusId)
            {
                case BONUS_BOMB_ID:
                    self.maxBomb++;
                    playerParam = "maxBomb";
                    newValue = self.maxBomb;
                    break;
                case BONUS_FLAME_ID:
                    self.bombAttackRange++;
                    playerParam = "bombAttackRange";
                    newValue = self.bombAttackRange;
                    break;
                case BONUS_DOUBLE_FLAME_ID:
                    self.bombAttackRange+=2;
                    playerParam = "bombAttackRange";
                    newValue = self.bombAttackRange;
                    break;
                case BONUS_SPEED_ID:
                    if (self.speed != PLAYER_MAX_SPEED)
                    {
                        self.speed++;
                        playerParam = "speed";
                        newValue = self.speed;
                    }
                    break;
                case BONUS_CURSE_ID:
                    self.cursed = true;
                    playerParam = "cursed";
                    newValue = self.cursed;
                    break;
                case BONUS_EXHAUST_ID:
                    self.cursed = true;
                    playerParam = "cursed";
                    newValue = self.cursed;
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
            globals.io.to(socket.roomName).emit("bonusUsed", self.id, self.posX, self.posY, playerParam, newValue);
        }
    };

    this.update = function()
    {
        var oldDirection = this.direction;
        if (this.upKeyDown)
        {
            this.direction = PLAYER_DIRECTION_UP;
            if ((this.posY !== 0 && (globals.map[this.posY - 1][this.posX].y === -1)) ||
                (this.canvasY > this.posY * CELL_HEIGHT))
            {
                this.canvasY -= this.speed;
                globals.io.to(socket.roomName).emit("canvasYChanged", this.id, this.canvasY);
                if (this.canvasY < (this.posY - 0.5) * CELL_HEIGHT)
                {
                    this.posY--;
                    globals.io.to(socket.roomName).emit("posYChanged", this.id, this.posY);
                    this.tryToPickUpBonus();
                }
            }
        }
        else if (this.rightKeyDown)
        {
            this.direction = PLAYER_DIRECTION_RIGHT;
            if ((this.posX + 1 < CELLS_COUNT_HORIZONTAL && (globals.map[this.posY][this.posX + 1].y == -1)) ||
                (this.canvasX  < this.posX * CELL_WIDTH))
            {
                this.canvasX += this.speed;
                globals.io.to(socket.roomName).emit("canvasXChanged", this.id, this.canvasX);
                if (this.canvasX > (this.posX + 0.5) * CELL_WIDTH)
                {
                    this.posX++;
                    globals.io.to(socket.roomName).emit("posXChanged", this.id, this.posX);
                    this.tryToPickUpBonus();
                }
            }
        }
        else if (this.downKeyDown)
        {
            this.direction = PLAYER_DIRECTION_DOWN;
            if ((this.posY + 1 < CELLS_COUNT_VERTICAL && (globals.map[this.posY + 1][this.posX].y == -1)) ||
                (this.canvasY < this.posY * CELL_HEIGHT))
            {
                this.canvasY += this.speed;
                globals.io.to(socket.roomName).emit("canvasYChanged", this.id, this.canvasY);
                if (this.canvasY > (this.posY + 0.5) * CELL_HEIGHT)
                {
                    this.posY++;
                    globals.io.to(socket.roomName).emit("posYChanged", this.id, this.posY);
                    this.tryToPickUpBonus();
                }
            }
        }
        else if (this.leftKeyDown)
        {
            this.direction = PLAYER_DIRECTION_LEFT;
            if (this.posX !== 0 && (globals.map[this.posY][this.posX - 1].y === -1) ||
                (this.canvasX > this.posX * CELL_WIDTH))
            {
                this.canvasX -= this.speed;
                globals.io.to(socket.roomName).emit("canvasXChanged", this.id, this.canvasX);
                if (this.canvasX < (this.posX - 0.5) * CELL_WIDTH)
                {
                    this.posX--;
                    globals.io.to(socket.roomName).emit("posXChanged", this.id, this.posX);
                    this.tryToPickUpBonus();
                }
            }
        }
        if (oldDirection !== this.direction)
        {
            globals.io.to(socket.roomName).emit("directionChanged", this.id, this.direction);
        }
        var isStaying = _isStaying(this);
        if (isStaying && !this.staying || !isStaying && this.staying)
        {
            this.staying = _isStaying(this);
            globals.io.to(socket.roomName).emit("stayingChanged", this.id, this.staying);
        }
        if (_isPlayerOnFlame(this) && this.alive)
        {
            this.alive = false;
            globals.io.to(socket.roomName).emit("playerDied", this.id);
        }
    };

    function _isPlayerOnFlame(self)
    {
        var result = false;
        for (var i = 0; i < globals.flames.length; i++)
        {
            if (((globals.flames[i].posX == self.posX) && (globals.flames[i].upperWallPos.y <= self.posY) && (globals.flames[i].lowerWallPos.y >= self.posY) ||
                (globals.flames[i].posY == self.posY) && (globals.flames[i].leftWallPos.x <= self.posX) && (globals.flames[i].rightWallPos.x >= self.posX)) && self.alive)
            {
                result = true;
                break;
            }
        }
        return result;
    }

    function _isStaying(self)
    {
        return !self.upKeyDown && !self.rightKeyDown && !self.downKeyDown && !self.leftKeyDown;
    }
};
