module.exports = class ParcelaContaPagarDAO
{
    async gravar(bd, parcela)
    {
        const client = await bd.conectar();
        const sql = "INSERT INTO contapagar_parcela VALUES (default, $1, $2, $3, $4, $5, $6, $7)";
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
            let res = await client.query('SELECT * from contapagar_parcela WHERE id_conta_pagar = '+idConta);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async alterar(bd, parcela)
    {
        const client = await bd.conectar();
        let sql='UPDATE contapagar_parcela SET id=$1, valor=$2, dataPagamento=$3, dataVencimento=$4, numParcela=$5, situacao=$6, id_conta_pagar=$7, valorTotal=$8 WHERE id = $1';
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
            let res = await client.query(`UPDATE contapagar_parcela SET valor=${0} ,situacao=$1 WHERE id = `+idParcela, [pago]);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idConta)
    {
        const client = await bd.conectar();
        let sql="DELETE FROM contapagar_parcela WHERE id_conta_pagar = "+idConta;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }

    /*async pagarParcelado(bd, idParcela, valor)
    {
        var situacao = "Não pago";
        if(valor === 0)
        {
            situacao = "Pago";
        }
        let sql=`UPDATE contapagar_parcela SET valor=${valor}, situacao=${situacao} WHERE id = ${idParcela}`;
        try{
            let res = await bd.Client.query(sql);
            return res.rowCount;
        }
        finally{}
    }*/

    async pagarParcelado(bd, idParcela, valor)
    {
        const client = await bd.conectar();
        var pago = "Não pago";

        if(valor == 0)
        {
            pago = "Pago";
        }

        try{
            let res = await client.query(`UPDATE contapagar_parcela SET valor=${valor}, situacao=$1 WHERE id = `+idParcela, [pago]);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }
}