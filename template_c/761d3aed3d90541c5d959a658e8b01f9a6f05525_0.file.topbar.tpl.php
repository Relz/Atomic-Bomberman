<?php
/* Smarty version 3.1.29, created on 2016-06-26 16:24:42
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/topbar.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_577001caf17921_77564858',
  'file_dependency' => 
  array (
    '761d3aed3d90541c5d959a658e8b01f9a6f05525' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/topbar.tpl',
      1 => 1466958279,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_577001caf17921_77564858 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, false);
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, 'topbar', array (
  0 => 'block_295441889577001caf14202_80497687',
  1 => false,
  3 => 0,
  2 => 0,
));
}
/* {block 'topbar'}  file:topbar.tpl */
function block_295441889577001caf14202_80497687($_smarty_tpl, $_blockParentStack) {
?>

  <div class="topbar">
    <a href="." title="Atomic Bomberman" class="logo">
      <img src="<?php echo $_smarty_tpl->tpl_vars['rootDir']->value;?>
img/website/logo.png">
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
