import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import "./style.css";

const Signin = () => {
    const { signin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Estado para controlar o spinner

    const handleLogin = async () => {
        if (!email | !senha) {
            setError("Preencha todos os campos");
            return;
        }

        // Exibindo o spinner antes de fazer a requisição
        setLoading(true);
        try {
            const res = await signin(email, senha);
            if (!res.retOk) {
                setError(res.retMsg);
                return;
            }
            navigate("/home");
        } catch (error) {
            
        } finally {
            // Escondendo o spinner após a requisição, independentemente do resultado
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h3>SISTEMA DE ESTUDO REACT</h3>
            <div className="content">
                <div>
                    <img src="../../../img/logo.png" className="logo-login"/>
                </div>
                <Input type="email" placeholder="Digite seu E-mail" value={email} onChange={(e) => [setEmail(e.target.value), setError("")]} />
                <Input type="password" placeholder="Digite sua Senha" value={senha} onChange={(e) => [setSenha(e.target.value), setError("")]} />
                <C.labelError>{error}</C.labelError>
                {loading ? (
                    <Spinner /> // Renderize o spinner se o estado de carregamento estiver definido como true
                ) : (
                    <button className="btn-primary" onClick={handleLogin}>Entrar</button>
                )}
            </div>
        </div>
    );
};

export default Signin;