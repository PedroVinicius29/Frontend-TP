import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class Clientes extends Component {
    state = {
        clientes: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3003/sistema/clientes/${id}`)
            .then(clientes =>
                clientes.json().then(clientes => this.setState({ clientes }))
            )
            .catch(clientes => this.setState({ clientes }));
    }

    render() {
        const { clientes } = this.state;

        return (
            <div>
                <div className="clientes-info">
                    <h1> {clientes.nome} </h1>
                    <h1> {clientes.end} </h1>
                    <h1> {clientes.email} </h1>
                    <h1> {clientes.tell} </h1>
                    <br />
                </div >
                <div className="links">
                    <Link to={`/clientes`} className="btn btn-success"> Voltar </Link>
                    <Link to={`/editarclientes/id${clientes.id}`} className="btn btn-warning"> Editar </Link>
                    <Link to={`/deletarclientes/id${clientes.id}`} className="btn btn-danger"> Deletar </Link>
                </div>
            </div>
        );
    }
}
