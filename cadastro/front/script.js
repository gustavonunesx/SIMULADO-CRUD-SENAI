document.getElementById("alunoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const aluno = {
        nome: document.getElementById("aluno").value,
        cpf: document.getElementById("cpf").value
    };

    const idEdicao = this.dataset.editando; // verifica se está em modo edição

    const url = idEdicao
        ? `http://localhost:8080/alunos/${idEdicao}`
        : "http://localhost:8080/alunos";

    const metodo = idEdicao ? "PUT" : "POST";

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aluno)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(JSON.stringify(err)); });
        }
        return response.json();
    })
    .then(() => {
        alert(idEdicao ? "Aluno atualizado com sucesso!" : "Aluno cadastrado com sucesso!");
        document.getElementById("alunoForm").reset();
        delete this.dataset.editando;
        buscarAlunos();
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Falha ao salvar aluno. Verifique o console.");
    });
});

function buscarAlunos() {
    fetch("http://localhost:8080/alunos")
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar alunos");
        return response.json();
    })
    .then(data => {
        const lista = document.getElementById("listaAlunos");
        lista.innerHTML = "";

        data.forEach(aluno => {
            const item = document.createElement("li");

            const info = document.createElement("span");
            info.classList.add("aluno-info");
            info.textContent = `${aluno.id} - ${aluno.nome} - CPF: ${aluno.cpf}`;

            const botoes = document.createElement("div");
            botoes.classList.add("action-buttons");

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.classList.add("edit");
            btnEditar.onclick = () => editarAluno(aluno);

            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "Excluir";
            btnExcluir.classList.add("delete");
            btnExcluir.onclick = () => excluirAluno(aluno.id);

            botoes.appendChild(btnEditar);
            botoes.appendChild(btnExcluir);

            item.appendChild(info);
            item.appendChild(botoes);
            lista.appendChild(item);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar alunos:", error);
        alert("Erro ao buscar alunos. Verifique o console.");
    });
}

function excluirAluno(id) {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) return;

    fetch(`http://localhost:8080/alunos/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao excluir aluno");
        alert("Aluno excluído com sucesso!");
        buscarAlunos();
    })
    .catch(error => {
        console.error("Erro ao excluir:", error);
        alert("Falha ao excluir aluno. Verifique o console.");
    });
}

function editarAluno(aluno) {
    document.getElementById("aluno").value = aluno.nome;
    document.getElementById("cpf").value = aluno.cpf;
    document.getElementById("alunoForm").dataset.editando = aluno.id;
    alert("Modo de edição ativado. Altere os campos e clique em 'Cadastrar' para salvar.");
}

// --- Formatação automática do CPF ---
const cpfInput = document.getElementById('cpf');

function onlyDigits(str) {
  return (str || '').replace(/\D+/g, '');
}

// Recebe uma string só com dígitos (máx 11) e retorna formatado
function formatCPFFromDigits(digits) {
  digits = digits.slice(0, 11);
  // Monta formatacao: 000.000.000-00
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0,3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6)}`;
  return `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6,9)}-${digits.slice(9,11)}`;
}

// Mapeia a posição do cursor: quantos dígitos existiam antes do cursor.
// Depois encontra a posição equivalente na string formatada.
function mapCursorPosition(oldValue, oldPos, newFormatted) {
  const digitsBeforeCursor = onlyDigits(oldValue.slice(0, oldPos)).length;
  if (digitsBeforeCursor === 0) return 0;

  // percorre newFormatted até encontrar a quantidade de dígitos igual
  let count = 0;
  for (let i = 0; i < newFormatted.length; i++) {
    if (/\d/.test(newFormatted[i])) count++;
    if (count === digitsBeforeCursor) return i + 1; // pos depois do dígito
  }
  return newFormatted.length;
}

cpfInput.addEventListener('input', (e) => {
  const el = e.target;
  const oldValue = el.value;
  const oldPos = el.selectionStart;

  const digits = onlyDigits(oldValue);
  const formatted = formatCPFFromDigits(digits);

  el.value = formatted;

  // ajusta cursor
  const newPos = mapCursorPosition(oldValue, oldPos, formatted);
  el.setSelectionRange(newPos, newPos);
});

// evita que caracteres inválidos fiquem no input quando colam
cpfInput.addEventListener('paste', (e) => {
  e.preventDefault();
  const paste = (e.clipboardData || window.clipboardData).getData('text');
  const digits = onlyDigits(paste);
  const formatted = formatCPFFromDigits(digits);
  // substitui o conteúdo atual mantendo cursor no fim do que foi colado
  const start = cpfInput.selectionStart;
  const end = cpfInput.selectionEnd;
  const before = onlyDigits(cpfInput.value.slice(0, start));
  const after  = onlyDigits(cpfInput.value.slice(end));
  const merged = before + digits + after;
  cpfInput.value = formatCPFFromDigits(merged);
  // coloca cursor após o parte colada
  const posDigits = before.length + digits.length;
  // mapeia para pos formatada
  let count = 0;
  let pos = 0;
  for (let i = 0; i < cpfInput.value.length; i++) {
    if (/\d/.test(cpfInput.value[i])) count++;
    if (count === posDigits) { pos = i + 1; break; }
  }
  cpfInput.setSelectionRange(pos, pos);
});

// (Opcional) validação simples de CPF (formato + algoritmo)
// Retorna true se é CPF plausível; false caso contrário.
// Se quiser validação, chame isValidCPF(onlyDigits(cpfInput.value))
function isValidCPF(cpfDigits) {
  cpfDigits = onlyDigits(cpfDigits);
  if (cpfDigits.length !== 11) return false;
  // rejeita sequências repetidas
  if (/^(\d)\1+$/.test(cpfDigits)) return false;

  const calc = (t) => {
    let sum = 0;
    for (let i = 0; i < t; i++) sum += parseInt(cpfDigits.charAt(i)) * ((t + 1) - i);
    let mod = (sum * 10) % 11;
    return mod === 10 ? 0 : mod;
  };

  return calc(9) === parseInt(cpfDigits.charAt(9)) &&
         calc(10) === parseInt(cpfDigits.charAt(10));
}
