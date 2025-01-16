# Financer 🌙

## Como instalar

## Crie uma pasta e clone o back-end e front-end

```sh
mkdir financer && cd financer
```

## Crie um docker-compose em `/financer` e coloque o seguinte conteúdo nela

```yml
services:
    finance-angular:
        extends:
            file: ./finance-angular/docker-compose.yml
            service: finance-angular
    finance-nestjs:
        extends:
            file: ./finance-nestjs/docker-compose.yml
            service: finance-nestjs
        depends_on:
            - postgres
    finance-postgres:
        image: postgres:alpine
        environment:
            POSTGRES_USER: user
            POSTGRES_PASSWORD: password
            POSTGRES_DB: mydatabase
        ports:
            - "5432:5432"
```

## Na raiz do OS, crie uma pasta para armazenar a senha do banco Postgres

```sh
mkdir db
echo -n 'minhasenha' > db/password.txt
```
