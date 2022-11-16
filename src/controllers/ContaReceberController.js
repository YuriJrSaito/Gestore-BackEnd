const bd = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const ParcelaController = require("../controllers/ParcelaContaReceberController");
const VendaController = require("../controllers/VendaController");
const ClienteController = require("../controllers/ClienteController");
const moment = require('moment');

class ContaReceberController{

    async gravar(request, response)
    {
        const {qtdeParcelas, valorTotal, dataEmissao, dataPrimeiroVencimento} = request.body;
        var contaReceber = new ContaReceber(0, qtdeParcelas, valorTotal, dataEmissao, dataPrimeiroVencimento);
        var msg = "";

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
        return response.send([idConta]);
    }

    async listarTodasContas(request, response)
    {
        var contaReceber = new ContaReceber();
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
                idCliente: idCliente,
            }
            resp[x] = c;
        }

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
        var msg="";

        const contaReceber = new ContaReceber();
        var resp = await ParcelaController.deletarParcelas(bd, idConta);
        
        resp = await contaReceber.deletar(bd, idConta);
        if(resp > 0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado em Conta a Receber!!";

        return response.send(msg); 
    }

    //ta dando erro typeerror: is no a function
    async buscarConta(bd, idConta)
    {
        let contaReceber = new ContaReceber();
        let resp = await contaReceber.buscarConta(bd, idConta);
        return resp;
    }

    async relTodasContasReceber(request, response)
    {
        var conta = new ContaReceber();
        const resp = await conta.listarTodasContas(bd);
        let lista = [];
        
        for(let x=0; x<resp.length; x++)
        {
            let idCliente = await VendaController.buscarClienteId(bd, resp[x].id);
            let nomeCliente = await ClienteController.buscarClienteNome(bd, idCliente);

            let qtdeNaoPago = 0;
            let naoPago = 0;
            
            let parcelas = await ParcelaController.buscarParcelas(bd, resp[x].id);

            for(let parcela of parcelas)
            {
                if(parcela.situacao == "Não pago")
                {
                    naoPago = parseFloat(naoPago) + parseFloat(parcela.valor);
                    qtdeNaoPago++;
                }
            }
            
            let vetaux = [resp[x].id, nomeCliente, moment.utc(resp[x].dataEmissao).format('DD-MM-YYYY'), 
                        resp[x].valorTotal, parseFloat(naoPago).toFixed(2), resp[x].qtdeParcelas, qtdeNaoPago];

            lista.push(vetaux);
        }

        return response.send(lista);
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