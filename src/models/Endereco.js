const { set } = require('express/lib/application');
const EnderecoDAO = require('../DAOs/EnderecoDAO');

class Endereco
{
    id;
    rua;
    numero;
    bairro;
    cidade;
    cep;
    complemento;

    constructor(id, rua, numero, bairro, cidade, cep, complemento)
    {
        this.id = id;
        this.numero = numero;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.complemento = complemento;
    }

    async gravar(bd)
    {
        if(this.numero == "")
            this.numero = null;
        const resp = await new EnderecoDAO().gravar(bd, this);
        return resp;
    }

    async buscarEndereco(bd, idEndereco)
    {
        const resp = await new EnderecoDAO().buscarEndereco(bd, idEndereco);
        return resp;
    }

    async alterarEndereco(bd)
    {
        if(this.numero == "")
            this.numero = null;
        const resp = await new EnderecoDAO().alterarEndereco(bd, this);
        return resp;
    }

    async deletar(bd, idEndereco)
    {
        const resp = await new EnderecoDAO().deletar(bd, idEndereco);
        return resp;
    }
}

module.exports = Endereco;