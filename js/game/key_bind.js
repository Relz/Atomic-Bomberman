function handleKey(self, keyCode, state)
{
    if (inputSendChatMessage !== document.activeElement)
    {
        switch (keyCode)
        {
            case PLAYER1_KEY_UP:
                var playerIdPos = getPlayerIdPos(g_playerId);
                if (playerIdPos != -1)
                {
                    var key = self.cursed ? "downKeyDown" : "upKeyDown";
                    g_players[playerIdPos][key] = state;
                }
                break;
            case PLAYER1_KEY_RIGHT:
                var playerIdPos = getPlayerIdPos(g_playerId);
                if (playerIdPos != -1)
                {
                    var key = self.cursed ? "leftKeyDown" : "rightKeyDown";
                    g_players[playerIdPos][key] = state;
                }
                break;
            case PLAYER1_KEY_DOWN:
                var playerIdPos = getPlayerIdPos(g_playerId);
                if (playerIdPos != -1)
                {
                    var key = self.cursed ? "upKeyDown" : "downKeyDown";
                    g_players[playerIdPos][key] = state;
                }
                break;
            case PLAYER1_KEY_LEFT:
                var playerIdPos = getPlayerIdPos(g_playerId);
                if (playerIdPos != -1)
                {
                    var key = self.cursed ? "rightKeyDown" : "leftKeyDown";
                    g_players[playerIdPos][key] = state;
                }
                break;
            case PLAYER1_KEY_PLATE_BOMB:
                g_socket.emit("playerPlateBomb", state);
                break;
            default: return;
        }
    }
}
