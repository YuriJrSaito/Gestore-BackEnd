const bd = require('../models/Database');
const ControleAcesso = require('../models/ControleAcesso');

class ControleAcessoController
{
    async gravarControleAcesso(bd, login, senha, nivelAcesso, usuarioAtivo)
    {
        var existe = await this.verificarExiste(bd, login);
        if(existe != false)
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
        var existe = await this.verificarExiste(bd, login);
        if(existe != false)
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

    async verificarExiste(bd, login)
    {
        var controleAcesso = new ControleAcesso();
        let resp = await controleAcesso.verificarExiste(bd, login);
        if(resp == undefined)
            resp = 0;
        if(resp > 0)
            return false;
        return true;
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
}

module.exports = new ControleAcessoController();