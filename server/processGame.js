exports.processGame = function(io)
{
    var playerCount = 0;
    var clients = [];
    var savedMap = [];
    io.on("connection", function(socket)
    {
        socket.on("playerDisconnect", function(clientData)
        {
            console.log("playerDisconnect");
        });

        socket.on("playerConnect", function()
        {
            io.emit('playerConnect', playerCount);
            playerCount++;
        });

        socket.on("sendMap", function(map)
        {
            savedMap = map;
        });

        socket.on("getMap", function()
        {
            io.emit('getMap', savedMap);
        });

        socket.on("playerUpKeyDown", function(clientData)
        {
            io.emit('playerUpKeyDown', clientData);
        });

        socket.on("playerRightKeyDown", function(clientData)
        {
            io.emit('playerRightKeyDown', clientData);
        });

        socket.on("playerDownKeyDown", function(clientData)
        {
            io.emit('playerDownKeyDown', clientData);
        });

        socket.on("playerLeftKeyDown", function(clientData)
        {
            io.emit('playerLeftKeyDown', clientData);
        });

        socket.on("playerPlateBomb", function(clientData)
        {
            io.emit('playerPlateBomb', clientData);
        });

    });
};
