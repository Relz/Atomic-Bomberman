{extends file="layout.tpl"}
{block name="main_content"}
{block name="login-form"}{/block}
{/block}
{block name="login-form"}
    <div class="content">
      <div class="login-form">
        <input type="text" class="input_name" placeholder="{$input_name_placeholder}"/>
        <a class="btn_login" href="#" title="Войти">{$btn_login_text}</a>
      </div>
    </div>
{/block}
{block name="scripts"}

{/block}
