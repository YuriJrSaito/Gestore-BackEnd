const bd = require('../models/Database');

const Fornecedor = require('../models/Fornecedor');

class FornecedorController{

    async gravar(request, response)
    {
        var msg="";
        const {descricao, email, telefone1, telefone2, cnpj, nome} = request.body;
        let fornecedor = new Fornecedor(0, descricao, email, telefone1, telefone2, cnpj, nome);

        bd.conectar();
        const resp = await fornecedor.gravar(bd);

        if(resp > 0)
            msg += "Fornecedor cadastrado com sucesso";
        else
            msg += "Algo deu errado";

        bd.Client.end();
        return response.send(msg);
    }

    async listarFornecedores(request, response)
    {
        var fornecedor = new Fornecedor();
        await bd.conectar();
        const resp = await fornecedor.listarFornecedores(bd);
        await bd.Client.end();
        if(resp != undefined)
        {
            return await response.send(resp);
        }
        else
        {
            return await response.send("Não há fornecedores cadastrados");
        }
    }

    async filtrarFornecedores(request, response)
    {
        const {filtro} = request.params;
        var fornecedor = new Fornecedor();
        bd.conectar();
        const resp = await fornecedor.filtrarFornecedores(bd, filtro);
        bd.Client.end();

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há Fornecedores cadastrados");
        }
    }

    async alterar(request, response)
    {
        var msg="";
        const {idFornecedor, descricao, email, telefone1, telefone2, cnpj, nome} = request.body;
        bd.conectar();

        let fornecedor = new Fornecedor(idFornecedor, descricao, email, telefone1, telefone2, cnpj, nome);
        const resp = await fornecedor.alterar(bd);

        if(resp>0)
            msg+="Alterado com sucesso !!";
        else
            msg+="Algo deu errado !!";
        
        bd.Client.end();
        return response.send(msg);
    }

    async deletar(request, response) 
    {
        const {idFornecedor} = request.params;
        bd.conectar();
        var msg="";

        const fornecedor = new Fornecedor();
        const resp = await fornecedor.deletar(bd, idFornecedor);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        bd.Client.end();
        return response.send(msg); 
    }
}

module.exports = new FornecedorController();