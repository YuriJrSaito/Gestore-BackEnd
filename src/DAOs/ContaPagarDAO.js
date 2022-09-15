module.exports = class ContaPagarDAO
{
    async gravar(bd, contaPagar)
    {
        const sql = "INSERT INTO conta_pagar VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
        var values = Object.values(contaPagar).slice(1); //retira o id
        try{
            const res = await bd.Client.query(sql,values);
            return res.rows[0].id;
        }
        finally{}
    }

    async buscarTodos(bd)
    {
        try {
            let res = await bd.Client.query('SELECT * from conta_pagar');
            return res.rows;              
        }
        finally{}
    }

    async filtrarContas(bd, filtro)
    {
        try {
            let res = await bd.Client.query(`SELECT * from conta_pagar where titulo iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        finally{}
    }

    async alterar(bd, contaPagar)
    {
        let sql='UPDATE conta_pagar SET id=$1, valorTotal=$2, qtdeParcelas=$3, titulo=$4, observacao=$5, dataEmissao=$6, tipoDocumento=$7, id_fornecedor=$8, "dataPrimeiroVencimento"=$9 WHERE id = $1';
        var values = Object.values(contaPagar);
        try{
            let res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }

    async deletar(bd, idConta)
    {
        let sql="DELETE FROM conta_pagar WHERE id = "+idConta;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }
}