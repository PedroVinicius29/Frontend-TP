import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clientes: [],
            erro: null
        };
    }
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/clientes`)
            .then(clientes =>
                clientes.json().then(clientes => this.setState({ clientes }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { clientes } = this.state;
        return (
            <div className="lista-clientes">

                <Link to={`/criarCliente`}> <button type="button" class="btn btn-success">Adicionar</button> </Link>
                <br /><br />

                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Telefone</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((clientes) => (
                            <tr>
                                <th scope="row">{clientes.id}</th>
                                <td>{clientes.nome}</td>
                                <td>{clientes.end}</td>
                                <td>{clientes.email}</td>
                                <td>{clientes.tell}</td>
                                <td> <Link to={`/clientes/${clientes.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarclientes/${clientes.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarclientes/${clientes.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}