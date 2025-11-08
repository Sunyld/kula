# 🚀 Kula - Marketplace de Canais

> **"Minha audiência, sua audiência."**

Kula é uma plataforma web que funciona como um marketplace de duas vias, conectando **Donos de Canais** (criadores de conteúdo com audiências no WhatsApp, TikTok, Instagram, etc.) a **Anunciantes** (negócios que procuram promover seus produtos).

## 📋 Sobre o Projeto

Kula profissionaliza e traz segurança ao mercado de publicidade em canais de conteúdo, oferecendo:

- 🔍 **Descoberta**: Feed onde Anunciantes podem encontrar e filtrar canais por nicho, preço e audiência
- 🔒 **Confiança**: Sistema de escrow (retenção de pagamento) que garante que o Dono do Canal só recebe o dinheiro após publicar o anúncio
- ⭐ **Reputação**: Sistema de avaliações bidirecional onde ambos os lados constroem uma reputação

## 🎯 Funcionalidades Principais

### Para Anunciantes
- Explorar e filtrar canais por plataforma, nicho, preço e localização
- Sistema de favoritos
- Gestão de campanhas e pedidos
- Sistema de pagamento seguro com escrow
- Avaliações e disputas

### Para Criadores
- Criar e gerir múltiplos canais
- Configurar pacotes de anúncios com preços e prazos
- Calendário de disponibilidade
- Gestão de pedidos (aceitar/recusar/concluir)
- Sistema de carteira para recebimentos
- Avaliações e disputas

### Para Administradores
- Gestão de utilizadores e canais
- Moderação de avaliações
- Resolução de disputas
- Configurações do sistema
- Métricas e relatórios

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 16.0.1
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS 3.4.18
- **UI Components**: Radix UI + Shadcn/ui
- **Animações**: Framer Motion
- **Gráficos**: Recharts
- **Formulários**: React Hook Form + Zod
- **Ícones**: Lucide React
- **Build**: Next.js com output estático

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/kula.git
cd kula
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run typecheck` - Verifica tipos TypeScript

## 👥 Perfis de Utilizador

### Anunciante
- Email: `advertiser@kula.dev`
- Senha: `123456`

### Criador
- Email: `creator@kula.dev`
- Senha: `123456`

### Administrador
- Email: `admin@kula.dev`
- Senha: `123456`

## 📁 Estrutura do Projeto

```
project/
├── app/                    # Páginas Next.js (App Router)
│   ├── admin/             # Páginas administrativas
│   ├── channel/           # Páginas públicas de canais
│   ├── channels/          # Gestão de canais (Criadores)
│   ├── checkout/          # Processo de checkout
│   ├── dashboard/         # Dashboards por role
│   ├── disputes/          # Sistema de disputas
│   ├── favorites/         # Favoritos (Anunciantes)
│   ├── marketplace/       # Marketplace público e dashboard
│   ├── orders/            # Gestão de pedidos
│   ├── reviews/           # Sistema de avaliações
│   └── wallet/             # Carteira digital
├── components/            # Componentes React
│   ├── ui/               # Componentes UI (Shadcn)
│   └── ...               # Componentes customizados
├── data/                  # Dados mockados
├── lib/                   # Utilitários e helpers
├── public/                # Arquivos estáticos
└── hooks/                 # React Hooks customizados
```

## 🔐 Sistema de Roles e Permissões

O sistema possui três roles principais com permissões específicas:

- **Admin**: Acesso total ao sistema, moderação e gestão
- **Advertiser**: Pode explorar, contratar e avaliar canais
- **Creator**: Pode criar canais, gerir pedidos e receber pagamentos

Veja mais detalhes em [ROLES_AND_MENUS.md](./ROLES_AND_MENUS.md)

## 💰 Moeda e Pagamentos

- **Moeda**: MZN (Metical Moçambicano)
- **Métodos de Pagamento**:
  - M-Pesa
  - e-Mola
  - Visa
  - Carteira Kula (Saldo interno)

## 🎨 Design

O projeto utiliza um design moderno e futurista com:
- Paleta de cores personalizada (Kula Primary/Secondary)
- Componentes responsivos
- Animações suaves
- UI/UX intuitiva

## 📝 Documentação

- [ROLES_AND_MENUS.md](./ROLES_AND_MENUS.md) - Documentação completa de roles e menus

## 🚧 Status do Projeto

Este é um **MVP (Minimum Viable Product)** com dados mockados. Funcionalidades implementadas:

- ✅ Sistema de autenticação (mock)
- ✅ Dashboards por role
- ✅ Marketplace público e privado
- ✅ Gestão de canais
- ✅ Sistema de pedidos
- ✅ Carteira digital
- ✅ Sistema de avaliações
- ✅ Sistema de disputas
- ✅ Design responsivo

## 📄 Licença

Este projeto é privado e proprietário.

## 👨‍💻 Desenvolvimento

Desenvolvido com ❤️ usando Next.js e TypeScript.

---

**Kula** - Conectando criadores e anunciantes de forma segura e profissional.

