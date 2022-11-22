const axios = require('axios');
const bd = require('../models/Database');
const Cliente = require('../models/Cliente');
const TelefoneController = require('../controllers/TelefoneController');
const EnderecoController = require('../controllers/EnderecoController');
const Telefone = require('../models/Telefone');
const Venda = require('../models/Venda');
const ContaReceber = require('../models/ContaReceber');
const ParcelaControllerCR = require("../controllers/ParcelaContaReceberController");

class ClienteController{
    async gravar(request, response)
    {
        const {nome, email, idade, sexo, cpf, telefones, cep, cidade, rua, bairro, numero, complemento} = request.body;
        var cliente = new Cliente();
        var msg = "";

        var retorno = false;
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
            
        return response.send(msg);
    }

    async listarTodosClientes(request, response)
    {
        var cliente = new Cliente();
        const resp = await cliente.listarTodosClientes(bd);
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
        const resp = await cliente.filtrarClientes(bd, filtro);

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
        var msg="";

        const respTel = await TelefoneController.alterarTelefone(bd, idTelefone, telefones);
        const respEnd = await EnderecoController.alterarEndereco(bd, idEndereco, rua, numero, bairro, cidade, cep, complemento);

        const cliente = new Cliente(idCliente, nome, email, idade, idEndereco, cpf, idTelefone, sexo);
        const respCli = await cliente.alterar(bd);

        if(respCli>0 && respEnd>0 && respTel>0)
            msg+="Alterado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg);
    }

    async deletar(request, response) 
    {
        const {idCliente} = request.params;
        var msg="";

        const cliente = new Cliente();
        const respCli = await cliente.deletar(bd, idCliente);

        if(respCli>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg); 
    }

    async buscarClienteNome(bd, idCliente)
    {
        const cliente = new Cliente();
        const resp = await cliente.buscarClienteNome(bd, idCliente);

        return resp; 
    }

    async buscarCPF(bd, idCliente)
    {
        const cliente = new Cliente();
        const resp = await cliente.buscarCPF(bd, idCliente);

        return resp; 
    }

    async relTodosClientes(request, response)
    {
        var cliente = new Cliente();
        const resp = await cliente.listarTodosClientes(bd);
        let lista = [];
        
        for(let x=0; x<resp.length; x++)
        {
            var telefoneClass = new Telefone();
            const telefones = await telefoneClass.buscarTelefone(bd, resp[x].id_telefone);

            let telefone;

            if(telefones[0].telefone1 == undefined)
                telefone = "";
            else
                 telefone = telefones[0].telefone1;


            let venda = new Venda();
            let vendas = await venda.buscarQtdeVendas(bd, resp[x].id);
            let qtdeVendas = vendas.length;

            let totalGasto = 0;
            let naoPago = 0;
            
            for(let venda of vendas)
            {
                let contaReceber = new ContaReceber();
                let conta = await contaReceber.buscarConta(bd, venda.id_contaReceber);

                let parcelas = await ParcelaControllerCR.buscarParcelas(bd, conta[0].id);

                for(let parcela of parcelas)
                {
                    if(parcela.situacao == "Não pago")
                    {
                        naoPago = parseFloat(naoPago) + parseFloat(parcela.valor);
                    }
                    else
                    {
                        totalGasto = parseFloat(totalGasto) + parseFloat(parcela.valorTotal);
                    }
                }
            }

            let vetaux = [resp[x].id.toString(), resp[x].nome, resp[x].cpf, telefone.toString(), qtdeVendas.toString(), 
            parseFloat(totalGasto).toFixed(2), parseFloat(naoPago).toFixed(2)];

            lista.push(vetaux);
        }

        return response.send(lista);
    }
}

module.exports = new ClienteController();