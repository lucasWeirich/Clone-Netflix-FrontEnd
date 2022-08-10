import React, { useEffect, useState } from "react";
import "./Login.css";

export default () => {

    useEffect(() => {
        const checkConnection = () => {

            if ((sessionStorage.getItem('account'))) {
                window.location.href = "/home";
                alert("É necessário sair da conta atual para acessar outra conta!");
            }
        }
        checkConnection();

    });

    const [email, setEmail] = useState(null);

    const SingIn = () => {
        window.location.href = "/login/sing-in";
    };

    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handleSingIn = () => {
        localStorage.setItem('email', (email !== null ? email : ''));
        SingIn();
    };

    function Login() {
        window.location.href = "/";
    }

    return (
        <section className="login">
            <div className="login--header">
                <img onClick={Login} className="login--logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/1024px-Netflix_logo.svg.png" alt="Netflix" />
                <button className="login--buttonSingIn" onClick={SingIn}>Entrar</button>
            </div>
            <div className="login--title">Filmes, séries e muito mais. Sem limites.</div>
            <div className="login--subTitle">Assista onde quiser. Cancele quando quiser.</div>
            <div className="login--info">Pronto para assistir? Informe seu email para criar ou reiniciar sua assinatura.</div>
            <div className="login--input" >
                <input className="login--inputEmail" type="email" placeholder="Email" name="email" onChange={handleEmail} />
                <input className="login--inputLetsGo" type="button" value="Vamos lá ➭" onClick={handleSingIn} />
            </div>
        </section>
    );
};