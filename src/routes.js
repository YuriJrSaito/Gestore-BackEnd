const {Router}  =  require('express');
const routes  =  Router();

const clienteCtrl = require('./controllers/ClienteController.js');
const cargoCtrl = require('./controllers/CargoController.js');
const usuarioCtrl = require('./controllers/UsuarioController.js');
const telefoneCtrl = require('./controllers/TelefoneController.js');
const enderecoCtrl = require('./controllers/EnderecoController.js');
const controleAcessoCtrl = require('./controllers/ControleAcessoController.js');
const fornecedorCtrl = require('./controllers/FornecedorController.js');
const categoriaCtrl = require('./controllers/CategoriaController.js');
const produtoCtrl = require('./controllers/ProdutoController.js');
const contaPagarCtrl = require('./controllers/ContaPagarController');
const parcelaCPCtrl = require('./controllers/ParcelaContaPagarController');

routes.post('/cadCliente',clienteCtrl.gravar);
routes.put('/altCliente', clienteCtrl.alterarCliente);
routes.delete('/deletarCliente/:idCliente', clienteCtrl.deletar);
routes.get('/listarTodosClientes', clienteCtrl.listarTodosClientes);
routes.get('/filtrarClientes/:filtro', clienteCtrl.filtrarClientes);

routes.get('/buscarEndereco/:idEndereco', enderecoCtrl.buscarEndereco);
routes.delete('/deletarEndereco/:idEndereco', enderecoCtrl.deletar);
routes.get('/buscarTelefones/:idTelefone', telefoneCtrl.buscarTelefone);
routes.delete('/deletarTelefone/:idTelefone', telefoneCtrl.deletar);

routes.get('/buscarControleAcesso/:idCA', controleAcessoCtrl.buscarControleAcesso);
routes.get('/logar/:login/:senha', controleAcessoCtrl.buscarUsuario);
routes.delete('/deletarAcesso/:idCA', controleAcessoCtrl.deletar);

routes.post('/cadCargo',cargoCtrl.gravar);
routes.get('/buscarCargo/:idCargo',cargoCtrl.buscarPorId);
routes.get('/buscarCargos',cargoCtrl.buscarTudo);
routes.get('/filtrarCargos/:filtro',cargoCtrl.filtrarCargos);
routes.delete('/deletarCargo/:idCargo', cargoCtrl.deletar);

routes.post('/cadCategoria',categoriaCtrl.gravar);
routes.get('/buscarCategoria/:idCategoria',categoriaCtrl.buscarPorId);
routes.get('/buscarCategorias',categoriaCtrl.buscarTudo);
routes.get('/filtrarCategorias/:filtro',categoriaCtrl.filtrarCategorias);
routes.delete('/deletarCategoria/:idCategoria', categoriaCtrl.deletar);

routes.post('/cadUsuario', usuarioCtrl.gravar);
routes.put('/altUsuario', usuarioCtrl.alterar);
routes.delete('/deletarUsuario/:idUsuario', usuarioCtrl.deletar);
routes.get('/listarTodosUsuarios',usuarioCtrl.listarTodosUsuarios);
routes.get('/filtrarUsuarios/:filtro', usuarioCtrl.filtrarUsuarios);
routes.get('/buscarCargoUs/:idCargo', usuarioCtrl.buscarCargo);

routes.post('/cadProduto', produtoCtrl.gravar);
routes.put('/altProduto', produtoCtrl.alterar);
routes.delete('/deletarProduto/:idProduto', produtoCtrl.deletar);
routes.get('/listarTodosProdutos',produtoCtrl.listarTodosProdutos);
routes.get('/filtrarProdutos/:filtro', produtoCtrl.filtrarProdutos);
routes.get('/buscarFornecedor/:idFornecedor', produtoCtrl.buscarFornecedor);
routes.get('/buscarCategoriaProd/:idCategoria', produtoCtrl.buscarCategoria);

routes.post('/cadFornecedor', fornecedorCtrl.gravar);
routes.put('/altFornecedor', fornecedorCtrl.alterar);
routes.delete('/deletarFornecedor/:idFornecedor', fornecedorCtrl.deletar);
routes.get('/listarFornecedores',fornecedorCtrl.listarFornecedores);
routes.get('/filtrarFornecedores/:filtro', fornecedorCtrl.filtrarFornecedores);

routes.post('/cadContaPagar', contaPagarCtrl.gravar);
routes.put('/altContaPagar', contaPagarCtrl.alterar);
routes.delete('/deletarContaPagar/:idConta', contaPagarCtrl.deletar);
routes.get('/listarContasPagar',contaPagarCtrl.listarTodasContas);
routes.get('/filtrarContasPagar/:filtro', contaPagarCtrl.filtrarContas);

routes.get('/buscarParcelasCP/:idConta', parcelaCPCtrl.listarTodasParcelas);
routes.post('/quitarParcelaCP/:idParcela', parcelaCPCtrl.quitarParcela);


module.exports = routes;