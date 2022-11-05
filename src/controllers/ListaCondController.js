const axios = require('axios');
const bd = require('../models/Database');
const ListaCond = require('../models/ListaCondicional');
const ProdutoController = require('../controllers/ProdutoController');
const { request, response } = require('express');

class ListaCondController{
    async gravar(request, response)
    {
        const {produtos, idVenda} = request.body;
        let resp;
        let msg = "";

        for(let x=0; x<produtos.length; x++)
        {   
            if(parseInt(produtos[x].qtdeSelecionado) > 0)
            {
                let valor = parseInt(produtos[x].qtdeSelecionado) * parseFloat(produtos[x].valorUnitario);
                valor = parseFloat(valor.toFixed(2));

                let qtde = parseInt(produtos[x].qtdeEstoque) - parseInt(produtos[x].qtdeSelecionado);

                let listaCond = new ListaCond(0, idVenda, produtos[x].id, produtos[x].qtdeSelecionado, valor);
                await listaCond.gravar(bd);
                await ProdutoController.controleEstoque(bd, produtos[x].id, qtde);
            }
        }

        if(resp != false)
            msg += "Venda Condicional cadastrada com sucesso";
        else
            msg += "Algo deu errado";

        return response.send(msg);
    }

    async excluir(request, response)
    {
        let msg;
        const {idVenda} = request.params;
        let listaCond = new ListaCond();
        let produtos = await listaCond.listarTudo(bd, idVenda); 
        await ProdutoController.devolverTodosProdutos(bd, produtos);
        let resp = await listaCond.deletar(bd, idVenda);
        if(resp > 0)
            resp = true;
        else
           resp = false;
        return response.send(resp);
    }

    async buscarProdutos(request, response)
    {
        const {idVenda} = request.params;
        let listaCond = new ListaCond();
        let produtos = await listaCond.listarTudo(bd, idVenda); 

        for(let x=0; x<produtos.length; x++)
        {
            let prod = {
                quantidade: produtos[x].quantidade,
                idProduto: produtos[x].id_produto,
            }
            produtos[x] = prod;
        }

        return response.send(produtos);
    }
}

module.exports = new ListaCondController();