const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');

let server = express();
server.use(express.json());
server.use(logger('dev'));
server.use(cors());

// Verifica se o usuário está cadastrado para poder acessar o site

server.get('/singin/:email/:senha', async (req, res) => {
    // Realiza conexão com o database
    let dbConn = await mysql.createConnection({
        host: 'localhost',
        user: 'netflix_clone_teste',
        password: '2106',
        database: 'netflix_clone'
    });

    const { email } = req.params;
    const { senha } = req.params;

    const [account] = await dbConn.execute(
        `select * from netflix_clone.login where email='${email}' and senha='${senha}'`
    );

    // Encerra a conexão com o banco
    dbConn.destroy();

    res.status(200).json(account);
});

// Pega os dados do usuario pelo id
server.get('/userData/:id', async (req, res) => {
    // Realiza conexão com o database
    let dbConn = await mysql.createConnection({
        host: 'localhost',
        user: 'netflix_clone_teste',
        password: '2106',
        database: 'netflix_clone'
    });

    const { id } = req.params;

    const [dataUser] = await dbConn.execute(
        `select * from netflix_clone.login where idLogin=${id}`
    );

    // Encerra a conexão com o banco
    dbConn.destroy();

    res.status(200).json(dataUser);
});

// Pega os dados do usuario pelo id
server.post('/newUser/:name/:email/:cpf/:password', async (req, res) => {

    const name = req.params.name;
    const email = req.params.email;
    const cpf = req.params.cpf;
    const password = req.params.password;

    // Realiza conexão com o database
    let dbConn = await mysql.createConnection({
        host: 'localhost',
        user: 'netflix_clone_teste',
        password: '2106',
        database: 'netflix_clone'
    });

    await dbConn.execute(
        `insert into netflix_clone.login (nome, cpf, email, senha)
        values ("${name}", "${cpf}", "${email}", "${password}")`
    );

    // Encerra a conexão com o banco
    dbConn.destroy();

    res.status(201).json({ message: 'Dados armazenados com sucesso!' });
});

// Muda senha do usuario pelo id e email
server.put('/update-password/:id/:email/:newSenha', async (req, res) => {

    const id = req.params.id;
    const email = req.params.email;
    const newSenha = req.params.newSenha;

    // Realiza conexão com o database
    let dbConn = await mysql.createConnection({
        host: 'localhost',
        user: 'netflix_clone_teste',
        password: '2106',
        database: 'netflix_clone'
    });

    await dbConn.execute(
        `update netflix_clone.login set senha="${newSenha}" WHERE idLogin=${id} and email="${email}"`
    );

    // Encerra a conexão com o banco
    dbConn.destroy();

    res.status(201).json({ message: 'Dados armazenados com sucesso!' });
});

server.listen(3001,
    console.log("Servidor iniciado!")
)
