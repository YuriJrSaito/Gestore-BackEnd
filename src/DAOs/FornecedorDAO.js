module.exports = class FornecedorDAO
{
    async gravar(bd, fornecedor)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO fornecedor VALUES (default, $1, $2, $3, $4, $5, $6)";
        var values = Object.values(fornecedor).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async buscarTodos(bd)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query('SELECT * from fornecedor');
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async filtroFornecedores(bd, filtro)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from fornecedor where nome iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async alterar(bd, fornecedor)
    {
        const client = await bd.conectar();
        let sql='UPDATE fornecedor SET id=$1, descricao=$2, email=$3, telefone1=$4, telefone2=$5, "CNPJ"=$6, nome=$7 WHERE id = $1';
        var values = Object.values(fornecedor);
        try{
            let res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idFornecedor)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM fornecedor WHERE id = "+idFornecedor;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }
}