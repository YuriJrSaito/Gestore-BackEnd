const ParcelaDAO = require('../DAOs/ParcelaContaPagarDAO');

class ParcelaContaPagar
{
    id;
    valor;
    dataPagamento;
    dataVencimento;
    numParcela;
    situacao;
    idContaPagar;

    constructor(id, valor, dataPagamento, dataVencimento, numParcela, situacao, idContaPagar)
    {
        this.id = id;
        this.valor = valor;
        this.dataPagamento = dataPagamento;
        this.dataVencimento = dataVencimento;
        this.numParcela = numParcela;
        this.situacao = situacao;
        this.idContaPagar = idContaPagar;
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
}

module.exports = ParcelaContaPagar;