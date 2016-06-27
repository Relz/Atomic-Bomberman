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
