<div align="center">

# HortSoy Marketplace 🌱

**Portal Corporativo de Liquidação e Repasse de Ativos**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-Private-red)]()

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Modelagem de Dados (Supabase)](#-modelagem-de-dados-supabase)
- [Design e UI/UX](#-design-e-uiux)
- [Performance e Paginação](#-performance-e-paginação)
- [Instalação](#-instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O **Bazar HortSoy** é um portal de vendas restrito e exclusivo para colaboradores. Desenvolvido para gerenciar a liquidação de ativos de unidades desativadas, a plataforma disponibiliza móveis, equipamentos e eletrônicos corporativos em excelentes condições com preços subsidiados para a equipe. 

O projeto foi construído sob metodologias de *Clean Code* e focado na máxima performance, escalabilidade e usabilidade.

### Destaques

- 🔒 **Acesso Restrito** — Arquitetura preparada para ecossistema corporativo interno.
- ⚡ **Alta Performance** — App Router e Server Actions com Next.js 15.
- 🎨 **Design Adaptável** — Suporte nativo e fluido a *Light/Dark Mode* via propriedades globais (Tailwind v4).
- 🗄️ **BaaS Integrado** — Conexão *Realtime* preparada com Supabase e PostgreSQL.
- ✨ **Feedback Visual** — Micro-interações com Framer Motion e sistema de notificações via Sonner.
- 📱 **Mobile-First** — Catálogo altamente responsivo para navegação em qualquer dispositivo.

---

## 🛠 Tecnologias

### Core
| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 15.x | Framework React com App Router e Server Actions |
| [React](https://react.dev/) | 19.x | Biblioteca de componentes e renderização |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática rigorosa e segurança global |

### Styling e UI
| Tecnologia | Uso |
|---|---|
| [Tailwind CSS](https://tailwindcss.com/) v4 | Estilização utility-first com variáveis CSS dinâmicas |
| [Framer Motion](https://motion.dev/) | Animações imersivas, *hover states* complexos e transições de entrada |
| [Lucide React](https://lucide.dev/) | Iconografia leve e escalável |
| [Sonner](https://sonner.emilkowal.ski/) | Sistema moderno de *Toasts* para notificações estéticas |

### Backend e Integrações
| Tecnologia | Uso |
|---|---|
| [Supabase](https://supabase.com/) | Backend-as-a-Service (BaaS) integrado |
| [PostgreSQL](https://www.postgresql.org/) | Banco de dados relacional para persistência de estoque e catálogo |

---

## 🏗 Arquitetura

```text
Browser Request → Next.js App Router (Layout & Configs)
    → /app/page.tsx (View de Catálogo)
        → Client Components (Framer Motion, Sonner Toasts)
        → Data Fetching (Supabase Client)
            → PostgreSQL Database (Realtime Sync)

```

### Padrões Implementados

* **Clean Architecture:** Separação estrita entre Views (`/app`) e Drivers de Integração (`/lib`).
* **Server Components (React 19):** Minimização de carga de JavaScript no cliente.
* **Tipagem End-to-End:** O modelo do banco de dados reflete diretamente nas interfaces TypeScript consumidas pelos componentes.

---

## 📂 Estrutura de Arquivos

```text
📦 bazar-hortsoy/
├── 📂 public/             # Assets estáticos e imagens do projeto
├── 📂 src/
│   ├── 📂 app/            # Rotas principais e arquivos de layout
│   │   ├── globals.css    # Variáveis e CSS nativo Global (Light/Dark mode)
│   │   ├── layout.tsx     # RootLayout e Componentes de Navbar/Footer
│   │   └── page.tsx       # View de Catálogo principal e Landing Page
│   │
│   └── 📂 lib/            # Drivers e Clients Internos
│       └── supabase.ts    # Instância do Supabase Connection Provider
│
├── tsconfig.json          # Configuração TypeScript em strict mode
├── next.config.ts         # Configurações de build do Next.js
├── package.json           # Dependências e scripts
└── .gitignore             # Arquivos ignorados pelo Git

```

---

## 🗄️ Modelagem de Dados (Supabase)

Para provisionar o banco de dados relacional no Supabase, execute a seguinte migração (Schema) no editor SQL do painel administrativo:

```sql
create table if not exists inventory (
  id bigint primary key generated always as identity,
  name text not null,
  brand text not null,
  category text not null,
  condition text not null,
  price numeric not null,
  original_price numeric,
  image text,
  description text,
  stock int default 1
);

-- Habilitar acesso público para leitura
alter table inventory enable row level security;
create policy "Allow public read-only access" on inventory for select using (true);

```

> **Nota Técnica:** O client `src/lib/supabase.ts` já exporta a interface `Product` perfeitamente alinhada a esta modelagem, mantendo a integridade do TypeScript de ponta a ponta.

---

## 🎨 Design e UI/UX

A experiência do usuário foi projetada para ser ágil e agradável:

* **Tema Dinâmico (Dark/Light):** Variáveis CSS injetadas no `globals.css` garantem suporte nativo às preferências de sistema operacional do usuário.
* **Floating Navbar:** Design minimalista e flutuante com suporte a glassmorphism.
* **Micro-interações:** Feedbacks táteis em botões e cards, complementados pelo sistema de *Toasts* (Sonner) ao interagir com o catálogo.

---

## ⚡ Performance e Paginação

Para garantir fluidez na navegação:

* **Paginação Manual:** Botões `Mostrar mais 9` e `Mostrar tudo` para evitar carregamento excessivo de dados de uma só vez.
* **Otimização de Imagens:** Uso do componente `next/image` para compressão e lazy loading automático.

---

## 🚀 Instalação

### Pré-requisitos

* **Node.js** ≥ 18.x
* **npm** ≥ 9.x

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anon"
```

### Setup Local

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
| --- | --- | --- |
| `dev` | `npm run dev` | Inicia o ambiente de desenvolvimento |
| `build` | `npm run build` | Compila o projeto para produção |
| `start` | `npm run start` | Inicia a versão de produção produzida pelo build |
| `lint` | `npm run lint` | Executa o lint para garantir padrões de código |

---

## 📄 Licença

Projeto corporativo privado — © 2026 HortSoy. Todos os direitos reservados.
