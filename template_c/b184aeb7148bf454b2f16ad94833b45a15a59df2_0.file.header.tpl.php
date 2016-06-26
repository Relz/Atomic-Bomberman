<?php
/* Smarty version 3.1.29, created on 2016-06-23 20:37:35
  from "/home/relz/public_html/clone/Atomic-Bomberman/templates/header.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_576c488f9fe6c9_85924518',
  'file_dependency' => 
  array (
    'b184aeb7148bf454b2f16ad94833b45a15a59df2' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/templates/header.tpl',
      1 => 1466708489,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_576c488f9fe6c9_85924518 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, false);
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, 'head', array (
  0 => 'block_1800557519576c488f9f7976_76887635',
  1 => false,
  3 => 0,
  2 => 0,
));
}
/* {block 'head'}  file:header.tpl */
function block_1800557519576c488f9f7976_76887635($_smarty_tpl, $_blockParentStack) {
?>

  <head>
    <title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>
    <meta charset="utf-8" />
    <link rel="icon" href="../favicon.ico">
    <link rel="stylesheet" href="../css/style.css">
  </head>
<?php
}
/* {/block 'head'} */
}
