const container = document.querySelector(".div-atletas")
const select = document.querySelector('.select-elencos')

const verificaSenha = () => {
    const entrada = document.getElementById("Senha").value
    const senha = "b1d5fcbd5e9f279b74640d03004b1ed8bb78e7a7c27a260d6294db9d63fd4e3b"
    
    if (senha === hex_sha256(entrada)) {
        sessionStorage.setItem("logado", "sim")
        alert("Data do dia mais feliz da minha vida")
        window.location = "principal.html"
    } else {
        alert("Não creio que você errou")
    }
}

document.getElementById("Sair").onclick = () => {
    sessionStorage.removeItem("logado")
    alert("Já tá indo amor?")
    window.location = "index.html"
}

let atletasArmazenados = []

select.onchange = () => {
    let carregando = document.getElementById('carregando')
    if (!carregando) {
        carregando = document.createElement('p')
        carregando.id = 'carregando'
        carregando.style.color = 'white'
        carregando.textContent = 'Carregando...'
        container.appendChild(carregando)
    }

    container.innerHTML = ''
    container.appendChild(carregando)

    pega_json(`https://botafogo-atletas.mange.li/2024-1/${select.value}`).then(
        (retorno) => {
            atletasArmazenados = retorno

            container.removeChild(carregando)

            retorno.forEach((atleta) => montaCard(atleta))
        }
    ).catch(error => {
        console.error('Erro ao carregar atletas:', error)
        container.innerHTML = '<p style="color: white;">Erro ao carregar atletas</p>'
    })
}

const pesquisarAtletas = (entrada) => {
    const container = document.querySelector(".div-atletas")
    container.innerHTML = ""

    if (entrada.trim() === "") {
        atletasArmazenados.forEach(montaCard)
        return
    }

    const atletasFiltrados = atletasArmazenados.filter((atleta) => 
        atleta.nome.toLowerCase().includes(entrada.toLowerCase()) ||
        atleta.posicao.toLowerCase().includes(entrada.toLowerCase())
    )

    if (atletasFiltrados.length === 0) {
        container.innerHTML = "<p style='color: white; text-align: center;'>Nenhum atleta encontrado</p>"
    } else {
        atletasFiltrados.forEach(montaCard)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const campoPesquisa = document.getElementById("pesquisa")
    
    if (campoPesquisa) {
        campoPesquisa.addEventListener('input', (evento) => {
            const termoPesquisa = evento.target.value
            pesquisarAtletas(termoPesquisa)
        })
    }
})

const manipulaClick = (evento) => {
    const id = evento.currentTarget.dataset.id
    const nome = evento.currentTarget.dataset.nome
    const desc = evento.currentTarget.dataset.desc

    document.cookie = `id=${id}`
    document.cookie = `nome=${nome}`
    document.cookie = `desc=${desc}`

    sessionStorage.setItem("id", id)
    sessionStorage.setItem("atleta", JSON.stringify(evento.currentTarget.dataset))

    localStorage.setItem("id", id)
    localStorage.setItem("atleta", JSON.stringify(evento.currentTarget.dataset))

    window.location = `detalhes.html?id=${id}`
}

const montaCard = (atleta) => {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao")
    const nome = document.createElement("h3");
    const imagem = document.createElement("img");
    const link = document.createElement("a");

    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    link.innerHTML = "SAIBA MAIS"
    link.href = `detalhes.html?id=${atleta.id}`
    cartao.appendChild(link)

    cartao.dataset.id = atleta.id
    cartao.dataset.nome = atleta.nome
    cartao.dataset.posicao = atleta.posicao

    cartao.onclick = manipulaClick 
    container.appendChild(cartao)
}

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const mostrarmasculino = () => {
    pega_json(`https://botafogo-atletas.mange.li/2024-1/masculino`).then(
        (retorno) => {
            atletasArmazenados = retorno
            
            container.innerHTML = ""
            
            retorno.forEach((atleta) => montaCard(atleta))
        }
    )
}

const mostrarfeminino = () => {
    pega_json(`https://botafogo-atletas.mange.li/2024-1/feminino`).then(
        (retorno) => {
            atletasArmazenados = retorno
            
            container.innerHTML = ""
            
            retorno.forEach((atleta) => montaCard(atleta))
        }
    )
}

const mostrarcompleto = () => {
    pega_json(`https://botafogo-atletas.mange.li/2024-1/all`).then(
        (retorno) => {
            atletasArmazenados = retorno
            
            container.innerHTML = ""
            
            retorno.forEach((atleta) => montaCard(atleta))
        }
    )
}

if (sessionStorage.getItem("logado")) {
    pega_json(`https://botafogo-atletas.mange.li/2024-1/all`).then(
        (retorno) => {
            // Atualiza a variável global
            atletasArmazenados = retorno
            
            retorno.forEach((atleta) => montaCard(atleta))
        }
    )
} else {
    document.body.innerHTML = "<h1>Você precisa estar logado.</h1> <a href='index.html'>Voltar</a>"
}