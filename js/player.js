PLAYER_DIRECTION_NONE = 0;
PLAYER_DIRECTION_UP = 1;
PLAYER_DIRECTION_RIGHT = 2;
PLAYER_DIRECTION_DOWN = 3;
PLAYER_DIRECTION_LEFT = 4;

PLAYER_DEATH_DURATION = 3000;
PLAYER_WALK_DURATION = 300;

PLAYER_SPEED = 2;

g_playerDeathImages = ["img/player/death/01.png", "img/player/death/02.png", "img/player/death/03.png", "img/player/death/04.png", "img/player/death/05.png",
                       "img/player/death/06.png", "img/player/death/07.png", "img/player/death/08.png", "img/player/death/09.png", "img/player/death/10.png",
                       "img/player/death/11.png", "img/player/death/12.png", "img/player/death/13.png", "img/player/death/14.png", "img/player/death/15.png",
                       "img/player/death/16.png", "img/player/death/17.png", "img/player/death/18.png", "img/player/death/19.png", "img/player/death/20.png",
                       "img/player/death/21.png", "img/player/death/22.png", "img/player/death/23.png", "img/player/death/24.png", "img/player/death/25.png",
                       "img/player/death/26.png", "img/player/death/27.png", "img/player/death/28.png", "img/player/death/29.png", "img/player/death/30.png",
                       "img/player/death/31.png", "img/player/death/32.png", "img/player/death/33.png", "img/player/death/34.png", "img/player/death/35.png",
                       "img/player/death/36.png", "img/player/death/37.png", "img/player/death/38.png", "img/player/death/39.png", "img/player/death/40.png",
                       "img/player/death/41.png"];

g_playerWalkUpImages = ["img/player/walk/up/01.png", "img/player/walk/up/02.png", "img/player/walk/up/03.png", "img/player/walk/up/04.png",
                      "img/player/walk/up/05.png", "img/player/walk/up/06.png", "img/player/walk/up/07.png", "img/player/walk/up/08.png",
                      "img/player/walk/up/09.png", "img/player/walk/up/10.png", "img/player/walk/up/11.png", "img/player/walk/up/12.png",
                      "img/player/walk/up/13.png", "img/player/walk/up/14.png", "img/player/walk/up/15.png"];

g_playerWalkRightImages = ["img/player/walk/right/01.png", "img/player/walk/right/02.png", "img/player/walk/right/03.png", "img/player/walk/right/04.png",
                      "img/player/walk/right/05.png", "img/player/walk/right/06.png", "img/player/walk/right/07.png", "img/player/walk/right/08.png",
                      "img/player/walk/right/09.png", "img/player/walk/right/10.png", "img/player/walk/right/11.png", "img/player/walk/right/12.png",
                      "img/player/walk/right/13.png", "img/player/walk/right/14.png", "img/player/walk/right/15.png"];

g_playerWalkDownImages = ["img/player/walk/down/01.png", "img/player/walk/down/02.png", "img/player/walk/down/03.png", "img/player/walk/down/04.png",
                      "img/player/walk/down/05.png", "img/player/walk/down/06.png", "img/player/walk/down/07.png", "img/player/walk/down/08.png",
                      "img/player/walk/down/09.png", "img/player/walk/down/10.png", "img/player/walk/down/11.png", "img/player/walk/down/12.png",
                      "img/player/walk/down/13.png", "img/player/walk/down/14.png", "img/player/walk/down/15.png"];

g_playerWalkLeftImages = ["img/player/walk/left/01.png", "img/player/walk/left/02.png", "img/player/walk/left/03.png", "img/player/walk/left/04.png",
                      "img/player/walk/left/05.png", "img/player/walk/left/06.png", "img/player/walk/left/07.png", "img/player/walk/left/08.png",
                      "img/player/walk/left/09.png", "img/player/walk/left/10.png", "img/player/walk/left/11.png", "img/player/walk/left/12.png",
                      "img/player/walk/left/13.png", "img/player/walk/left/14.png", "img/player/walk/left/15.png"];

function Player(color, posX, posY)
{
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.canvasX = posX * CELL_WIDTH;
    this.canvasY = posY * CELL_HEIGHT;
    this.direction = PLAYER_DIRECTION_DOWN;
    this.bombAttackRange = 5;
    this.playerImagePath = "img/player/stand_bottom.png";
    this.alive = true;
    var playerImage = new Image();
    var walking = false;
    this.draw = function() 
    {
        var self = this;
        if (isStaying())
        {
            switch(self.direction){
                case PLAYER_DIRECTION_UP:
                    playerImagePath = "img/player/stand_top.png";
                break;
                case PLAYER_DIRECTION_RIGHT:
                    playerImagePath = "img/player/stand_right.png";
                break;
                case PLAYER_DIRECTION_DOWN:
                    playerImagePath = "img/player/stand_bottom.png";
                break;
                case PLAYER_DIRECTION_LEFT:
                    playerImagePath = "img/player/stand_left.png";
                break;
            }
        }
        else
        {
            if (!walking && self.alive)
            {
                walk(self);
            }
        }
        playerImage.src = playerImagePath;
        if (!self.alive)
        {
            self.canvasX = (self.posX * CELL_WIDTH) - (playerImage.width - CELL_WIDTH) / 2;
        }
        g_ctx.drawImage(playerImage, self.canvasX + CANVAS_MARGIN_LEFT_PX, self.canvasY + CANVAS_MARGIN_TOP_PX - playerImage.height / 2);
    };

    this.die = function()
    {
        this.alive = false;
        window.removeEventListener("keydown" , keyDownEventListener, true);
        window.removeEventListener("keyup", keyUpEventListener, true);
        this.direction = PLAYER_DIRECTION_NONE;
        var i = 0;
        var delay = PLAYER_DEATH_DURATION / g_playerDeathImages.length;
        var timer = setInterval(function()
        {
            this.playerImagePath = g_playerDeathImages[i];
            i++;
            if (i == g_playerDeathImages.length)
            {
                clearInterval(timer);
            }
        }, delay);
    };

    function isStaying()
    {
        return !g_upKeyDown && !g_rightKeyDown && !g_downKeyDown && !g_leftKeyDown;
    }

    function walk(self)
    {
        walking = true;
        var walkImages = g_playerWalkDownImages;
        var i = 0;
        var delay = PLAYER_WALK_DURATION / walkImages.length;
        var timer = setInterval(function()
        {
            switch(self.direction){
                case PLAYER_DIRECTION_UP:
                    walkImages = g_playerWalkUpImages;
                break;
                case PLAYER_DIRECTION_RIGHT:
                    walkImages = g_playerWalkRightImages;
                break;
                case PLAYER_DIRECTION_DOWN:
                    walkImages = g_playerWalkDownImages;
                break;
                case PLAYER_DIRECTION_LEFT:
                    walkImages = g_playerWalkLeftImages;
                break;
                default:
                    walkImages = g_playerWalkDownImages;
                    break;
            }
            delay = PLAYER_WALK_DURATION / walkImages.length;
            this.playerImagePath = walkImages[i];
            i++;
            if (i == walkImages.length)
            {
                i = 0;
            }
            if (isStaying() || !self.alive)
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
        case 37: case 65: // left
            g_leftKeyDown = state;
        break;

        case 38: case 87: // up
            g_upKeyDown = state;
        break;

        case 39: case 68: // right
            g_rightKeyDown = state;
        break;

        case 40: case 83: // down
            g_downKeyDown = state;
        break;

        case 16: // shift
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
