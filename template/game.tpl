{extends file="layout.tpl"}
{block name="main_content"}
    <canvas height="480" width="640" id="canvas" class="canvas">Обновите браузер</canvas>
{/block}
{block name="scripts"}
    <script type="text/javascript" src="js/game/socket.io-1.4.5-min.js"></script>
    <script type="text/javascript" src="js/game/global.js"></script>
    <script type="text/javascript" src="js/game/socket.js"></script>
    <script type="text/javascript" src="js/game/key_bind.js"></script>
    <script type="text/javascript" src="js/game/bonus.js"></script>
    <script type="text/javascript" src="js/game/map.js"></script>
    <script type="text/javascript" src="js/game/player.js"></script>
    <script type="text/javascript" src="js/game/bomb.js"></script>
    <script type="text/javascript" src="js/game/flame.js"></script>
    <script type="text/javascript" src="js/game/index.js"></script>
{/block}
