# Aplicação de Gestão Financeira

Esta é uma aplicação de **Gestão Financeira** construída com [Vite](https://vitejs.dev), [Material-UI](https://mui.com/), e [React Router](https://reactrouter.com/). A aplicação oferece uma interface limpa e responsiva para gerenciar dados financeiros, incluindo dashboards, transações, investimentos e serviços.

## Funcionalidades

- **Vite**: Ferramenta de build rápida com hot module replacement e performance otimizada.
- **Material-UI**: Componentes de UI modernos e acessíveis.
- **React Router**: Roteamento client-side para navegação fluida.
- **ESLint**: Linting de código com regras customizadas para código limpo e manutenível.
- **TypeScript**: Base de código fortemente tipada para melhor experiência do desenvolvedor.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados no seu sistema:

- [Node.js](https://nodejs.org/) (v23 ou superior recomendado)
- [npm](https://www.npmjs.com/) (vem com Node.js)

## Começando

Primeiro, clone o repositório e instale as dependências:

```bash
git clone https://github.com/tech-challenges-group-8/tech-challenge-04.git
git submodule update --init --recursive
npm install
```

## Executando o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```
Abra http://localhost:3000 no seu navegador para visualizar a aplicação.

## Build para Produção
Para fazer o build da aplicação para produção, execute:

```bash
npm run build
```
O build de produção otimizado será gerado no diretório dist. Você pode então visualizar o build de produção com:

```bash
npm run preview
```
## Linting do Código
Para verificar problemas de linting, execute:

```bash
npm run lint
```
Para corrigir automaticamente problemas de linting, execute:

```bash
npm run lint:fix
```
## Estrutura do Projeto

Aqui está uma visão geral da estrutura do projeto:

```
tech-challenge-04/
├── src/
│   ├── components/         # Componentes UI reutilizáveis
│   │   ├── features/       # Componentes específicos de funcionalidades (saldo, navegação, transações)
│   │   ├── landing/        # Componentes da landing page
│   │   └── ui/             # Componentes UI compartilhados (Button, Card, Input, Typography, etc.)
│   ├── pages/              # Componentes de página
│   │   ├── dashboard/      # Página de dashboard
│   │   ├── investments/    # Página de investimentos
│   │   ├── landingpage/    # Landing page
│   │   ├── services/       # Página de serviços
│   │   └── transactions/   # Página de transações
│   ├── lib/                # Cliente API e funções de serviço
│   │   ├── apiClient.ts    # Configuração do cliente HTTP
│   │   ├── authApi.ts      # Chamadas da API de autenticação
│   │   ├── transactionApi.ts # Chamadas da API de transações
│   │   ├── userApi.ts      # Chamadas da API de usuário
│   │   └── types.ts        # Definições de tipos TypeScript
│   ├── commons/            # Utilitários comuns e configurações (ex: i18n)
│   │   ├── i18n.ts         # Configuração i18n
│   │   ├── useInitI18n.ts  # Hook de inicialização i18n
│   │   └── locales/        # Arquivos de tradução (en, pt)
│   ├── contexts/           # React Contexts para gerenciamento de estado global
│   │   └── UserContext.tsx # Context de autenticação de usuário
│   ├── hooks/              # Hooks customizados do React
│   │   ├── useAuth.ts      # Hook de autenticação
│   │   ├── useTransactions.ts # Hook de dados de transações
│   │   ├── useTransactionFilter.ts # Filtro de transações
│   │   ├── useTransactionPagination.ts # Paginação de transações
│   │   └── useStatementFilters.ts # Filtros de extrato
│   ├── layouts/            # Componentes de layout
│   │   └── ProtectedLayout.tsx # Layout de rota protegida
│   ├── styles/             # Tema e estilos globais
│   │   ├── theme.ts        # Configuração do tema Material-UI
│   │   ├── tokens.ts       # Tokens de design
│   │   └── commonStyles.ts # Utilitários de estilo comuns
│   ├── stories/            # Stories do Storybook para componentes UI
│   │   └── decorators/     # Decorators do Storybook
│   ├── assets/             # Assets estáticos (imagens, ícones)
│   ├── App.tsx             # Componente principal com roteamento
│   ├── main.tsx            # Ponto de entrada do Vite
│   ├── App.css             # Estilos específicos do App
│   └── index.css           # Estilos CSS globais
├── submodules/
│   └── backend/            # Submódulo da API backend
│       ├── src/            # Código fonte do backend
│       ├── api/            # Rotas da API
│       ├── Dockerfile      # Configuração Docker do backend
│       └── package.json    # Dependências do backend
├── public/                 # Assets estáticos
├── .storybook/             # Configuração do Storybook
├── docker-compose.yml      # Configuração do Docker Compose
├── Dockerfile              # Configuração Docker do frontend
├── eslint.config.js        # Configuração do ESLint
├── vite.config.ts          # Configuração do Vite
├── index.html              # Ponto de entrada HTML
├── package.json            # Dependências e scripts do projeto
├── tsconfig.json           # Configuração do TypeScript
├── tsconfig.app.json       # Configuração TypeScript do App
├── tsconfig.node.json      # Configuração TypeScript do Node
└── README.md               # Documentação do projeto
```

## Melhorias Recentes

Principais otimizações implementadas:

- **Arquitetura de Componentes**: Componentes UI reutilizáveis unificados com organização baseada em funcionalidades
- **Performance**: Lazy loading para rotas, memoização de componentes, re-renders otimizados
- **Qualidade de Código**: Nomenclatura padronizada, estrutura melhorada, imports consistentes
- **Experiência do Desenvolvedor**: Hooks customizados, tipos TypeScript centralizados, integração com Storybook

## Comandos do Storybook

O Storybook é usado para desenvolver e exibir componentes UI de forma isolada.

Para executar o Storybook em modo de desenvolvimento:

```bash
npm run storybook
```

Isso abrirá o Storybook no seu navegador em `http://localhost:6006`.

Para fazer o build estático de produção do Storybook:

```bash
npm run build-storybook
```

O build estático será gerado no diretório `storybook-static`.

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

## Autores

- <img src="https://avatars.githubusercontent.com/u/132622525?v=4" width="24" height="24" alt="Fernando Gustavo Cortez" style="border-radius: 50%; vertical-align: middle;"> **Fernando Gustavo Cortez** - [https://github.com/FernandoGustavoCortez](https://github.com/FernandoGustavoCortez)

- <img src="https://avatars.githubusercontent.com/u/37480857?v=4" width="24" height="24" alt="Lucas Wenceslau" style="border-radius: 50%; vertical-align: middle;"> **Lucas Wenceslau** - [https://github.com/lucaswenceslau](https://github.com/lucaswenceslau)

- <img src="https://avatars.githubusercontent.com/u/71905861?v=4" width="24" height="24" alt="Osmar" style="border-radius: 50%; vertical-align: middle;"> **Osmar** - [https://github.com/MazFilho](https://github.com/MazFilho)

- <img src="https://avatars.githubusercontent.com/u/13469487?v=4" width="24" height="24" alt="Vittoria Zago" style="border-radius: 50%; vertical-align: middle;"> **Vittoria Zago** - [https://github.com/vittoriazago](https://github.com/vittoriazago)
