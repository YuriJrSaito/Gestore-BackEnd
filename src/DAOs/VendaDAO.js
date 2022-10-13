module.exports = class VendaDAO
{
    async gravar(bd, venda)
    {
        const sql = "INSERT INTO venda VALUES (default, $1, $2, $3, $4) RETURNING *";
        var values = Object.values(venda).slice(1); //retira o id
        try{
            const res = await bd.Client.query(sql,values);
            return res.rows[0].id;
        }
        finally{}
    }

    async buscarTodos(bd)
    {
        try {
            let res = await bd.Client.query('SELECT * from venda');
            return res.rows;              
        }
        finally{}
    }

    async filtrarVendas(bd, filtro)
    {
        try {
            let res = await bd.Client.query(`SELECT * from venda where "dataVenda" iLIKE '%${filtro}%'`);
            return res.rows;              
        }
        finally{}
    }

    async alterar(bd, venda)
    {
        let sql='UPDATE venda SET id=$1, "dataVenda"=$2, "id_contaReceber"=$3, id_usuario=$4, id_cliente=$5 WHERE id = $1';
        var values = Object.values(venda);
        try{
            let res = await bd.Client.query(sql,values);
            return res.rowCount;
        }
        finally{}
    }

    async deletar(bd, idVenda)
    {
        let sql="DELETE FROM venda WHERE id = "+idVenda;
        try{
            return (await bd.Client.query(sql)).rowCount;
        }
        finally{}
    }

    async buscarClienteId(bd, idConta)
    {
        console.log(idConta);
        try {
            let res = await bd.Client.query(`SELECT * from venda where "id_contaReceber" = ${idConta}`);
            return res.rows[0].id_cliente;              
        }
        finally{}
    }
}