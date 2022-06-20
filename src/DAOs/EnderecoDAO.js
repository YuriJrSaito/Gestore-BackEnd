const Endereco = require("../models/Endereco");

module.exports = class EnderecoDAO
{
    async gravar(bd, endereco)
    {
        const sql = "INSERT INTO endereco VALUES (default, $1, $2, $3, $4, $5, $6) RETURNING *";
        var values = Object.values(endereco).slice(1); //retira o id do endereco
        try{
            const res = await bd.Client.query(sql,values);
            return res.rows[0].id;
        }
        finally{}
    }

    async buscarEndereco(bd, idEndereco)
    {
        try {
            let res = await bd.Client.query(`SELECT * from endereco where id='${idEndereco}'`);
            return res.rows;              
        }
        finally{}
    }

    async alterarEndereco(bd, endereco)
    {
        let sql="UPDATE endereco SET id=$1, rua=$2, numero=$3, bairro=$4, cidade=$5, cep=$6, complemento=$7 WHERE id = $1";
        var values = Object.values(endereco);
        try{
            let res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }

    async deletar(bd, idEndereco)
    {
        let sql="DELETE FROM endereco WHERE id = "+idEndereco;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }
}