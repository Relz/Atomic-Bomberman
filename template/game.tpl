{extends file="layout.tpl"}
{block name="main_content"}
  <div class="content">
    <div class="left_block">
      {block name="player_list"}{/block}
      {block name="player_choose_model"}{/block}
    </div>
    <div class="game">
      <canvas height="480" width="640" id="canvas" class="canvas">Обновите браузер</canvas>
      {block name="choose_map"}{/block}
    </div>
    {block name="chat"}{/block}
    <div class="clearboth"></div>
  </div>
{/block}

{block name="player_list"}
  <div class="players">
    <span class="players_header_text">Игроки</span>
    <ul class="player_list" id="player_list">
    {foreach from=$players item=playerName}
      <li>{$playerName}</li>
    {/foreach}
    </ul>
  </div>
{/block}

{block name="player_choose_model"}
  <div class="player_models">
    <ul class="player_model_list">
      <li class="player_model player_model0" data-color="black"></li>
      <li class="player_model player_model1" data-color="red"></li>
      <li class="player_model player_model2" data-color="green"></li>
      <li class="player_model player_model3" data-color="blue"></li>
      <li class="player_model player_model4" data-color="purple"></li>
    </ul>
  </div>
{/block}

{block name="choose_map"}
  <table class="choose_map" id="choose_map" cellspacing="20">
    <tr><td class="previews preview0" data-index="0"></td><td class="previews preview1" data-index="1"></td><td class="previews preview2" data-index="2"></td><td class="previews preview3" data-index="3"></td></tr>
    <tr><td class="previews preview4" data-index="4"></td><td class="previews preview5" data-index="5"></td><td class="previews preview6" data-index="6"></td><td class="previews preview7" data-index="7"></td></tr>
    <tr><td class="previews preview8" data-index="8"></td><td class="previews preview9" data-index="9"></td><td class="previews preview10 data-index="10""></td></tr>
  </table>
{/block}

{block name="chat"}
  <div class="chat">
    <span class="chat_header_text">Чат</span>
    <span class="tip_for_future">Здесь будет чат</span>
  </div>
{/block}

{block name="scripts"}
  <script type="text/javascript" src="js/vendor/socket.io-1.4.5-min.js"></script>
  <script type="text/javascript" src="js/game/socket.js"></script>
  <script type="text/javascript" src="js/game/key_bind.js"></script>
  <script type="text/javascript" src="js/game/bonus.js"></script>
  <script type="text/javascript" src="js/game/map.js"></script>
  <script type="text/javascript" src="js/game/player.js"></script>
  <script type="text/javascript" src="js/game/bomb.js"></script>
  <script type="text/javascript" src="js/game/flame.js"></script>
  <script type="text/javascript" src="js/game/index.js"></script>
{/block}
