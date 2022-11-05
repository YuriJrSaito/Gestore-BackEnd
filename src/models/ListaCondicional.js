const ListaCondicionalDAO = require('../DAOs/ListaCondDAO');

class ListaCondicional
{
    id;
    idVendaCond;
    idProduto;
    quantidade;
    valor;

    constructor(id, idVendaCond, idProduto, quantidade, valor)
    {
        this.id = id;
        this.idVendaCond = idVendaCond;
        this.idProduto = idProduto;
        this.quantidade = quantidade;
        this.valor = valor;
    }

    async gravar(bd)
    {
        const resp = await new ListaCondicionalDAO().gravar(bd, this);
        return resp;
    }

    async listarTudo(bd, idVenda)
    {
        const resp = await new ListaCondicionalDAO().listarTudo(bd, idVenda);
        return resp;
    }

    async alterar(bd)
    {
        const resp = await new ListaCondicionalDAO().alterar(bd, this);
        return resp;
    }

    async deletar(bd, idVenda)
    {
        const resp = await new ListaCondicionalDAO().deletar(bd, idVenda);
        return resp;
    }
}

module.exports = ListaCondicional;