# Boas-vindas ao repositório do projeto API de Blogs!
  <summary><strong>👨‍💻 Neste projeto foi desenvolvido</strong></summary>

  Neste projeto uma API e um banco de dados foi desenvolvido para a produção de conteúdo para um blog! 

  O pacote `sequelize` foi utilizado para fazer um `CRUD` de posts.


  1. Para fazer um post é necessário usuário e login, portanto será trabalhada a **relação entre** `user` e `post`; 

  2. Será necessária a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

<br />

# Orientações

<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>
  
  ## 👉 Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - ✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

  ![sequelize test](./public/remote-container.png)

  <br />
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - **✨ Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

  <br/>
</details>


<details>
  <summary><strong>‼️ Antes de começar a desenvolver</strong></summary>

1. Clone o repositório
  * `git clone git@github.com:ThiagoW21/project-blogs-api.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd project-blogs-api`

2. Instale as dependências [**Caso existam**]
  * `npm install`



<br />
</details>



<details>
  <summary><strong>⚠️ Informações importantes sobre o projeto</strong></summary>
  ### 👀 Observações importantes:

  Em cada requisito você encontrará uma imagem demonstrando como sua API deverá se comportar, dada a requisição específica.

  O não cumprimento de um requisito, total ou parcialmente, impactará em sua avaliação.

  O projeto possui uma pasta `src`, e é **fortemente recomendável que você construa sua aplicação dentro dessa pasta**.

  **Não é necessário usar o comando `npx sequelize-cli init`** uma vez que já é fornecido no projeto.

  #### Arquivos importantes

  ⚠️ Essa pasta ainda conta com alguns arquivos auxiliares que serão consumidos pelo avaliador e **não devem ser apagados em nenhuma hipótese**:

  > `src/api.js`
  ```javascript
  const express = require('express');

  // ...

  const app = express();

  app.use(express.json());

  // ...

  // É importante exportar a constante `app`, 
  // para que possa ser utilizada pelo arquivo `src/server.js`
  module.exports = app;
  ```
  Que ficará responsável por receber **as definições de middlewares e rotas** de sua API

  <br />

  ---

  > 👉 `src/server.js`
  ```javascript
  const app = require('./api');

  // não remova a variável `API_PORT` ou o `listen`
  const port = process.env.API_PORT || 3000;

  // não remova esse endpoint
  app.get('/', (request, response) => {
    response.send();
  });

  app.listen(port, () => console.log('ouvindo porta', port));
  ```
  Que ficará responsável por iniciar sua API

  <br />

  ---

  > 👉 `src/database/config/config.js`
  ```javascript
  require('dotenv').config();

  const environment = process.env.NODE_ENV || 'test';

  const suffix = {
    dev: '-dev',
    development: '-dev',
    test: '-test',
  };

  const options = {
    host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    database: 
      `${process.env.MYSQL_DB_NAME || 'blogs-api'}${suffix[environment] || suffix.test}`,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '1234',
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: process.env.DEBUG !== 'false',
  };

  module.exports = {
    development: {
      ...options,
    },
    test: {
      ...options,
    },
  };
  ```
  Que é o arquivo de configuração principal do *Sequelize*

  <br />

  ---

  > 👉 `.sequelizerc`
  ```javascript
  const path = require('path');

  module.exports = {
    'config': path.resolve('src', 'database', 'config', 'config.js'),
    'models-path': path.resolve('src', 'database', 'models'),
    'seeders-path': path.resolve('src', 'database', 'seeders'),
    'migrations-path': path.resolve('src', 'database', 'migrations'),
  };
  ```
  Responsável por identificar os caminhos dos recursos do Sequelize

  <br />

  ---

  **Você irá precisar configurar as variáveis de ambiente para uso do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

  O arquivo a seguir, contém um modelo das variáveis de ambiente utilizadas no projeto. Para o contexto de teste local, é importante configurar as variáveis: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`:

  > 👉 `.env.example`
  ```env
  #### SERVER VARS
  NODE_ENV=development
  API_PORT=3000

  #### DATABASE VARS
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_DB_NAME=blogs-api
  MYSQL_USER=root
  MYSQL_PASSWORD=password

  #### SECRECT VARS
  JWT_SECRET=suaSenhaSecreta
  ```

  #### Variável `JWT_SECRET`:
  
  Esta variável de ambiente deverá ser utilizada tanto para criar o token quanto para verificá-lo. Os teste locais e o avaliador vão utilizar a variável de ambiente `JWT_SECRET` para testar os requisitos

  **:warning:️ Variáveis de ambiente além das especificadas acima não são suportadas, pois não são esperadas pelo avaliador do projeto.**

<br />

  <summary  id="diagrama"><strong>🎲 Diagrama ER e Entidades</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  Para orientar a construção das tabelas através do ORM, utilize o *DER* a seguir:

  ![DER](./public/der.png)

  ---

  #### Formato das entidades

  O seu projeto deverá usar o `ORM Sequelize` para criar e atualizar o seu banco de dados. 

  Os primeiros requisitos do projeto devem orientar a produção de suas migrations para gerar:

  - Uma tabela chamada **Users**, contendo dados com a seguinte estrutura:

    ```json
    {
      "id": 1,
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com", // tem quer ser único
      "password": "123456",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
    ```
  - Uma tabela chamada **Categories**, contendo dados com a seguinte estrutura:

    ```json
    {
      "id": 18,
      "name": "News"
    }
    ```

  - Uma tabela chamada **BlogPosts**, contendo dados com a seguinte estrutura:

    ```json
    {
      "id": 21,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 14, // Chave estrangeira, referenciando o id de `Users`
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.947Z",
    }
    ```

  - Uma tabela chamada **PostCategories**, contendo uma **chave primária composta** utilizando os dois atributos da estrutura:

    ```json
    {
      "postId": 50, // Chave primária e estrangeira, referenciando o id de `BlogPosts`
      "categoryId": 20 // Chave primária e estrangeira, referenciando o id de `Categories`
    }
    ```
    *Os dados acima são fictícios, e estão aqui apenas como exemplo*

    > :warning:️ Em caso de dúvidas, consulte os conteúdos:
    > - [Transformando ideias em um modelo de banco de dados](https://app.betrybe.com/course/back-end/funcoes-sql-joins-e-normalizacao/transformando-ideias-em-um-modelo-de-banco-de-dados/a7326a61-117a-4d2f-a640-9e312b6f973b) *(Em `Database Design - Como modelar um banco de dados` > `4) Criando e modelando tabelas de acordo com um diagrama ER`)*
    > - [ORM - Interface da aplicação com o banco de dados](https://app.betrybe.com/course/back-end/nodejs-orm-autenticacao/orm-interface-da-aplicacao-com-o-banco-de-dados/d0fc385e-b0ce-4b3d-8246-779d5dc13682) *(Em `Migrações`)*
    > - [ORM - Associations](https://app.betrybe.com/course/back-end/nodejs-orm-autenticacao/orm-associations/043e2e8a-c28e-4b95-a949-b7c43221ca8d) *(Em `Relacionamentos N:N`)*  

    ---

    #### Dicas de scripts prontos

    - Deleta o banco de dados:
    ```json
    "drop": "npx sequelize-cli db:drop"
    ```

    - Cria o banco e gera as tabelas:
    ```json
    "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
    ```

    - Insere dados/Popula a tabela:
    ```json
    "seed": "npx sequelize-cli db:seed:all"
    ```

    **:eyes: OBS**: Os testes irão rodar através do seu migrate usando os scripts acima, também listados no `package.json`.

    **⚠️ Preste bastante atenção, pois a alteração desses scripts pode impedir o avaliador de funcionar corretamente**

    **:warning:️ Haverá um arquivo na pasta `/seeders`, que irá conter as queries para inserção no banco de dados. `Não a remova, pois o avaliador depende dela`.**

<br />
