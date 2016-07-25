{block name=topbar}
  <div class="topbar">
    <a href="." title="Atomic Bomberman" class="logo">
      <img src="{$rootDir}img/website/logo.png">
    </a>
    {if $username != "" && !$inGameRoom}
      <span class="info_online">{$infoOnline}<span id="onlineCount" class="online_count"></span></span>
    {/if}
    {if $username != ""}
      <a href="?action=logout&lang={$lang}" class="logout_image" {if $inGameRoom}id="logout"{/if} title="{$logoutText}"></a>
    {/if}
    {if !$inGameRoom}
      <div class="select-language">
        <a class="icon ru" href="?lang=ru_RU" title="RU"></a>
        <a class="icon en" href="?lang=en_US" title="EN"></a>
      </div>
    {/if}
    {if $inGameRoom}
      <a class="room_exit" id="roomExit" title="{$btnLeaveGameRoom}">{$btnLeaveGameRoom}</a>
    {/if}
    {if $inGameRoom}
      <a class="room_start hidden" id="roomStart" title="{$btnStartGame}">{$btnStartGame}</a>
    {/if}
    <div class="clearboth"></div>
  </div>
{/block}
