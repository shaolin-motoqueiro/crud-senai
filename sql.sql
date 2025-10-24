drop table usuarios

CREATE TABLE if not exists usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  idade INT
);

select * from usuarios;