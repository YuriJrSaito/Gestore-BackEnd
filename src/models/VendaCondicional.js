const VendaDAO = require('../DAOs/VendaCondDAO');

class VendaCondicional
{
    id;
    dataCriacao;
    dataLimite;
    observacao;
    valorTotal
    idUsuario;
    idCliente;

    constructor(id, dataCriacao, dataLimite, observacao, valorTotal, idUsuario, idCliente)
    {
        this.id = id;
        this.dataCriacao = dataCriacao;
        this.dataLimite = dataLimite;
        this.observacao = observacao;
        this.valorTotal = valorTotal;
        this.idUsuario = idUsuario;
        this.idCliente = idCliente;
    }

    async gravar(bd)
    {
        const resp = await new VendaDAO().gravar(bd, this);
        return resp;
    }

    async listarTodasVendas(bd)
    {
        const resp = await new VendaDAO().buscarTodos(bd);
        return resp;
    }

    async alterar(bd)
    {
        const resp = await new VendaDAO().alterar(bd, this);
        return resp;
    }

    async deletar(bd, idVenda)
    {
        const resp = await new VendaDAO().deletar(bd, idVenda);
        return resp;
    }

    async buscarUsuario(bd, idUsuario)
    {
        const resp = await new VendaDAO().buscarUsuario(bd, idUsuario);
        return resp;
    }
}

module.exports = VendaCondicional;
