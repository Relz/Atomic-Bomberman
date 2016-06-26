<?php
/* Smarty version 3.1.29, created on 2016-06-23 20:38:31
  from "/home/relz/public_html/clone/Atomic-Bomberman/templates/layout.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_576c48c7225622_28096861',
  'file_dependency' => 
  array (
    '5b281a5656ad0554135cc34382d80d80dd52096b' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/templates/layout.tpl',
      1 => 1466714310,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:topbar.tpl' => 1,
    'file:footer.tpl' => 1,
  ),
),false)) {
function content_576c48c7225622_28096861 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, false);
?>


<!DOCTYPE html>
<html>
  <?php $_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

  <body>  
    <?php $_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:topbar.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

    <?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "main_content", array (
  0 => 'block_1495050701576c48c72204f3_78673204',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

    <?php $_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

  </body>
</html><?php }
/* {block 'main_content'}  file:layout.tpl */
function block_1495050701576c48c72204f3_78673204($_smarty_tpl, $_blockParentStack) {
}
/* {/block 'main_content'} */
}
