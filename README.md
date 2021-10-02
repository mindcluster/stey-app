# Stey App

Aplicativo de auxilio aos recursos humanos da empresa EY

## Tecnologias 

- NodeJS
- TypeScript
- Docker
- MySQL

## Get Started

Para rodar o projeto basta rodar estes comandos:

``` shell
# Acessa a pasta do projeto
cd app

# Executa em modo desenvolvedor
npm run dev
```

Para rodar com docker:
``` shell
sh ./start.sh
```

## Estrutura de Pastas
``` shell
└ app                           → Aplicação
    └ __tests__                 → Arquivos de testes(unidade e integração)
    └ src                       → Estrutura dos arquivos da aplicação
        └ app                   → Regras de negócio
        └ infrastructure        → Tudo relacionado a infraestrutura do servidor
        └ interface             → Arquivos que fazem comunicação com usuário ou outras aplicações (Controllers, Rotas)
└ docker                        → Arquivos e pastas relacionadas ao Docker
    └ sql                       → Pastas com arquivos dump.sql utilizados para popular o banco de dados criado pelo docker
└ docs                          → Documentação no Postman
 ```

 ## Documentação

 Você pode encontrar as Collections na pasta [docs](./docs), lá também se encontra o Enviroment para se trabalhar com a autenticação