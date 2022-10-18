const axios = require('axios');
const bd = require('../models/Database');

const Categoria = require('../models/Categoria');

class CategoriaController{

    async gravar(request, response)
    {
        const {descricao} = request.body;
        var categoria = new Categoria(0, descricao);
        
        var msg = ""; 

        var retorno = await categoria.procurar(bd);
        if(retorno == false)
        {
            var resp = await categoria.gravar(bd);
            if(resp.length > 0)
                msg = "Categoria cadastrada com sucesso!!";
        }
        else
        {
            msg = "Esta categoria já esta cadastrada";
        }

        return response.send(msg);
    }

    async buscarTudo(request, response)
    {
        var categoria = new Categoria;
        
        var msg = "";

        var categorias = await categoria.buscarTudo(bd);

        return response.send(categorias);
    }

    async buscarPorId(request, response)
    {
        const {idCategoria} = request.params;
        var categoria = new Categoria;
        
        var resp = await categoria.buscarPorID(bd, idCategoria);

        return response.send(resp);
    }

    async filtrarCategorias(request, response)
    {
        const {filtro} = request.params;

        var categoria = new Categoria();
        const resp = await categoria.filtrarCategorias(bd, filtro);

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há categorias cadastradas");
        }
    }

    async deletar(request, response) 
    {
        const {idCategoria} = request.params;
        var msg="";

        const categoria = new Categoria();
        const resp = await categoria.deletar(bd, idCategoria);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg);
    }
}

module.exports = new CategoriaController();