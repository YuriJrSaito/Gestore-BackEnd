const Pessoa = require("./Pessoa");
const UsuarioDAO = require('../DAOs/UsuarioDAO');

class Usuario extends Pessoa
{
    constructor(id, nome, email, idade, sexo, idEndereco, cpf, idTelefone, salario, dataEmissao, dataDemissao, idCargo, idControleAcesso)
    {
        super(id, nome, email, idade, idEndereco, cpf, idTelefone, sexo);
        this.salario = salario;
        this.dataEmissao = dataEmissao;
        this.dataDemissao = dataDemissao;
        this.idCargo = idCargo;
        this.idControleAcesso = idControleAcesso;
    }

    async gravar(bd)
    {
        if(this.idade == "")
            this.idade = null;
        if(this.dataDemissao == "")
            this.dataDemissao = null;
        const resp = await new UsuarioDAO().gravar(bd, this);
        return resp;
    }

    async listarTodosUsuarios(bd)
    {
        const resp = await new UsuarioDAO().buscarTodos(bd);
        return resp;
    }

    async filtrarUsuarios(bd, filtro)
    {
        const resp = await new UsuarioDAO().filtrarUsuarios(bd, filtro);
        return resp;
    }

    async alterar(bd)
    {
        if(this.idade == "")
            this.idade = null;
        if(this.dataDemissao == "")
            this.dataDemissao = null;
        const resp = await new UsuarioDAO().alterar(bd, this);
        return resp;
    }

    async deletar(bd, idUsuario)
    {
        const resp = await new UsuarioDAO().deletar(bd, idUsuario);
        return resp;
    }

    async buscarCargo(bd, idCargo)
    {
        const resp = await new UsuarioDAO().buscarCargo(bd, idCargo);
        return resp;
    }

    async procurarUsuarioAcesso(bd, idAcesso)
    {
        let resp = await new UsuarioDAO().procurarUsuarioAcesso(bd, idAcesso);
        return resp;
    }

    async buscarUsuarioNome(bd, idUsuario)
    {
        let resp = await new UsuarioDAO().buscarUsuarioNome(bd, idUsuario);
        return resp;
    }
}

module.exports = Usuario;
