const axios = require('axios');
const bd = require('../models/Database');
const ListaCond = require('../models/ListaCondicional');
const ProdutoController = require('../controllers/ProdutoController');
const { request, response } = require('express');
const req = require('express/lib/request');

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

    async excluirSemEstoque(request, response)
    {
        let msg;
        const {idVenda} = request.params;
        
        let listaCond = new ListaCond();
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
                idLista: produtos[x].id,
                quantidade: produtos[x].quantidade,
                idProduto: produtos[x].id_produto,
                valor: produtos[x].valor,
            }
            produtos[x] = prod;
        }

        return response.send(produtos);
    }

    async alterar(request, response)
    {
        const {produtos, idVenda, produtosEx} = request.body;
        let msg = "";

        for(let x=0; x<produtos.length; x++)
        {
            let valor = parseFloat(produtos[x].valorUnitario) * parseInt(produtos[x].qtdeSelecionado);
            valor = parseFloat(valor.toFixed(2));
            if(produtos[x].novoItem === false) //alterar
            {
                let qtde = parseInt(produtos[x].qtdeEstoque) - parseInt(produtos[x].qtdeSelecionado);
                await ProdutoController.controleEstoque(bd, produtos[x].id, qtde);
                let listaCond = new ListaCond(produtos[x].idLista, idVenda, produtos[x].id, produtos[x].qtdeSelecionado, valor);
                await listaCond.alterar(bd);
            }
            else
                if(produtos[x].novoItem === true) //gravar novo 
                {
                    await ProdutoController.controleEstoque2(bd, produtos[x].id, produtos[x].qtdeSelecionado);
                    let listaCond = new ListaCond(0, idVenda, produtos[x].id, produtos[x].qtdeSelecionado, valor);
                    await listaCond.gravar(bd);
                }
        }

        for(let x=0; x<produtosEx.length; x++) //excluir
        {
            await ProdutoController.controleEstoque(bd, produtosEx[x].idProduto, produtosEx[x].quantidade);
            let listaCond = new ListaCond();
            await listaCond.deletarAlterar(bd, produtosEx[x].idProduto, idVenda);
        }

        return response.send("Excluido");
    }

    async devolver(request, response)
    {
        const {items} = request.body;

        for(let item of items)
        {
            await ProdutoController.controleEstoque(bd, item.id, item.qtdeEstoque);
        }

        return response.send("Venda atualizada !!");
    }
}

module.exports = new ListaCondController();