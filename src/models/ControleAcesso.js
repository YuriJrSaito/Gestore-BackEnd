const ControleAcessoDAO = require('../DAOs/ControleAcessoDAO');

class ControleAcesso
{
    id;
    login;
    senha;
    nivelAcesso;
    usuarioAtivo;

    constructor(id, login, senha, nivelAcesso, usuarioAtivo)
    {
        this.id = id;
        this.login = login;
        this.senha = senha;
        this.nivelAcesso = nivelAcesso;
        this.usuarioAtivo = usuarioAtivo;
    }

    async gravar(bd)
    {
        const resp = await new ControleAcessoDAO().gravar(bd, this);
        return resp;
    }

    async verificarExiste(bd, login)
    {
        const resp = await new ControleAcessoDAO().verificarExiste(bd, login);
        return resp;
    }

    async buscarControleAcesso(bd, idCA)
    {
        const resp = await new ControleAcessoDAO().buscarControleAcesso(bd, idCA);
        return resp;
    }

    async alterar(bd)
    {
        const resp = await new ControleAcessoDAO().alterar(bd, this);
        return resp;
    }

    async buscarUsuario(bd, login, senha)
    {
        const resp = await new ControleAcessoDAO().buscarUsuario(bd, login, senha);
        return resp;
    }

    async deletar(bd, idCA)
    {
        const resp = await new ControleAcessoDAO().deletar(bd, idCA);
        return resp;
    }
}

module.exports = ControleAcesso;