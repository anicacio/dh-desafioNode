const http = require("http");
const petshop = require("./petshop");
const url = require("url");

const server = http
    .createServer((req, res) => {
        // quando faço requisição no navegador
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=UTF-8"
        });
        let urlCompleta = url.parse(req.url, true);
        let queryString = urlCompleta.query; // parametros
        let rota = urlCompleta.pathname; // ex: pets/add
        let nomePet;
        let petsEncontrados;
        let servicos;
        let pet;

        switch (rota) {
            case "/pets":
                let conteudo = petshop.listarPets();
                if (conteudo.length > 0) {
                    res.write(conteudo);
                } else {
                    res.write("Nenhum pet cadastrado :(");
                }
                break;
            case "/pets/add":
                let novoPet = {
                    nome: (queryString.nome) ? queryString.nome : "",
                    raca: (queryString.raca) ? queryString.raca : "",
                    idade: (queryString.idade) ? queryString.idade : "",
                    genero: (queryString.genero) ? queryString.genero : "",
                    servicos: [],
                    tipo: (queryString.tipo) ? queryString.tipo : "",
                    vacinado: (queryString.vacinado) ? queryString.vacinado : "",
                };
                if (petshop.validarDados(novoPet)) {
                    if (petshop.adicionarPet(novoPet)) {
                        res.write(`${novoPet.nome} foi adicionado a nossa lista!`);
                    } else {
                        res.write("Ops, algo deu errado!");
                    };
                } else {
                    res.write(`Ops, algo errado com os dados passados! \nOs campos nome, idade, genero, tipo, raca são obrigatórios, favor verificar!`);
                };
                break;
            case "/pets/buscar":
                nomePet = queryString.nome;
                petsEncontrados = petshop.buscarPet(nomePet);
                if (petsEncontrados.length > 0) {
                    res.write(`Encontramos ${petsEncontrados.length} pets com o nome ${nomePet}\n\n`);
                    for(pet of petsEncontrados){
                        res.write(` Nome: ${pet.nome}\n   Raça: ${pet.raca}\n   Idade: ${pet.idade}\n   Genero: ${pet.genero}\n   Tipo: ${pet.tipo}\n   Vacinado: ${pet.vacinado ? "Sim" : "Não"}\n`);
                    }
                } else {
                    res.write("Ops, nenhum pet cadastrado com esse nome!");
                };
                break;
            case "/pets/atender":
                nomePet = queryString.nome;
                if (typeof queryString.servicos != "object") {
                    servicos = [];
                    servicos.push(queryString.servicos);
                } else {
                    servicos = queryString.servicos;
                };
                console.log(servicos);
                petsEncontrados = petshop.buscarPet(nomePet);
                pet = petsEncontrados[0];
                if (petsEncontrados.length > 0) {
                    res.write(`Bem vindo, ${pet.nome}!\n`);
                    for (let servico of servicos) {
                        // Desculpa eu não conseguir fazer o callback de funções funcionar aqui igual na versão
                        // sem NODE. Então fiz assim. :-(
                        // Nem aqui nem no petshop.js
                        switch (servico) {
                            case "darBanho":
                                res.write(`${petshop.darBanho(pet)}\n`);
                                break;
                            case "tosar":
                                res.write(`${petshop.tosar(pet)}\n`);
                                break;
                            case "cortarUnhas":
                                res.write(`${petshop.cortarUnhas(pet)}\n`);
                                break;
                            case "vacinar":
                                res.write(`${petshop.vacinar(pet)}\n`);
                                break;
                            default:
                                res.write(`Serviço não encontrado ${servico} \n`);
                        };
                    };
                    res.write(`${petshop.pagar()}\n`);
                    res.write(`Volte sempre!\n`);
                } else {
                    res.write(`Ops, nenhum pet cadastrado com esse nome!\n`);
                };
                break;
            case "/pets/vacinar":
                nomePet = queryString.nome;
                petsEncontrados = petshop.buscarPet(nomePet);
                pet = petsEncontrados[0];
                if (petsEncontrados.length > 0) {
                    res.write(`${petshop.vacinar(pet)}\n`);
                } else {
                    res.write("Ops, nenhum pet cadastrado com esse nome!");
                }
                break;
            case "/pets/vacinados":
                let vacinados = petshop.contarVacinados();
                res.write(` Foram encontrados ${vacinados[1]} pets não vacinados\n Foram encontrados ${vacinados[0]} pets vacinados`);
                break;
            case "/pets/campanhaVacina":
                let naoVacinados = petshop.campanhaVacina();
                res.write(`${naoVacinados} pets foram vacinados nessa campanha!`);
                break;
            default:
                res.write("404 - Página não encontrada");
        };
        // req = request, res = responses
        res.end();
    }).listen(3000, "localhost", () => {
        // quando ligo servidor
        console.log("Servidor rodando :)");
    });







// AREA DE TESTE

// TESTA LISTAR
// http://localhost:3000/pets

// TESTA BUSCAR
// http://localhost:3000/pets/buscar?nome=Fred

// TESTA ATENDER
// http://localhost:3000/pets/atender?nome=Fred&servicos=tosar&servicos=darBanho&servicos=cortarUnhas

// TESTA ADD
// http://localhost:3000/pets/add?nome=Banguela&idade=1&genero=M&tipo=gato&raca=SRD // DADOS OBRIGATÓRIOS

// TESTA VACINAR
// LINK DIRETO http://localhost:3000/pets/vacinar?nome=Fred
// VIA ATENDER http://localhost:3000/pets/atender?nome=Fred&servicos=vacinar // Pois não deixa de ser um serviço

// TESTA CONTAR VACINADOS
// http://localhost:3000/pets/vacinados

// TESTA CAMPANHA VACINA
// http://localhost:3000/pets/campanhaVacina