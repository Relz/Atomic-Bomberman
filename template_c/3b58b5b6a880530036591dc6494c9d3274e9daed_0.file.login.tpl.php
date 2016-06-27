<?php
/* Smarty version 3.1.29, created on 2016-06-27 06:34:08
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/login.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_5770c8e0501be6_56347731',
  'file_dependency' => 
  array (
    '3b58b5b6a880530036591dc6494c9d3274e9daed' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/login.tpl',
      1 => 1467007572,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:layout.tpl' => 1,
  ),
),false)) {
function content_5770c8e0501be6_56347731 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, true);
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "main_content", array (
  0 => 'block_12260762875770c8e04d4864_66922493',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "login-form", array (
  0 => 'block_16847247905770c8e04d8fd5_54462963',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "scripts", array (
  0 => 'block_17774186185770c8e05006a4_76957011',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php $_smarty_tpl->ext->_inheritance->endChild($_smarty_tpl);
$_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:layout.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 2, false);
}
/* {block 'login-form'}  file:login.tpl */
function block_11303957125770c8e04d5fd3_90185661($_smarty_tpl, $_blockParentStack) {
}
/* {/block 'login-form'} */
/* {block 'main_content'}  file:login.tpl */
function block_12260762875770c8e04d4864_66922493($_smarty_tpl, $_blockParentStack) {
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "login-form", array (
  0 => 'block_11303957125770c8e04d5fd3_90185661',
  1 => false,
  3 => 0,
  2 => 0,
), $_blockParentStack);
?>

<?php
}
/* {/block 'main_content'} */
/* {block 'login-form'}  file:login.tpl */
function block_16847247905770c8e04d8fd5_54462963($_smarty_tpl, $_blockParentStack) {
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
/* {block 'scripts'}  file:login.tpl */
function block_17774186185770c8e05006a4_76957011($_smarty_tpl, $_blockParentStack) {
?>

<?php
}
/* {/block 'scripts'} */
}
