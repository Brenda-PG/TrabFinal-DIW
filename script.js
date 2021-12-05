import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const octokit = new Octokit();

async function meuPerfil() {
    let info = await octokit.request('GET /users/Brenda-PG');
    let repo = await octokit.request(`${info.data.repos_url}`);
    let colunaInfo = document.getElementById("colunaInfo");
    let colunaRepositorio = document.getElementById("colunaRepositorio");

    colunaInfo.innerHTML += `
    <a href=${info.data.html_url} >
        <img id="foto" src=${info.data.avatar_url} class="img-fluid">
    </a>
    <a href=${info.data.html_url}><p><b>${info.data.name}</b></p></a>
    <h1>${info.data.login}</h1>
    `;

    repo.data.forEach(x => {
        let data = new Date(x.updated_at)
        let dataFormatada = ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();

        colunaRepositorio.innerHTML += `
        <a href="${x.html_url}"><h2>${x.name}</h2></a>
        <p>Última atualização: ${dataFormatada}</p>
        <p>Visibilidade: ${x.visibility}</p>
        `;
    });
}

function pesquisa() {
    let input = document.getElementById("inputPesquisa").value;
    let seletor = document.getElementById("seletorPesquisa").value;

    if (!input) {
        alert("Por gentileza, preencha o campo de pesquisa.");
    }
    else {
        window.location = `./paginaPesquisa/pesquisa.html?i=${input}&s=${seletor}`;
    }
}

document.getElementById("botaoPesquisa").addEventListener('click', pesquisa)
window.addEventListener('load', meuPerfil)
