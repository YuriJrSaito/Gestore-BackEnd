const ContaReceberDAO = require('../DAOs/ContaReceberDAO');

class ContaReceber
{
    id;
    qtdeParcelas;
    valorTotal;
    dataEmissao;
    dataPrimeiroVencimento;

    constructor(id, qtdeParcelas, valorTotal, dataEmissao, dataPrimeiroVencimento)
    {
        this.id = id;
        this.qtdeParcelas = qtdeParcelas;
        this.valorTotal = valorTotal;
        this.dataEmissao = dataEmissao;
        this.dataPrimeiroVencimento = dataPrimeiroVencimento;
    }

    async gravar(bd)
    {
        const resp = await new ContaReceberDAO().gravar(bd, this);
        return resp;
    }

    async listarTodasContas(bd)
    {
        const resp = await new ContaReceberDAO().buscarTodos(bd);
        return resp;
    }

   /* async alterar(bd)
    {
        const resp = await new ContaReceberDAO().alterar(bd, this);
        return resp;
    }*/

   /* async filtrarContas(bd, filtro)
    {
        const resp = await new ContaReceberDAO().filtrarContas(bd, filtro);
        return resp;
    }*/

    async deletar(bd, idConta)
    {
        const resp = await new ContaReceberDAO().deletar(bd, idConta);
        return resp;
    }

    async buscarConta(bd, idConta)
    {
        const resp = await new ContaReceberDAO().buscarConta(bd, idConta);
        return resp;
    }
}

module.exports = ContaReceber;