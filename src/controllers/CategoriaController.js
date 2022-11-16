const axios = require('axios');
const bd = require('../models/Database');

const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');
const { response } = require('express');

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

    async relMaisVendidas(request, response)
    {
        let categoria = new Categoria();
        let todasCategorias = await categoria.buscarTudo(bd);

        let produto = new Produto();
        let produtos = await produto.listarTodosProdutos(bd);

        let lista = [];
        let cat_produto = [];

        for(let x=0; x<todasCategorias.length; x++)
        {
            let newCategoria = {
                id: todasCategorias[x].id,
                descricao: todasCategorias[x].descricao,
                qtdeVendidos: 0,
                valor: 0,
            }  

            for(let y=0; y<produtos.length; y++)
            {
                if(newCategoria.id == produtos[y].id_categoria)
                {
                    newCategoria.qtdeVendidos += produtos[y].qtdeVendido;
                    newCategoria.valor = newCategoria.valor + (produtos[y].qtdeVendido * produtos[y].valorUnitario);
                }
            }

            cat_produto = [...cat_produto, newCategoria];
        }

        todasCategorias = cat_produto;
        todasCategorias.sort(function(a,b){return b.qtdeVendidos-a.qtdeVendidos});

        let tam = todasCategorias.length;
        if(tam > 20)
            tam = 20;

        for(let x=0; x<tam; x++)
        {
            let vetaux = [todasCategorias[x].id, todasCategorias[x].descricao, todasCategorias[x].qtdeVendidos, 
                        todasCategorias[x].valor];

            lista.push(vetaux);
        }
        
        return response.send(lista);
    }

    async relMenosVendidas(request, response)
    {
        let categoria = new Categoria();
        let todasCategorias = await categoria.buscarTudo(bd);

        let produto = new Produto();
        let produtos = await produto.listarTodosProdutos(bd);

        let lista = [];
        let cat_produto = [];

        for(let x=0; x<todasCategorias.length; x++)
        {
            let newCategoria = {
                id: todasCategorias[x].id,
                descricao: todasCategorias[x].descricao,
                qtdeVendidos: 0,
                valor: 0,
            }  

            for(let y=0; y<produtos.length; y++)
            {
                if(newCategoria.id == produtos[y].id_categoria)
                {
                    newCategoria.qtdeVendidos += produtos[y].qtdeVendido;
                    newCategoria.valor = newCategoria.valor + (produtos[y].qtdeVendido * produtos[y].valorUnitario);
                }
            }

            cat_produto = [...cat_produto, newCategoria];
        }

        todasCategorias = cat_produto;
        todasCategorias.sort(function(a,b){return a.qtdeVendidos-b.qtdeVendidos});

        let tam = todasCategorias.length;
        if(tam > 20)
            tam = 20;

        for(let x=0; x<tam; x++)
        {
            let vetaux = [todasCategorias[x].id, todasCategorias[x].descricao, todasCategorias[x].qtdeVendidos, 
                        todasCategorias[x].valor];

            lista.push(vetaux);
        }
        
        return response.send(lista);
    }
}

module.exports = new CategoriaController();