module.exports = class ContaPagarDAO
{
    async gravar(bd, contaPagar)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO conta_pagar VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
        var values = Object.values(contaPagar).slice(1); //retira o id
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
            let res = await client.query('SELECT * from conta_pagar');
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async buscarContasFornecedor(bd, idFornecedor)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query('SELECT * from conta_pagar WHERE id_fornecedor ='+idFornecedor);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async filtrarContas(bd, filtro)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from conta_pagar where titulo iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async alterar(bd, contaPagar)
    {
        const client = await bd.conectar();
        let sql='UPDATE conta_pagar SET id=$1, valorTotal=$2, qtdeParcelas=$3, titulo=$4, observacao=$5, dataEmissao=$6, tipoDocumento=$7, id_fornecedor=$8, "dataPrimeiroVencimento"=$9 WHERE id = $1';
        var values = Object.values(contaPagar);
        try{
            let res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idConta)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM conta_pagar WHERE id = "+idConta;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }
}