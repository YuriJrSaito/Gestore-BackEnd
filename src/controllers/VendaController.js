const axios = require('axios');
const bd = require('../models/Database');

class VendaController{

    async gravar(request, response)
    {
        const {dataVenda, idContaReceber, idUsuario, idCliente} = request.body;
        console.log(request.body);
        var msg = "";
        bd.conectar();

        var venda = new Venda(0, dataVenda, idContaReceber, idUsuario, idCliente);
        const resp = await venda.gravar(bd);

        if(resp > 0)
            msg += "Venda cadastrada com sucesso";
        else
            msg += "Algo deu errado";

        bd.Client.end();
        return response.send(msg);
    }

    async listarTodasVendas(request, response)
    {
        var venda = new Venda();
        await bd.conectar();
        const resp = await venda.listarTodasVendas(bd);
        await bd.Client.end();
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
        bd.conectar();
        const resp = await venda.filtrarVendas(bd, filtro);
        bd.Client.end();

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
        bd.conectar();

        let venda = new Venda(idVenda, dataVenda, idContaReceber, idUsuario, idCliente);
        const resp = await venda.alterar(bd);

        if(resp>0)
            msg+="Alterado com sucesso !!";
        else
            msg+="Algo deu errado !!";
        
        bd.Client.end();
        return response.send(msg);
    }

    async deletar(request, response) 
    {
        const {idVenda} = request.params;
        bd.conectar();
        var msg="";

        const venda = new Venda();
        const resp = await venda.deletar(bd, idVenda);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        bd.Client.end();
        return response.send(msg); 
    }
}

module.exports = new VendaController();