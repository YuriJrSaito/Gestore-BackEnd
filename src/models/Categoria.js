const CategoriaDAO = require('../DAOs/CategoriaDAO.js');

class Categoria
{
    id;
    descricao;

    constructor(id, descricao)
    {
        this.id = id;
        this.descricao = descricao;
    }

    async gravar(bd)
    {
        const resp = await new CategoriaDAO().gravar(bd, this);
        return resp;
    }

    async procurar(bd)
    {
        const resp = await new CategoriaDAO().procurar(bd, this.descricao);
        if(resp.length > 0)
        {
            return true;
        }
        else
            return false;
    }

    async buscarTudo(bd)
    {
        const resp = await new CategoriaDAO().buscarTudo(bd);
        return resp;
    }
    
    async buscarPorID(bd, idCategoria)
    {
        const resp = await new CategoriaDAO().buscarPorID(bd, idCategoria);
        return resp;
    }

    async filtrarCategorias(bd, filtro)
    {
        const resp = await new CategoriaDAO().filtrarCategorias(bd, filtro);
        return resp;
    }

    async deletar(bd, idCategoria)
    {
        const resp = await new CategoriaDAO().deletar(bd, idCategoria);
        return resp;
    }
}

module.exports = Categoria;