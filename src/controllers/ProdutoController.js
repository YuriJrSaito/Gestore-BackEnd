const axios = require('axios');
const bd = require('../models/Database');
const Categoria = require('../models/Categoria');
const Fornecedor = require('../models/Fornecedor');
const Produto = require('../models/Produto');

class ProdutoController{

    async gravar(request, response)
    {
        const {titulo, codigoRef, qtdeEstoque, descricao, valorUnitario, valorCompra, idFornecedor, idCategoria, img1, img2, img3} = request.body;
        var produto = new Produto(0, codigoRef, qtdeEstoque, titulo, descricao, valorUnitario, valorCompra, idCategoria, idFornecedor, img1, img2, img3, 0);
        var msg = "";
        var resp = await produto.gravar(bd);

        if(resp.length > 0)
            msg = "Produto cadastrado com sucesso!!";

        return response.send(msg);
    }

    async alterar(request, response)
    {
        const {idProduto, titulo, codigoRef, qtdeEstoque, descricao, valorUnitario, valorCompra, idFornecedor, idCategoria, img1, img2, img3} = request.body;
        var msg="";
        var produto = new Produto(idProduto, codigoRef, qtdeEstoque, titulo, descricao, valorUnitario, valorCompra, idCategoria, idFornecedor, img1, img2, img3);
        const resp = await produto.alterar(bd);

        if(resp>0)
            msg+="Alterado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg);
    }

    async listarTodosProdutos(request, response)
    {
        var produto = new Produto();
        const resp = await produto.listarTodosProdutos(bd);

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há produtos cadastrados");
        }
    }

    async filtrarProdutos(request, response)
    {
        const {filtro} = request.params;
        var produto = new Produto();
        const resp = await produto.filtrarProdutos(bd, filtro);

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há produtos cadastrados");
        }
    }

    async deletar(request, response) 
    {
        const {idProduto} = request.params;
        var msg="";
        const produto = new Produto();
        const resp = await produto.deletar(bd, idProduto);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg); 
    }

    async buscarFornecedor(request, response)
    {
        const {idFornecedor} = request.params;
        const produto = new Produto();
        const resp = await produto.buscarFornecedor(bd, idFornecedor);

        return response.send(resp); 
    }

    async buscarCategoria(request, response)
    {
        const {idCategoria} = request.params;
        const produto = new Produto();
        const resp = await produto.buscarCategoria(bd, idCategoria);

        return response.send(resp); 
    }

    async controleEstoque(bd, idProduto, qtdeEstoque)
    {
        let resp;
        let produto = new Produto();
        resp = await produto.controleEstoque(bd, idProduto, qtdeEstoque);

        return resp;
    }

    async devolverTodosProdutos(bd, produtos)
    {
        for(let x=0; x<produtos.length; x++)
        {
            let produto = new Produto();
            await produto.devolver(bd, produtos[x].id_produto, produtos[x].quantidade);
        }
        return true;
    }

    async controleEstoque2(bd, idProduto, quantidadeSelecionado)
    {
        let produto = new Produto();
        await produto.controleEstoque2(bd, idProduto, quantidadeSelecionado);
    }

    async buscarProdutosInfo(request, response)
    {
        const {items} = request.body;

        let produtos = [];

        for(let prod of items)
        {
            let produtoObjeto = new Produto();
            let produto = await produtoObjeto.buscarProduto(bd, prod.idProduto);

            let newProd = {
                id: produto.id,
                titulo: produto.titulo,
                valorUnitario: produto.valorUnitario,
                qtdeEstoque: produto.qtdeEstoque,
                img1: produto.img1,
                codigo: produto.codigoReferencia,
                qtdeNoItem: prod.quantidade,
                qtdeSelecionado: prod.quantidade,
                valor: prod.valor,
                itemId: prod.idLista,
            }

            produtos = [...produtos, newProd];
        }

        return response.send(produtos);
    }

    async devolver(bd, idProduto, quantidade)
    {
        let produto = new Produto();
        let resp = await produto.devolver(bd, idProduto, quantidade);
        return resp;
    }

    async atualizarQtdeVendido(bd, idProduto, quantidade)
    {
        let produto = new Produto();
        let resp = await produto.atualizarQtdeVendido(bd, idProduto, quantidade);
        return resp;
    }

    async relEstoque(request, response)
    {
        var produto = new Produto();
        const resp = await produto.listarTodosProdutos(bd);
        let lista = [];
        
        for(let x=0; x<resp.length; x++)
        {
            let fornecedorClass = new Fornecedor();
            let fornecedor = await fornecedorClass.buscarFornecedor(bd, resp[x].id_fornecedor);

            let categoriaClass = new Categoria();
            let categoria = await categoriaClass.buscarPorID(bd, resp[x].id_categoria);
            
            let vetaux = [resp[x].id, resp[x].codigoReferencia, resp[x].titulo, resp[x].qtdeEstoque, 
                        resp[x].valorUnitario, resp[x].valorDeCompra, categoria[0].descricao, fornecedor[0].nome];

            lista.push(vetaux);
        }

        return response.send(lista);
    }
}   

module.exports = new ProdutoController();