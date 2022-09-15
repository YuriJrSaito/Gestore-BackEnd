const ContaPagarDAO = require('../DAOs/ContaPagarDAO');

class ContaPagar
{
    id;
    valorTotal;
    qtdeParcelas;
    titulo;
    observacao;
    dataEmissao;
    tipoDocumento;
    idFornecedor;
    dataPrimeiroVencimento;

    constructor(id, valorTotal, qtdeParcelas, titulo, observacao, dataEmissao, tipoDocumento, idFornecedor, dataPrimeiroVencimento)
    {
        this.id = id;
        this.valorTotal = valorTotal;
        this.qtdeParcelas = qtdeParcelas;
        this.titulo = titulo;
        this.observacao = observacao;
        this.dataEmissao = dataEmissao;
        this.tipoDocumento = tipoDocumento;
        this.idFornecedor = idFornecedor;
        this.dataPrimeiroVencimento = dataPrimeiroVencimento;
    }

    async gravar(bd)
    {
        const resp = await new ContaPagarDAO().gravar(bd, this);
        return resp;
    }

    async listarTodasContas(bd)
    {
        const resp = await new ContaPagarDAO().buscarTodos(bd);
        return resp;
    }

    async alterar(bd)
    {
        const resp = await new ContaPagarDAO().alterar(bd, this);
        return resp;
    }

    async filtrarContas(bd, filtro)
    {
        const resp = await new ContaPagarDAO().filtrarContas(bd, filtro);
        return resp;
    }

    async deletar(bd, idConta)
    {
        const resp = await new ContaPagarDAO().deletar(bd, idConta);
        return resp;
    }

    async buscarFornecedor(bd, idFornecedor)
    {
        const resp = await new ContaPagarDAO().buscarFornecedor(bd, idFornecedor);
        return resp;
    }
}

module.exports = ContaPagar;