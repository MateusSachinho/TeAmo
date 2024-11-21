const verificaSenha = () => {
    const entrada = document.getElementById("Senha").value
    const senha = "1d8557cc74f52fa41ba7f803573e04ba59ec1dadc9a31c669d4f535c61df909d"
    
    if (senha === hex_sha256(entrada)) {
        sessionStorage.setItem("logado", "sim")
        alert("Senha correta. Logado")
        window.location = "detalhes.html"
    } else {
        alert("Senha incorreta.")
    }
}

document.getElementById("Sair").onclick = () => {
    sessionStorage.removeItem("logado")
    alert("Saiu")
}