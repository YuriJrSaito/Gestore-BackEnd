const axios = require('axios');
const bd = require('../models/Database');

const Usuario = require('../models/Usuario');
const TelefoneController = require('../controllers/TelefoneController');
const EnderecoController = require('../controllers/EnderecoController');
const ControleAcessoController = require('../controllers/ControleAcessoController');

class UsuarioController{

    async gravar(request, response)
    {
        const {nome, email, idade, sexo, cpf, telefones, cep, cidade, rua, bairro, numero, complemento, login, senha, nivelAcesso, idCargo, dataDemissao, dataEmissao, salario} = request.body;
        var msg = "";
        
        let idCA = await ControleAcessoController.gravarControleAcesso(bd, login, senha, nivelAcesso, true);
        if(idCA != false)
        {
            let idTelefone = await TelefoneController.gravarTelefones(bd, telefones);
            let idEndereco = await EnderecoController.gravarEndereco(bd, cep, cidade, rua, bairro, numero, complemento);

            var usuario = new Usuario(0, nome, email, idade, sexo, idEndereco, cpf, idTelefone, salario, dataEmissao, dataDemissao, idCargo, idCA);
            const resp = await usuario.gravar(bd);

            if(resp > 0)
                msg += "Usuario cadastrado com sucesso";
            else
                msg += "Algo deu errado";

            return response.send(msg);
        }
        else
        {
            msg = "erro";
            return response.send(msg);
        }
    }
    
    async alterar(request, response)
    {
        const {idUsuario, nome, email, idade, sexo, cpf, telefones, cep, cidade, rua, bairro, numero, complemento, login, senha, nivelAcesso, idCargo, dataDemissao, dataEmissao, salario, idTelefone, idEndereco, idCA} = request.body;
        var msg="";

        const respCA = await ControleAcessoController.alterarControleAcesso(bd, idCA, login, senha, nivelAcesso, true);

        if(respCA != false)
        {
            const respTel = await TelefoneController.alterarTelefone(bd, idTelefone, telefones);
            const respEnd = await EnderecoController.alterarEndereco(bd, idEndereco, rua, numero, bairro, cidade, cep, complemento);
            let usuario = new Usuario(idUsuario, nome, email, idade, sexo, idEndereco, cpf, idTelefone, salario, dataEmissao, dataDemissao, idCargo, idCA);
            const respUs = await usuario.alterar(bd);

            if(respTel>0 && respEnd>0 && respCA>0 && respUs>0)
                msg+="Alterado com sucesso !!";
            else
                msg+="Algo deu errado !!";
            
            return response.send(msg);
        }
        else
        {
            msg = "erro";
            return response.send(msg);
        }
    }

    async listarTodosUsuarios(request, response)
    {
        var usuario = new Usuario();
        const resp = await usuario.listarTodosUsuarios(bd);

        if(resp != undefined)
        {
            return await response.send(resp);
        }
        else
        {
            return await response.send("Não há usuarios cadastrados");
        }
    }

    async filtrarUsuarios(request, response)
    {
        const {filtro} = request.params;
        var usuario = new Usuario();
        const resp = await usuario.filtrarUsuarios(bd, filtro);

        if(resp != undefined)
        {
            return response.send(resp);
        }
        else
        {
            return response.send("Não há Usuarios cadastrados");
        }
    }

    async deletar(request, response) 
    {
        const {idUsuario} = request.params;
        var msg="";
        const usuario = new Usuario();
        const resp = await usuario.deletar(bd, idUsuario);

        if(resp>0)
            msg+="Deletado com sucesso !!";
        else
            msg+="Algo deu errado !!";

        return response.send(msg); 
    }

    async buscarCargo(request, response)
    {
        const {idCargo} = request.params;
        const usuario = new Usuario();
        const resp = await usuario.buscarCargo(bd, idCargo);

        return response.send(resp); 
    }

    async procurarUsuarioAcesso(bd, idAcesso)
    {
        let usuario = new Usuario();
        let resp = await usuario.procurarUsuarioAcesso(bd, idAcesso);

        return resp;
    }

    async buscarUsuarioNome(bd, idUsuario)
    {
        let usuario = new Usuario();
        let resp = await usuario.buscarUsuarioNome(bd, idUsuario);

        return resp;
    }
}

module.exports = new UsuarioController();