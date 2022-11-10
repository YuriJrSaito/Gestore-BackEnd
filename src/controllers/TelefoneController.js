const req = require('express/lib/request');
const bd = require('../models/Database');
const Telefone = require('../models/Telefone');

class TelefoneController
{
    async gravarTelefones(bd, telefones)
    {
        telefones = await this.formatarTelefones(telefones);
        var telefone = new Telefone(0, telefones[0], telefones[1], telefones[2]);
        const resp = await telefone.gravar(bd);
        return resp;
    }

    async buscarTelefone(request, response)
    {
        const {idTelefone} = request.params;
        var telefone = new Telefone();
        const resp = await telefone.buscarTelefone(bd, idTelefone);
        return response.send(resp);
    }

    async alterarTelefone(bd, idTelefone, telefones)
    {
        telefones = await this.formatarTelefones(telefones);
        var telefone = new Telefone(idTelefone, telefones[0], telefones[1], telefones[2]);
        const resp = await telefone.alterarTelefone(bd);
        return resp;
    }

    async formatarTelefones(telefones)
    {
        for(var x=0; x<3; x++)
        {
            if(telefones[x] != undefined)
                telefones[x] = telefones[x].telefone;
            else
                telefones[x] = null;
        }
        
        return telefones;
    }

    async deletar(request, response)
    {
        const {idTelefone} = request.params;
        const telefone = new Telefone();
        const resp = await telefone.deletar(bd, idTelefone);

        return response.send("Telefone deletado");
    }
}

module.exports = new TelefoneController();