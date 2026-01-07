# Financial Management App

This is a **Financial Management** application built with [Vite](https://vitejs.dev), [Material-UI](https://mui.com/), and [React Router](https://reactrouter.com/). The app provides a clean and responsive interface for managing financial data, including dashboards, transactions, investments, and services.

## Features

- **Vite**: Fast build tool with hot module replacement and optimized performance.
- **Material-UI**: Modern and accessible UI components.
- **React Router**: Client-side routing for seamless navigation.
- **ESLint**: Code linting with custom rules for clean and maintainable code.
- **TypeScript**: Strongly typed codebase for better developer experience.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v23 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/tech-challenges-group-8/tech-challenge-04.git
git submodule update --init --recursive
npm install
```

## Running the Development Server

To start the development server, run:

```bash
npm run dev
```
Open http://localhost:3000 in your browser to view the app.

## Building for Production
To build the app for production, run:

```bash
npm run build
```
The optimized production build will be output to the dist directory. You can then preview the production build with:

```bash
npm run preview
```
## Linting the Code
To check for linting issues, run:

```bash
npm run lint
```
To automatically fix linting issues, run:

```bash
npm run lint:fix
```
## Project Structure

Here's an overview of the project structure:

```
financial-management/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── api/                # API service functions
│   │   ├── auth.ts         # Authentication API calls
│   │   ├── transactions.ts # Transaction API calls
│   │   └── users.ts        # User API calls
│   ├── commons/            # Common utilities and configurations (e.g., i18n)
│   ├── contexts/           # React Contexts for global state management
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Theme and global styles (e.g., Material-UI theme, tokens)
│   ├── lib/                # Utility functions
│   ├── stories/            # Storybook stories for UI components
│   │   └── decorators/     # Storybook decorators
│   ├── App.tsx             # Main App component with routing
│   ├── main.tsx            # Vite entry point
│   └── globals.css         # Global CSS styles
├── public/                 # Static assets (e.g., images, fonts, SVG icons, favicon.ico)
├── dist/                   # Production build output
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── vite.config.ts          # Vite configuration
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
├── package-lock.json       # npm dependency lock file
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
├── tsconfig.json           # TypeScript configuration
```

## Storybook Commands

Storybook is used for developing and showcasing UI components in isolation.

To run Storybook in development mode:

```bash
npm run storybook
```

This will open Storybook in your browser at `http://localhost:6006`.

To build a static Storybook production bundle:

```bash
npm run build-storybook
```

The static build will be output to the `storybook-static` directory.

## Authors

- <img src="https://avatars.githubusercontent.com/u/132622525?v=4" width="24" height="24" alt="Fernando Gustavo Cortez" style="border-radius: 50%; vertical-align: middle;"> **Fernando Gustavo Cortez** - [https://github.com/FernandoGustavoCortez](https://github.com/FernandoGustavoCortez)

- <img src="https://avatars.githubusercontent.com/u/37480857?v=4" width="24" height="24" alt="Lucas Wenceslau" style="border-radius: 50%; vertical-align: middle;"> **Lucas Wenceslau** - [https://github.com/lucaswenceslau](https://github.com/lucaswenceslau)

- <img src="https://avatars.githubusercontent.com/u/71905861?v=4" width="24" height="24" alt="Osmar" style="border-radius: 50%; vertical-align: middle;"> **Osmar** - [https://github.com/MazFilho](https://github.com/MazFilho)

- <img src="https://avatars.githubusercontent.com/u/13469487?v=4" width="24" height="24" alt="Vittoria Zago" style="border-radius: 50%; vertical-align: middle;"> **Vittoria Zago** - [https://github.com/vittoriazago](https://github.com/vittoriazago)

## Docker e Docker Compose

Este projeto inclui um `Dockerfile` para criar a imagem do frontend e um arquivo `docker-compose.yml` para orquestrar todos os serviços necessários (frontend, backend e banco de dados MongoDB).

### Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Como usar

1. **Build imagem local:**

   No diretório raiz do projeto, execute:

   ```bash
   docker build . -t tech-challange-front
   ```


1. **Build e start dos containers:**

   No diretório raiz do projeto, execute:

   ```bash
   docker-compose up --build
   ```

   Isso irá:
   - Construir a imagem do frontend usando o `Dockerfile`
   - Subir os containers do frontend, backend e MongoDB
   - Expor o frontend em `http://localhost:3000` e o backend em `http://localhost:5000`

   Se necessario recriar o build do front execute:

   ```bash
      docker compose up --build frontend
   ```

2. **Parar os containers:**

   ```bash
   docker-compose down
   ```

3. **Persistência de dados:**

   O MongoDB utiliza um volume Docker chamado `mongo_data` para persistir os dados mesmo após parar os containers.

### Estrutura dos arquivos

- `Dockerfile`: Define como a imagem do frontend é construída.
- `docker-compose.yml`: Orquestra os serviços do frontend, backend e banco de dados.

> **Dica:** Se alterar configurações de rede no `docker-compose.yml`, pode ser necessário remover a rede antiga com:
> ```bash
> docker network rm tech-challenge-01_tech-challenge-network
> ```

Assim, você pode rodar toda a aplicação localmente sem instalar dependências do Node.js ou MongoDB na sua máquina.

