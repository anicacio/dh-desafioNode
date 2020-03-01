let pets = [{
    nome: "Fred",
    raca: "vira-lata",
    idade: 17,
    genero: "M",
    servicos: [],
    tipo: "gato",
    vacinado: false,
},{
    nome: "Capivara",
    raca: "vira-lata",
    idade: 12,
    genero: "M",
    servicos: ["banho", "tosa", "vacinação"],
    tipo: "gato",
    vacinado: true,
},{
    nome: "Tripé",
    raca: "angora",
    idade: 15,
    genero: "F",
    servicos: [],
    tipo: "gato",
    vacinado: false,
},{
    nome: "Sóopó",
    raca: "siames",
    idade: 99,
    genero: "F",
    servicos: ["banho", "tosa", "vacinação"],
    tipo: "gato",
    vacinado: false,
}];

const listarPets = () => {
  let conteudo = "";
  for (let pet of pets) {
    conteudo += `
    -----------
    Nome: ${pet.nome}
    -----------`;
  }

  return conteudo;
};

const adicionarPet = novoPet => {
  return pets.push(novoPet);
};

const buscarPet = nomePet => {
  let petsEncontrados = pets.filter(pet => pet.nome == nomePet);
  return petsEncontrados;
};

const darBanho = pet => {
    pet.servicos.push('banho');
    return `${pet.nome} está de banho tomado!`;
};

const cortarUnhas = pet => {
    pet.servicos.push('corte de unha');
    return `${pet.nome} está com as unhas cortadas!`;
};
const tosar = pet => {
    pet.servicos.push('tosa');
    return `${pet.nome} está tosado!`;
};

const pagar = () => {
    return 'Pagamento realizado com successo!';
};

module.exports = {listarPets, adicionarPet, buscarPet, pagar, darBanho, cortarUnhas, tosar};