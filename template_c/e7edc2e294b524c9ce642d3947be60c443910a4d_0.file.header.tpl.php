<?php
/* Smarty version 3.1.29, created on 2016-06-26 16:24:42
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/header.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_577001caf085f3_18739674',
  'file_dependency' => 
  array (
    'e7edc2e294b524c9ce642d3947be60c443910a4d' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/header.tpl',
      1 => 1466958260,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_577001caf085f3_18739674 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, false);
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, 'head', array (
  0 => 'block_1074288189577001caefd138_79979576',
  1 => false,
  3 => 0,
  2 => 0,
));
}
/* {block 'head'}  file:header.tpl */
function block_1074288189577001caefd138_79979576($_smarty_tpl, $_blockParentStack) {
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
