const ControleAcesso = require("../models/ControleAcesso");

module.exports = class ControleAcessoDAO
{
    async gravar(bd, controleAcesso)
    {
        const sql = "INSERT INTO controle_acesso VALUES (default, $1, $2, $3, $4) RETURNING *";
        var values = Object.values(controleAcesso).slice(1); //retira o id
        try{
            const res = await bd.Client.query(sql,values);
            return res.rows[0].id;
        }
        finally{}
    }

    async buscarControleAcesso(bd, idCA)
    {
        try{
            let res = await bd.Client.query(`SELECT * from controle_acesso where id='${idCA}'`);
            return res.rows;              
        }
        finally{}
    }

    async alterar(bd, controleAcesso)
    {
        let sql="UPDATE controle_acesso SET id=$1, login=$2, senha=$3, nivel_acesso=$4, usuario_ativo=$5 WHERE id = $1";
        var values = Object.values(controleAcesso);
        try{
            let res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }

    async buscarUsuario(bd, login, senha)
    {
        try{
            let res = await bd.Client.query(`SELECT * from controle_acesso where login='${login}' and senha='${senha}'`);
            return res.rows[0];        
        }
        finally{}
    }

    async deletar(bd, idCA)
    {
        let sql="DELETE FROM controle_acesso WHERE id = "+idCA;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }
}