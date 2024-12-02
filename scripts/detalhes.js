
if (!sessionStorage.getItem("logado")) {
    document.body.innerHTML = "<h1>Você precisa estar logado.</h1> <a href='index.html' class='botao-voltar'>Voltar ao Login</a>";
    throw new Error("Não autorizado");
}

const container = document.getElementById("atleta")

const params = new URLSearchParams(window.location.search)
const id = parseInt(params.get("id"))

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

document.getElementById("Sair").onclick = () => {
    sessionStorage.removeItem("logado")
    alert("Saiu")
    window.location = "index.html"
}

