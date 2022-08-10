import React, { useEffect, useState } from "react";
import "./SingIn.css";

export default () => {

    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (localStorage.key('email')) {
            setEmail(localStorage.getItem('email'));
            localStorage.clear();
        }
        const checkConnection = () => {
            if ((sessionStorage.getItem('account'))) {
                window.location.href = "/home";
            }
        }
        checkConnection();
    })

    const NewUser = () => {
        window.location.href = "/login/new-user";
    };

    function accessUser([account]) {
        setUserData({
            idLogin: account.idLogin,
            nome: account.nome,
            cpf: account.cpf,
            dataNascimento: account.dataNascimento,
            email: account.email,
            senha: account.senha
        })
        sessionStorage.setItem('account', account.idLogin);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleAccessAccount = () => {

        fetch(`http://localhost:3001/singin/${email}/${password}`, {
            method: 'get',
            Accept: 'application/json',
            ContentType: 'application/json',
            mode: 'cors'
        })
            .then(res => {
                if (!res.ok) throw new Error(res.status)
                return res.json()
            })
            .then(data => accessUser(data))

        if (email == userData.email && password == userData.senha) {
            window.location.href = "/home";
            return;
        } else {
            alert("Não foi possível encontrar sua conta! Informe os dados corretamente ou crie uma nova conta! 👍");
        }
    };

    function Login() {
        window.location.href = "/";
    }

    return (
        <section className="singin">
            <div className="singin--header">
                <img onClick={Login} className="login--logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/1024px-Netflix_logo.svg.png" alt="Netflix" />
            </div>

            <div className="singin--card">
                <div className="singin--form">
                    <h1 className="singin--title">Entrar</h1>
                    <div className="singin--inputs">
                        <input className="email" type="email" name="email" placeholder="Email" value={email} onChange={handleEmail} />
                        <input className="password" type="password" name="senha" placeholder="Senha" value={password} onChange={handlePassword} />
                        <input className="button" type="button" value="Entrar" onClick={handleAccessAccount} />
                    </div>
                    <div className="singin--label">
                        <span>Novo por aqui?</span>
                        <span className="link" onClick={NewUser}>Assine agora!</span>
                    </div>
                </div>
            </div>
        </section>
    );
};