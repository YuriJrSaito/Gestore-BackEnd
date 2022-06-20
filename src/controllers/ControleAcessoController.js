const bd = require('../models/Database');
const ControleAcesso = require('../models/ControleAcesso');

class ControleAcessoController
{
    async gravarControleAcesso(bd, login, senha, nivelAcesso, usuarioAtivo)
    {
        var controleAcesso = new ControleAcesso(0, login, senha, nivelAcesso, usuarioAtivo);
        const resp = await controleAcesso.gravar(bd);
        return resp;
    }

    async buscarControleAcesso(request, response)
    {
        const {idCA} = request.params;
        bd.conectar();
        var controleAcesso = new ControleAcesso();
        const resp = await controleAcesso.buscarControleAcesso(bd, idCA);
        bd.Client.end();
        return response.send(resp);
    }

    async alterarControleAcesso(bd, idCA, login, senha, nivelAcesso, usuarioAtivo)
    {
        var controleAcesso = new ControleAcesso(idCA, login, senha, nivelAcesso, usuarioAtivo);
        const resp = await controleAcesso.alterar(bd);
        return resp;
    }

    async buscarUsuario(request, response)
    {
        const {login, senha} = request.params;
        bd.conectar();
        var controleAcesso = new ControleAcesso();
        const resp = await controleAcesso.buscarUsuario(bd, login, senha);

        bd.Client.end();
        return response.send(resp);
    }

    async deletar(request, response) 
    {
        const {idCA} = request.params;
        bd.conectar();
        var msg="";

        const controleAcesso = new ControleAcesso();
        const resp = await controleAcesso.deletar(bd, idCA);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        bd.Client.end();
        return response.send(msg); 
    }
}

module.exports = new ControleAcessoController();