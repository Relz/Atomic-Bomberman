<?php
/* Smarty version 3.1.29, created on 2016-06-26 21:13:06
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/topbar.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_577045626e6cd8_13498204',
  'file_dependency' => 
  array (
    '761d3aed3d90541c5d959a658e8b01f9a6f05525' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/topbar.tpl',
      1 => 1466975549,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_577045626e6cd8_13498204 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, false);
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, 'topbar', array (
  0 => 'block_1851117791577045626dc5e2_95905024',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php }
/* {block 'topbar'}  file:topbar.tpl */
function block_1851117791577045626dc5e2_95905024($_smarty_tpl, $_blockParentStack) {
?>

  <div class="topbar">
    <a href="." title="Atomic Bomberman" class="logo">
      <img src="<?php echo $_smarty_tpl->tpl_vars['rootDir']->value;?>
img/website/logo.png">
    </a>
    <?php if ($_smarty_tpl->tpl_vars['username']->value != '') {?>
      <a href="?action=logout&lang=<?php echo $_smarty_tpl->tpl_vars['lang']->value;?>
" class="logout_image" title="<?php echo $_smarty_tpl->tpl_vars['logoutText']->value;?>
"></a>
    <?php }?>
    <div class="select-language">
      <a class="icon ru" href="?lang=ru_RU" title="RU"></a>
      <a class="icon en" href="?lang=en_US" title="EN"></a>
    </div>
    <div class="clearboth"></div>
  </div>
<?php
}
/* {/block 'topbar'} */
}
