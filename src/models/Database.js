/*const { Client } = require('pg');

class Database{
    #client;
    async conectar()
    {
        this.#client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'postgres123',
            port: 5432,
        })
        this.#client.connect(function (err){
            if(err)
                console.log(err);
            else
                console.log("Connected!");
        });
    }

    get Client()
    {
        return this.#client; 
    }
}

module.exports = new Database;*/

const { Pool } = require('pg');

class Database
{
    pool;
    constructor()
    {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'postgres123',
            port: 5432,
            max: 10,
        });
        console.log("Conectado");
    }

    async conectar()
    {
        try{
            return this.pool.connect()
        }
        catch(err){
            console.log(err);
        }
    }

    async fechar()
    {
        try{
            return this.pool.end()
        }
        catch(err){
            console.log(err);
        }
    }
}


module.exports = new Database;