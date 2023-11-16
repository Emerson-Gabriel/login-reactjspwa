import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {'Content-Type': 'application/json'}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        const userObj = localStorage.getItem("user");

        if (userToken) {
            /* significa que o usuário já está logado */
            setUser(JSON.parse(userObj));
        }
    }, []);

    const signin = async (email, password) => {
        let retorno = { retOk: false, retMsg: '' };
        let device_name = window.navigator.userAgent;
        let idUsuario = '';
        await api.post('/login', { email, password, device_name }).then(function (response) {
            if (response.status === 200) {
                retorno.retOk = true;
                idUsuario = response.data.id;
                /* Salvando o token no Storage */
                localStorage.setItem("token", response.data.token);
            } else {
                retorno.retMsg = 'Ocorreu algum erro ao realizar o login.';
            }
        }).catch(function (error) {
            if (error.response.data !== 'undefined') {
                // manipula erros da requisição
                retorno.retMsg = error.response.data.message
            } else {
                console.log(error);
            }
        });

        /* se o login foi efetuado então iremos consultar as informações do usuário logado */
        if (retorno.retOk) {
            /* incluindo o token no cabeçalho das requisições */
            api.defaults.headers.common = {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            };

            await api.get('/usuarios/' + idUsuario,).then(function (response) {
                setUser(response.data.data);
                localStorage.setItem("user", JSON.stringify(response.data.data));
            });
        }

        return retorno;
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            /* 
              a variável signed que controla se o usuário está logado ou não
              ela retorna true ou false se o user existir
             */
            value={{ user, signed: !!user, signin, signout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
