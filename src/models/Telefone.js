const TelefoneDAO = require('../DAOs/TelefoneDAO');

class Telefone
{
    id;
    telefone1;
    telefone2;
    telefone3;

    constructor(id, telefone1, telefone2, telefone3)
    {
        this.id = id;
        this.telefone1 = telefone1;
        this.telefone2 = telefone2;
        this.telefone3 = telefone3;
    }

    async gravar(bd)
    {
        const resp = await new TelefoneDAO().gravar(bd, this);
        return resp;
    }

    async buscarTelefone(bd, idTelefone)
    {
        const resp = await new TelefoneDAO().buscarTelefone(bd, idTelefone);
        return resp;
    }

    async alterarTelefone(bd)
    {
        const resp = await new TelefoneDAO().alterarTelefone(bd, this);
        return resp;
    }

    async deletar(bd, idTelefone)
    {
        const resp = await new TelefoneDAO().deletar(bd, idTelefone);
        return resp;
    }
}

module.exports = Telefone;