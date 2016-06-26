<?php
/* Smarty version 3.1.29, created on 2016-06-26 17:33:29
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/mainpage.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_577011e9ca4ac4_39002022',
  'file_dependency' => 
  array (
    '786a9c054624e651b94005aacfba8eb0d84e05f9' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/mainpage.tpl',
      1 => 1466962408,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:layout.tpl' => 1,
  ),
),false)) {
function content_577011e9ca4ac4_39002022 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, true);
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "main_content", array (
  0 => 'block_1857711927577011e9c99210_54850245',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "login-form", array (
  0 => 'block_1875219913577011e9c9c8e4_65234918',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "scripts", array (
  0 => 'block_980984742577011e9ca37d1_64052741',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php $_smarty_tpl->ext->_inheritance->endChild($_smarty_tpl);
$_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:layout.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 2, false);
}
/* {block 'login-form'}  file:mainpage.tpl */
function block_861177612577011e9c9a687_41778109($_smarty_tpl, $_blockParentStack) {
}
/* {/block 'login-form'} */
/* {block 'main_content'}  file:mainpage.tpl */
function block_1857711927577011e9c99210_54850245($_smarty_tpl, $_blockParentStack) {
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "login-form", array (
  0 => 'block_861177612577011e9c9a687_41778109',
  1 => false,
  3 => 0,
  2 => 0,
), $_blockParentStack);
?>

<?php
}
/* {/block 'main_content'} */
/* {block 'login-form'}  file:mainpage.tpl */
function block_1875219913577011e9c9c8e4_65234918($_smarty_tpl, $_blockParentStack) {
?>

    <div class="content">
      <form class="login-form" action="index.php?lang=<?php echo $_smarty_tpl->tpl_vars['lang']->value;?>
" method="post">
        <input type="text" name="username" class="input_name" placeholder="<?php echo $_smarty_tpl->tpl_vars['inputNamePlaceholder']->value;?>
"/>
        <input type="submit" id="btnLogin" class="btn_login" href="#" title="Войти" value="<?php echo $_smarty_tpl->tpl_vars['btnLoginText']->value;?>
"/>
      </form>
    </div>
<?php
}
/* {/block 'login-form'} */
/* {block 'scripts'}  file:mainpage.tpl */
function block_980984742577011e9ca37d1_64052741($_smarty_tpl, $_blockParentStack) {
?>

    <?php echo '<script'; ?>
 type="text/javascript" src="js/website/index.js"><?php echo '</script'; ?>
>
<?php
}
/* {/block 'scripts'} */
}
