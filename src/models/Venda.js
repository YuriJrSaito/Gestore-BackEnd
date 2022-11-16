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

    async buscarConta(bd, idConta)
    {
        const resp = await new VendaDAO().buscarConta(bd, idConta);
        return resp;
    }

    async buscarUsuario(bd, idUsuario)
    {
        const resp = await new VendaDAO().buscarUsuario(bd, idUsuario);
        return resp;
    }

    async buscarCliente(bd, idCliente)
    {
        const resp = await new VendaDAO().buscarCliente(bd, idCliente);
        return resp;
    }

    async buscarQtdeVendas(bd, idVenda)
    {
        const resp = await new VendaDAO().buscarQtdeVendas(bd, idVenda);
        return resp;
    }

    async buscarVendasUsuario(bd, idUsuario)
    {
        const resp = await new VendaDAO().buscarVendasUsuario(bd, idUsuario);
        return resp;
    }
}

module.exports = Venda;
