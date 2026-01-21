# 🚀 Appointment App – Plataforma Multi-Tenant (Next.js)

Este repositório contém o **Appointment App**, uma plataforma de **acompanhamento e gestão de interações via WhatsApp**, construída com foco em **escalabilidade, segurança e arquitetura Multi-Tenant** (múltiplos clientes, como barbearias, cada um com seus dados isolados).

O projeto utiliza a arquitetura moderna do **Next.js App Router**, com **TypeScript** e uma stack robusta, eficiente e de baixo custo inicial.

---

## 🎯 Visão Geral

O objetivo principal é fornecer a cada cliente (Organização) um **painel de controle isolado**, identificado por um **realID** (`organizationId`), onde ele pode:

* Monitorar métricas
* Visualizar gráficos e estatísticas
* Interagir com dados vindos do WhatsApp

Enquanto isso, o **administrador da plataforma** gerencia integrações e configurações sensíveis (APIs) de forma centralizada.

---

## 🛠️ Stack de Tecnologia

| Componente                  | Tecnologia              | Função                                             |
| --------------------------- | ----------------------- | -------------------------------------------------- |
| Frontend / Framework        | Next.js 14 (App Router) | Server Components e renderização rápida            |
| Linguagem                   | TypeScript              | Segurança de tipos                                 |
| Estilização                 | Tailwind CSS            | UI responsiva e utilitária                         |
| Gráficos                    | Recharts                | Gráficos de pizza e barras                         |
| Autenticação / Multi-Tenant | Clerk                   | Login (OAuth/JWT) e gerenciamento de organizações  |
| Banco de Dados              | Vercel Postgres         | Armazenamento por organização                      |
| ORM                         | Prisma                  | Interface tipada com o banco                       |
| Automação / Backend         | N8N                     | Orquestração de workflows e integrações (Chatwoot) |
| Webhooks                    | Svix                    | Validação de segurança dos webhooks do Clerk       |

---

## 🧩 Arquitetura Multi-Tenant (Fluxo do `realID`)

A arquitetura garante **isolamento total de dados** entre organizações.

### Fluxo:

1. **Criação da Organização**
   O cliente se cadastra e cria uma organização no Clerk (ex: *Barbearia do João*).

2. **Webhook do Clerk**
   O Clerk dispara um evento `organization.created` para a API da aplicação.

3. **Persistência no Banco**
   A rota `/api/clerk-webhook` recebe o `organizationId` (realID) e cria um registro na tabela `OrganizationConfig` via Prisma.

4. **Consumo no Dashboard**
   Ao acessar `/dashboard`, o sistema:

   * Obtém o `organizationId` da sessão do Clerk
   * Busca as configurações da organização no Postgres
   * Consulta o N8N passando o `organizationId` como filtro

> 🔐 Isso garante que a **Barbearia A nunca tenha acesso aos dados da Barbearia B**.

---

## ⚙️ Configuração do Ambiente Local

Para rodar o projeto localmente, é necessário configurar variáveis de ambiente e executar múltiplos serviços.

### 1️⃣ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# --- CLERK ---
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard

# --- DATABASE (PRISMA / POSTGRES) ---
DATABASE_URL="postgres://USUARIO:SENHA@HOST:5432/postgres?sslmode=require"
```

---

### 2️⃣ Serviços Necessários

Você precisará de **3 processos ativos** (4 opcional):

| Terminal     | Comando                           | Descrição                               |
| ------------ | --------------------------------- | --------------------------------------- |
| 1            | `npx next dev`                    | Inicia o servidor Next.js               |
| 2            | `n8n`                             | Inicia o servidor de automação          |
| 3            | `npx localtunnel --port 3000`     | Cria URL pública para webhooks do Clerk |
| 4 (Opcional) | `npx dotenv -- npx prisma studio` | Interface visual do banco               |

---

### 3️⃣ Sincronização do Banco

Sempre que o arquivo `prisma/schema.prisma` for alterado:

```bash
npx prisma db push
```

---

## ✨ Funcionalidades Implementadas

* 🔐 Autenticação JWT / OAuth com Clerk
* 🏢 Multi-Tenancy baseado em `organizationId`
* 🛡️ Proteção de rotas com `middleware.ts`
* 📊 Dashboard com métricas e gráficos
* 🔄 Integração com N8N para dados externos
* 🗄️ Prisma + Postgres configurados
* 🧑‍💼 Fluxo inicial de Admin (`/dashboard/admin`) para configuração de APIs

---

## 🚧 Próximos Passos

* Finalizar a tela `/dashboard/whatsapp` com dados reais
* Implementar **convite de agentes / funcionários** da organização
* Ajustar workflows do N8N para filtrar dados por `organizationId`

---

## 📌 Observações

Este projeto foi estruturado para **crescer de forma organizada**, permitindo novos clientes, novas integrações e novos módulos sem comprometer segurança ou performance.

---

Se quiser, posso:

* Ajustar o README para **open source**
* Criar um **README em inglês**
* Escrever um **CONTRIBUTING.md**
* Padronizar badges, scripts e estrutura do repositório
