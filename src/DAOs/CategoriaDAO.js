const Categoria = require("../models/Categoria");

module.exports = class CategoriaDAO
{
    async gravar(bd, categoria)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO categoria VALUES (default, $1) RETURNING *";
        var values = Object.values(categoria).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res.rows;
        }
        finally{
            client.release();
        }
    }

    async procurar(bd, descricao)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from categoria where descricao='${descricao}'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async buscarTudo(bd)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query('SELECT * from categoria');
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async buscarPorID(bd, idCategoria)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from categoria where id='${idCategoria}'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async filtrarCategorias(bd, filtro)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from categoria where descricao iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        catch(err){
            console.log(err);
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idCategoria)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM categoria WHERE id = "+idCategoria;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }
}