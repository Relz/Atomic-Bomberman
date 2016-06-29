var http = require('http');

var gameIo = initServer(3000);
var websiteIo = initServer(3001);

require("./processGame.js").processGame(gameIo);
require('./processWebsite.js').processWebsite(websiteIo);

function initServer(port)
{
    var httpServ = http.createServer();
    httpServ.listen(port);
    return require('socket.io').listen(httpServ);
}
