<?php
/* Smarty version 3.1.29, created on 2016-06-27 06:34:12
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/mainpage.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_5770c8e480ddf9_60582182',
  'file_dependency' => 
  array (
    '786a9c054624e651b94005aacfba8eb0d84e05f9' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/mainpage.tpl',
      1 => 1467007787,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:layout.tpl' => 1,
  ),
),false)) {
function content_5770c8e480ddf9_60582182 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, true);
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "main_content", array (
  0 => 'block_2949710095770c8e47fea83_19065785',
  1 => false,
  3 => 0,
  2 => 0,
));
?>


<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "room_list", array (
  0 => 'block_5376665745770c8e4805281_52827943',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "scripts", array (
  0 => 'block_5487445655770c8e480cb69_15537271',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php $_smarty_tpl->ext->_inheritance->endChild($_smarty_tpl);
$_smarty_tpl->smarty->ext->_subtemplate->render($_smarty_tpl, "file:layout.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 2, false);
}
/* {block 'room_list'}  file:mainpage.tpl */
function block_1244394245770c8e4801cf6_80500247($_smarty_tpl, $_blockParentStack) {
}
/* {/block 'room_list'} */
/* {block 'main_content'}  file:mainpage.tpl */
function block_2949710095770c8e47fea83_19065785($_smarty_tpl, $_blockParentStack) {
?>

<?php 
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, "room_list", array (
  0 => 'block_1244394245770c8e4801cf6_80500247',
  1 => false,
  3 => 0,
  2 => 0,
), $_blockParentStack);
?>

<?php
}
/* {/block 'main_content'} */
/* {block 'room_list'}  file:mainpage.tpl */
function block_5376665745770c8e4805281_52827943($_smarty_tpl, $_blockParentStack) {
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
/* {/block 'room_list'} */
/* {block 'scripts'}  file:mainpage.tpl */
function block_5487445655770c8e480cb69_15537271($_smarty_tpl, $_blockParentStack) {
?>

    <?php echo '<script'; ?>
 type="text/javascript" src="js/website/index.js"><?php echo '</script'; ?>
>
<?php
}
/* {/block 'scripts'} */
}