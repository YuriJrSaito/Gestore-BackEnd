const bd = require('../models/Database');
const ParcelaContaPagar = require('../models/ParcelaContaPagar');
const moment = require('moment');

class ParcelaContaPagarController{

    async gravarParcelas(bd, idConta, valorTotal, qtdeParcelas, dataPrimeiroVencimento)
    {
        var valorParcela = valorTotal/qtdeParcelas;
        var situacao = "Não pago";
        var infinito = false;
        var resto;
         
        valorParcela = Math.ceil(valorParcela);
        //console.log(valorParcela);

        if((valorParcela * qtdeParcelas) > valorTotal)
        {
            infinito = true;
            resto = (valorParcela*qtdeParcelas) - valorTotal;
        }

        for(var i=1; i<=qtdeParcelas; i++)
        {
            if(infinito == true)
            {
                var parcela = new ParcelaContaPagar(0, valorParcela - resto, null, dataPrimeiroVencimento, i, situacao, idConta, valorParcela - resto);
                infinito = false;
            }   
            else
            {
                var parcela = new ParcelaContaPagar(0, valorParcela, null, dataPrimeiroVencimento, i, situacao, idConta, valorParcela);
            }   
            await parcela.gravar(bd);
            let data = moment(dataPrimeiroVencimento);
            dataPrimeiroVencimento = data.add(1, "month");
            dataPrimeiroVencimento = moment.utc(dataPrimeiroVencimento).format('YYYY-MM-DD');
        }
    }

    async deletarParcelas(bd, idConta)
    {
        var parcela = new ParcelaContaPagar();
        await parcela.deletar(bd, idConta);

        return false;
    }

    async listarTodasParcelas(request, response)
    {
        const {idConta} = request.params;
        var parcela = new ParcelaContaPagar();
        const resp = await parcela.listarTodasParcelas(bd, idConta);

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há parcelas cadastradas");
        }
    }

    async quitarParcela(request, response)
    {
        const {idParcela} = request.params;
        var parcela = new ParcelaContaPagar();
        const resp = await parcela.quitarParcela(bd, idParcela);

        if(resp > 0)
            return response.send("Parcela Quitada");
        else
            return response.send("Algo deu errado");
    }

    async pagarParcelado(request, response)
    {
        const {idParcela, valor} = request.params;
        var parcela = new ParcelaContaPagar();
        const resp = await parcela.pagarParcelado(bd, idParcela, valor);

        if(resp > 0)
            return response.send("Valor Descontado na Parcela");
        else
            return response.send("Algo deu errado");
    }
}

module.exports = new ParcelaContaPagarController();