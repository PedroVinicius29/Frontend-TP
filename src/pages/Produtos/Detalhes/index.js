import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Produtos extends Component {
    state = {
        produtos: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/produtos/${id}`)
            .then( produtos =>
                produtos.json().then( produtos => this.setState({  produtos }))
            )
            .catch( produtos => this.setState({  produtos }));
    }

    render() {
        const { produtos } = this.state;

        return (
            <div>
                <div className="produtos-info">
                    <h1> {produtos.nome} </h1>
                    <h1> {produtos.precoCusto} </h1>
                    <h1> {produtos.precoVenda} </h1>
                    <h1> {produtos.qtdEstoque} </h1>
                    <br />
                </div >
                <div className="links">
                    <Link to={`/produtos`} className="btn btn-success"> Voltar </Link>
                    <Link to={`/editarprodutos/id${produtos.id}`} className="btn btn-warning"> Editar </Link>
                    <Link to={`/deletarprodutos/id${produtos.id}`} className="btn btn-danger"> Deletar </Link>
                </div>
            </div>
        );
    }
}
