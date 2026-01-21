# 🚀 Appointment App – Plataforma Multi-Tenant (Next.js)

> 🇧🇷 **Português (Brasil)** | 🇺🇸 **English below**

---

## 🇧🇷 Português (Brasil)

### 📌 Visão Geral

Este repositório contém o **Appointment App**, uma plataforma de **acompanhamento e gestão de interações via WhatsApp**, construída com foco em **escalabilidade, segurança e arquitetura Multi-Tenant** (múltiplos clientes, como barbearias, cada um com seus dados totalmente isolados).

O projeto utiliza a arquitetura moderna do **Next.js App Router**, com **TypeScript** e uma stack robusta e eficiente.

---

### 🎯 Objetivo do Projeto

Fornecer a cada cliente (Organização) um **painel de controle isolado**, identificado por um **realID (`organizationId`)**, permitindo:

* Monitoramento de métricas
* Visualização de gráficos e estatísticas
* Integração e acompanhamento de dados do WhatsApp

Enquanto isso, o **administrador da plataforma** gerencia integrações e chaves de API de forma centralizada e segura.

---

### 🛠️ Stack de Tecnologia

| Componente                  | Tecnologia              | Função                                    |
| --------------------------- | ----------------------- | ----------------------------------------- |
| Frontend / Framework        | Next.js 14 (App Router) | Server Components e renderização rápida   |
| Linguagem                   | TypeScript              | Segurança de tipos                        |
| Estilização                 | Tailwind CSS            | UI responsiva                             |
| Gráficos                    | Recharts                | Gráficos de pizza e barras                |
| Autenticação / Multi-Tenant | Clerk                   | OAuth/JWT e gerenciamento de organizações |
| Banco de Dados              | Vercel Postgres         | Dados isolados por organização            |
| ORM                         | Prisma                  | Acesso tipado ao banco                    |
| Automação / Backend         | N8N                     | Orquestração de workflows (Chatwoot)      |
| Webhooks                    | Svix                    | Validação de segurança dos webhooks       |

---

### 🧩 Arquitetura Multi-Tenant (Fluxo do `realID`)

1. O cliente cria uma **Organização** no Clerk
2. O Clerk dispara o evento `organization.created`
3. A rota `/api/clerk-webhook` persiste o `organizationId` no banco
4. O Dashboard consome dados filtrados por organização via N8N

> 🔐 Garantia total de isolamento entre organizações.

---

### ⚙️ Configuração do Ambiente Local

#### Variáveis de Ambiente

```env
# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=

# DATABASE
DATABASE_URL=""
```

#### Serviços Necessários

| Terminal     | Comando                         |
| ------------ | ------------------------------- |
| 1            | npx next dev                    |
| 2            | n8n                             |
| 3            | npx localtunnel --port 3000     |
| 4 (Opcional) | npx dotenv -- npx prisma studio |

#### Sincronização do Banco

```bash
npx prisma db push
```

---

### ✨ Funcionalidades

* Autenticação OAuth/JWT
* Multi-Tenancy por organização
* Dashboard com métricas e gráficos
* Integração com N8N
* Prisma + Postgres configurados

---

## 🇺🇸 English

### 📌 Overview

This repository contains **Appointment App**, a **WhatsApp interaction monitoring and management platform**, built with a strong focus on **scalability, security, and Multi-Tenant architecture**.

The application is built on the modern **Next.js App Router** architecture, using **TypeScript** and a robust technology stack.

---

### 🎯 Project Goal

Provide each client (Organization) with an **isolated dashboard**, identified by a **realID (`organizationId`)**, enabling:

* Metrics monitoring
* Charts and analytics
* WhatsApp data integration

Meanwhile, the **platform administrator** centrally manages sensitive API configurations.

---

### 🛠️ Technology Stack

| Component                      | Technology              | Purpose                            |
| ------------------------------ | ----------------------- | ---------------------------------- |
| Frontend / Framework           | Next.js 14 (App Router) | Server Components & fast rendering |
| Language                       | TypeScript              | Type safety                        |
| Styling                        | Tailwind CSS            | Responsive UI                      |
| Charts                         | Recharts                | Pie & bar charts                   |
| Authentication / Multi-Tenancy | Clerk                   | OAuth/JWT & organizations          |
| Database                       | Vercel Postgres         | Tenant-isolated storage            |
| ORM                            | Prisma                  | Type-safe DB access                |
| Automation / Backend           | N8N                     | Workflow orchestration             |
| Webhooks                       | Svix                    | Secure webhook validation          |

---

### 🧩 Multi-Tenant Architecture (`realID` Flow)

1. Client creates an **Organization** in Clerk
2. Clerk triggers `organization.created` webhook
3. `/api/clerk-webhook` stores the `organizationId`
4. Dashboard fetches organization-filtered data via N8N

> 🔐 Guarantees strict data isolation between tenants.

---

### ⚙️ Local Development Setup

#### Environment Variables

```env
# CLERK AUTH
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=

# DATABASE
DATABASE_URL=""
```

#### Required Services

| Terminal     | Command                         |
| ------------ | ------------------------------- |
| 1            | npx next dev                    |
| 2            | n8n                             |
| 3            | npx localtunnel --port 3000     |
| 4 (Optional) | npx dotenv -- npx prisma studio |

#### Database Sync

```bash
npx prisma db push
```

---

### ✨ Features

* OAuth/JWT Authentication
* Organization-based Multi-Tenancy
* Dashboard with charts and metrics
* N8N integrations
* Prisma + Postgres setup
