const bd = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const ParcelaController = require("../controllers/ParcelaContaReceberController");
const VendaController = require("../controllers/VendaController");
const ClienteController = require("../controllers/ClienteController");

class ContaReceberController{

    async gravar(request, response)
    {
        const {qtdeParcelas, valorTotal, dataEmissao, dataPrimeiroVencimento} = request.body;
        var contaReceber = new ContaReceber(0, qtdeParcelas, valorTotal, dataEmissao, dataPrimeiroVencimento);
        var msg = "";

        bd.conectar();  
        var idConta = await contaReceber.gravar(bd);

        if(idConta > 0)
        {
            msg = "Conta Cadastrada com Sucesso";
            let parcela = await ParcelaController.gravarParcelas(bd, idConta, valorTotal, qtdeParcelas, dataPrimeiroVencimento);
        }
        else
        {
            msg = "Algo deu errado";
        }
        bd.Client.end();
        return response.send([idConta]);
    }

    async listarTodasContas(request, response)
    {
        var contaReceber = new ContaReceber();
        bd.conectar();
        const resp = await contaReceber.listarTodasContas(bd);


        for(let x=0; x<resp.length; x++)
        {        
            let idCliente = await VendaController.buscarClienteId(bd, resp[x].id);
            let nomeCliente = await ClienteController.buscarClienteNome(bd, idCliente);

            var c = {
                id: resp[x].id,
                qtdeParcelas: resp[x].qtdeParcelas,
                valorTotal: resp[x].valorTotal,
                dataEmissao: resp[x].dataEmissao,
                dataPrimeiroVencimento: resp[x].dataPrimeiroVencimento,
                nomeCliente: nomeCliente,
            }
            resp[x] = c;
        }

        bd.Client.end();
        /*if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há Contas a Receber cadastradas");
        }*/
        return response.send(resp);
    }

    //todo: programar formas de filtrar contas por usuario/cliente/data ou outros
    /*async filtrarContas(request, response)
    {
        const {filtro} = request.params;
        var contaPagar = new ContaPagar();
        bd.conectar();
        const resp = await contaPagar.filtrarContas(bd, filtro);
        bd.Client.end();

        if(resp != undefined)
        {
            return response.send(["",resp]);
        }
        else
        {
            return response.send(["Não há Contas a Pagar cadastradas", []]);
        }
    }*/

    //todo: relizar esta função posteriormente
    /*async alterar(request, response)
    {
        const {idConta, valorTotal, qtdeParcelas, titulo, observacao, dataEmissao, tipoDocumento, idFornecedor, dataPrimeiroVencimento} = request.body;
        bd.conectar();
        var msg="";

        var contaPagar = new ContaPagar(idConta, valorTotal, qtdeParcelas, titulo, observacao, dataEmissao, tipoDocumento, idFornecedor, dataPrimeiroVencimento);
        const resp = await contaPagar.alterar(bd);

        if(resp>0)
            msg+="Alterado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        bd.Client.end();
        return response.send(msg);
    }*/

    async deletar(request, response) 
    {
        const {idConta} = request.params;
        bd.conectar();
        var msg="";

        const contaReceber = new ContaReceber();
        var resp = await ParcelaController.deletarParcelas(bd, idConta);
        
        resp = await contaReceber.deletar(bd, idConta);
        if(resp > 0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado em Conta a Receber!!";

        bd.Client.end();
        return response.send(msg); 
    }

    /*async buscarCliente(bd, idConta)
    {
        //bd.conectar();
        let idCliente = await VendaController.buscarClienteId(bd, idConta);
        let resp = await ClienteController.buscarClienteNome(bd, idCliente);

        //bd.Client.end();

        return resp;
    }*/
}

module.exports = new ContaReceberController();