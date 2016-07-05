{block name=topbar}
  <div class="topbar">
    <a href="." title="Atomic Bomberman" class="logo">
      <img src="{$rootDir}img/website/logo.png">
    </a>
    {if $username != ""}
      <a href="?action=logout&lang={$lang}" class="logout_image" title="{$logoutText}"></a>
    {/if}
    <div class="select-language">
      <a class="icon ru" href="?lang=ru_RU" title="RU"></a>
      <a class="icon en" href="?lang=en_US" title="EN"></a>
    </div>
    {if $inGameRoom}
      <a class="room_exit" id="roomExit">{$btnLeaveGameRoom}</a>
    {/if}
    {if $inGameRoom && $isRoomOwner}
      <a class="room_start" id="roomStart">{$btnStartGame}</a>
    {/if}
    <div class="clearboth"></div>
  </div>
{/block}
