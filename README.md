# Event API - Sistema de Gestão de Eventos

Esta é uma API RESTful desenvolvida como parte de um desafio técnico para estágio em Backend. O sistema permite a gestão completa de eventos, incluindo cadastro de organizadores, criação de eventos, inscrição de participantes, cancelamento na inscrição de eventos e exclusão de eventos.

## Sobre o Projeto

O objetivo principal é fornecer uma plataforma onde:
* **Organizadores** podem criar, editar, excluir e visualizar seus eventos, bem como gerenciar a lista de participantes.
* **Participantes** podem se cadastrar, visualizar eventos disponíveis, inscrever-se e cancelar inscrições.

O projeto foi construído seguindo os princípios de **Clean Architecture** adaptada para o framework AdonisJS, visando desacoplamento e organização do código em camadas (Controllers, Use Cases, Repositories).

## Tecnologias Utilizadas

* **Linguagem:** TypeScript
* **Runtime:** Node.js (v20+)
* **Framework:** AdonisJS 6
* **Banco de Dados:** PostgreSQL
* **ORM:** Lucid ORM
* **Validação:** VineJS
* **Containerização:** Docker & Docker Compose
* **Testes de API:** Postman

## Arquitetura do Projeto

O código está organizado para separar responsabilidades:

* **Controllers:** Recebem a requisição HTTP, validam os dados de entrada e chamam a camada de negócio.
* **Use Cases:** Contêm as Regras de Negócio (ex: verificar conflito de horário, capacidade máxima, unicidade de inscrição).
* **Repositories:** Abstraem a comunicação direta com o banco de dados (Lucid ORM).
* **Validators:** Definem os esquemas de validação de dados.
* **DTOs/Types:** Definem as interfaces de dados que passam através das camadas.

## Pré-requisitos

Para rodar este projeto localmente, você precisará ter instalado:

* Node.js (versão 20 ou superior)
* NPM
* Docker Desktop (ou Docker Engine + Compose)

## Instalação e Configuração

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd event-api
```
### 2. Instalar as Dependências
```bash
npm install
```
### 3. Altere o arquivo .env.example
- Renomeei o arquivo para `.env`

### 4. Gere a chave da aplicação
```bash
node ace generate:key
```
**Nota sobre o Banco de Dados: O arquivo docker-compose.yml está configurado para expor o PostgreSQL na porta 5433 para evitar conflitos com instalações locais. Cheque seu arquivo .env:**

### 5. Subir o banco
Confira o arquivo `docker-compose.yml` e o `.env` **principalmente a key gerada** e rode o seguinte comando no terminal:
```bash
docker-compose up -d
```

### 6. Executar a Migrations
```bash
node ace migration:run
```

### 7. Executar o Servidor
```bash
npm run dev
```

## Testando a API (Rotas)
Um arquivo de coleção para testes está incluído na raiz do projeto: `event-api-collection.json`. Este arquivo segue o formato de coleção do **Postman**, mas também pode ser importado no **Insomnia**.

### Como Importar e Usar
  1. Abra o Postman ou Insomnia.
  2. Utilize a função de Import e selecione o arquivo event-api-collection.json.
  3. A coleção já está configurada com variáveis de ambiente para a base_url e automação de token (no Postman).

### Fluxo de Teste Sugerido
  1. Login (Auth): Utilize a rota de login com os credenciais do Seeder (listadas acima).
  2. Token: Copie o token "Bearer" retornado.
  3. Rotas Protegidas: Nas rotas de criação de eventos ou inscrição, adicione o token no cabeçalho Authorization.
    - No Postman: O script incluído já salva o token automaticamente nas variáveis.
    - No Insomnia: Você deve copiar e colar manualmente na aba Auth > Bearer Token.

### Funcionalidades e Regras Implementadas
Autenticação
- Login via Bearer Token (JWT opaco via Lucid).
- Proteção de rotas via Middleware.

### Organizador
- Cadastro de novos organizadores.
- Criação, Edição e Exclusão de Eventos (apenas eventos próprios).
- Visualização de lista de participantes de seus eventos.

### Participante
- Cadastro de perfil.
- Edição de dados do perfil.
- Listagem de todos os eventos disponíveis.
- Inscrição em eventos.
- Cancelamento de inscrição.
- Visualização de eventos inscritos.

## Solução de Problemas Comuns
Erro de Conexão com o Banco (ECONNREFUSED): Verifique se o container Docker está rodando `docker ps` e se a porta no arquivo `.env` (DB_PORT) corresponde à porta exposta no `docker-compose.yml` (padrão configurado para 5433).
