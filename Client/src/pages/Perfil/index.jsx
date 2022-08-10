import React, { useState, useEffect } from "react";
import "../Login/NewUser.css"

export default () => {

  function checkConnection() {

    if (!(sessionStorage.getItem('account'))) {
      window.location.href = "/";
      alert("Entre na sua conta ou crie uma nova!")
      sessionStorage.clear();
    }

    let id = sessionStorage.getItem('account');

    fetch(`http://localhost:3001/userData/${id}`, {
      method: 'get',
      Accept: 'application/json',
      ContentType: 'application/json',
      mode: 'cors'
    })
      .then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then(data => getDataUser(data))
  }

  checkConnection();

  const [viewOrEdit, setViewOrEdit] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');
  const [cpf, setCpf] = useState('');

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  const handleCheckNewPassword = (e) => {
    setCheckNewPassword(e.target.value);
  }

  function getDataUser([data]) {
    setName(data.nome);
    setEmail(data.email);
    setCpf(data.cpf)
    setPassword(data.senha);
  }

  const handleEditUser = () => {
    setViewOrEdit(1);
  }

  const handleSaveEdit = () => {

    if (newPassword.length < 5 || newPassword.length > 30) {
      alert("Informe uma senha com no mínimo 5 carácteres e máximo 30 carácteres!");
      return;
    }

    if (newPassword != checkNewPassword) {
      alert("As senhas não se coencidem! Favor verificar se ambas estão iguais!");
      return;
    }

    let id = sessionStorage.getItem('account');

    fetch(`http://localhost:3001/update-password/${id}/${email}/${newPassword}`, {
      method: 'put',
      Accept: 'application/json',
      ContentType: 'application/json',
      mode: 'cors'
    })
      .then(res => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then(() => {
        alert("Senha alterada com sucesso!");
        setViewOrEdit(0);
      })
      .catch(err => alert("Problemas com a troca de senha: " + err + " Por Favor tente novamente mais tarde!"))

  }

  const handleCancelEdit = () => {
    setViewOrEdit(0);
  }

  function Home() {
    window.location.href = "/home";
  }

  return (
    <section className="newUser">
      <div className="newUser--header">
        <img onClick={Home} className="login--logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/1024px-Netflix_logo.svg.png" alt="Netflix" />
      </div>

      <div className="newUser--card">
        <div className="newUser--form">
          <h1 className="newUser--title">Olá, {name}!</h1>
          {viewOrEdit !== 1 ?
            <div className="newUser--inputs">
              <label>Nome Completo</label>
              <input className="name" type="text" name="name" value={name} />
              <label>Email</label>
              <input className="email" type="email" name="email" value={email} />
              <label>Cpf</label>
              <input className="cpf" type="text" name="cpf" value={cpf} />
              <label>Senha</label>
              <input className="password" type="password" name="senha" value={password} />

              <input className="button" type="button" value="Mudar senha" onClick={handleEditUser} />
            </div>
            :
            <div className="newUser--inputs">
              <input type="hidden" name="email" value={email} />
              <label>Senha</label>
              <input className="password" type="password" name="senha" placeholder="Senha..." value={newPassword} onChange={handleNewPassword} />
              <label>Informe a senha novamente!</label>
              <input className="checkPassword" type="password" name="checkSenha" placeholder="Senha Novamente..." value={checkNewPassword} onChange={handleCheckNewPassword} />
              <input className="button" type="button" value="Salvar" onClick={handleSaveEdit} />
              <input className="button" type="button" value="Cancelar" onClick={handleCancelEdit} />
            </div>
          }
          <div className="newUser--label">
            <span>Seus dados estão seguros! Não se preocupe que cuidamos com muito cuidado os dados de todos os usuários!</span>
          </div>
        </div>
      </div>
    </section>
  );
};