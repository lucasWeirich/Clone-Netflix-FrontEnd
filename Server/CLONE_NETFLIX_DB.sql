create schema if not exists netflix_clone;
use netflix_clone;

drop user if exists 'netflix_clone_teste';

create user 'netflix_clone_teste'@'%' identified with mysql_native_password by '2106';
grant all privileges on netflix_clone. * to 'netflix_clone_teste'@'%';
flush privileges;

create table if not exists netflix_clone.login(
	idLogin integer primary key auto_increment not null,
    nome varchar(255) not null,
    cpf char(11) unique not null,
    email varchar(255) unique not null,
    senha varchar(30) not null
);

insert into netflix_clone.login(nome, cpf, email, senha)
values ("Lucas", "11166677799", "lucas@gmail.com", "lucas");

select * from netflix_clone.login;