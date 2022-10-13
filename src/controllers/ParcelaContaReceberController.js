const bd = require('../models/Database');
const ParcelaContaReceber = require('../models/ParcelaContaReceber');
const moment = require('moment');

class ParcelaContaReceberController{

    async gravarParcelas(bd, idConta, valorTotal, qtdeParcelas, dataPrimeiroVencimento)
    {
        var valorParcela = valorTotal/qtdeParcelas;
        var situacao = "Não pago";
        var infinito = false;
        var resto;
         
        valorParcela = Math.ceil(valorParcela);

        if((valorParcela * qtdeParcelas) > valorTotal)
        {
            infinito = true;
            resto = (valorParcela*qtdeParcelas) - valorTotal;
        }

        for(var i=1; i<=qtdeParcelas; i++)
        {
            if(infinito == true)
            {
                var parcela = new ParcelaContaReceber(0, null, dataPrimeiroVencimento, i, situacao, idConta, valorParcela - resto, valorParcela - resto);
                infinito = false;
            }   
            else
            {
                var parcela = new ParcelaContaReceber(0, null, dataPrimeiroVencimento, i, situacao, idConta, valorParcela, valorParcela);
            }   
            await parcela.gravar(bd);
            let data = moment(dataPrimeiroVencimento);
            dataPrimeiroVencimento = data.add(1, "month");
            dataPrimeiroVencimento = moment.utc(dataPrimeiroVencimento).format('YYYY-MM-DD');
        }
    }

    async deletarParcelas(bd, idConta)
    {
        var parcela = new ParcelaContaReceber();
        await parcela.deletar(bd, idConta);

        return false;
    }

    async listarTodasParcelas(request, response)
    {
        const {idConta} = request.params;
        var parcela = new ParcelaContaReceber();
        bd.conectar();
        const resp = await parcela.listarTodasParcelas(bd, idConta);
        bd.Client.end();
        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há Parcelas Cadastradas");
        }
    }

    async quitarParcela(request, response)
    {
        const {idParcela} = request.params;
        var parcela = new ParcelaContaReceber();
        bd.conectar();
        const resp = await parcela.quitarParcela(bd, idParcela);
        bd.Client.end();
        if(resp > 0)
            return response.send("Parcela Quitada");
        else
            return response.send("Algo deu errado");
    }

    async pagarParcelado(request, response)
    {
        const {idParcela, valor} = request.params;
        var parcela = new ParcelaContaReceber();
        bd.conectar();
        const resp = await parcela.pagarParcelado(bd, idParcela, valor);
        bd.Client.end();

        if(resp > 0)
            return response.send("Valor Descontado na Parcela");
        else
            return response.send("Algo deu errado");
    }
}

module.exports = new ParcelaContaReceberController();