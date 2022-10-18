const Endereco = require("../models/Endereco");

module.exports = class EnderecoDAO
{
    async gravar(bd, endereco)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO endereco VALUES (default, $1, $2, $3, $4, $5, $6) RETURNING *";
        var values = Object.values(endereco).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res.rows[0].id;
        }
        finally{
            client.release();
        }
    }

    async buscarEndereco(bd, idEndereco)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from endereco where id='${idEndereco}'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async alterarEndereco(bd, endereco)
    {
        const client = await bd.conectar();
        let sql="UPDATE endereco SET id=$1, rua=$2, numero=$3, bairro=$4, cidade=$5, cep=$6, complemento=$7 WHERE id = $1";
        var values = Object.values(endereco);
        try{
            let res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idEndereco)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM endereco WHERE id = "+idEndereco;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }
}