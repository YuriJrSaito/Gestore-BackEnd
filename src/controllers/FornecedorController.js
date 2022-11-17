const bd = require('../models/Database');

const Fornecedor = require('../models/Fornecedor');
const ContaPagar = require('../models/ContaPagar');
const ParcelaCP = require('../models/ParcelaContaPagar');

class FornecedorController{

    async gravar(request, response)
    {
        var msg="";
        const {descricao, email, telefone1, telefone2, cnpj, nome} = request.body;
        let fornecedor = new Fornecedor(0, descricao, email, telefone1, telefone2, cnpj, nome);

        const resp = await fornecedor.gravar(bd);

        if(resp > 0)
            msg += "Fornecedor cadastrado com sucesso";
        else
            msg += "Algo deu errado";

        return response.send(msg);
    }

    async listarFornecedores(request, response)
    {
        var fornecedor = new Fornecedor();
        const resp = await fornecedor.listarFornecedores(bd);
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
        const resp = await fornecedor.filtrarFornecedores(bd, filtro);

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

        let fornecedor = new Fornecedor(idFornecedor, descricao, email, telefone1, telefone2, cnpj, nome);
        const resp = await fornecedor.alterar(bd);

        if(resp>0)
            msg+="Alterado com sucesso !!";
        else
            msg+="Algo deu errado !!";
        
        return response.send(msg);
    }

    async deletar(request, response) 
    {
        const {idFornecedor} = request.params;
        var msg="";

        const fornecedor = new Fornecedor();
        const resp = await fornecedor.deletar(bd, idFornecedor);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg); 
    }

    async relFornecedores(request, response)
    {
        let fornecedor = new Fornecedor();
        let fornecedores = await fornecedor.listarFornecedores(bd);

        let lista = [];

        for(let fornec of fornecedores)
        {
            let conta = new ContaPagar();
            let contas = await conta.buscarContasFornecedor(bd, fornec.id);

            let totalDevendo = 0;
            let parcelasRestantes = 0;

            if(contas.length > 0)
            {
                for(let c of contas)
                {
                    let parcela = new ParcelaCP();
                    let parcelas = await parcela.listarTodasParcelas(bd, c.id);
                    for(let p of parcelas)
                    {
                        if(p.situacao == "Não pago")
                        {
                            parcelasRestantes++;
                            totalDevendo = parseFloat(totalDevendo) + parseFloat(p.valor);
                        }
                    }
                }
            }

            if(parcelasRestantes == 0)
            {
                parcelasRestantes = "---";
            }

            let cnpj = fornec.CNPJ;

            if(fornec.CNPJ != "" && fornec.CNPJ != null)
            {
                var val = await cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
                let metadeCNPJ = val.split(5);
                cnpj = metadeCNPJ[0] + " " + metadeCNPJ[1];
            }

            let vetaux = [fornec.id, fornec.nome, cnpj, fornec.email, fornec.telefone1, fornec.telefone2, 
                        parseFloat(totalDevendo).toFixed(2), parcelasRestantes];
        
            lista.push(vetaux);
        }
        
        return response.send(lista);
    }
}

module.exports = new FornecedorController();