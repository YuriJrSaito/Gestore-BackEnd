module.exports = class ParcelaContaReceberDAO
{
    async gravar(bd, parcela)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO contareceber_parcela VALUES (default, $1, $2, $3, $4, $5, $6, $7)";
        var values = Object.values(parcela).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res;
        }
        finally{
            client.release();
        }
    }

    async buscarTodos(bd, idConta)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query('SELECT * from contareceber_parcela WHERE "id_contaReceber" = '+idConta);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async alterar(bd, parcela)
    {
        const client = await bd.conectar();
        let sql='UPDATE contareceber_parcela SET id=$1, dataPagamento=$2, dataVencimento=$3, numParcela=$4, situacao=$5, "Sid_contaReceber"=$6, valor=$7, valorTotal=$8 WHERE id = $1';
        var values = Object.values(parcela);
        try{
            let res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async quitar(bd, idParcela)
    {
        const client = await bd.conectar();
        try{
            var pago = "Pago";
            let res = await client.query(`UPDATE contareceber_parcela SET valor=${0} ,situacao=$1 WHERE id = `+idParcela, [pago]);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idConta)
    {
        const client = await bd.conectar();
        let sql=`DELETE FROM contareceber_parcela WHERE "id_contaReceber" = `+idConta;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }

    async pagarParcelado(bd, idParcela, valor)
    {
        const client = await bd.conectar();
        var pago = "Não pago";

        if(valor == 0)
            pago = "Pago";
        
        try{
            let res = await client.query(`UPDATE contareceber_parcela SET valor=${valor}, situacao=$1 WHERE id = `+idParcela, [pago]);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }
}