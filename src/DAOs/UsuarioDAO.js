const { response } = require("express");

module.exports = class UsuarioDAO
{
    async gravar(bd, usuario)
    {
        const sql = "INSERT INTO usuario VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";
        var values = Object.values(usuario).slice(1); //retira o id
        try{
            const res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }

    async buscarTodos(bd)
    {
        try {
            let res = await bd.Client.query('SELECT * from usuario');
            return res.rows;              
        }
        finally{}
    }

    async filtrarUsuarios(bd, filtro)
    {
        try {
            let res = await bd.Client.query(`SELECT * from usuario where nome iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        finally{}
    }

    async alterar(bd, usuario)
    {
        let sql='UPDATE usuario SET id=$1, nome=$2, email=$3, idade=$4, id_endereco=$5, cpf=$6, id_telefone=$7, sexo=$8, salario=$9, "dataEmissao"=$10, "dataDemissao"=$11, id_cargo=$12, id_controle_acesso=$13 WHERE id = $1';
        var values = Object.values(usuario);
        try{
            let res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }

    async deletar(bd, idUsuario)
    {
        let sql="DELETE FROM usuario WHERE id = "+idUsuario;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }

    async buscarCargo(bd, idCargo)
    {
        try {
            let res = await bd.Client.query(`SELECT * from usuario where id_cargo='${idCargo}'`);
            return res.rows;              
        }
        finally{}
    }

    async procurarUsuarioAcesso(bd, idAcesso)
    {
        try{
            let res = await bd.Client.query(`SELECT * from usuario where id_controle_acesso=${idAcesso}`);
            return res.rows[0].id;
        }
        finally{};
    }
}