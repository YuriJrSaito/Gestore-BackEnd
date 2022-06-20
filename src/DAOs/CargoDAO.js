const Cargo = require("../models/Cargo");

module.exports = class CargoDAO
{
    async gravar(bd, cargo)
    {
        const sql = "INSERT INTO cargo VALUES (default, $1) RETURNING *";
        var values = Object.values(cargo).slice(1); //retira o id do endereco
        try{
            const res = await bd.Client.query(sql,values);
            return res.rows;
        }
        finally{}
    }

    async procurar(bd, descricao)
    {
        try {
            let res = await bd.Client.query(`SELECT * from cargo where descricao='${descricao}'`);
            return res.rows;              
        }
        finally{}
    }

    async buscarTudo(bd)
    {
        try {
            let res = await bd.Client.query('SELECT * from cargo');
            return res.rows;              
        }
        finally{}
    }

    async buscarPorID(bd, idCargo)
    {
        try {
            let res = await bd.Client.query(`SELECT * from cargo where id='${idCargo}'`);
            return res.rows;              
        }
        finally{}
    }

    async filtrarCargos(bd, filtro)
    {
        try {
            let res = await bd.Client.query(`SELECT * from cargo where descricao iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        catch(err){
            console.log(err);
        }
    }

    async deletar(bd, idCargo)
    {
        let sql="DELETE FROM cargo WHERE id = "+idCargo;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }
}