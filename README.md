<div align="center">

# HortSoy Marketplace 🌱

**Portal Corporativo de Liquidação e Repasse de Ativos**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-Private-red)]()

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Modelagem de Dados](#-modelagem-de-dados)
- [Design e UI/UX](#-design-e-uiux)
- [Performance e Paginação](#-performance-e-paginação)
- [Instalação](#-instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Licença & Propriedade](#-licença--propriedade)

---

## 🎯 Sobre o Projeto

O **Bazar HortSoy** é um portal de vendas restrito e exclusivo para colaboradores. Desenvolvido por **Christyan Silva** para gerenciar a liquidação de ativos de unidades desativadas, a plataforma disponibiliza móveis, equipamentos e eletrônicos corporativos em excelentes condições com preços subsidiados para a equipe. 

O projeto foi construído sob metodologias de *Clean Code* e focado na máxima performance, escalabilidade e usabilidade.

### Destaques

- 🔒 **Acesso Restrito** — Arquitetura preparada para ecossistema corporativo interno.
- ⚡ **Alta Performance** — App Router e Server Components (Suspense & Streaming) com Next.js 16.
- 🎨 **Design Adaptável** — Suporte nativo e fluido a *Light/Dark Mode* via propriedades globais (Tailwind v4).
- 🗄️ **Prisma ORM** — Conexão direta via PostgreSQL com tipagem estática rigorosa.
- ✨ **Feedback Visual** — Micro-interações com Framer Motion e sistema de notificações via Sonner.
- 📱 **Mobile-First** — Catálogo altamente responsivo para navegação em qualquer dispositivo.
- 📄 **Documentação Completa** — Guia de arquitetura e padrões registrados diretamente neste README.

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
| [Prisma ORM](https://www.prisma.io/) | ORM de alta performance para Node/TypeScript |
| [PostgreSQL](https://www.postgresql.org/) | Banco de dados relacional para persistência de estoque e catálogo |

---

## 🏗 Arquitetura

```text
Browser Request → Next.js App Router (Layout & Configs)
    → /app/page.tsx (View de Catálogo)
        → Client Components (Framer Motion, Sonner Toasts)
        → Data Fetching (Prisma / PostgreSQL Adapter)
            → PostgreSQL Database (Direct Connection)
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
│       └── db.ts          # Instância do Prisma Connection Provider & Adapter
│       └── products.ts    # Camada de Acesso a Dados (DAL)
│
├── prisma/                # Schema e Migrações do Prisma
├── tsconfig.json          # Configuração TypeScript em strict mode
├── next.config.ts         # Configurações de build do Next.js
├── package.json           # Dependências e scripts
└── .gitignore             # Arquivos ignorados pelo Git
```

---

## 🗄️ Modelagem de Dados

O projeto utiliza **Prisma ORM** com nomes de tabelas e colunas padronizados em `XXXX_YYYY`. O script de inicialização completo está disponível em [setup_database.sql](file:///z:/PROGRAMA%C3%87%C3%83O/Marketplace-HortSoy/setup_database.sql).

### Tabelas Principais
- `INVE_HORT`: Catálogo de inventário.
- `CTRL_RSET`: Controle de segurança para reset e tokens (OTP).

> **Segurança Senior Master:** Todas as interações com o banco são tipadas e higienizadas pelo Prisma. O client em `src/lib/db.ts` utiliza um driver adapter para máxima performance e compatibilidade com o Next.js.

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

Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis necessárias:

```env
# Conexão direta com PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/hortsoy"

# Configurações do App
USE_PRISMA="true" 
NEXT_PUBLIC_SUPPORT_WHATSAPP="553498357625"
NEXT_PUBLIC_SUPPORT_TEXT="Olá, gostaria de tirar uma dúvida sobre os ativos."
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

## 🛡️ Senior Master Audit Standards

Para manter a integridade e segurança do portal, o código deve seguir os seguintes padrões:

1.  **Nomenclatura (DB):** Todas as tabelas e colunas devem seguir o padrão `XXXX_YYYY` (ex: `INVE_HORT`, `NAME_ITEM`).
2.  **Segurança de Variáveis:** Chaves sensíveis e URLs de produção nunca devem ser prefixadas com `NEXT_PUBLIC_` a menos que sejam estritamente necessárias no browser.
3.  **Configurabilidade:** Links de suporte (WhatsApp) e textos de marketing devem ser gerenciados via variáveis de ambiente.
4.  **Resiliência de Imagem:** Todos os componentes de imagem devem implementar o fallback `onError` para o placeholder padrão.
5.  **Tipagem Estrita:** Uso de `any` deve ser evitado, servindo apenas como ponte temporária durante refactors de modelagem.

---

---

### 📜 Licença & Propriedade

© 2026 **HortSoy Marketplace**.
Propriedade Intelectual Privada. Todos os direitos reservados.
Desenvolvido com excelência por [**Christyan Silva**](https://github.com/Christyan95).
