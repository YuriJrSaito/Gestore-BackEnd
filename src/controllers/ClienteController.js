const axios = require('axios');
const bd = require('../models/Database');

const Cliente = require('../models/Cliente');
const TelefoneController = require('../controllers/TelefoneController');
const EnderecoController = require('../controllers/EnderecoController');

class ClienteController{

    async gravar(request, response)
    {
        const {nome, email, idade, sexo, cpf, telefones, cep, cidade, rua, bairro, numero, complemento} = request.body;
        var cliente = new Cliente();
        var msg = "";
        bd.conectar();  

        var retorno = false;
        console.log(cpf);
        if(cpf != "")
            retorno = await cliente.buscarPorCpf(bd,cpf);  

        if(retorno == false)
        {  
            let idEndereco = await EnderecoController.gravarEndereco(bd, cep, cidade, rua, bairro, numero, complemento);
            let idTelefone = await TelefoneController.gravarTelefones(bd, telefones);
    
            cliente = new Cliente(0, nome, email, idade, idEndereco, cpf, idTelefone, sexo);
            await cliente.gravar(bd);
    
            msg = "Cliente Cadastrado com Sucesso";
        }
        else
        {
            msg = "Este CPF já esta cadastrado";
        }
            
        bd.Client.end();
        return response.send(msg);
    }

    async listarTodosClientes(request, response)
    {
        var cliente = new Cliente();
        bd.conectar();
        const resp = await cliente.listarTodosClientes(bd);
        bd.Client.end();
        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há clientes cadastrados");
        }
    }

    async filtrarClientes(request, response)
    {
        const {filtro} = request.params;
        var cliente = new Cliente();
        bd.conectar();
        const resp = await cliente.filtrarClientes(bd, filtro);
        bd.Client.end();

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há clientes cadastrados");
        }
    }

    async alterarCliente(request, response)
    {
        const {idCliente, nome, email, idade, sexo, cpf, idTelefone, telefones, idEndereco ,cep, cidade, rua, bairro, numero, complemento} = request.body;
        bd.conectar();
        var msg="";

        const respTel = await TelefoneController.alterarTelefone(bd, idTelefone, telefones);
        const respEnd = await EnderecoController.alterarEndereco(bd, idEndereco, rua, numero, bairro, cidade, cep, complemento);

        const cliente = new Cliente(idCliente, nome, email, idade, idEndereco, cpf, idTelefone, sexo);
        const respCli = await cliente.alterar(bd);

        if(respCli>0 && respEnd>0 && respTel>0)
            msg+="Alterado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        bd.Client.end();
        return response.send(msg);
    }

    async deletar(request, response) 
    {
        const {idCliente} = request.params;
        bd.conectar();
        var msg="";

        const cliente = new Cliente();
        const respCli = await cliente.deletar(bd, idCliente);

        if(respCli>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        bd.Client.end();
        return response.send(msg); 
    }

    async buscarClienteNome(bd, idCliente)
    {
        const cliente = new Cliente();
        const resp = await cliente.buscarClienteNome(bd, idCliente);

        return resp; 
    }
}

module.exports = new ClienteController();