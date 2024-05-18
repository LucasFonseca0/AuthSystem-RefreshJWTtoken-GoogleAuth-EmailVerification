# AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification

## Description

AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification is a fullstack project that provides a robust authentication system. The backend is built with NestJS and the frontend with Next.js. The system includes JWT authentication with refresh tokens, authentication via Google, and email verification.

![image](https://github.com/LucasFonseca0/AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification/assets/151788899/cc964e4e-42ad-4e15-b7af-ab844a676372)
![image](https://github.com/LucasFonseca0/AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification/assets/151788899/cd4b6d0b-0cc3-47a1-a13f-3e30931945c8)

## Features

### Backend (NestJS)
- User registration
- Account activation via email
- User login
- User logout
- Password recovery
- Password reset via email
- Retrieval of logged-in user information
- Listing of all users

### Frontend (Next.js)
- Registration, login, and password recovery interfaces
- Integration with the backend for authentication and authorization
- Authentication via Google
- Email verification

## Project Structure

### Backend

#### Main Directories
- `src`: Contains all the backend source code
  - `dto`: Data Transfer Objects
  - `entities`: Definition of database entities
  - `guards`: Guards for route protection
  - `types`: Types and interfaces used in resolvers
  - `users`: Contains the services and resolvers related to users

#### Main Dependencies
- `@nestjs/common`, `@nestjs/core`: NestJS Framework
- `@nestjs/graphql`: GraphQL integration with NestJS
- `@nestjs/jwt`: JWT support
- `@nestjs-modules/mailer`: Email sending
- `bcrypt`: Password encryption
- `prisma`: ORM for database interactions

#### Main Commands
- build: nest build
- start: nest start
- start:dev: nest start --watch
- test: jest
- lint: eslint --fix

### Frontend

#### Main Directories
- `pages`: Contains the Next.js application pages
- `components`: Reusable components
- `services`: API integration
- `contexts`: Authentication contexts and global state

#### Main Dependencies
- `next`: React Framework for server-side rendering
- `react`, `react-dom`: React Library
- `axios`: HTTP requests
- `jsonwebtoken`: JWT manipulation

## Installation

### Prerequisites
- Node.js (LTS version recommended)
- Yarn or npm

### Backend

1. Clone the repository:
   git clone https://github.com/LucasFonseca0/AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification.git
   cd AuthSystem-RefreshJWTtoken-GoogleAuth-EmailVerification/servers

2. Install the dependencies:
   ```npm install```
    or
   ```yarn install```

3. Configure the environment variables in the `.env` file.

4. Run the database migrations:
   ```npx prisma migrate dev```

5. Start the development server:
   ```npm run start:dev```
    or
   ```yarn start:dev```

### Frontend

1. Navigate to the frontend directory:
   ```cd ../clients/user-ui```

2. Install the dependencies:
   ```npm install```
    or
   ```yarn install```

3. Configure the environment variables in the `.env.local` file.

4. Start the development server:
   ```npm run dev```
    or
   ```yarn dev```

## Usage

1. Access the frontend in your browser:
   http://localhost:3000

2. Use the registration, login, password recovery features, etc.

## Contribution

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request
