# GUIA DE USO DA API - BACKEND

Realize a instalação dos pacotes no diretório do \backend: npm install 


## CONFIGURAÇÃO INICIAL E EXECUÇÃO

- Configure o datasource.json com os dados do banco a ser utilizado.

 ```
    "mongodb": {
         "host": "localhost",
         "port": 27017,
         "database": "challenge_venda_valida",
         "password": "",
         "name": "mongodb",
         "connector": "mongodb",
         "user": ""
  }
```

- `'npm start' para inicir o serviço: http://localhost:3001/api/v1`
    - ` Metodo post : clients/register`

## EXEMPLO DE JSON PARA REQUISIÇÃO DA API

 ```
    clients {
        email (string,100,required),
        name (string,30,required),
        surname (string,30,required),
        cpf (string,required),
        phone (string,required),
        person_type (string, required),
        allow_promotions (string, required),
    }
```

-  CASO NECESSÁRIO A API PODE SER TESTADA PELA INTERFACE DO SWAGGER CONNECTOR DO LOOPBACK: http://HOST:PORTA/api/v1

## Estrutura de pastas

    - common
        - models
        - utils 
    - server

## Dependências

Por favor, veja todas as dependências do arquivo `package.json`.