const Produto = require("../models/Produto");

module.exports = class ProdutoDAO
{
    async gravar(bd, produto)
    {
        const sql = "INSERT INTO produto VALUES (default, $1, $2, $3, $4, $5 ,$6, $7, $8, $9, $10, $11) RETURNING *";
        var values = Object.values(produto).slice(1); //retira o id
        try{
            const res = await bd.Client.query(sql,values);
            return res.rows;
        }
        finally{}
    }

    async buscarTodos(bd)
    {
        try {
            let res = await bd.Client.query('SELECT * from produto');
            return res.rows;              
        }
        finally{}
    }

    async alterar(bd, produto)
    {
        let sql=`UPDATE produto SET id=$1, "codigoReferencia"=$2, "qtdeEstoque"=$3, titulo=$4, descricao=$5, "valorUnitario"=$6, "valorDeCompra"=$7, "id_categoria"=$8, "id_fornecedor"=$9, img1=$10, img2=$11, img3=$12 WHERE id = $1`;
        var values = Object.values(produto);
        try{
            let res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }

    async filtrarProdutos(bd, filtro)
    {
        try {
            let res = await bd.Client.query(`SELECT * from produto where titulo iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        catch(err){
            console.log(err);
        }
    }

    async deletar(bd, idProduto)
    {
        let sql="DELETE FROM produto WHERE id = "+idProduto;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }

    async buscarFornecedor(bd, idFornecedor)
    {
        try {
            let res = await bd.Client.query(`SELECT * from produto where id_fornecedor='${idFornecedor}'`);
            return res.rows;              
        }
        finally{}
    }

    async buscarCategoria(bd, idCategoria)
    {
        try {
            let res = await bd.Client.query(`SELECT * from produto where id_categoria='${idCategoria}'`);
            return res.rows;              
        }
        finally{}
    }
}