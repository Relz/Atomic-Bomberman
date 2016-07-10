var http = require("http");

var gameIo = initServer(3000);
var websiteIo = initServer(3001);

require("./process_game.js").processGame(gameIo);
require("./process_website.js").processWebsite(websiteIo);

function initServer(port)
{
    var httpServ = http.createServer();
    httpServ.listen(port);
    return require("socket.io").listen(httpServ);
}
