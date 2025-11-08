# Estrutura de Menus e Permissões por Role

## Baseado na Documentação Funcional do Kula

### 📋 ANUNCIANTE (Advertiser)
**Fluxo Principal:** Explorar e contratar canais

**Menu do Sidebar:**
1. **Visão Geral** (`/dashboard/advertiser`) - Dashboard com métricas e campanhas ativas
2. **Explorar Canais** (`/marketplace`) - Marketplace principal para encontrar canais
3. **Favoritos** (`/favorites`) - Canais salvos para referência futura
4. **Meus Pedidos** (`/orders/advertiser`) - Gestão de campanhas e pedidos
5. **Carteira** (`/wallet`) - Adicionar fundos via MPesa/e-Mola
6. **Avaliações** (`/reviews`) - Ver e deixar avaliações
7. **Abrir Disputa** (`/disputes/new`) - Abrir disputa sobre um pedido

**Permissões:**
- ✅ Pode explorar e contratar canais
- ✅ Pode adicionar fundos à carteira
- ✅ Pode abrir disputas
- ❌ NÃO pode criar/gerir canais
- ❌ NÃO pode ver pedidos de criadores

---

### 🎨 CRIADOR (Creator)
**Fluxo Principal:** Configurar e vender canais

**Menu do Sidebar:**
1. **Visão Geral** (`/dashboard/creator`) - Dashboard com métricas e pedidos ativos
2. **Meus Canais** (`/channels`) - Gerir canais registados (criar, editar, pacotes)
3. **Meus Pedidos** (`/orders/creator`) - Aceitar/recusar pedidos, marcar como concluído
4. **Carteira** (`/wallet`) - Ver saldo e levantar fundos
5. **Avaliações** (`/reviews`) - Ver e deixar avaliações
6. **Abrir Disputa** (`/disputes/new`) - Abrir disputa sobre um pedido

**Permissões:**
- ✅ Pode criar e gerir canais
- ✅ Pode criar pacotes de anúncios
- ✅ Pode gerir pedidos (aceitar/recusar/concluir)
- ✅ Pode levantar fundos da carteira
- ✅ Pode abrir disputas
- ❌ NÃO tem acesso ao Marketplace (eles vendem, não compram)
- ❌ NÃO pode ver pedidos de anunciantes

---

### 👑 ADMIN (Admin Master)
**Fluxo Principal:** Moderação e gestão do sistema

**Menu do Sidebar:**
1. **Visão Geral** (`/dashboard/admin`) - Dashboard com métricas gerais do sistema
2. **Utilizadores** (`/admin/users`) - Gerir utilizadores (bloquear, promover)
3. **Canais** (`/admin/channels`) - Aprovar/rejeitar canais, verificação manual
4. **Disputas** (`/admin/disputes`) - Resolver disputas e arbitragem
5. **Avaliações** (`/admin/reviews`) - Moderar avaliações
6. **Definições** (`/admin/settings`) - Configurações do sistema (taxa Kula, plataformas, nichos)

**Permissões:**
- ✅ Acesso total ao sistema
- ✅ Pode aprovar/rejeitar canais
- ✅ Pode resolver disputas
- ✅ Pode bloquear utilizadores
- ✅ Pode configurar parâmetros do sistema
- ❌ NÃO pode criar canais ou fazer pedidos

---

## Proteções Implementadas

### Páginas Protegidas por Role:

- **Marketplace** - Apenas `advertiser`
- **Favoritos** - Apenas `advertiser`
- **Meus Canais** - Apenas `creator`
- **Pacotes de Anúncios** - Apenas `creator`
- **Calendário de Disponibilidade** - Apenas `creator`
- **Disputas** - `advertiser` e `creator`
- **Avaliações** - `advertiser` e `creator`
- **Carteira** - `advertiser` e `creator`
- **Admin Pages** - Apenas `admin`

### Componente de Proteção:
- `RequireRole` - Componente que verifica o role do utilizador e redireciona se não autorizado

---

## Notas Importantes

1. **Marketplace não está disponível para Criadores** - Baseado na documentação, criadores vendem seus canais, não precisam explorar outros canais.

2. **Ordem dos Menus** - Os menus estão ordenados por importância no fluxo de cada persona:
   - Anunciante: Marketplace é o principal (segundo item)
   - Criador: Meus Canais é o principal (segundo item)

3. **Carteira** - Ambos os perfis têm acesso, mas com ações diferentes:
   - Anunciante: Adicionar fundos
   - Criador: Levantar fundos

4. **Disputas e Avaliações** - Ambos os perfis podem acessar, pois são funcionalidades bidirecionais.

