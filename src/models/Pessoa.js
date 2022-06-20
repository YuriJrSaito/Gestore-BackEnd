class Pessoa
{
    id;
    nome;
    email;
    idade;
    idEndereco;
    cpf;
    idTelefone;
    sexo;

    constructor(id, nome, email, idade, idEndereco, cpf, idTelefone, sexo)
    {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.idade = idade;
        this.idEndereco = idEndereco;
        this.cpf = cpf;
        this.idTelefone = idTelefone;
        this.sexo = sexo;
    }

    async gravar(){}
    async buscarPorCpf(){}
    async alterar(){}

}

module.exports = Pessoa;