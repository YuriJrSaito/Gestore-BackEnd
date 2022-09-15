module.exports = class ParcelaContaPagarDAO
{
    async gravar(bd, parcela)
    {
        const sql = "INSERT INTO contapagar_parcela VALUES (default, $1, $2, $3, $4, $5, $6)";
        var values = Object.values(parcela).slice(1); //retira o id
        try{
            const res = await bd.Client.query(sql,values);
            return res;
        }
        finally{}
    }

    async buscarTodos(bd, idConta)
    {
        try {
            let res = await bd.Client.query('SELECT * from contapagar_parcela WHERE id_conta_pagar = '+idConta);
            return res.rows;              
        }
        finally{}
    }

    async alterar(bd, parcela)
    {
        let sql='UPDATE contapagar_parcela SET id=$1, valor=$2, dataPagamento=$3, dataVencimento=$4, numParcela=$5, situacao=$6, id_conta_pagar=$7 WHERE id = $1';
        var values = Object.values(parcela);
        try{
            let res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }

    async quitar(bd, idParcela)
    {
        try{
            var pago = "Pago";
            let res = await bd.Client.query('UPDATE contapagar_parcela SET situacao=$1 WHERE id = '+idParcela, [pago]);
            return res.rowCount;
        }
        finally{}
    }

    async deletar(bd, idConta)
    {
        let sql="DELETE FROM contapagar_parcela WHERE id_conta_pagar = "+idConta;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }
}