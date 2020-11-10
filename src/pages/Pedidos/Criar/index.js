import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class CriarPedidos extends Component {
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
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/pedidos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Inserir Pedido</legend>
                        <div className="pedidos-insert">
                            <label htmlFor="dataPedido">Data do Pedido </label>
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
                        <div className="pedidos-insert">
                            <label htmlFor="produtoPedido"> Produto Pedido </label>
                            <br />
                            <input
                                type="text"
                                id="produtoPedido"
                                name="produtoPedido"
                                placeholder="Produto Pedido"
                                required
                                value={this.state.pedidos.produtoPedido}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="pedidos-insert">
                            <label htmlFor="qtdPedido"> Quantidade do Pedido </label>
                            <br />
                            <input
                                type="integer"
                                id="qtdPedido"
                                name="qtdPedido"
                                placeholder=" Quantidade do Pedido"
                                required
                                value={this.state.pedidos.qtdPedido}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <div className="pedidos-insert">
                        <label htmlFor="valorPedido"> Valor Total do Pedido </label>
                            <br />
                            <input
                                type="double"
                                id="valorPedido"
                                name="valorPedido"
                                placeholder="Valor Total"
                                required
                                value={this.state.pedidos.valorPedido}
                                onChange={this.handleInputChange}
                            />
                        </div> 
                        <div className="pedidos-insert">
                            <label htmlFor="cliente"> Cliente </label>
                            <br />
                            <input
                                type="text"
                                id="cliente"
                                name="cliente"
                                placeholder="Cliente que fez o pedido"
                                required
                                value={this.state.pedidos.cliente}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
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
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`http://localhost:3003/sistema/pedidos`, {
            method: "post",
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
 
export default CriarPedidos;