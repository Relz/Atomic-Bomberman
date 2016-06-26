function handleKey(self, keyCode, state)
{
    var keyUp = PLAYER1_KEY_UP;
    var keyRight = PLAYER1_KEY_RIGHT;
    var keyDown = PLAYER1_KEY_DOWN;
    var keyLeft = PLAYER1_KEY_LEFT;
    var keyPlateBomb = PLAYER1_KEY_PLATE_BOMB;
    keyUp = PLAYER1_KEY_UP;
    keyRight = PLAYER1_KEY_RIGHT;
    keyDown = PLAYER1_KEY_DOWN;
    keyLeft = PLAYER1_KEY_LEFT;
    keyPlateBomb = PLAYER1_KEY_PLATE_BOMB;
    /*switch (self.playerId)
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
    }*/
    switch (keyCode)
    {
        case keyUp:
            if (!self.cursed)
            {
                self.upKeyDown = state;
                g_socket.emit('playerUpKeyDown', {playerId: self.playerId, upKeyDown: self.upKeyDown});
            }
            else
            {
                self.downKeyDown = state;
                g_socket.emit('playerDownKeyDown', {playerId: self.playerId, downKeyDown: self.downKeyDown});
            }
        break;

        case keyRight:
            if (!self.cursed)
            {
                self.rightKeyDown = state;
                g_socket.emit('playerRightKeyDown', {playerId: self.playerId, rightKeyDown: self.rightKeyDown});
            }
            else
            {
                self.leftKeyDown = state;
                g_socket.emit('playerLeftKeyDown', {playerId: self.playerId, leftKeyDown: self.leftKeyDown});
            }
        break;

        case keyDown:
            if (!self.cursed)
            {
                self.downKeyDown = state;
                g_socket.emit('playerDownKeyDown', {playerId: self.playerId, downKeyDown: self.downKeyDown});
            }
            else
            {
                self.upKeyDown = state;
                g_socket.emit('playerUpKeyDown', {playerId: self.playerId, upKeyDown: self.upKeyDown});
            }
        break;

        case keyLeft:
            if (!self.cursed)
            {
                self.leftKeyDown = state;
                g_socket.emit('playerLeftKeyDown', {playerId: self.playerId, leftKeyDown: self.leftKeyDown});
            }
            else
            {
                self.rightKeyDown = state;
                g_socket.emit('playerRightKeyDown', {playerId: self.playerId, rightKeyDown: self.rightKeyDown});
            }
        break;

        case keyPlateBomb:
            addBombToPlayerPos(self, state);
            g_socket.emit('playerPlateBomb', {playerId: self.playerId, state: state});
        break;

        default: return;
    }
}
