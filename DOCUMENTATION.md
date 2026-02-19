# API Documentation - Sistema de Barbearia

Bem-vindo à **API da Barbearia**! Esta API permite que usuários agendem horários com barbeiros, gerenciem seus perfis e que administradores controlem barbeiros e serviços.

---

## 🚀 Primeiros Passos

### Pré-requisitos

* Node.js (v22.12.0+)
* Prisma
* PostgreSQL

### Instalação

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure as Variáveis de Ambiente (veja a seção `.env`).

3. instale o cliente do prisma e execute as migrações:
   ```bash
   npx prisma generate
   ```

   ```bash
   npx prisma migrate dev
   ```

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

---

## 🛠️ Funcionalidades do Sistema

* **Autenticação de Usuário**: Cadastro e login seguros usando JWT.
* **Controle de Acesso por Função (RBAC)**: Permissões distintas para `CUSTOMER` e `ADMIN`.
* **Gerenciamento de Barbeiros**: (Somente Admin) Adicionar novos barbeiros.
* **Gerenciamento de Serviços**: (Somente Admin) Gerenciar serviços oferecidos, incluindo preços e duração.
* **Agendamento de Horários**: Clientes podem marcar atendimentos em horários específicos.
* **Validação e Tratamento de Erros**: Validação robusta com Zod e respostas padronizadas de erro.

---

## 📡 Rotas da API

### 1. Autenticação e Usuários

| Método | Endpoint         | Descrição                            | Requer Autenticação |
| :----- | :--------------- | :----------------------------------- | :------------------ |
| POST   | `/users`         | Criar uma nova conta de cliente      | Não                 |
| POST   | `/sessions`      | Autenticar usuário e obter token JWT | Não                 |
| PUT    | `/users/profile` | Atualizar seu perfil (nome/senha)    | Sim                 |

---

### 2. Barbeiros

| Método | Endpoint          | Descrição                             | Requer Autenticação | Permissões   |
| :----- | :---------------- | :------------------------------------ | :------------------ | :----------- |
| GET    | `/public/barbers` | Listar todos os barbeiros disponíveis | Não                 | Público      |
| POST   | `/barber`         | Criar um novo perfil de barbeiro      | Sim                 | Apenas Admin |

---

### 3. Serviços

| Método | Endpoint           | Descrição                            | Requer Autenticação | Permissões   |
| :----- | :----------------- | :----------------------------------- | :------------------ | :----------- |
| GET    | `/public/services` | Listar todos os serviços disponíveis | Não                 | Público      |
| POST   | `/service`         | Criar um novo serviço (corte, etc.)  | Sim                 | Apenas Admin |

---

### 4. Agendamentos

| Método | Endpoint           | Descrição                 | Requer Autenticação | Permissões |
| :----- | :----------------- | :------------------------ | :------------------ | :--------- |
| POST   | `/appointment`     | Criar um novo agendamento | Sim                 | Cliente    |
| GET    | `/appointment/me`  | Listar seus agendamentos  | Sim                 | Cliente    |
| DELETE | `/appointment/:id` | Cancelar um agendamento   | Sim                 | Dono/Admin |

---

## 🛡️ Tratamento de Erros

A API retorna um objeto JSON padronizado para todos os erros:

```json
{
  "status": "error",
  "message": "Descrição do problema"
}
```

Para erros de validação (Zod), inclui o campo `issues`:

```json
{
  "status": "error",
  "message": "Erro de validação",
  "issues": { ... }
}
```

---

## 🔐 Variáveis de Ambiente (.env)

Garanta que seu arquivo `.env` contenha:

* `DATABASE_URL`: String de conexão do PostgreSQL
* `JWT_SECRET`: String segura para assinatura dos tokens
* `PORT`: (Opcional) Porta de execução do servidor (padrão 1234)

---

## 📌 Escopo Funcional da API

A API contempla as seguintes funcionalidades principais:

1. Cadastro de usuários (clientes) com senha criptografada utilizando BCrypt.
2. Autenticação segura baseada em JWT para acesso às rotas protegidas.
3. Cadastro de barbeiros restrito a administradores.
4. Cadastro de serviços (nome, preço e duração) restrito a administradores.
5. Criação de agendamentos vinculando cliente, barbeiro, serviço e horário.
6. Listagem de agendamentos do próprio usuário autenticado.
7. Cancelamento de agendamentos pelo proprietário ou administrador.
8. Listagem pública de barbeiros disponíveis.
9. Listagem pública de serviços disponíveis.
10. Atualização de perfil do usuário (nome e senha).

---

## 🧠 Modelagem e Separação de Entidades

A arquitetura do sistema foi projetada separando as entidades **User** (usuário) e **Barber** (barbeiro), seguindo princípios de modelagem de domínio e responsabilidade única.

### Barbeiro como Recurso do Sistema

O barbeiro é tratado como um recurso operacional da empresa, não como uma identidade de autenticação. Assim, ele representa apenas um profissional disponível para agendamento, contendo dados como nome e biografia.

Essa abordagem permite que o administrador gerencie a equipe sem necessidade de credenciais individuais para cada profissional, reduzindo complexidade e evitando contas desnecessárias no sistema.

### Usuário como Identidade de Acesso

A entidade User representa quem interage diretamente com a plataforma e possui autenticação e permissões (roles):

* **Customer**: consome os serviços e realiza agendamentos
* **Admin**: gerencia barbeiros e serviços

### Benefícios Técnicos da Abordagem

**Segurança:** barbeiros não precisam manter credenciais de acesso, reduzindo risco de vazamento ou má gestão de senhas.

**Simplicidade:** o agendamento utiliza apenas referências diretas (`barber_id` e `service_id`), mantendo o fluxo claro e objetivo.

**Escalabilidade:** caso seja necessário futuramente fornecer acesso ao barbeiro, basta criar um usuário vinculado ao `barber_id`, sem alteração estrutural no banco de dados existente.

formato de env:

<!-- DATABASE_URL="[user]:[password]@localhost:5432/[database]?schema=public"
JWT_SECRET="[your-secret-key]"
PORT=[1234] -->