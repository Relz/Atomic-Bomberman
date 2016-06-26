<?php
/* Smarty version 3.1.29, created on 2016-06-24 00:09:02
  from "/home/relz/public_html/clone/Atomic-Bomberman/templates/mainpage.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_576c7a1eef80a5_93905254',
  'file_dependency' => 
  array (
    'eaa32711a0bed74d8309cf0af9d872eb07b111dc' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/templates/mainpage.tpl',
      1 => 1466726934,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:layout.tpl' => 1,
  ),
),false)) {
function content_576c7a1eef80a5_93905254 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, true);
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "main_content", array (
  0 => 'block_603598208576c7a1eeeccb6_90291981',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "login-form", array (
  0 => 'block_606728910576c7a1eef0f41_38015574',
  1 => false,
  3 => 0,
  2 => 0,
));
$_smarty_tpl->ext->_inheritance->endChild($_smarty_tpl);
$_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:layout.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 2, false);
}
/* {block 'login-form'}  file:mainpage.tpl */
function block_202667749576c7a1eeee5e0_71429895($_smarty_tpl, $_blockParentStack) {
}
/* {/block 'login-form'} */
/* {block 'main_content'}  file:mainpage.tpl */
function block_603598208576c7a1eeeccb6_90291981($_smarty_tpl, $_blockParentStack) {
?>
 
<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "login-form", array (
  0 => 'block_202667749576c7a1eeee5e0_71429895',
  1 => false,
  3 => 0,
  2 => 0,
), $_blockParentStack);
?>

<?php
}
/* {/block 'main_content'} */
/* {block 'login-form'}  file:mainpage.tpl */
function block_606728910576c7a1eef0f41_38015574($_smarty_tpl, $_blockParentStack) {
?>

    <div class="content background-image<?php echo $_smarty_tpl->tpl_vars['rand']->value;?>
">
      <div class="login-form">
        <input type="text" class="input_name" placeholder="<?php echo $_smarty_tpl->tpl_vars['input_name_placeholder']->value;?>
"/>
        <a class="btn_login" href="#" title="Войти"><?php echo $_smarty_tpl->tpl_vars['btn_login_text']->value;?>
</a>
      </div>
    </div>
<?php
}
/* {/block 'login-form'} */
}
