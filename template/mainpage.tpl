{extends file="layout.tpl"}
{block name="main_content"}
  <div class="content">
    {block name="room_list"}{/block}
    {block name="room_create"}{/block}
    <div class="clearboth"></div>
  </div>
{/block}

{block name="room_list"}
  <div class="rooms">
    <span class="rooms_header_text">{$headerGameRooms}</span>
    <ul class="room_list" id="room_list">
    <span class="rooms_empty" id="roomsEmptyText">{$infoEmptyRoomList}</span>
    </ul>
  </div>
{/block}

{block name="room_create"}
  <form class="room_create_form">
    <span class="room_header_text">{$headerCreateRoom}</span>
    <input style="display:none" type="text" name="fake_username_remembered"/>
    <input style="display:none" type="password" name="fake_password_remembered"/>
    <div class="block_room_name">
      <label for="roomName">{$labelRoomName}<span class="required_field">{$symbolRequired}</span></label>
      <input type="text" class="room_name" id="roomName" autofocus/>
    </div>
    <div class="block_room_password">
      <label for="roomPassword">{$labelRoomPassword}</label>
      <input type="password" class="room_password" id="roomPassword"/>
    </div>
    <div class="block_player_count">
      <label for="playerCount">{$labelPlayerCount}</label>
      <input type="number" class="player_count" id="playerCount" value="2" min="1" max="4">
    </div>
    <input type="button" value="{$btnCreateRoomText}" class="submit" title="{$btnCreateRoomText}" id="btnCreateNewRoom"/>
  </form>
{/block}

{block name="scripts"}
  <script type="text/javascript" src="js/vendor/cookie.js"></script>
  <script type="text/javascript" src="js/vendor/socket.io-1.4.5-min.js"></script>
  <script type="text/javascript" src="js/vendor/jquery-3.0.0.min.js"></script>
  <script type="text/javascript" src="js/website/socket.js"></script>
  <script type="text/javascript" src="js/website/index.js"></script>
{/block}
