const ProdutoDAO = require('../DAOs/ProdutoDAO.js');

class Produto
{
    id;
    codigoReferencia;
    qtdeEstoque;
    titulo;
    descricao;
    valorUnitario;
    valorDeCompra;
    idCategoria;
    idFornecedor;
    img1;
    img2;
    img3;

    constructor(id, codigoReferencia, qtdeEstoque,titulo, descricao, valorUnitario, valorDeCompra, idCategoria, idFornecedor, img1, img2, img3)
    {
        this.id = id;
        this.codigoReferencia = codigoReferencia;
        this.qtdeEstoque = qtdeEstoque;
        this.titulo = titulo;
        this.descricao = descricao;
        this.valorUnitario = valorUnitario;
        this.valorDeCompra = valorDeCompra;
        this.idCategoria = idCategoria;
        this.idFornecedor = idFornecedor;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
    }

    async gravar(bd)
    {
        const resp = await new ProdutoDAO().gravar(bd, this);
        return resp;
    }

    async listarTodosProdutos(bd)
    {
        const resp = await new ProdutoDAO().buscarTodos(bd);
        return resp;
    }

    async alterar(bd)
    {
        const resp = await new ProdutoDAO().alterar(bd, this);
        return resp;
    }

    async filtrarProdutos(bd, filtro)
    {
        const resp = await new ProdutoDAO().filtrarProdutos(bd, filtro);
        return resp;
    }

    async deletar(bd, idProduto)
    {
        const resp = await new ProdutoDAO().deletar(bd, idProduto);
        return resp;
    }

    async buscarFornecedor(bd, idFornecedor)
    {
        const resp = await new ProdutoDAO().buscarFornecedor(bd, idFornecedor);
        return resp;
    }

    async buscarCategoria(bd, idCategoria)
    {
        const resp = await new ProdutoDAO().buscarCategoria(bd, idCategoria);
        return resp;
    }
}

module.exports = Produto;