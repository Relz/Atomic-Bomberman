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
    <span class="rooms_header_text">Игровые комнаты</span>
    <ul class="room_list" id="room_list">
    {foreach from=$rooms item=roomName}
      <span class="rooms_empty_hidden" id="roomsEmptyText">Не найдено ни одной игровой комнаты</span>
      <li>{$roomName}</li>
    {foreachelse}
      <span class="rooms_empty" id="roomsEmptyText">Не найдено ни одной игровой комнаты</span>
    {/foreach}
    </ul>
  </div>
{/block}

{block name="room_create"}
  <form class="room_create_form">
    <span class="room_header_text">{$headerCreateRoom}</span>
    <div class="block_room_name">
      <input style="display:none" type="text" name="fake_username_remembered"/>
      <input style="display:none" type="password" name="fake_password_remembered"/>
      <label for="roomName">{$labelRoomName}<span class="required_field">{$symbolRequired}</span></label>
      <input type="text" class="room_name" id="roomName"/>
    </div>
    <div class="block_room_password">
      <label for="roomPassword">{$labelRoomPassword}</label>
      <input type="password" class="room_password" id="roomPassword"/>
    </div>
    <input type="button" value="{$btnCreateRoomText}" class="submit" title="{$btnCreateRoomText}" id="btnCreateNewRoom"/>
  </form>
{/block}

{block name="scripts"}
  <script type="text/javascript" src="js/vendor/socket.io-1.4.5-min.js"></script>
  <script type="text/javascript" src="js/vendor/jquery-3.0.0.min.js"></script>
  <script type="text/javascript" src="js/website/socket.js"></script>
  <script type="text/javascript" src="js/website/index.js"></script>
{/block}
