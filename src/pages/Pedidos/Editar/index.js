import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';

class EditarPedidos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pedidos: {
                dataPedido: "",
                produtoPedido: "",
                qtdPedido: "",
                valorPedido: "",
                cliente: ""
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o Server
                </div>
            );
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/pedidos/${id}`)
        .then(pedidos =>
            pedidos.json().then(pedidos => this.setState({ pedidos }))
        )
        .catch(erro => this.setState({ erro }));

    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/pedidos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Pedidos</legend>
                        <div className="pedidos-update">
                            <label htmlFor="dataPedido"> Data do Pedido </label>
                            <br />
                            <input
                                type="date"
                                id="dataPedido"
                                name="dataPedido"
                                placeholder=" Data do Pedido "
                                required
                                value={this.state.pedidos.dataPedido}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedidos-update">
                            <label htmlFor="produtoPedido"> Produto Pedido </label>
                            <br />
                            <input
                                type="text"
                                id="produtoPedido"
                                name="produtoPedido"
                                placeholder=" Produto Pedido "
                                required
                                value={this.state.pedidos.produtoPedido}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedidos-update">
                            <label htmlFor="qtdPedido"> Quantidade do Pedido </label>
                            <br />
                            <input
                                type="integer"
                                id="qtdPedido"
                                name="qtdPedido"
                                placeholder=" Quantidade do Pedido "
                                required
                                value={this.state.pedidos.qtdPedido}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="pedidos-update">
                            <label htmlFor="valorPedido"> Valor Total do Pedido </label>
                            <br />
                            <input
                                type="double"
                                id="valorPedido"
                                name="valorPedido"
                                placeholder=" Valor Total "
                                required
                                value={this.state.pedidos.valorPedido}
                                onChange={this.handleInputChange}
                            />
                        </div> 

                        <div className="pedidos-update">
                            <label htmlFor="cliente"> Cliente </label>
                            <br />
                            <input
                                type="text"
                                id="cliente"
                                name="cliente"
                                placeholder=" Cliente "
                                required
                                value={this.state.pedidos.cliente}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary"> Atualizar </button>
                        <Link to={`/pedidos`}> <button type="submit" className="btn btn-primary"> Voltar </button> </Link>
                    </fieldset>
                </form>
            );
        }
    }



    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            pedidos: { ...prevState.pedidos, [name]: value }
        }));
    };

    handleSubmit = event => {
        const { id } = this.state.pedidos;

        fetch(`http://localhost:3003/sistema/pedidos/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.pedidos),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default EditarPedidos;