import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pedidos: [],
            erro: null
        };
    }
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/pedidos`)
            .then(pedidos =>
                pedidos.json().then(pedidos => this.setState({ pedidos }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { pedidos } = this.state;
        return (
            <div className="lista-pedidos">

                <Link to={`/criarPedidos`}> <button type="button" class="btn btn-success">Adicionar</button> </Link>
                <br /><br />

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Data</th>
                            <th scope="col">Produto</th>
                            <th scope="col">Quantidade do Pedido</th>
                            <th scope="col">Valor Total</th>
                            <th scope="col">Cliente</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedidos) => (
                            <tr>
                                <th scope="row">{pedidos.id}</th>
                                <td>{pedidos.dataPedido}</td>
                                <td>{pedidos.produtoPedido}</td>
                                <td>{pedidos.qtdPedido}</td>
                                <td>{pedidos.valorPedido}</td>
                                <td>{pedidos.cliente}</td>
                                <td> <Link to={`/pedidos/${pedidos.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarpedidos/${pedidos.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarpedidos/${pedidos.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}