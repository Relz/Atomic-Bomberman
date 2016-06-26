<?php
/* Smarty version 3.1.29, created on 2016-06-26 16:41:29
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/mainpage.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_577005b9b59e32_59296936',
  'file_dependency' => 
  array (
    '786a9c054624e651b94005aacfba8eb0d84e05f9' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/mainpage.tpl',
      1 => 1466959288,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:layout.tpl' => 1,
  ),
),false)) {
function content_577005b9b59e32_59296936 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, true);
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "main_content", array (
  0 => 'block_1346883354577005b9b4dc53_65103951',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "login-form", array (
  0 => 'block_1932231336577005b9b52dd1_31236047',
  1 => false,
  3 => 0,
  2 => 0,
));
$_smarty_tpl->ext->_inheritance->endChild($_smarty_tpl);
$_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:layout.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 2, false);
}
/* {block 'login-form'}  file:mainpage.tpl */
function block_1229689784577005b9b4f7f8_31437554($_smarty_tpl, $_blockParentStack) {
}
/* {/block 'login-form'} */
/* {block 'main_content'}  file:mainpage.tpl */
function block_1346883354577005b9b4dc53_65103951($_smarty_tpl, $_blockParentStack) {
?>
 
<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "login-form", array (
  0 => 'block_1229689784577005b9b4f7f8_31437554',
  1 => false,
  3 => 0,
  2 => 0,
), $_blockParentStack);
?>

<?php
}
/* {/block 'main_content'} */
/* {block 'login-form'}  file:mainpage.tpl */
function block_1932231336577005b9b52dd1_31236047($_smarty_tpl, $_blockParentStack) {
?>

    <div class="content">
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
