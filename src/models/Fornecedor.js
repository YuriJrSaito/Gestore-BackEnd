const FornecedorDAO = require('../DAOs/FornecedorDAO');

class Fornecedor
{
    id;
    descricao;
    email;
    telefone1;
    telefone2;
    cnpj;
    nome;

    constructor(id, descricao, email, telefone1, telefone2, cnpj, nome)
    {
        this.id = id;
        this.descricao = descricao;
        this.email = email;
        this.telefone1 = telefone1;
        this.telefone2 = telefone2;
        this.cnpj = cnpj;
        this.nome = nome;
    }

    async gravar(bd)
    {
        const resp = await new FornecedorDAO().gravar(bd, this);
        return resp;
    }

    async listarFornecedores(bd)
    {
        const resp = await new FornecedorDAO().buscarTodos(bd);
        return resp;
    }

    async filtrarFornecedores(bd, filtro)
    {
        const resp = await new FornecedorDAO().filtroFornecedores(bd, filtro);
        return resp;
    }

    async alterar(bd)
    {
        const resp = await new FornecedorDAO().alterar(bd, this);
        return resp;
    }

    async deletar(bd, idFornecedor)
    {
        const resp = await new FornecedorDAO().deletar(bd, idFornecedor);
        return resp;
    }
}

module.exports = Fornecedor;