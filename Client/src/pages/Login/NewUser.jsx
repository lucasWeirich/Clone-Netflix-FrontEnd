import React, { useState, useEffect } from "react";
import "./NewUser.css";

export default () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        const checkConnection = () => {
            if ((sessionStorage.getItem('account'))) {
                window.location.href = "/home";
            }
        }
        checkConnection();
    });

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleCpf = (e) => {
        setCpf(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleCheckPassword = (e) => {
        setCheckPassword(e.target.value);
    }

    const handleCreateAccount = () => {

        function validateData() {
            if (name.length < 10 || name.length > 255) {
                alert("Informe seu nome Completo!");
                return false;
            }
            if (!(email.endsWith('.com') && email.includes('@'))) {
                alert("Informe um email correto!");
                return false;
            }
            if (cpf.length != 11) {
                alert("Informe o cpf corretamente sem traços ou pontos");
                return false;
            }
            if (password.length < 5 || password.length > 30) {
                alert("Informe uma senha com no mínimo 5 carácteres e máximo 30 carácteres!");
                return false;
            }
            if (password != checkPassword) {
                alert("As senhas não se coencidem! Favor verificar se ambas estão iguais!");
                return false
            }
            return true;
        }

        if (validateData()) {

            fetch(`http://localhost:3001/newUser/${name}/${email}/${cpf}/${password}`, {
                method: 'post',
                Accept: 'application/json',
                ContentType: 'application/json',
                mode: 'cors'
            })
                .then(res => {
                    if (!res.ok) throw new Error(res.status)
                    return res.json()
                })
                .then(() => {
                    localStorage.setItem('email', email)
                    window.location.href = "/login/sing-in"
                })
                .catch(err => alert("Problemas com a requisição: " + err + "  Por Favor tente novamente mais tarde!"))
        }
    }

    function Login() {
        window.location.href = "/";
    }

    return (
        <section className="newUser">
            <div className="newUser--header">
                <img onClick={Login} className="login--logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/1024px-Netflix_logo.svg.png" alt="Netflix" />
            </div>

            <div className="newUser--card">
                <div className="newUser--form">
                    <h1 className="newUser--title">Criar Conta</h1>
                    <div className="newUser--inputs">
                        <label>Informe seu Nome Completo!</label>
                        <input className="name" type="text" name="name" placeholder="Nome..." value={name} onChange={handleName} />
                        <label>Informe seu Email para acesso!</label>
                        <input className="email" type="email" name="email" placeholder="Email..." value={email} onChange={handleEmail} />
                        <label>Informe seu cpf!</label>
                        <input className="cpf" type="text" name="cpf" placeholder="Cpf sem traço e ponto..." value={cpf} onChange={handleCpf} />
                        <label>Informe uma senha para acesso!</label>
                        <input className="password" type="password" name="senha" placeholder="Senha..." value={password} onChange={handlePassword} />
                        <label>Informe a senha novamente!</label>
                        <input className="checkPassword" type="password" name="checkSenha" placeholder="Senha Novamente..." value={checkPassword} onChange={handleCheckPassword} />

                        <input className="button" type="button" value="Cadastrar" onClick={handleCreateAccount} />
                    </div>
                    <div className="newUser--label">
                        <span>Seus dados estão seguros! Não se preocupe que cuidamos com muito cuidado os dados de todos os usuários!</span>
                    </div>
                </div>
            </div>
        </section>
    );
};