const bd = require('../models/Database');
const ControleAcesso = require('../models/ControleAcesso');
const Usuario = require('../models/Usuario');

class ControleAcessoController
{
    async gravarControleAcesso(bd, login, senha, nivelAcesso, usuarioAtivo)
    {
        var existe = await this.verificarExisteGravar(bd, login);
        
        if(existe == false)//não existe ou a alteração é o mesmo usuario
        {
            var controleAcesso = new ControleAcesso(0, login, senha, nivelAcesso, usuarioAtivo);
            const resp = await controleAcesso.gravar(bd);
            return resp;
        }
        else
        {
            return false;
        }
    }

    async alterarControleAcesso(bd, idCA, login, senha, nivelAcesso, usuarioAtivo)
    {
        var existe = await this.verificarExisteAlterar(bd, login, idCA);
        if(existe == false)
        {
            var controleAcesso = new ControleAcesso(idCA, login, senha, nivelAcesso, usuarioAtivo);
            const resp = await controleAcesso.alterar(bd);
            return resp;
        }
        else
        {
            return false;
        }
    }

    async verificarExisteGravar(bd, login)
    {
        var controleAcesso = new ControleAcesso();
        let resp = await controleAcesso.verificarExiste(bd, login);

        if(resp == undefined)
            return false
        return true;
    }

    async verificarExisteAlterar(bd, login, idCA)
    {
        var controleAcesso = new ControleAcesso();
        let resp = await controleAcesso.verificarExiste(bd, login);

        if(resp != undefined)
        {
            if(resp.id == idCA)
            {
                return false;
            }
            else
                return true;
        }
        return false;
    }

    async buscarControleAcesso(request, response)
    {
        const {idCA} = request.params;
        var controleAcesso = new ControleAcesso();
        const resp = await controleAcesso.buscarControleAcesso(bd, idCA);
        return response.send(resp);
    }

    async buscarUsuario(request, response)
    {
        const {login, senha} = request.params;
        var controleAcesso = new ControleAcesso();
        const resp = await controleAcesso.buscarUsuario(bd, login, senha);

        return response.send(resp);
    }

    async deletar(request, response) 
    {
        const {idCA} = request.params;
        var msg="";

        const controleAcesso = new ControleAcesso();
        const resp = await controleAcesso.deletar(bd, idCA);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg); 
    }

    async logout(request, response)
    {
        bd.fechar();
        return response.send("fechou");
    }
}

module.exports = new ControleAcessoController();