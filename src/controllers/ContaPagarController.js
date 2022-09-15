const bd = require('../models/Database');
const ContaPagar = require('../models/ContaPagar');
const ParcelaController = require("../controllers/ParcelaContaPagarController");

class ContaPagarController{

    async gravar(request, response)
    {
        const {valorTotal, qtdeParcelas, titulo, observacao, dataEmissao, tipoDocumento, idFornecedor, dataPrimeiroVencimento} = request.body;
        var contaPagar = new ContaPagar(0, valorTotal, qtdeParcelas, titulo, observacao, dataEmissao, tipoDocumento, idFornecedor, dataPrimeiroVencimento);
        var msg = "";

        bd.conectar();  
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

        bd.Client.end();

        return response.send([msg, idConta]);
    }

    async listarTodasContas(request, response)
    {
        var contaPagar = new ContaPagar();
        bd.conectar();
        const resp = await contaPagar.listarTodasContas(bd);
        bd.Client.end();
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
        bd.conectar();
        const resp = await contaPagar.filtrarContas(bd, filtro);
        bd.Client.end();

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há Contas a Pagar cadastradas");
        }
    }

    async alterar(request, response)
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
    }

    async deletar(request, response) 
    {
        const {idConta} = request.params;
        bd.conectar();
        var msg="";

        const contaPagar = new ContaPagar();
        var resp = await ParcelaController.deletarParcelas(bd, idConta);
        
        resp = await contaPagar.deletar(bd, idConta);
        if(resp > 0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado em Conta a Pagar!!";


        bd.Client.end();
        return response.send(msg); 
    }
}

module.exports = new ContaPagarController();