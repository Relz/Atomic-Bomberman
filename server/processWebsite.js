exports.processWebsite = function(io)
{
    io.on("connection", function(socket)
    {
        socket.on("playerConnect", function()
        {
            io.emit('playerConnect');
        });

        socket.on("createNewRoom", function(roomName)
        {
            io.emit('createNewRoom', roomName);
        });

        socket.on("removeRoom", function(roomName)
        {
            io.emit('removeRoom', roomName);
        });
    });
};
