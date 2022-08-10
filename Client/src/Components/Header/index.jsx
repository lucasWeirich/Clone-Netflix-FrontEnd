import React from "react";
import "./Header.css"

export default ({ black }) => {

    const handleLogof = () => {
        sessionStorage.clear();
        window.location.href = "/";
    }

    const handlePerfil = () => {
        window.location.href = "/perfil-user";
    }

    return (
        <header className={black ? "black" : ""} >
            <div className="header--logo">
                <a href="/home">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix" />
                </a>
            </div>
            <div className="header--user">
                <ul>
                    <li>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="User" />

                        <ul className="dropdown">
                            <li onClick={handlePerfil}>Perfil</li>
                            <li onClick={handleLogof}>Sair</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    );
};