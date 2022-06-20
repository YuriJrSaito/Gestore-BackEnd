const Telefone = require("../models/Telefone");

module.exports = class TelefoneDAO
{
    async gravar(bd, telefone)
    {
        const sql = "INSERT INTO telefone VALUES (default, $1, $2, $3) RETURNING *";
        var values = Object.values(telefone).slice(1); //retira o id
        try{
            const res = await bd.Client.query(sql,values);
            return res.rows[0].id;
        }
        finally{}
    }

    async buscarTelefone(bd, idTelefone)
    {
        try {
            let res = await bd.Client.query(`SELECT * from telefone where id='${idTelefone}'`);
            return res.rows;              
        }
        finally{}
    }

    async alterarTelefone(bd, telefone)
    {
        let sql="UPDATE telefone SET id=$1, telefone1=$2, telefone2=$3, telefone3=$4 WHERE id = $1";
        var values = Object.values(telefone);
        try{
            let res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }

    async deletar(bd, idTelefone)
    {
        let sql="DELETE FROM telefone WHERE id = "+idTelefone;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }
}