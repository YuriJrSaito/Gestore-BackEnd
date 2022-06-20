const axios = require('axios');
const bd = require('../models/Database');

const Categoria = require('../models/Categoria');

class CategoriaController{

    async gravar(request, response)
    {
        const {descricao} = request.body;
        var categoria = new Categoria(0, descricao);
        
        var msg = "";
        bd.conectar();   

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

        bd.Client.end();
        return response.send(msg);
    }

    async buscarTudo(request, response)
    {
        var categoria = new Categoria;
        
        var msg = "";
        await bd.conectar();   

        var categorias = await categoria.buscarTudo(bd);

        await bd.Client.end();
        return response.send(categorias);
    }

    async buscarPorId(request, response)
    {
        const {idCategoria} = request.params;
        var categoria = new Categoria;
        await bd.conectar();
        
        var resp = await categoria.buscarPorID(bd, idCategoria);

        await bd.Client.end();
        return response.send(resp);
    }

    async filtrarCategorias(request, response)
    {
        const {filtro} = request.params;

        var categoria = new Categoria();
        bd.conectar();
        const resp = await categoria.filtrarCategorias(bd, filtro);
        bd.Client.end();

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
        bd.conectar();
        var msg="";

        const categoria = new Categoria();
        const resp = await categoria.deletar(bd, idCategoria);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        bd.Client.end();
        return response.send(msg); 
    }
}

module.exports = new CategoriaController();