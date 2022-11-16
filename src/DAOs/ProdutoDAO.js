const Produto = require("../models/Produto");

module.exports = class ProdutoDAO
{
    async gravar(bd, produto)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO produto VALUES (default, $1, $2, $3, $4, $5 ,$6, $7, $8, $9, $10, $11, $12) RETURNING *";
        var values = Object.values(produto).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res.rows;
        }
        finally{
            client.release();
        }
    }

    async buscarTodos(bd)
    {
        const client = await bd.pool.connect();
        try {
            let res = await client.query('SELECT * from produto');
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async buscarProduto(bd, idProduto)
    {
        const client = await bd.pool.connect();
        try {
            let res = await client.query('SELECT * from produto where id='+idProduto);
            return res.rows[0];              
        }
        finally{
            client.release();
        }
    }

    async alterar(bd, produto)
    {
        const client = await bd.conectar();
        let sql=`UPDATE produto SET id=$1, "codigoReferencia"=$2, "qtdeEstoque"=$3, titulo=$4, descricao=$5, "valorUnitario"=$6, "valorDeCompra"=$7, "id_categoria"=$8, "id_fornecedor"=$9, img1=$10, img2=$11, img3=$12, "qtdeVendido"=$13 WHERE id = $1`;
        var values = Object.values(produto);
        try{
            let res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async controleEstoque(bd, idProduto, qtdeEstoque)
    {
        const client = await bd.conectar();
        let sql=`UPDATE produto SET "qtdeEstoque"=${qtdeEstoque} WHERE id = ${idProduto}`;
        try{
            let res = await client.query(sql);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async controleEstoque2(bd, idProduto, quantidadeSelecionado)
    {
        const client = await bd.conectar();
        let sql=`UPDATE produto SET "qtdeEstoque"= "qtdeEstoque"-${quantidadeSelecionado} WHERE id = ${idProduto}`;
        try{
            let res = await client.query(sql);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async devolver(bd, idProduto, quantidade)
    {
        const client = await bd.conectar();
        let sql=`UPDATE produto SET "qtdeEstoque" = "qtdeEstoque" + ${quantidade} WHERE id = ${idProduto}`;
        try{
            let res = await client.query(sql);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async atualizarQtdeVendido(bd, idProduto, quantidade)
    {
        const client = await bd.conectar();
        let sql=`UPDATE produto SET "qtdeVendido" = "qtdeVendido" + ${quantidade} WHERE id = ${idProduto}`;
        try{
            let res = await client.query(sql);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async filtrarProdutos(bd, filtro)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from produto where titulo iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        catch(err){
            console.log(err);
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idProduto)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM produto WHERE id = "+idProduto;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }

    async buscarFornecedor(bd, idFornecedor)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from produto where id_fornecedor='${idFornecedor}'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async buscarCategoria(bd, idCategoria)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from produto where id_categoria='${idCategoria}'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }
}