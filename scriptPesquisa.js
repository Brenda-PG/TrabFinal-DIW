import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const octokit = new Octokit();
const params = new URLSearchParams(document.location.search);
const input = params.get("i");
const seletor = params.get("s");

var resultadoPesquisa = document.getElementById("resultadoPesquisa");

window.addEventListener('load', gerarResultado())

async function gerarResultado() {
    if (seletor == "users") {
        let resultado = await octokit.request(`GET /search/${seletor}`, {
            q: input,
            per_page: 20
        })

        if (resultado.data.items == 0) {
            resultadoPesquisa.innerHTML = `<p class="naoEncontrado">Nenhum resultado encontrado! Tente novamente.</p>`
        }
        else {
            resultado.data.items.forEach(x => {
                resultadoPesquisa.innerHTML += `
            <div class="col-sm-12 col-md-6">
                <div class="row p-2 m-1 resultado">
                    <div class="col-6">
                        <img src=${x.avatar_url} class="img-fluid" width="460" height="460">
                    </div>
                    <div class="col-6">
                        <a class="link" href="${x.html_url}"><p>${x.login}</p></a>
                        <p>ID: ${x.id}</p>
                    </div>
                </div>
            </div>
            `;
            });
        }
    }

    if (seletor == "repositories") {
        let resultado = await octokit.request(`GET /search/${seletor}`, {
            q: input,
            per_page: 20
        })

        if (resultado.data.items == 0) {
            resultadoPesquisa.innerHTML = `<p class="naoEncontrado">Nenhum resultado encontrado</p>`
        }
        else {
            resultado.data.items.forEach(x => {
                resultadoPesquisa.innerHTML += `
            <div class="col-sm-12 col-md-6">
                <div class="row p-2 m-1 resultado">
                    <div class="col-6">
                        <img src=${x.owner.avatar_url} class="img-fluid" width="460" height="460">
                    </div>
                    <div class="col-6">
                        <a class="link" href="${x.html_url}"><b><p>${x.name}</p></b></a>
                        <p>Linguagem: ${x.language ? x.language : "Não encontrada"}</p>
                    </div>
                </div>
            </div>
            `;
            });
        }
    }
}

function pesquisa() {
    let input = document.getElementById("inputPesquisa").value;
    let seletor = document.getElementById("seletorPesquisa").value;

    if (!input) {
        alert("Preencha o campo de pesquisa");
    }
    else {
        window.location = `pesquisa.html?i=${input}&s=${seletor}`;
    }
}

document.getElementById("botaoPesquisa").addEventListener('click', pesquisa)