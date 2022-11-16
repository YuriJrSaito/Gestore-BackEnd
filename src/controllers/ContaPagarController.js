const bd = require('../models/Database');
const ContaPagar = require('../models/ContaPagar');
const ParcelaController = require("../controllers/ParcelaContaPagarController");
const Parcela = require('../models/ParcelaContaPagar');
const Fornecedor = require('../models/Fornecedor');
const moment = require('moment');

class ContaPagarController{

    async gravar(request, response)
    {
        const {valorTotal, qtdeParcelas, titulo, observacao, dataEmissao, tipoDocumento, idFornecedor, dataPrimeiroVencimento} = request.body;
        var contaPagar = new ContaPagar(0, valorTotal, qtdeParcelas, titulo, observacao, dataEmissao, tipoDocumento, idFornecedor, dataPrimeiroVencimento);
        var msg = "";

        var idConta = await contaPagar.gravar(bd);
        if(idConta > 0)
        {
            msg = "Conta Cadastrada com Sucesso";
            let parcela = await ParcelaController.gravarParcelas(bd, idConta, valorTotal, qtdeParcelas, dataPrimeiroVencimento);
        }
        else
        {
            msg = "Algo deu errado";
        }

        return response.send([msg, idConta]);
    }

    async listarTodasContas(request, response)
    {
        var contaPagar = new ContaPagar();
        const resp = await contaPagar.listarTodasContas(bd);

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há Contas a Pagar cadastradas");
        }
    }

    async filtrarContas(request, response)
    {
        const {filtro} = request.params;
        var contaPagar = new ContaPagar();

        const resp = await contaPagar.filtrarContas(bd, filtro);

        if(resp != undefined)
        {
            return response.send(["",resp]);
        }
        else
        {
            return response.send(["Não há Contas a Pagar cadastradas", []]);
        }
    }

    async alterar(request, response)
    {
        const {idConta, valorTotal, qtdeParcelas, titulo, observacao, dataEmissao, tipoDocumento, idFornecedor, dataPrimeiroVencimento} = request.body;
        var msg="";

        var contaPagar = new ContaPagar(idConta, valorTotal, qtdeParcelas, titulo, observacao, dataEmissao, tipoDocumento, idFornecedor, dataPrimeiroVencimento);
        const resp = await contaPagar.alterar(bd);

        if(resp>0)
            msg+="Alterado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg);
    }

    async deletar(request, response) 
    {
        const {idConta} = request.params;
        var msg="";

        const contaPagar = new ContaPagar();
        var resp = await ParcelaController.deletarParcelas(bd, idConta);
        
        resp = await contaPagar.deletar(bd, idConta);
        if(resp > 0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado em Conta a Pagar!!";

        return response.send(msg); 
    }

    async relTodasContasPagar(request, response)
    {
        var conta = new ContaPagar();
        const resp = await conta.listarTodasContas(bd);
        let lista = [];
        
        for(let x=0; x<resp.length; x++)
        {
            let fornecedorClass = new Fornecedor();
            let fornecedor = await fornecedorClass.buscarFornecedor(bd, resp[x].id_fornecedor);

            let parcelaClass = new Parcela();
            let parcelas = await parcelaClass.listarTodasParcelas(bd, resp[x].id);

            let qtdeNaoPago = 0;
            let naoPago = 0;
            
            for(let parcela of parcelas)
            {
                if(parcela.situacao == "Não pago")
                {
                    naoPago = parseFloat(naoPago) + parseFloat(parcela.valor);
                    qtdeNaoPago++;
                }
            }
            
            let vetaux = [resp[x].id, fornecedor[0].nome, resp[x].titulo, 
                        moment.utc(resp[x].dataEmissao).format('DD-MM-YYYY'), 
                        resp[x].valorTotal, parseFloat(naoPago).toFixed(2), resp[x].qtdeParcelas, qtdeNaoPago];

            lista.push(vetaux);
        }

        return response.send(lista);
    }
}

module.exports = new ContaPagarController();