function handleKey(self, keyCode, state)
{
    var keyName;
    var message;
    var eventName;
    switch (keyCode)
    {
        case PLAYER1_KEY_UP:
            processKey("upKeyDown", "downKeyDown", "playerUpKeyDown", "playerDownKeyDown");
        break;

        case PLAYER1_KEY_RIGHT:
            processKey("rightKeyDown", "leftKeyDown", "playerRightKeyDown", "playerLeftKeyDown");
        break;

        case PLAYER1_KEY_DOWN:
            processKey("downKeyDown", "upKeyDown", "playerDownKeyDown", "playerUpKeyDown");
        break;

        case PLAYER1_KEY_LEFT:
            processKey("leftKeyDown", "rightKeyDown", "playerLeftKeyDown", "playerRightKeyDown");
        break;

        case PLAYER1_KEY_PLATE_BOMB:
            g_gameSocket.emit("playerPlateBomb", g_playerRoomName, {playerId: self.playerId, posX: self.posX, posY: self.posY, state: state});
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
        g_gameSocket.emit(eventName, g_playerRoomName, message);
    }
}
