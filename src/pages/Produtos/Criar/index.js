import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class CriarProdutos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produtos: {
                nome: "",
                precoCusto: "",
                precoVenda: "",
                qtdEstoque: ""
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
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Inserir Produto</legend>
                        <div className="produtos-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produtos.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-insert">
                            <label htmlFor="precoCusto"> Preço Custo </label>
                            <br />
                            <input
                                type="double"
                                id="precoCusto"
                                name="precoCusto"
                                placeholder="Preço Custo"
                                required
                                value={this.state.produtos.precoCusto}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="produtos-insert">
                            <label htmlFor="precoVenda">Preço Venda</label>
                            <br />
                            <input
                                type="double"
                                id="precoVenda"
                                name="precoVenda"
                                placeholder="Preço Venda"
                                required
                                value={this.state.produtos.precoVenda}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <div className="produtos-insert">
                        <label htmlFor="qtdEstoque"> Quantidade em Estoque </label>
                            <br />
                            <input
                                type="integer"
                                id="qtdEstoque"
                                name="qtdEstoque"
                                placeholder="Quantidade em Estoque"
                                required
                                value={this.state.produtos.qtdEstoque}
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
            produtos: { ...prevState.produtos, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`http://localhost:3003/sistema/produtos`, {
            method: "post",
            body: JSON.stringify(this.state.produtos),
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
 
export default CriarProdutos;