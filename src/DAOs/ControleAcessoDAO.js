const ControleAcesso = require("../models/ControleAcesso");

module.exports = class ControleAcessoDAO
{
    async gravar(bd, controleAcesso)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO controle_acesso VALUES (default, $1, $2, $3, $4) RETURNING *";
        var values = Object.values(controleAcesso).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res.rows[0].id;
        }
        finally{
            client.release();
        }
    }

    async buscarControleAcesso(bd, idCA)
    {
        const client = await bd.conectar();
        try{
            let res = await client.query(`SELECT * from controle_acesso where id='${idCA}'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async alterar(bd, controleAcesso)
    {
        const client = await bd.conectar();
        let sql="UPDATE controle_acesso SET id=$1, login=$2, senha=$3, nivel_acesso=$4, usuario_ativo=$5 WHERE id = $1";
        var values = Object.values(controleAcesso);
        try{
            let res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async buscarUsuario(bd, login, senha)
    {
        const client = await bd.conectar();
        try{
            let res = await client.query(`SELECT * from controle_acesso where login='${login}' and senha='${senha}'`);
            return res.rows[0];        
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idCA)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM controle_acesso WHERE id = "+idCA;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }
}