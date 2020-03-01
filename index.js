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
        let nomePet = "";
        let petsEncontrados = "";
        let servicos;
        // console.log(queryString);

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
                let novoPet = queryString;
                if (petshop.adicionarPet(novoPet)) {
                    res.write(`${novoPet.nome} foi adicionado a nossa lista!`);
                } else {
                    res.write("Ops, algo deu errado!");
                }
                break;
            case "/pets/buscar":
                nomePet = queryString.nome;
                petsEncontrados = petshop.buscarPet(nomePet);
                if (petsEncontrados.length > 0) {
                    res.write(
                        `Encontramos ${petsEncontrados.length} pets com o nome ${nomePet}`
                    );
                } else {
                    res.write("Ops, nenhum pet cadastrado com esse nome!");
                }
                break;
            case "/pets/atender":
                nomePet = queryString.nome;
                if(typeof queryString.servicos != "object"){
                    servicos = [];
                    servicos.push(queryString.servicos);
                } else {
                    servicos = queryString.servicos;
                };

                petsEncontrados = petshop.buscarPet(nomePet);
                let pet = petsEncontrados[0];
                if (petsEncontrados.length > 0) {
                    res.write(`Bem vindo, ${pet.nome}!\n`);
                    for(let servico of servicos){
                        switch (servico){
                            case "darBanho":
                                res.write(`${petshop.darBanho(pet)}\n`);
                                break;
                            case "tosar":
                                res.write(`${petshop.tosar(pet)}\n`);
                                break;
                            case "cortarUnhas":
                                res.write(`${petshop.cortarUnhas(pet)}\n`);
                                break;
                            case "End":
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
            default:
                res.write("404 - Página não encontrada");
        };
        // req = request, res = responses
        res.end();
    }).listen(3000, "localhost", () => {
        // quando ligo servidor
        console.log("Servidor rodando :)");
    });