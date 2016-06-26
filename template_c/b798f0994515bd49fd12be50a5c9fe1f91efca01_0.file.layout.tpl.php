<?php
/* Smarty version 3.1.29, created on 2016-06-26 16:44:00
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/layout.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_5770065064ab13_76108246',
  'file_dependency' => 
  array (
    'b798f0994515bd49fd12be50a5c9fe1f91efca01' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/layout.tpl',
      1 => 1466959439,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:head.tpl' => 1,
    'file:topbar.tpl' => 1,
    'file:footer.tpl' => 1,
  ),
),false)) {
function content_5770065064ab13_76108246 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, false);
?>


<!DOCTYPE html>
<html>
  <?php $_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:head.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

  <body class="<?php echo $_smarty_tpl->tpl_vars['bodyClass']->value;?>
">  
    <?php $_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:topbar.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

    <?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "main_content", array (
  0 => 'block_113643886757700650643c12_96355031',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

    <?php $_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

    <?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "scripts", array (
  0 => 'block_181868781457700650648bb4_82427947',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

  </body>
</html><?php }
/* {block 'main_content'}  file:layout.tpl */
function block_113643886757700650643c12_96355031($_smarty_tpl, $_blockParentStack) {
}
/* {/block 'main_content'} */
/* {block 'scripts'}  file:layout.tpl */
function block_181868781457700650648bb4_82427947($_smarty_tpl, $_blockParentStack) {
}
/* {/block 'scripts'} */
}
