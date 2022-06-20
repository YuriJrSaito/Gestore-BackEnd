const { Client } = require('pg');
module.exports = new class Database{
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