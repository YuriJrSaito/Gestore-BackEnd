module.exports = class ItemVendaDAO
{
    async gravar(bd, itemVenda)
    {
        const client = await bd.conectar();
        const sql = `INSERT INTO "itemVenda" VALUES (default, $1, $2, $3, $4) RETURNING *`;
        var values = Object.values(itemVenda).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res.rows[0].id;
        }
        finally{
            client.release();
        }
    }

    async buscarProduto(bd, idProduto)
    {
        const client = await bd.conectar();
        try {
            let res = await client.query(`SELECT * from "itemVenda" where id_produto='${idProduto}'`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }
}