# Gym Management SaaS

Multi-tenant gym management platform handling member tracking, payment processing, and trainer scheduling across multiple gym locations. The backend is NestJS with TypeORM and PostgreSQL, the frontend is Next.js, and the whole thing is organized in a Turborepo monorepo.

Each gym gets its own isolated tenant with separate member databases, subscription billing, and staff accounts. Currently deployed at [xedgymmanagement.vercel.app](https://xedgymmanagement.vercel.app).

## Stack

NestJS, Next.js, TypeORM, PostgreSQL, Turborepo

## Running locally

```bash
npm install
cp .env.example .env
# Set your PostgreSQL connection string in .env
npx turbo dev
```

This starts both the API server and the Next.js frontend. The app expects a running PostgreSQL instance.
