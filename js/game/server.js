var http = require('http');

var app = http.createServer(function(req, res) {
        console.log('createServer');
});
app.listen(3000);

var io = require('socket.io').listen(app);

var clients = [];
var playerCount = 0;
var savedMap = [];

io.on("connection", function(socket)
{
    socket.connectedToGame = false;

    socket.on("playerDisconnected", function(clientData)
    {
        console.log("playerDisconnected");
    });

    socket.on("playerConnect", function(username)
    {
        io.emit('playerConnect', playerCount);
        playerCount++;
    });

    socket.on("sendMap", function(map)
    {
        //console.log(map);
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
