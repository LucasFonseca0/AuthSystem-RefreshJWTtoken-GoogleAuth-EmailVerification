# AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification

## Descrição

AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification é um projeto fullstack que fornece um sistema de autenticação robusto. O backend é construído com NestJS e o frontend com Next.js. O sistema inclui autenticação JWT com refresh tokens, autenticação via Google, e verificação de email.

![image](https://github.com/LucasFonseca0/AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification/assets/151788899/cc964e4e-42ad-4e15-b7af-ab844a676372)
![image](https://github.com/LucasFonseca0/AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification/assets/151788899/cd4b6d0b-0cc3-47a1-a13f-3e30931945c8)
## Funcionalidades

### Backend (NestJS)
- Registro de usuários
- Ativação de conta via email
- Login de usuários
- Logout de usuários
- Recuperação de senha
- Reset de senha via email
- Obtenção de informações do usuário logado
- Listagem de todos os usuários

### Frontend (Next.js)
- Interfaces de registro, login, e recuperação de senha
- Integração com o backend para autenticação e autorização
- Autenticação via Google
- Verificação de email

## Estrutura do Projeto

### Backend

#### Diretórios Principais
- `src`: Contém todo o código fonte do backend
  - `dto`: Data Transfer Objects
  - `entities`: Definição das entidades do banco de dados
  - `guards`: Guards para proteção de rotas
  - `types`: Tipos e interfaces usados nas resolvers
  - `users`: Contém os services e resolvers relacionados aos usuários

#### Dependências Principais
- `@nestjs/common`, `@nestjs/core`: Framework NestJS
- `@nestjs/graphql`: Integração do GraphQL com NestJS
- `@nestjs/jwt`: Suporte a JWT
- `@nestjs-modules/mailer`: Envio de emails
- `bcrypt`: Criptografia de senhas
- `prisma`: ORM para interações com o banco de dados

#### Comandos Principais
- build: nest build
- start: nest start
- start:dev: nest start --watch
- test: jest
- lint: eslint --fix

### Frontend

#### Diretórios Principais
- `pages`: Contém as páginas da aplicação Next.js
- `components`: Componentes reutilizáveis
- `services`: Integração com APIs
- `contexts`: Contextos de autenticação e estado global

#### Dependências Principais
- `next`: Framework React para renderização do lado do servidor
- `react`, `react-dom`: Biblioteca React
- `axios`: Requisições HTTP
- `jsonwebtoken`: Manipulação de JWT

## Instalação

### Pré-requisitos
- Node.js (versão LTS recomendada)
- Yarn ou npm

### Backend

1. Clone o repositório:
   git clone https://github.com/LucasFonseca0/AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification.git
   cd AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification/servers

2. Instale as dependências:
   ```npm install```
    ou
   ```yarn install```

3. Configure as variáveis de ambiente no arquivo `.env`.

4. Rode as migrações do banco de dados:
   npx prisma migrate dev

5. Inicie o servidor de desenvolvimento:
   ```npm run start:dev```
    ou
   ```yarn start:dev

### Frontend

1. Navegue até o diretório do frontend:
   ```cd ../clients/user-ui```

2. Instale as dependências:
   ```npm install```
    ou
   ```yarn install```

3. Configure as variáveis de ambiente no arquivo `.env.local`.

4. Inicie o servidor de desenvolvimento:
   ```npm run dev```
    ou
   ```yarn dev```

## Uso

1. Acesse o frontend no seu navegador:
   http://localhost:3000

2. Utilize as funcionalidades de registro, login, recuperação de senha, etc.

## Contribuição

1. Fork o repositório
2. Crie uma nova branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto é licenciado sob a licença UNLICENSED.

---

Este é um esqueleto básico do README. Dependendo das especificidades do seu projeto e da configuração do seu ambiente, ajustes podem ser necessários.
