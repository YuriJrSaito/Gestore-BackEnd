const axios = require('axios');
const bd = require('../models/Database');
const Venda = require('../models/Venda');
const UsuarioController = require('../controllers/UsuarioController');

class VendaController{
    async gravar(request, response)
    {
        const {dataVenda, idContaReceber, idAcesso, idCliente} = request.body;
        var msg = "";
        let idUsuario = await UsuarioController.procurarUsuarioAcesso(bd, idAcesso);
        var venda = new Venda(0, dataVenda, idContaReceber, idUsuario, idCliente);
        const resp = await venda.gravar(bd);

        if(resp > 0)
            msg += "Venda cadastrada com sucesso";
        else
            msg += "Algo deu errado";

        return response.send([resp]);
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

    async buscarClienteId(bd, idConta)
    {
        let venda = new Venda();
        let resp = await venda.buscarClienteId(bd, idConta);
        return resp;
    }

    async buscarConta(request, response)
    {
        const{idConta} = request.params;
        let venda = new Venda();
        let resp = await venda.buscarConta(bd, idConta);

        return response.send([resp]);
    }
}

module.exports = new VendaController();