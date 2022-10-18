module.exports = class ContaReceberDAO
{
    async gravar(bd, contaReceber)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO contareceber VALUES (default, $1, $2, $3, $4) RETURNING *";
        var values = Object.values(contaReceber).slice(1); //retira o id
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
            let res = await client.query('SELECT * from contareceber');
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    /*async filtrarContas(bd, filtro)
    {
        try {
            let res = await bd.Client.query(`SELECT * from conta_pagar where titulo iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        finally{}
    }*/

    /*async alterar(bd, contaPagar)
    {
        let sql='UPDATE conta_pagar SET id=$1, valorTotal=$2, qtdeParcelas=$3, titulo=$4, observacao=$5, dataEmissao=$6, tipoDocumento=$7, id_fornecedor=$8, "dataPrimeiroVencimento"=$9 WHERE id = $1';
        var values = Object.values(contaPagar);
        try{
            let res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }*/

    async deletar(bd, idConta)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM contareceber WHERE id = "+idConta;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }
}