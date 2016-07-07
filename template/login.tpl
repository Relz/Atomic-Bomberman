{extends file="layout.tpl"}
{block name="main_content"}
  {block name="login-form"}{/block}
{/block}

{block name="login-form"}
  <div class="content">
    <div class="block_login-form">
      <form class="login-form" action="index.php?lang={$lang}" method="post">
        <input type="text" id="inputName" name="username" class="input_name" placeholder="{$inputNamePlaceholder}" autocomplete="off"/>
        <input type="submit" id="btnLogin" class="btn_login" href="#" title="{$btnLoginText}" value="{$btnLoginText}"/>
      </form>
    </div>
    <div class="{if $isLoginError}error_message{else}error_message_hidden{/if}">
      {$errorUsernameNotFree}
    </div>
  </div>
{/block}

{block name="scripts"}
  <script type="text/javascript" src="js/vendor/cookie.js"></script>
  <script type="text/javascript" src="js/website/login.js"></script>
{/block}
