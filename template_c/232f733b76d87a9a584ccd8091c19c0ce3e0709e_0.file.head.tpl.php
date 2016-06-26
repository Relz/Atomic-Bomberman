<?php
/* Smarty version 3.1.29, created on 2016-06-26 16:38:21
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/head.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_577004fd6ae110_67502799',
  'file_dependency' => 
  array (
    '232f733b76d87a9a584ccd8091c19c0ce3e0709e' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/head.tpl',
      1 => 1466958260,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_577004fd6ae110_67502799 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, false);
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, 'head', array (
  0 => 'block_1147460022577004fd6a6641_97866001',
  1 => false,
  3 => 0,
  2 => 0,
));
}
/* {block 'head'}  file:head.tpl */
function block_1147460022577004fd6a6641_97866001($_smarty_tpl, $_blockParentStack) {
?>

  <head>
    <title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>
    <meta charset="utf-8" />
    <link rel="icon" href="<?php echo $_smarty_tpl->tpl_vars['rootDir']->value;?>
favicon.ico">
    <link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['rootDir']->value;?>
css/style.css">
  </head>
<?php
}
/* {/block 'head'} */
}
