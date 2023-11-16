import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as C from "./styles";
import Spinner from "../../components/Spinner";
import { api } from "../../contexts/auth";
import './style.css';
import Input from "../../components/Input";

const ContatoNovo = () => {
    const navigate = useNavigate();
    const [cod, setCod] = useState("");
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Estado para controlar o spinner

    const handleSalvar = async () => {
        api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        api.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
        
        // Exibindo o spinner antes de fazer a requisição
        setLoading(true);
        try {
            const response = await api.post('/cadastros', {
                nome: nome,
                endereco: endereco,
                telefone: telefone
            });

            if (response.status == 201){
                navigate("/contatos");
            } else {
                /* ocorreu algum outro erro */
                console.log(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Página Cadastro de Contato</h2>
            <br />
            <Link to={'/contatos'}>Listar</Link>
            <form>
                <Input type="text" placeholder="Digite o Nome" value={nome} onChange={(e) => [setNome(e.target.value), setError("")]} />
                <Input type="text" placeholder="Digite o Endereço" value={endereco} onChange={(e) => [setEndereco(e.target.value), setError("")]} />
                <Input type="email" placeholder="Digite o Telefone" value={telefone} onChange={(e) => [setTelefone(e.target.value), setError("")]} />
                <div className="text-center mt-2">
                    <span className="errorForm">{error}</span>
                </div>
            </form>
            <br/>
            {loading ? (
                <Spinner />
            ) : (
                <button className="btn-primary" onClick={handleSalvar}>Salvar</button>
            )}
            <hr />
            <br/>
            <Link to={'/home'}>Home</Link>
        </div>
    );
};

export default ContatoNovo;