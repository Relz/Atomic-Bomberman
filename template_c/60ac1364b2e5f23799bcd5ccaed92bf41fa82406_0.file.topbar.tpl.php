<?php
/* Smarty version 3.1.29, created on 2016-06-23 23:16:02
  from "/home/relz/public_html/clone/Atomic-Bomberman/templates/topbar.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_576c6db2683775_73490478',
  'file_dependency' => 
  array (
    '60ac1364b2e5f23799bcd5ccaed92bf41fa82406' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/templates/topbar.tpl',
      1 => 1466723752,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_576c6db2683775_73490478 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, false);
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, 'topbar', array (
  0 => 'block_951460845576c6db2681f29_59585076',
  1 => false,
  3 => 0,
  2 => 0,
));
}
/* {block 'topbar'}  file:topbar.tpl */
function block_951460845576c6db2681f29_59585076($_smarty_tpl, $_blockParentStack) {
?>

  <div class="topbar">
    <a href="." title="Atomic Bomberman" class="logo">
      <img src="../img/website/logo.png">
    </a>
    <div class="select-language">
      <a class="icon ru" href="?lang=ru_RU" title="RU">1</a>
      <a class="icon en" href="?lang=en_US" title="EN">2</a>
    </div>
    <div class="clearboth"></div>
  </div>
<?php
}
/* {/block 'topbar'} */
}
