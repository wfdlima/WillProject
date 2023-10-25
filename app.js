const express = require('express');
const { json } = require('express/lib/response');
const app = express()
const port = 3000
app.use(express.json());

let bd = [
    {
        id: "1",
        name: "william"
    },
    {
        id: "2",
        name: "matheus"
    }
]



//get users
app.get('/users', (request, response) => {
  response.json(bd);
})

app.get('/users/:id',(request, response) => {

  //pegar o id da requisição
  const idUser = request.params.id;

  //encontrar o usuário correspondente no bd
  const user = bd.filter((usuario) => usuario.id === idUser);

  //responder a requisição com as info do users
  response.json(user);
  
})

app.post("/users", (request, response) =>{
  
  //pegar o corpo da requisição
  const body = request.body;

  //criar um novo objeto a partir desse corpo
  const newUser = {
    id:(bd.length).toString(),
    name: body.name
  }

  //adicionar esse novo objeto no banco
  bd.push(newUser);
  
  //responder a requisição com o banco completo
  response.json(bd);

})

app.delete("/users/:id", (request, response)=>{
  //pegar o id da requisição
  const idUser = request.params.id;

  //percorrer o banco e encontrar quem tem o id da requisição
  bd = bd.filter((usuario)=> usuario.id != idUser);

  //responder com o meu banco atualizado
  response.json(bd);
})
app.patch("/users/:id", (request, response) =>{

//pegar o id da requisição
const idUser = request.params.id;

//pegar o corpo da requisição
const body = request.body;

//percorrer o banco
bd = bd.map((usuario) => {
  if(usuario.id === idUser){
    //atualizar as informações
    usuario.name = body.name;
  }
  return usuario
})
response.json(bd);
//atualizar as informações

//responder a requisição com o banco
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})