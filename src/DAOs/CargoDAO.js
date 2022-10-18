const Cargo = require("../models/Cargo");

module.exports = class CargoDAO
{
    async gravar(bd, cargo)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO cargo VALUES (default, $1) RETURNING *";
        var values = Object.values(cargo).slice(1); //retira o id
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
            let res = await client.query(`SELECT * from cargo where descricao='${descricao}'`);
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
            let res = await client.query('SELECT * from cargo');
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async buscarPorID(bd, idCargo)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from cargo where id='${idCargo}'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async filtrarCargos(bd, filtro)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from cargo where descricao iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        catch(err){
            console.log(err);
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idCargo)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM cargo WHERE id = "+idCargo;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }
}