var btnLogin = document.getElementById("btnLogin");
var inputName = document.getElementById("inputName");

if (btnLogin !== null)
{
    btnLogin.addEventListener("click", function()
    {
        setCookie("player_name", inputName.value);
    });
}
