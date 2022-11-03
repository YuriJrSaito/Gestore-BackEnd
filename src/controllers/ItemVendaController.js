const axios = require('axios');
const bd = require('../models/Database');
const ItemVenda = require('../models/ItemVenda');
const ProdutoController = require('../controllers/ProdutoController');

class ItemVendaController{
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

                let itemVenda = new ItemVenda(0, produtos[x].qtdeSelecionado, valor, idVenda, produtos[x].id);
                await itemVenda.gravar(bd);
                await ProdutoController.controleEstoque(bd, produtos[x].id, qtde);
            }
        }

        if(resp != false)
            msg += "Venda cadastrada com sucesso";
        else
            msg += "Algo deu errado";

        return response.send(msg);
    }

    async listarTodasVendas(request, response)
    {
        var venda = new Venda();
        const resp = await venda.listarTodasVendas(bd);

        if(resp != undefined)
        {
            return await response.send(resp);
        }
        else
        {
            return await response.send("Não há vendas cadastradas");
        }
    }

    async filtrarVendas(request, response)
    {
        const {filtro} = request.params;
        var venda = new Venda();

        const resp = await venda.filtrarVendas(bd, filtro);

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há Vendas cadastradas");
        }
    }

    async alterar(request, response)
    {
        var msg="";
        const {idVenda, dataVenda, idContaReceber, idUsuario, idCliente} = request.body;

        let venda = new Venda(idVenda, dataVenda, idContaReceber, idUsuario, idCliente);
        const resp = await venda.alterar(bd);

        if(resp>0)
            msg+="Alterado com sucesso !!";
        else
            msg+="Algo deu errado !!";
        
        return response.send(msg);
    }

    async deletar(request, response) 
    {
        const {idVenda} = request.params;
        var msg="";

        const venda = new Venda();
        const resp = await venda.deletar(bd, idVenda);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg);
    }

    async buscarProduto(request, response)
    {
        const {idProduto} = request.params;
        const itemVenda = new ItemVenda();
        const resp = await itemVenda.buscarProduto(bd, idProduto);

        return response.send(resp); 
    }
}

module.exports = new ItemVendaController();