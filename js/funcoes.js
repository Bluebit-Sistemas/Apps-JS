
function funcoesJs(escolha)
{
    switch (escolha)
    {
        case "window-prompt":
        {
            var nome = window.prompt("Qual é o seu nome?");
            window.alert(`Prazer em te conhecer, ${nome}`);
            break;
        }
        case "window-confirm":
        {
            window.confirm("Deseja me doar R$5000,00?");
            break;
        }
    }
}
