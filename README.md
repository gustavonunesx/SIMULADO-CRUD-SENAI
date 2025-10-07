# Sistema de Cadastro de Alunos

**Descrição**  
Projeto CRUD (Create, Read, Update, Delete) para cadastro de alunos, com front-end em HTML/CSS/JavaScript e back-end em **Spring Boot (Java, Maven)**. O front está em `cadastro/front` e o back no módulo Maven `cadastro/cadastro`.

---

## Tecnologias
- Java 17+
- Spring Boot (Maven)
- MySQL (configurado em `application.properties`)
- HTML5 / CSS3 / JavaScript (front-end estático)

---

## Estrutura do repositório (resumo)
```
cadastro/
├─ cadastro/                  # módulo Spring Boot (maven)
│  ├─ src/main/java/...       # código Java (controllers, service, model, repository, dto)
│  ├─ src/main/resources     # application.properties
│  └─ pom.xml
├─ front/
│  ├─ index.html
│  ├─ style.css
│  └─ script.js
└─ README_Cadastro_Alunos.md  # (este arquivo)
```

---

## Configuração (pré-requisitos)
- Java 17+ instalado
- Maven (ou usar o *Maven Wrapper* incluído)
- MySQL em execução

**Configurações importantes (arquivo):** `cadastro/cadastro/src/main/resources/application.properties`  
Por padrão, as configurações encontradas no projeto são:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cadastro
spring.datasource.username=root
spring.datasource.password=aluno
spring.jpa.hibernate.ddl-auto=update
```
Ajuste `username`, `password` e `url` conforme seu ambiente. Se preferir, crie o banco `cadastro` manualmente no MySQL.

---

## Como executar

### 1) Back-end (Spring Boot)
No diretório do módulo `cadastro/cadastro`:

Usando o *Maven Wrapper* (recomendado, funciona sem Maven global):
```bash
# Linux / macOS
./mvnw spring-boot:run

# Windows (PowerShell)
mvnw.cmd spring-boot:run
```

Ou buildar e executar o JAR:
```bash
./mvnw clean package
java -jar target/*.jar
```

Por padrão a aplicação inicia em `http://localhost:8080`.

> Atenção: o controller tem `@CrossOrigin(origins = "http://localhost:5500")` — isso significa que o front deve ser servido na porta **5500** para evitar problemas de CORS (ex.: Live Server do VS Code). Caso prefira abrir `front/index.html` diretamente (file://), ajuste o `@CrossOrigin` ou publique os arquivos estáticos.

---

### 2) Front-end
A pasta do front-end está em `cadastro/front`. Você pode:
- Abrir `cadastro/front/index.html` diretamente no navegador (algumas operações com `fetch` podem exigir servidor devido a CORS/segurança).
- Ou usar **Live Server** do VS Code (porta 5500 recomendada para combinar com `@CrossOrigin`).
- Confirme que a URL-base do back-end no arquivo `script.js` está `http://localhost:8080` (caso rode backend em outra porta, ajuste lá).

---

## Endpoints da API
O backend expõe a rota base `/alunos`:

- `GET /alunos` — listar todos os alunos  
- `POST /alunos` — cadastrar aluno  
  - Exemplo de payload JSON:
    ```json
    {
      "nome": "Fulano da Silva",
      "cpf": "000.000.000-00"
    }
    ```
- `PUT /alunos/{id}` — atualizar o aluno com id  
- `DELETE /alunos/{id}` — excluir aluno

O front-end já consome `http://localhost:8080/alunos`.

---

## Funcionalidades implementadas (front)
- Formulário de cadastro com campos `nome` e `cpf`.
- Formatação automática do CPF no formato `000.000.000-00` (mientras o usuário digita e no paste).
- Listagem dinâmica dos alunos.
- Edição inline (preenche o formulário para edição).
- Exclusão com confirmação.
- Mensagens de sucesso/erro via `alert()` (padrão simples — você pode trocar por toasts).

---

## Casos de Teste (resumo para a planilha)
- **CT01 — RF01 — Cadastrar aluno**  
  - Pré-condição: backend rodando.  
  - Passos: preencher nome + CPF → clicar Cadastrar.  
  - Resultado esperado: novo aluno aparece na lista.

- **CT02 — RF02 — Listar alunos**  
  - Pré-condição: existir ao menos 1 aluno cadastrado.  
  - Passos: clicar em Carregar Alunos.  
  - Resultado esperado: lista com todos os alunos.

- **CT03 — RF03 — Editar aluno**  
  - Pré-condição: aluno cadastrado.  
  - Passos: clicar Editar, alterar dados, salvar.  
  - Resultado esperado: dados atualizados no banco e na lista.

- **CT04 — RF04 — Excluir aluno**  
  - Pré-condição: aluno cadastrado.  
  - Passos: clicar Excluir e confirmar.  
  - Resultado esperado: aluno removido da lista.

---

## Dicas / Troubleshooting
- **CORS:** Se o front for servido em outra porta, atualize `@CrossOrigin` no controller (ou use `*` temporariamente) ou sirva o front na porta 5500.
- **Banco não conecta:** verifique usuário/senha no `application.properties`. Crie o banco `cadastro` se necessário.
- **Porta do backend diferente:** atualize a URL em `front/script.js` (variável `url` que usa `http://localhost:8080/alunos`).

---

## Próximos passos sugeridos
- Adicionar validação visual de campos no front (mensagens inline).
- Substituir `alert()` por notificações mais amigáveis (toasts).
- Servir os arquivos do front via Spring Boot (`src/main/resources/static`) para despliegue único.
- Escrever testes automatizados (JUnit + MockMvc) para os controllers do Spring.

---

## Autor
Desenvolvido por **Nunes** — projeto educacional.

---
