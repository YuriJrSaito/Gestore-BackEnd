const CargoDAO = require('../DAOs/CargoDAO');

class Cargo
{
    id;
    descricao;


    constructor(id, descricao)
    {
        this.id = id;
        this.descricao = descricao;
    }

    async gravar(bd)
    {
        const resp = await new CargoDAO().gravar(bd, this);
        return resp;
    }

    async procurar(bd)
    {
        const resp = await new CargoDAO().procurar(bd, this.descricao);
        if(resp.length > 0)
        {
            return true;
        }
        else
            return false;
    }

    async buscarTudo(bd)
    {
        const resp = await new CargoDAO().buscarTudo(bd);
        return resp;
    }
    
    async buscarPorID(bd, idCargo)
    {
        const resp = await new CargoDAO().buscarPorID(bd, idCargo);
        return resp;
    }

    async filtrarCargos(bd, filtro)
    {
        const resp = await new CargoDAO().filtrarCargos(bd, filtro);
        return resp;
    }

    async deletar(bd, idCargo)
    {
        const resp = await new CargoDAO().deletar(bd, idCargo);
        return resp;
    }
}

module.exports = Cargo;