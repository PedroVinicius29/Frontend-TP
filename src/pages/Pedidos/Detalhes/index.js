import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Pedidos extends Component {
    state = {
        pedidos: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/pedidos/${id}`)
            .then(pedidos =>
                pedidos.json().then(pedidos => this.setState({ pedidos }))
            )
            .catch(pedidos => this.setState({ pedidos }));
    }

    render() {
        const { pedidos } = this.state;

        return (
            <div>
                <div className="pedidos-info">
                    <h1> {pedidos.dataPedido} </h1>
                    <h1> {pedidos.produtoPedido} </h1>
                    <h1> {pedidos.qtdPedido} </h1>
                    <h1> {pedidos.valorPedido} </h1>
                    <h1> {pedidos.cliente} </h1>
                    <br />
                </div >
                <div className="links">
                    <Link to={`/pedidos`} className="btn btn-success"> Voltar </Link>
                    <Link to={`/editarpedidos/id${pedidos.id}`} className="btn btn-warning"> Editar </Link>
                    <Link to={`/deletarpedidos/id${pedidos.id}`} className="btn btn-danger"> Deletar </Link>
                </div>
            </div>
        );
    }
}
