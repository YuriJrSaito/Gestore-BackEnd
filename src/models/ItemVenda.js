const ItemVendaDAO = require('../DAOs/ItemVendaDAO');

class ItemVenda
{
    id;
    quantidade;
    valor;
    idVenda;
    idProduto;

    constructor(id, quantidade, valor, idVenda, idProduto)
    {
        this.id = id;
        this.quantidade = quantidade;
        this.valor = valor;
        this.idVenda = idVenda;
        this.idProduto = idProduto;
    }

    async gravar(bd)
    {
        const resp = await new ItemVendaDAO().gravar(bd, this);
        return resp;
    }

    async listarTodasVendas(bd)
    {
        const resp = await new ItemVendaDAO().buscarTodos(bd);
        return resp;
    }

    async alterar(bd)
    {
        const resp = await new ItemVendaDAO().alterar(bd, this);
        return resp;
    }

    async deletar(bd, idVenda)
    {
        const resp = await new ItemVendaDAO().deletar(bd, idVenda);
        return resp;
    }
}

module.exports = ItemVenda;
