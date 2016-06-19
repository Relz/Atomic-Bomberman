PLAYER_DIRECTION_NONE = 0;
PLAYER_DIRECTION_UP = 1;
PLAYER_DIRECTION_RIGHT = 2;
PLAYER_DIRECTION_DOWN = 3;
PLAYER_DIRECTION_LEFT = 4;

PLAYER_DEATH_DURATION = 3000;

PLAYER_SPEED = 2;

g_playerDeathImages = ["img/players/death/01.png", "img/players/death/02.png", "img/players/death/03.png", "img/players/death/04.png", "img/players/death/05.png",
                       "img/players/death/06.png", "img/players/death/07.png", "img/players/death/08.png", "img/players/death/09.png", "img/players/death/10.png",
                       "img/players/death/11.png", "img/players/death/12.png", "img/players/death/13.png", "img/players/death/14.png", "img/players/death/15.png",
                       "img/players/death/16.png", "img/players/death/17.png", "img/players/death/18.png", "img/players/death/19.png", "img/players/death/20.png",
                       "img/players/death/21.png", "img/players/death/22.png", "img/players/death/23.png", "img/players/death/24.png", "img/players/death/25.png",
                       "img/players/death/26.png", "img/players/death/27.png", "img/players/death/28.png", "img/players/death/29.png", "img/players/death/30.png",
                       "img/players/death/31.png", "img/players/death/32.png", "img/players/death/33.png", "img/players/death/34.png", "img/players/death/35.png",
                       "img/players/death/36.png", "img/players/death/37.png", "img/players/death/38.png", "img/players/death/39.png", "img/players/death/40.png",
                       "img/players/death/41.png"];

function Player(color, posX, posY)
{
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.canvasX = posX * CELL_WIDTH;
    this.canvasY = posY * CELL_HEIGHT;
    this.direction = PLAYER_DIRECTION_DOWN;
    this.bombAttackRange = 5;
    this.playerImagePath = "img/players/stand_bottom.png";
    var playerImage = new Image();
    this.draw = function() 
    {
        var self = this;
        switch(self.direction){
            case PLAYER_DIRECTION_UP:
                playerImagePath = "img/players/stand_top.png";
            break;
            case PLAYER_DIRECTION_RIGHT:
                playerImagePath = "img/players/stand_right.png";
            break;
            case PLAYER_DIRECTION_DOWN:
                playerImagePath = "img/players/stand_bottom.png";
            break;
            case PLAYER_DIRECTION_LEFT:
                playerImagePath = "img/players/stand_left.png";
            break;
        }
        playerImage.src = playerImagePath;
        if (self.direction == PLAYER_DIRECTION_NONE)
        {
            self.canvasX = (self.posX * CELL_WIDTH) - (playerImage.width - CELL_WIDTH) / 2;
        }
        g_ctx.drawImage(playerImage, self.canvasX + CANVAS_MARGIN_LEFT_PX, self.canvasY + CANVAS_MARGIN_TOP_PX - playerImage.height / 2);
    };
    this.die = function()
    {
        var self = this;
        window.removeEventListener('keydown', keyDownEventListener, true);
        window.removeEventListener('keyup', keyUpEventListener, true);
        this.direction = PLAYER_DIRECTION_NONE;
        var i = 0;
        var decrementMS = PLAYER_DEATH_DURATION / g_playerDeathImages.length;
        var timerId = setInterval(function()
        {
            this.playerImagePath = g_playerDeathImages[i];
            i++;
            if (i == g_playerDeathImages.length)
            {
                clearInterval(timerId);
            }
        }, decrementMS);
    };
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
