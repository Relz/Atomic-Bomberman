exports.processWebsite = function(io)
{
    io.on("connection", function(socket)
    {
        socket.on("playerDisconnected", function(clientData)
        {
            console.log("playerDisconnected");
        });

        socket.on("playerConnect", function()
        {
            io.emit('playerConnect');
        });

        socket.on("createNewRoom", function(roomName)
        {
            io.emit('createNewRoom', roomName);
        });
    });
};
