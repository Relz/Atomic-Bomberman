var g_ctx = null;

var g_playerId = null;

var g_players = [];

var g_map = [
    [{x:0,y:-1,bonus:null},{x:0,y:-1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:-1,bonus:null},{x:0,y:-1,bonus:null}],
    [{x:0,y:-1,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:-1,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null}],
    [{x:0,y:-1,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:1,bonus:null},{x:0,y:-1,bonus:null}],
    [{x:0,y:-1,bonus:null},{x:0,y:-1,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:0,bonus:null},{x:0,y:-1,bonus:null},{x:0,y:-1,bonus:null}]
];
