# Backend - Netflix Clone

Este é o diretório de backend do projeto de clone da Netflix. Ele foi desenvolvido utilizando **Node.js** com **TypeScript** e **Fastify** como framework web para garantir alta performance. O projeto também utiliza o **Prisma ORM** junto com o **SQLite** para gerenciamento do banco de dados.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/) (Executado via `tsx`)
- [Fastify](https://fastify.dev/) (Framework web rápido e eficiente)
- [Prisma ORM](https://www.prisma.io/) (Com suporte para SQLite via `better-sqlite3`)
- [SQLite](https://sqlite.org/) (Banco de dados relacional local)
- [Axios](https://axios-http.com/) (Para requisições externas à API do TMDB)
- [Dotenv](https://github.com/motdotla/dotenv) (Gerenciamento de variáveis de ambiente)

## 📁 Estrutura do Projeto

Abaixo está um resumo da estrutura do repositório backend:

- `src/index.ts`: Ponto de entrada da aplicação. Contém a configuração do servidor Fastify e a definição das rotas principais.
- `src/db/`: Contém os arquivos de conexão com o banco de dados via Prisma.
- `prisma/schema.prisma`: Arquivo de definição do modelo de dados para o Prisma e configuração de conexão com o banco de dados (SQLite).
- `.env`: Arquivo (não versionado por padrão) para variáveis de ambiente, como a `DATABASE_URL`.
- `package.json`: Lista de dependências e scripts de execução do projeto.

## 🗄️ Modelo de Dados (Prisma)

O projeto possui, até o momento, a seguinte entidade no banco de dados SQLite:

### `Profile` (Perfil)
Representa um perfil de usuário criado no clone.
- `id`: Inteiro, Autoincremento (Chave Primária)
- `name`: String, Nome do perfil.

## 🌐 Rotas e Endpoints

O servidor sobe por padrão na porta `3000` (http://localhost:3000). As seguintes rotas estão disponíveis:

### 1. Obter Séries Populares (TMDB)
- **Método**: `GET`
- **Rota**: `/`
- **Descrição**: Esta rota faz uma requisição externa utilizando o **Axios** para a API pública do **The Movie Database (TMDB)** buscando as séries de TV populares do momento.
- **Retorno**: JSON contendo os dados brutos recebidos da API do TMDB.

### 2. Criar um novo Perfil
- **Método**: `POST`
- **Rota**: `/profiles`
- **Corpo da Requisição (Body)**:
  ```json
  {
    "name": "Nome do Perfil"
  }
  ```
- **Descrição**: Cria um novo registro de perfil no banco de dados SQLite através do Prisma.
- **Retorno**: Status `201 Created` e uma mensagem de sucesso confirmando a criação junto com o ID gerado.

### 3. Listar todos os Perfis
- **Método**: `GET`
- **Rota**: `/profiles`
- **Descrição**: Consulta o banco de dados e retorna uma lista com todos os perfis criados no sistema.
- **Retorno**: Status `200 OK` e os dados dos perfis armazenados.

## 🛠️ Como executar localmente

1. **Instale as dependências**:
   ```bash
   npm install
   cd back-end && npm install
   ```

2. **Configure o banco de dados**:
   Gere o cliente do Prisma e execute as migrações (se houver) para preparar seu SQLite.
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Inicie o servidor de desenvolvimento**:
   O projeto utiliza o `tsx` para rodar os arquivos TypeScript com "watch" (hot-reload).
   ```bash
   npm run dev
   ```
   O servidor indicará no console que está rodando, geralmente acessível via `http://0.0.0.0:3000`.
