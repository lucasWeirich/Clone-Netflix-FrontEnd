import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import NewUser from "./pages/Login/NewUser";
import SingIn from "./pages/Login/SingIn";
import PerfilUser from "./pages/Perfil"

export default () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login/new-user" element={<NewUser />} />
                <Route path="/login/sing-in" element={<SingIn />} />
                <Route path="/perfil-user" element={<PerfilUser />} />
            </Routes>
        </BrowserRouter>
    );
};