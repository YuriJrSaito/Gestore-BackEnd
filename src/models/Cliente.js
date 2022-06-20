const Pessoa = require("./Pessoa");
const ClienteDAO = require('../DAOs/ClienteDAO');

class Cliente extends Pessoa
{
    constructor(id, nome, email, idade, idEndereco, cpf, idTelefone, sexo)
    {
        super(id, nome, email, idade, idEndereco, cpf, idTelefone, sexo);
    }

    async gravar(bd)
    {
        if(this.idade == "")
            this.idade = null;
        const resp = await new ClienteDAO().gravar(bd, this);
        return resp;
    }

    async buscarPorCpf(bd, cpf)
    {
        const resp = await new ClienteDAO().buscarPorCpf(bd, cpf);

        if(resp === undefined)
            return false;

        if(resp.cpf != cpf)
            return false;
        else
            return true;
    }

    async listarTodosClientes(bd)
    {
        const resp = await new ClienteDAO().buscarTodos(bd);
        return resp;
    }

    async filtrarClientes(bd, filtro)
    {
        const resp = await new ClienteDAO().filtrarClientes(bd, filtro);
        return resp;
    }

    async alterar(bd)
    {
        if(this.idade == "")
            this.idade = null;
        const resp = await new ClienteDAO().alterar(bd, this);
        return resp;
    }

    async deletar(bd, idCliente)
    {
        const resp = await new ClienteDAO().deletar(bd, idCliente);
        return resp;
    }
}

module.exports = Cliente;
