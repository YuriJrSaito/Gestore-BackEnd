const Cliente = require("../models/Cliente");

module.exports = class ClienteDAO
{
    async gravar(bd, cliente)
    {
        const sql = "INSERT INTO cliente VALUES (default, $1, $2, $3, $4, $5, $6, $7) RETURNING *";
        var values = Object.values(cliente).slice(1); //retira o id
        try{
            const res = await bd.Client.query(sql,values);
            return res.rows[0].id;
        }
        finally{}
    }

    async buscarPorCpf(bd, cpf)
    {
        try {
            let res = await bd.Client.query(`SELECT * from cliente where cpf='${cpf}'`);
            var cliente = Cliente;
            cliente = res.rows[0];
            return cliente;              
        }
        finally{}
    }

    async buscarTodos(bd)
    {
        try {
            let res = await bd.Client.query('SELECT * from cliente');
            return res.rows;              
        }
        finally{}
    }
    
    async filtrarClientes(bd, filtro)
    {
        try {
            let res = await bd.Client.query(`SELECT * from cliente where nome iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        catch(err){
            console.log(err);
        }
    }

    async alterar(bd, cliente)
    {
        let sql="UPDATE cliente SET id=$1, nome=$2, email=$3, idade=$4, id_endereco=$5, cpf=$6, id_telefone=$7, sexo=$8 WHERE id = $1";
        var values = Object.values(cliente);
        try{
            let res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }

    async deletar(bd, idCliente)
    {
        let sql="DELETE FROM cliente WHERE id = "+idCliente;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }

    async buscarClienteNome(bd, idCliente)
    {
        try {
            let res = await bd.Client.query(`SELECT * from cliente where id = ${idCliente}`);
            return res.rows[0].nome;             
        }
        catch(err){
            console.log(err);
        }
    }
}