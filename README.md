# Bazar HortSoy 🌱

Um portal de vendas exclusivo para colaboradores da HortSoy, desenvolvido com arquitetura robusta e metodologias de Clean Code.

Com o encerramento das atividades de uma de nossas unidades, estamos disponibilizando móveis, equipamentos e eletrônicos em excelentes condições com preços subsidiados para a equipe.

## 🚀 Tecnologias Utilizadas (Specialist Setup)

Este projeto foi construído focando na máxima performance, escalabilidade e na melhor UX (User Experience) e UI (User Interface) possíveis.

### Frontend
- **[Next.js 15 (App Router)](https://nextjs.org/)**: Renderização híbrida e rotas otimizadas.
- **[React 19](https://react.dev/)**: Componentização e Server Actions.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática e segurança global no código.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Estilização Utility-First com tema customizado e variáveis CSS dinâmicas (Suporte completo a *Light/Dark Mode* via propriedades globais).
- **[Framer Motion](https://www.framer.com/motion/)**: Animações imersivas, *hover states* complexos e transições de entrada em viewport.
- **[Lucide React](https://lucide.dev/)**: Ícones leves e customizáveis.
- **[Sonner](https://sonner.emilkowal.ski/)**: Sistema moderno de *Toasts* para notificações estéticas.
### Backend & Integrations
- **[Supabase](https://supabase.com/)**: Instância do *client* isolada pronta para conexão com o Postgres em Tempo Real (`src/lib/supabase.ts`).
- **Paginação de Dados**: Botões dinâmicos de listagem `Mostrar mais 20` e `Mostrar tudo` integrados com facilidade ao front-end para evitar sobrecarga.

## 📁 Estrutura de Arquivos Otimizada (Clean Architecture)

Foi implementada uma refatoração robusta visando a separação de responsabilidades e *Clean Code*:
```text
📦 src/
 ┣ 📂 app/                  # Rotas principais e API Handlers
 ┃ ┣ 📜 globals.css         # Variáveis e CSS nativo Global
 ┃ ┣ 📜 layout.tsx          # RootLayout, Headers e Modais
 ┃ ┗ 📜 page.tsx            # View de Catálogo e Landing Page
 ┣ 📂 data/                 # Fontes externas ou Mock databases
 ┃ ┗ 📜 inventory.ts        # Gerador algorítmico do catálogo
 ┗ 📂 lib/                  # Drivers e Clients Internos
   ┗ 📜 supabase.ts         # Supabase Connection Provider
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` ou `.env.local` na raiz contendo:
```env
NEXT_PUBLIC_SUPABASE_URL="https://substituir.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="substituir-pela-sua-chave-anon"
```
*(Durante o desenvolvimento inicial rodará sem problemas mesmo utilizando os placeholders internos configurados.)*

## 📦 Como rodar localmente

Clone o repositório e instale as dependências rigorosamente:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o catálogo renderizado e a disposição dos lotes.

## 💡 Estratégia do Banco de Dados (Supabase Migration)

Para subir seus dados reais ao Supabase futuramente, basta executar o seguinte schema no editor SQL:
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
```
O client `supabase.ts` já exporta o tipo `Product` perfeitamente alinhado a essa modelagem, mantendo a integridade do seu Typescript de ponta a ponta.

---
Desenvolvido com padrão de excelência corporativa 💚
