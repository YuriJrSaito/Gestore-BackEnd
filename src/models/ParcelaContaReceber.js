const ParcelaDAO = require('../DAOs/ParcelaContaReceberDAO');

class ParcelaContaReceber
{
    id;
    dataPagamento;
    dataVencimento;
    numParcela;
    situacao;
    idContaReceber;
    valor;
    valorTotal;

    constructor(id, dataPagamento, dataVencimento, numParcela, situacao, idContaReceber, valor, valorTotal)
    {
        this.id = id;
        this.dataPagamento = dataPagamento;
        this.dataVencimento = dataVencimento;
        this.numParcela = numParcela;
        this.situacao = situacao;
        this.idContaReceber = idContaReceber;
        this.valor = valor;
        this.valorTotal = valorTotal;
    }

    async gravar(bd)
    {
        const resp = await new ParcelaDAO().gravar(bd, this);
        return resp;
    }

    async listarTodasParcelas(bd, idConta)
    {
        const resp = await new ParcelaDAO().buscarTodos(bd, idConta);
        return resp;
    }

    async alterar(bd)
    {
        const resp = await new ParcelaDAO().alterar(bd, this);
        return resp;
    }

    async quitarParcela(bd, idParcela)
    {
        const resp = await new ParcelaDAO().quitar(bd, idParcela);
        return resp;
    }

    async deletar(bd, idConta)
    {
        const resp = await new ParcelaDAO().deletar(bd, idConta);
        return resp;
    }

    async pagarParcelado(bd, idParcela, valor)
    {
        const resp = await new ParcelaDAO().pagarParcelado(bd, idParcela, valor);
        return resp;
    }
}

module.exports = ParcelaContaReceber;