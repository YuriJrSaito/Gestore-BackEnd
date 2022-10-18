const Telefone = require("../models/Telefone");

module.exports = class TelefoneDAO
{
    async gravar(bd, telefone)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO telefone VALUES (default, $1, $2, $3) RETURNING *";
        var values = Object.values(telefone).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res.rows[0].id;
        }
        finally{
            client.release();
        }
    }

    async buscarTelefone(bd, idTelefone)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from telefone where id='${idTelefone}'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async alterarTelefone(bd, telefone)
    {
        const client = await bd.conectar();
        let sql="UPDATE telefone SET id=$1, telefone1=$2, telefone2=$3, telefone3=$4 WHERE id = $1";
        var values = Object.values(telefone);
        try{
            let res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idTelefone)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM telefone WHERE id = "+idTelefone;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }
}