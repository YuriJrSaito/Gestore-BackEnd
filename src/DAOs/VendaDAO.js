module.exports = class VendaDAO
{
    async gravar(bd, venda)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO venda VALUES (default, $1, $2, $3, $4) RETURNING *";
        var values = Object.values(venda).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res.rows[0].id;
        }
        finally{
            client.release();
        }
    }

    async buscarTodos(bd)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query('SELECT * from venda');
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async buscarVendasUsuario(bd, idUsuario)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query('SELECT * from venda WHERE id_usuario ='+idUsuario);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async buscarQtdeVendas(bd, idVenda)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query('SELECT * from venda WHERE id_cliente='+idVenda);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async buscarConta(bd, idConta)
    {
        const client = await bd.conectar();
        try{
            let res = await client.query(`SELECT * from venda where "id_contaReceber" = ${idConta}`);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async buscarUsuario(bd, idUsuario)
    {
        const client = await bd.conectar();
        try{
            let res = await client.query(`SELECT * from venda where "id_usuario" = ${idUsuario}`);
            return res.rows;
        }
        finally{
            client.release();
        }
    }

    async buscarCliente(bd, idCliente)
    {
        const client = await bd.conectar();
        try{
            let res = await client.query(`SELECT * from venda where "id_cliente" = ${idCliente}`);
            return res.rows;
        }
        finally{
            client.release();
        }
    }

    async filtrarVendas(bd, filtro)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from venda where "dataVenda" iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async alterar(bd, venda)
    {
        const client = await bd.conectar();
        let sql='UPDATE venda SET id=$1, "dataVenda"=$2, "id_contaReceber"=$3, id_usuario=$4, id_cliente=$5 WHERE id = $1';
        var values = Object.values(venda);
        try{
            let res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idVenda)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM venda WHERE id = "+idVenda;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }

    async buscarClienteId(bd, idConta)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from venda where "id_contaReceber" = ${idConta}`);
            return res.rows[0].id_cliente;              
        }
        finally{
            client.release();
        }
    }
}