var globals = require("./globals.js").globals;

module.exports.getRoomNamePos = function(roomName)
{
    var result = -1;
    for (var i = 0; i < globals.rooms.length; i++)
    {
        if (globals.rooms[i].roomName == roomName)
        {
            result = i;
            break;
        }
    }
    return result;
};

module.exports.getPlayerIdPos = function(roomNamePos, id)
{
    var result = -1;
    for (var i = 0; i < globals.rooms[roomNamePos].players.length; i++)
    {
        if (globals.rooms[roomNamePos].players[i].id == id)
        {
            result = i;
            break;
        }
    }
    return result;
};

module.exports.getPlayerNamePos = function(roomIndex, playerName)
{
    var result = -1;
    for (var i = 0; i < globals.rooms[roomIndex].players.length; i++)
    {
        if (globals.rooms[roomIndex].players[i].name == playerName)
        {
            result = i;
            break;
        }
    }
    return result;
};
