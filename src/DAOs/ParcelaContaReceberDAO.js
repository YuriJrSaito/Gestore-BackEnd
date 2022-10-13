module.exports = class ParcelaContaReceberDAO
{
    async gravar(bd, parcela)
    {
        const sql = "INSERT INTO contareceber_parcela VALUES (default, $1, $2, $3, $4, $5, $6, $7)";
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
            let res = await bd.Client.query('SELECT * from contareceber_parcela WHERE "id_contaReceber" = '+idConta);
            return res.rows;              
        }
        finally{}
    }

    async alterar(bd, parcela)
    {
        let sql='UPDATE contareceber_parcela SET id=$1, dataPagamento=$2, dataVencimento=$3, numParcela=$4, situacao=$5, "Sid_contaReceber"=$6, valor=$7, valorTotal=$8 WHERE id = $1';
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
            let res = await bd.Client.query(`UPDATE contareceber_parcela SET valor=${0} ,situacao=$1 WHERE id = `+idParcela, [pago]);
            return res.rowCount;
        }
        finally{}
    }

    async deletar(bd, idConta)
    {
        let sql=`DELETE FROM contareceber_parcela WHERE "id_contaReceber" = `+idConta;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }

    async pagarParcelado(bd, idParcela, valor)
    {
        var pago = "Não pago";

        if(valor == 0)
            pago = "Pago";
        
        try{
            let res = await bd.Client.query(`UPDATE contareceber_parcela SET valor=${valor}, situacao=$1 WHERE id = `+idParcela, [pago]);
            return res.rowCount;
        }
        finally{}
    }
}