# dh-desafioNode

AREA DE TESTE

TESTA LISTAR
http://localhost:3000/pets

TESTA BUSCAR
http://localhost:3000/pets/buscar?nome=Fred

TESTA ATENDER
http://localhost:3000/pets/atender?nome=Fred&servicos=tosar&servicos=darBanho&servicos=cortarUnhas

TESTA ADD
http://localhost:3000/pets/add?nome=Banguela&idade=1&genero=M&tipo=gato&raca=SRD // DADOS OBRIGATÓRIOS

TESTA VACINAR
LINK DIRETO http://localhost:3000/pets/vacinar?nome=Fred
VIA ATENDER http://localhost:3000/pets/atender?nome=Fred&servicos=vacinar // Pois não deixa de ser um serviço

TESTA CONTAR VACINADOS
http://localhost:3000/pets/vacinados

TESTA CAMPANHA VACINA
http://localhost:3000/pets/campanhaVacina