const axios = require('axios');
const bd = require('../models/Database');

const Cargo = require('../models/Cargo');

class CargoController{

    async gravar(request, response)
    {
        const {descricao} = request.body;
        var cargo = new Cargo(0, descricao);
        
        var msg = "";
        bd.conectar();   

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

        bd.Client.end();
        return response.send(msg);
    }

    async buscarTudo(request, response)
    {
        var cargo = new Cargo;
        
        var msg = "";
        await bd.conectar();   

        var cargos = await cargo.buscarTudo(bd);

        await bd.Client.end();
        return response.send(cargos);
    }

    async buscarPorId(request, response)
    {
        const {idCargo} = request.params;
        var cargo = new Cargo;
        await bd.conectar();
        
        var resp = await cargo.buscarPorID(bd, idCargo);

        await bd.Client.end();
        return response.send(resp);
    }

    async filtrarCargos(request, response)
    {
        const {filtro} = request.params;

        var cargo = new Cargo();
        bd.conectar();
        const resp = await cargo.filtrarCargos(bd, filtro);
        bd.Client.end();

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
        bd.conectar();
        var msg="";

        const cargo = new Cargo();
        const resp = await cargo.deletar(bd, idCargo);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        bd.Client.end();
        return response.send(msg); 
    }
}

module.exports = new CargoController();