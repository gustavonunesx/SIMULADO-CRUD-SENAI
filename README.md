# Sistema de Cadastro de Alunos 🧑‍🎓

Este projeto é um sistema simples de **cadastro de alunos**, desenvolvido com **HTML, CSS e JavaScript (front-end)** e integrado a um **back-end em Node.js/Express** que oferece as operações básicas de um **CRUD** (Create, Read, Update e Delete).

---

## 🚀 Funcionalidades

* **Cadastrar Aluno:** inserir nome, e-mail, CPF (com formatação automática), curso e data de nascimento.
* **Listar Alunos:** visualizar todos os alunos cadastrados.
* **Editar Aluno:** atualizar informações de um aluno existente.
* **Excluir Aluno:** remover um aluno do sistema.
* **Validação de CPF:** o CPF é formatado automaticamente no padrão brasileiro (XXX.XXX.XXX-XX).

---

## 🧩 Estrutura do Projeto

```
cadastro/
│
├── backend/
│   ├── server.js          # Servidor Node.js com rotas GET, POST, PUT, DELETE
│   ├── db.json            # Base de dados simples (ou conexão com banco real)
│
├── frontend/
│   ├── index.html         # Página principal do sistema
│   ├── style.css          # Estilos da interface
│   ├── script.js          # Lógica do CRUD no front-end
│
└── README.md              # Este arquivo
```

---

## ⚙️ Tecnologias Utilizadas

**Front-end:**

* HTML5
* CSS3
* JavaScript (Fetch API para consumo do backend)

**Back-end:**

* Node.js
* Express.js

---

## 🧠 Lógica de Funcionamento

O front-end se comunica com o servidor Node.js através de **requisições HTTP**:

| Método   | Endpoint      | Ação                        |
| -------- | ------------- | --------------------------- |
| `GET`    | `/alunos`     | Retorna a lista de alunos   |
| `POST`   | `/alunos`     | Cadastra um novo aluno      |
| `PUT`    | `/alunos/:id` | Atualiza um aluno existente |
| `DELETE` | `/alunos/:id` | Exclui um aluno             |

A cada requisição, a tabela da página é atualizada dinamicamente, exibindo os dados mais recentes.

---

## 📋 Testes Realizados

Durante o desenvolvimento, foram executados testes de cada funcionalidade:

| ID   | Requisito | Descrição              | Pré-condição        | Passos                                       | Resultado Esperado                             |
| ---- | --------- | ---------------------- | ------------------- | -------------------------------------------- | ---------------------------------------------- |
| CT01 | RF01      | Cadastrar novo aluno   | Sistema em execução | Preencher formulário e clicar em "Cadastrar" | Aluno aparece na lista                         |
| CT02 | RF02      | Listar alunos          | Backend ativo       | Abrir página inicial                         | Lista de alunos exibida                        |
| CT03 | RF03      | Editar aluno existente | Aluno cadastrado    | Clicar em "Editar", alterar dados e salvar   | Dados atualizados na tabela                    |
| CT04 | RF04      | Excluir aluno          | Aluno cadastrado    | Clicar em "Excluir"                          | Aluno removido da lista                        |
| CT05 | RF05      | Validar CPF            | Campo CPF ativo     | Digitar CPF no campo                         | CPF formatado automaticamente (000.000.000-00) |

---


> Projeto criado como parte de uma atividade prática de desenvolvimento de sistemas com integração front-end e back-end.
