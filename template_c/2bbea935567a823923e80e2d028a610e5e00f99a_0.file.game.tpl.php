<?php
/* Smarty version 3.1.29, created on 2016-06-26 21:15:05
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/game.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_577045d9ad0fa3_20089339',
  'file_dependency' => 
  array (
    '2bbea935567a823923e80e2d028a610e5e00f99a' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/game.tpl',
      1 => 1466975703,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:layout.tpl' => 1,
  ),
),false)) {
function content_577045d9ad0fa3_20089339 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, true);
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "main_content", array (
  0 => 'block_787720629577045d9acd3f3_43228750',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "scripts", array (
  0 => 'block_1382102380577045d9acfae2_33245280',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php $_smarty_tpl->ext->_inheritance->endChild($_smarty_tpl);
$_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:layout.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 2, false);
}
/* {block 'main_content'}  file:game.tpl */
function block_787720629577045d9acd3f3_43228750($_smarty_tpl, $_blockParentStack) {
?>

    <canvas height="480" width="640" id="canvas" class="canvas">Обновите браузер</canvas>
<?php
}
/* {/block 'main_content'} */
/* {block 'scripts'}  file:game.tpl */
function block_1382102380577045d9acfae2_33245280($_smarty_tpl, $_blockParentStack) {
?>

    <?php echo '<script'; ?>
 type="text/javascript" src="js/game/socket.io-1.4.5-min.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="js/game/socket.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="js/game/key_bind.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="js/game/bonus.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="js/game/map.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="js/game/player.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="js/game/bomb.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="js/game/flame.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="js/game/index.js"><?php echo '</script'; ?>
>
<?php
}
/* {/block 'scripts'} */
}
