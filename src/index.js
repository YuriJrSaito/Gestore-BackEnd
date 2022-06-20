//importar o módulo do express
const express = require('express');
//importar o cors para que esta API seja acessível pela aplicação react
const cors = require('cors');
//importar as rotas
const routes = require('./routes');


//para começar a colocar o servidor no ar
const app = express();

app.use(cors());//assim libera o acesso externo para todo tipo de aplicação
app.use(express.json());
app.use(routes);


//como podemos ter várias aplicações rodando, escolhemos uma porta para
//essa aplicação
app.listen(3344, ()=>{
    console.log("Servidor aberto em 3344");
});