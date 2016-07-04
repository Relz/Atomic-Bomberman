function handleKey(self, keyCode, state)
{
    var keyUp = PLAYER1_KEY_UP;
    var keyRight = PLAYER1_KEY_RIGHT;
    var keyDown = PLAYER1_KEY_DOWN;
    var keyLeft = PLAYER1_KEY_LEFT;
    var keyPlateBomb = PLAYER1_KEY_PLATE_BOMB;

    var keyName;
    var message;
    var eventName;
    switch (keyCode)
    {
        case keyUp:
            processKey("upKeyDown", "downKeyDown", "playerUpKeyDown", "playerDownKeyDown");
        break;

        case keyRight:
            processKey("rightKeyDown", "leftKeyDown", "playerRightKeyDown", "playerLeftKeyDown");
        break;

        case keyDown:
            processKey("downKeyDown", "upKeyDown", "playerDownKeyDown", "playerUpKeyDown");
        break;

        case keyLeft:
            processKey("leftKeyDown", "rightKeyDown", "playerLeftKeyDown", "playerRightKeyDown");
        break;

        case keyPlateBomb:
            g_gameSocket.emit('playerPlateBomb', g_myRoomName, {playerId: self.playerId, posX: self.posX, posY: self.posY, state: state});
        break;

        default: return;
    }

    function processKey(key, invertedKey, event, invertedEvent)
    {
        keyName = self.cursed ? invertedKey : key;
        self[keyName] = state;

        message = {playerId: self.playerId};
        message[keyName] = state;

        eventName = self.cursed ? invertedEvent : event;
        g_gameSocket.emit(eventName, g_myRoomName, message);
    }
}
