function handleKey(self, keyCode, state)
{
    var keyUp = PLAYER1_KEY_UP;
    var keyRight = PLAYER1_KEY_RIGHT;
    var keyDown = PLAYER1_KEY_DOWN;
    var keyLeft = PLAYER1_KEY_LEFT;
    var keyPlateBomb = PLAYER1_KEY_PLATE_BOMB;
    switch (self.playerId)
    {
        case 0:
            keyUp = PLAYER1_KEY_UP;
            keyRight = PLAYER1_KEY_RIGHT;
            keyDown = PLAYER1_KEY_DOWN;
            keyLeft = PLAYER1_KEY_LEFT;
            keyPlateBomb = PLAYER1_KEY_PLATE_BOMB;
            break;
        case 1:
            keyUp = PLAYER2_KEY_UP;
            keyRight = PLAYER2_KEY_RIGHT;
            keyDown = PLAYER2_KEY_DOWN;
            keyLeft = PLAYER2_KEY_LEFT;
            keyPlateBomb = PLAYER2_KEY_PLATE_BOMB;
            break;
        case 2:
            keyUp = PLAYER3_KEY_UP;
            keyRight = PLAYER3_KEY_RIGHT;
            keyDown = PLAYER3_KEY_DOWN;
            keyLeft = PLAYER3_KEY_LEFT;
            keyPlateBomb = PLAYER3_KEY_PLATE_BOMB;
            break;
        case 3:
            keyUp = PLAYER4_KEY_UP;
            keyRight = PLAYER4_KEY_RIGHT;
            keyDown = PLAYER4_KEY_DOWN;
            keyLeft = PLAYER4_KEY_LEFT;
            keyPlateBomb = PLAYER4_KEY_PLATE_BOMB;
            break;
    }
    switch (keyCode)
    {
        case keyUp:
            if (!self.cursed)
            {
                self.upKeyDown = state;
            }
            else
            {
                self.downKeyDown = state;
            }
        break;

        case keyRight:
            if (!self.cursed)
            {
                self.rightKeyDown = state;
            }
            else
            {
                self.leftKeyDown = state;
            }
        break;

        case keyDown:
            if (!self.cursed)
            {
                self.downKeyDown = state;
            }
            else
            {
                self.upKeyDown = state;
            }
        break;

        case keyLeft:
            if (!self.cursed)
            {
                self.leftKeyDown = state;
            }
            else
            {
                self.rightKeyDown = state;
            }
        break;

        case keyPlateBomb:
            addBombToPlayerPos(self, state);
        break;

        default: return;
    }
}
