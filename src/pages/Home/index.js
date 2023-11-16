import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import "../Contato/style.css";

const Home = () => {
    const { signout, user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="container">
            <h2>Home</h2>
            <br/>
            <p>Olá {user.name}, você está logado no sistema.</p>
            <br/>
            <hr />
            <Link to={'/contatos'}>Contatos</Link>
            <br/>
            <button className="btn-primary" onClick={() => [signout(), navigate("/")]}>
                Sair
            </button>
        </div>
    );
};

export default Home;