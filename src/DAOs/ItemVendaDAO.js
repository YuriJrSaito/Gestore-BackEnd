module.exports = class ItemVendaDAO
{
    async gravar(bd, itemVenda)
    {
        const sql = `INSERT INTO "itemVenda" VALUES (default, $1, $2, $3, $4) RETURNING *`;
        var values = Object.values(itemVenda).slice(1); //retira o id
        try{
            const res = await bd.Client.query(sql,values);
            return res.rows[0].id;
        }
        finally{}
    }
}