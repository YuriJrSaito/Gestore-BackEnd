const VendaDAO = require('../DAOs/VendaDAO');

class Venda
{
    id;
    dataVenda;
    idContaReceber;
    idUsuario;
    idCliente;

    constructor(id, dataVenda, idContaReceber, idUsuario, idCliente)
    {
        this.id = id;
        this.dataVenda = dataVenda;
        this.idContaReceber = idContaReceber;
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

    async filtrarVendas(bd, filtro)
    {
        const resp = await new VendaDAO().filtrarVendas(bd, filtro);
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

    async buscarClienteId(bd, idConta)
    {
        const resp = await new VendaDAO().buscarClienteId(bd, idConta);
        return resp;
    }
}

module.exports = Venda;
