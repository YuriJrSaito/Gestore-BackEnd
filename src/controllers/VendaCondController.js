const axios = require('axios');
const bd = require('../models/Database');
const Venda = require('../models/VendaCondicional');
const UsuarioController = require('../controllers/UsuarioController');
const ClienteController = require("../controllers/ClienteController");
const moment = require('moment');

class VendaCondController{
    async gravar(request, response)
    {
        const {dataCriacao, dataLimite, observacao, valorTotal, idAcesso, idCliente} = request.body;
        var msg = "";
        let idUsuario = await UsuarioController.procurarUsuarioAcesso(bd, idAcesso);
        var venda = new Venda(0, dataCriacao, dataLimite, observacao, valorTotal, idUsuario, idCliente);
        const resp = await venda.gravar(bd);

        if(resp > 0)
            msg += "Venda Condicional cadastrada com sucesso";
        else
            msg += "Algo deu errado";

        return response.send([resp]);
    }

    async listarTodasVendas(request, response)
    {
        var venda = new Venda();
        const resp = await venda.listarTodasVendas(bd);
        
        for(let x=0; x<resp.length; x++)
        {
            let nomeCliente = await ClienteController.buscarClienteNome(bd, resp[x].id_cliente);
            let cpfCliente = await ClienteController.buscarCPF(bd, resp[x].id_cliente);
            let nomeUsuario = await UsuarioController.buscarUsuarioNome(bd, resp[x].id_usuario);

            var v = {
                id: resp[x].id,
                dataCriacao: moment.utc(resp[x].dataCriacao).format('YYYY-MM-DD'),
                dataLimite: moment.utc(resp[x].dataLimite).format('YYYY-MM-DD'),
                observacao: resp[x].observacao,
                valorTotal: resp[x].valorTotal,
                nomeUsuario: nomeUsuario,
                idUsuario: resp[x].id_usuario,
                nomeCliente: nomeCliente,
                idCliente: resp[x].id_cliente,
                cpfCliente: cpfCliente,
            }
            resp[x] = v;
        }
        return response.send(resp);
    }

    async alterar(request, response)
    {
        var msg="";
        const {idVenda, dataCriacao, dataLimite, observacao, valorTotal} = request.body;
        var venda = new Venda(idVenda, dataCriacao, dataLimite, observacao, valorTotal, 0, 0);
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
        const venda = new Venda();
        await venda.deletar(bd, idVenda);

        return response.send();
    }

    async buscarUsuario(request, response)
    {
        const {idUsuario} = request.params;
        const venda = new Venda();
        const resp = await venda.buscarUsuario(bd, idUsuario);

        return response.send(resp); 
    }
}

module.exports = new VendaCondController();