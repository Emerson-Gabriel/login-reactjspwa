import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { api } from "../../contexts/auth";
import './style.css';

const Contato = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const [contatos, setContatos] = useState([]);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); /* por hora não fiz a paginação */

    const buscaContatos = async () => {
        setLoading(true);

        api.defaults.headers.common = {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        };

        api.get('/cadastros?page=' + page).then(function (response) {
            setLoading(false);
            setContatos(response.data.data);
            if (response.data.links.prev != null) {
                /* existem links da pagina anterior */
                setPrev(true);
            } else {
                setPrev(null);
            }

            if (response.data.links.next != null) {
                /* existem links da pagina proxima */
                let numPag = response.data.links.next.slice(-1);
                /* setPage(numPag); */
                setNext(true);
            } else {
                setNext(null);
            }
        });
    }

    const excluirContato = async (id) => {
        if (!window.confirm('Deseja realmente apagar este registro?')){
            return;
        }

        setLoading(true);
        api.defaults.headers.common = {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        };

        api.delete('/cadastros/' + id).then(function (response) {
            if (response.status == 204) {
                /* atualizamos a consulta */
                buscaContatos();
            } else {
                alert('Não foi possível excluir o registro informado.');
            }
        });
    }

    useEffect(() => {
        buscaContatos();
    }, [page]);

    return (
        <div className="container">
            <h2>Página Listagem dos Contatos</h2>
            <br />
            <Link to={'/contato/novo'}>Novo contato</Link>
            <div>
                {loading ? ( 
                    <div className="text-center mt-5 mb-5">
                        <Spinner />
                    </div>
                 ) : (
                    <ul className="ul">
                        {contatos.map((contato) => (
                            <li key={contato.id}>
                                <strong>Nome:</strong> {contato.nome}<br />
                                <strong>Endereço:</strong> {contato.endereco}<br />
                                <strong>Telefone:</strong> {contato.telefone}<br />
                                <Link to={'/'}>
                                    <i className="fas fa-pencil-alt iconItem"></i>
                                </Link>
                                <a onClick={() => excluirContato(contato.id)}>
                                    <i className="fas fa-trash-alt iconItem"></i>
                                </a>
                                <hr />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <div>
                    {prev !== null ? <a className="linkPag" onClick={() => [setPage(page - 1)]}>Anterior</a> : null}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {next !== null ? <a className="linkPag" onClick={() => [setPage(page + 1)]}>Próximo</a> : null}
                </div>
            </div>
            <br />
            <button className="btn-primary" onClick={() => [navigate("/home")]}>
                Home
            </button>
            <button className="btn-primary" onClick={() => [signout(), navigate("/")]}>
                Sair
            </button>
        </div>
    );
};

export default Contato;