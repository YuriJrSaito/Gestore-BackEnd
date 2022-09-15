const { Pool, Client } = require('pg');

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

module.exports = new Database;