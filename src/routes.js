import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainClientes from './pages/Clientes/Main';
import DetalhesClientes from './pages/Clientes/Detalhes';
import CriarClientes from './pages/Clientes/Criar';
import EditarClientes from './pages/Clientes/Editar';
import DeletarClientes from './pages/Clientes/Deletar';

import MainProdutos from './pages/Produtos/Main';
import DetalhesProdutos from './pages/Produtos/Detalhes';
import CriarProdutos from './pages/Produtos/Criar';
import EditarProdutos from './pages/Produtos/Editar';
import DeletarProdutos from './pages/Produtos/Deletar';

import MainPedidos from './pages/Pedidos/Main';
import DetalhesPedidos from './pages/Pedidos/Detalhes';
import CriarPedidos from './pages/Pedidos/Criar';
import EditarPedidos from './pages/Pedidos/Editar';
import DeletarPedidos from './pages/Pedidos/Deletar';

const Routes = () => (

    <BrowserRouter>
        <Switch>

            <Route exact path="/clientes" component={MainClientes} />
            <Route path="/clientes/:id" component={DetalhesClientes} />
            <Route path="/criarclientes" component={CriarClientes} />
            <Route path="/editarclientes/:id" component={EditarClientes} />
            <Route path="/deletarclientes/:id" component={DeletarClientes} />

            <Route exact path="/produtos" component={MainProdutos} />
            <Route path="/produtos/:id" component={DetalhesProdutos} />
            <Route path="/criarprodutos" component={CriarProdutos} />
            <Route path="/editarprodutos/:id" component={EditarProdutos} />
            <Route path="/deletarprodutos/:id" component={DeletarProdutos} />

            <Route exact path="/pedidos" component={MainPedidos} />
            <Route path="/pedidos/:id" component={DetalhesPedidos} />
            <Route path="/criarpedidos" component={CriarPedidos} />
            <Route path="/editarpedidos/:id" component={EditarPedidos} />
            <Route path="/deletarpedidos/:id" component={DeletarPedidos} />

        

        </Switch>
    </BrowserRouter>
)

export default Routes;
