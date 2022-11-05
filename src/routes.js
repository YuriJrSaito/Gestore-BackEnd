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
const contaReceberCtrl = require('./controllers/ContaReceberController');
const parcelaCRCtrl = require('./controllers/ParcelaContaReceberController');
const vendaCtrl = require('./controllers/VendaController');
const itemVendaCtrl = require('./controllers/ItemVendaController');
const vendaCondCtrl = require('./controllers/VendaCondController');
const listaCondCtrl = require('./controllers/ListaCondController');

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
routes.post('/logout', controleAcessoCtrl.logout);
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
routes.put('/pagarParceladoCP/:idParcela/:valor', parcelaCPCtrl.pagarParcelado);

routes.post('/cadContaReceber', contaReceberCtrl.gravar);
routes.get('/listarContasReceber',contaReceberCtrl.listarTodasContas);
routes.delete('/deletarContaReceber/:idConta', contaReceberCtrl.deletar);

routes.get('/buscarParcelasCR/:idConta', parcelaCRCtrl.listarTodasParcelas);
routes.post('/quitarParcelaCR/:idParcela', parcelaCRCtrl.quitarParcela);
routes.put('/pagarParceladoCR/:idParcela/:valor', parcelaCRCtrl.pagarParcelado);

routes.post('/cadVenda', vendaCtrl.gravar);
routes.get('/buscarContaEmVendas/:idConta', vendaCtrl.buscarConta);
routes.get('/listarVendas', vendaCtrl.listarTodasVendas);
routes.get('/buscarUsVenda/:idUsuario', vendaCtrl.buscarUsuario);
routes.get('/buscarClienteVenda/:idCliente', vendaCtrl.buscarCliente);

routes.post('/cadItemVenda', itemVendaCtrl.gravar);
routes.get('/buscarProdVenda/:idProduto', itemVendaCtrl.buscarProduto);

routes.post('/cadVendaCond', vendaCondCtrl.gravar);
routes.get('/listarVendasCond', vendaCondCtrl.listarTodasVendas);
routes.get('/buscarUsVendaCond/:idUsuario', vendaCondCtrl.buscarUsuario);
routes.delete('/deletarVendaCond/:idVenda', vendaCondCtrl.deletar);

routes.post('/cadListaCond', listaCondCtrl.gravar);
routes.delete('/deletarListaCond/:idVenda', listaCondCtrl.excluir);
routes.get('/buscarProdutosCond/:idVenda', listaCondCtrl.buscarProdutos);

module.exports = routes;