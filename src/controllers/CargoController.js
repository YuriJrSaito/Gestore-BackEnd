const axios = require('axios');
const bd = require('../models/Database');

const Cargo = require('../models/Cargo');

class CargoController{

    async gravar(request, response)
    {
        const {descricao} = request.body;
        var cargo = new Cargo(0, descricao);
        
        var msg = "";

        var retorno = await cargo.procurar(bd);
        if(retorno == false)
        {
            var resp = await cargo.gravar(bd);
            if(resp.length > 0)
                msg = "Cargo cadastrado com sucesso!!";
        }
        else
        {
            msg = "Este cargo já esta cadastrado";
        }

        return response.send(msg);
    }

    async buscarTudo(request, response)
    {
        var cargo = new Cargo;
        
        var msg = "";

        var cargos = await cargo.buscarTudo(bd);

        return response.send(cargos);
    }

    async buscarPorId(request, response)
    {
        const {idCargo} = request.params;
        var cargo = new Cargo;
        
        var resp = await cargo.buscarPorID(bd, idCargo);

        return response.send(resp);
    }

    async filtrarCargos(request, response)
    {
        const {filtro} = request.params;

        var cargo = new Cargo();
        const resp = await cargo.filtrarCargos(bd, filtro);

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há cargos cadastrados");
        }
    }

    async deletar(request, response) 
    {
        const {idCargo} = request.params;
        var msg="";

        const cargo = new Cargo();
        const resp = await cargo.deletar(bd, idCargo);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg); 
    }
}

module.exports = new CargoController();