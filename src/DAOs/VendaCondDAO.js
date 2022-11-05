module.exports = class vendaCondDAO
{
    async gravar(bd, venda)
    {
        const client = await bd.conectar();
        const sql = `INSERT INTO "vendaCondicional" VALUES (default, $1, $2, $3, $4, $5, $6) RETURNING *`;
        var values = Object.values(venda).slice(1); //retira o id
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
            let res = await client.query(`SELECT * from "vendaCondicional"`);
            return res.rows;              
        }
        finally{
            client.release();
        }
    }

    async buscarUsuario(bd, idUsuario)
    {
        const client = await bd.conectar();
        try{
            let res = await client.query(`SELECT * from "vendaCondicional" where "id_usuario" = ${idUsuario}`);
            return res.rows;
        }
        finally{
            client.release();
        }
    }

    async alterar(bd, venda)
    {
        const client = await bd.conectar();
        let sql='UPDATE "vendaCondicional" SET id=$1, "dataCriacao"=$2, "dataLimite"=$3, observacao=$4, valorTotal=$5, "id_usuario"=$6, "id_cliente"=$7 WHERE id = $1';
        var values = Object.values(venda);
        try{
            let res = await client.query(sql,values);
            return res.rowCount;
        }
        finally{
            client.release();
        }
    }

    async deletar(bd, idvenda)
    {
        const client = await bd.conectar();
        let sql=`DELETE FROM "vendaCondicional" WHERE id = `+idvenda;
        try{
            return (await client.query(sql)).rowCount;
        }
        finally{
            client.release();
        }
    }
}