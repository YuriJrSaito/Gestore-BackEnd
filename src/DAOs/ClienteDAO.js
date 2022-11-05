const Cliente = require("../models/Cliente");

module.exports = class ClienteDAO
{
    async gravar(bd, cliente)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO cliente VALUES (default, $1, $2, $3, $4, $5, $6, $7) RETURNING *";
        var values = Object.values(cliente).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res.rows[0].id;
        }
        finally{
            client.release();
        }
    }

    async buscarPorCpf(bd, cpf)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from cliente where cpf='${cpf}'`);
            var cliente = Cliente;
            cliente = res.rows[0];
            return cliente;              
        }
        finally{
            client.release();
        }
    }

    async buscarTodos(bd)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query('SELECT * from cliente');
            return res.rows;              
        }
        finally{
            client.release();
        }
    }
    
    async filtrarClientes(bd, filtro)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from cliente where nome iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        catch(err){
            console.log(err);
        }
        finally{
            client.release();
        }
    }

    async alterar(bd, cliente)
    {
        const client = await bd.conectar();
        let sql="UPDATE cliente SET id=$1, nome=$2, email=$3, idade=$4, id_endereco=$5, cpf=$6, id_telefone=$7, sexo=$8 WHERE id = $1";
        var values = Object.values(cliente);
        try{
            let res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idCliente)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM cliente WHERE id = "+idCliente;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }

    async buscarClienteNome(bd, idCliente)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from cliente where id = ${idCliente}`);
            return res.rows[0].nome;             
        }
        catch(err){
            console.log(err);
        }
        finally{
            client.release();
        }
    }

    async buscarCPF(bd, idCliente)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from cliente where id = ${idCliente}`);
            return res.rows[0].cpf;             
        }
        catch(err){
            console.log(err);
        }
        finally{
            client.release();
        }
    }
}