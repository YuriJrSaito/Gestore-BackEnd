const { request } = require('express');
const res = require('express/lib/response');
const bd = require('../models/Database');
const Endereco = require('../models/Endereco');

class EnderecoController
{
    async gravarEndereco(bd, cep, cidade, rua, bairro, numero, complemento)
    {
        var endereco = new Endereco(0, rua, numero, bairro, cidade, cep, complemento);
        const resp = await endereco.gravar(bd);
        return resp;
    }
    
    async buscarEndereco(request, response)
    {
        const {idEndereco} = request.params;
        await bd.conectar();
        var endereco = new Endereco();
        const resp = await endereco.buscarEndereco(bd,idEndereco);
        await bd.Client.end();
        return response.send(resp);
    }

    async alterarEndereco(bd, idEndereco, rua, numero, bairro, cidade, cep, complemento)
    {
        const endereco = new Endereco(idEndereco, rua, numero, bairro, cidade, cep, complemento);
        const resp = await endereco.alterarEndereco(bd);
        return resp;
    }

    async deletar(request, response)
    {
        const {idEndereco} = request.params;
        bd.conectar();
        const endereco = new Endereco();
        const resp = await endereco.deletar(bd, idEndereco);
        bd.Client.end(); 
        return response.send("Endereço deletado");
    }
}

module.exports = new EnderecoController();