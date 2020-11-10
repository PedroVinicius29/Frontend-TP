import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produtos: [],
            erro: null
        };
    }
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/produtos`)
            .then(produtos =>
                produtos.json().then(produtos => this.setState({ produtos }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { produtos } = this.state;
        return (
            <div className="lista-produtos">

                <Link to={`/criarProdutos`}> <button type="button" class="btn btn-success">Adicionar</button> </Link>
                <br /><br />

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço Custo</th>
                            <th scope="col">Preço Venda</th>
                            <th scope="col">Quantidade em Estoque</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produtos) => (
                            <tr>
                                <th scope="row">{produtos.id}</th>
                                <td>{produtos.nome}</td>
                                <td>{produtos.precoCusto}</td>
                                <td>{produtos.precoVenda}</td>
                                <td>{produtos.qtdEstoque}</td>
                                <td> <Link to={`/produtos/${produtos.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarprodutos/${produtos.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarprodutos/${produtos.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}