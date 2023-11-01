const express = require('express');
//passa uma informação do express para a constante express
//solicita uma resposta da biblioteca json
const userService = require('./services/users')
const app = express()
//() isso é pergar todas as funções do express e joga no app
const port = 3000
// utiliza a porta 3000
app.use(express.json());
// 

//get users
app.get('/users', (request, response) => {
  const idUser = request.params.id;
 response.json(userService.getUsers());
})

app.get('/users/:id',(request, response) => {

  //pegar o id da requisição
  const idUser = request.params.id;

  //encontrar o usuário correspondente no bd
  //filter é para fazer a busca no vetor (array), o filter é um "for" simplificado
  //filter retorna sempre um valor menor que o vetor
  //responder a requisição com as info do users
  response.json(userService.getUserById(idUser));
  
})

app.post("/users", (request, response) =>{
  
  //pegar o corpo da requisição
  const body = request.body;
  response.status(201).json(userService.createUser(body));
}) 


  // //criar um novo objeto a partir desse corpo
  // const newUser = {
  //   id:(bd.length).toString(),
  //   name: body.name
  // }

  // //adicionar esse novo objeto no banco
  // bd.push(newUser);
  
  // //responder a requisição com o banco completo
  // response.json(bd);



app.delete("/users/:id", (request, response)=>{
  //pegar o id da requisição
  const idUser = request.params.id;

  //percorrer o banco e encontrar quem tem o id da requisição
  //bd = bd.filter((usuario)=> usuario.id != idUser);

  userService.deleteUser(idUser);

  //responder com o meu banco atualizado
  response.json("Apagadp com sucesso");
})
app.patch("/users/:id", (request, response) =>{

//pegar o id da requisição
const idUser = request.params.id;

//pegar o corpo da requisição
const body = request.body;

userService.updateUser(idUser, body);
response.status(200).json();
})

//atualizar as informações

// //responder a requisição com o banco
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})