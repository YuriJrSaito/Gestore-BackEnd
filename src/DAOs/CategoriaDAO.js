const Categoria = require("../models/Categoria");

module.exports = class CategoriaDAO
{
    async gravar(bd, categoria)
    {
        const sql = "INSERT INTO categoria VALUES (default, $1) RETURNING *";
        var values = Object.values(categoria).slice(1); //retira o id
        try{
            const res = await bd.Client.query(sql,values);
            return res.rows;
        }
        finally{}
    }

    async procurar(bd, descricao)
    {
        try {
            let res = await bd.Client.query(`SELECT * from categoria where descricao='${descricao}'`);
            return res.rows;              
        }
        finally{}
    }

    async buscarTudo(bd)
    {
        try {
            let res = await bd.Client.query('SELECT * from categoria');
            return res.rows;              
        }
        finally{}
    }

    async buscarPorID(bd, idCategoria)
    {
        try {
            let res = await bd.Client.query(`SELECT * from categoria where id='${idCategoria}'`);
            return res.rows;              
        }
        finally{}
    }

    async filtrarCategorias(bd, filtro)
    {
        try {
            let res = await bd.Client.query(`SELECT * from categoria where descricao iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        catch(err){
            console.log(err);
        }
    }

    async deletar(bd, idCategoria)
    {
        let sql="DELETE FROM categoria WHERE id = "+idCategoria;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }
}