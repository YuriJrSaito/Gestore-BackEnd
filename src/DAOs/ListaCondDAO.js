module.exports = class ListaCondDAO
{
    async gravar(bd, listaCond)
    {
        const client = await bd.conectar();
        const sql = `INSERT INTO "vendaCondicional_lista" VALUES (default, $1, $2, $3, $4) RETURNING *`;
        var values = Object.values(listaCond).slice(1); //retira o id
        try{
            const res = await client.query(sql,values);
            return res.rows[0].id;
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idVenda)
    {
        const client = await bd.conectar();
        let sql=`DELETE FROM "vendaCondicional_lista" WHERE "id_vendaCondicional" = `+idVenda;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }

    async listarTudo(bd, idVenda)
    {
        const client = await bd.conectar();
        try {
        let res = await client.query(`SELECT * from "vendaCondicional_lista" where "id_vendaCondicional" = ${idVenda}`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }
}