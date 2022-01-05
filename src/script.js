function quandoClicar() {
  const users = document.getElementById("usuarios");
  const name = document.getElementById("name").value;
  const numeroCertificado = document.getElementById("numeroCertificado").value;
  const cpf = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;
  const nomeDaEmpresa = document.getElementById("nomeDaEmpresa").value;
  const data = document.getElementById("data").value;
  const observacao = document.getElementById("observacao").value;

  //invocação das funções
  validarCertificado(numeroCertificado);
  validarCpf(cpf);
  validarTelefone(telefone);
  validacaoDeNomes(name, nomeDaEmpresa);
  validarData(data, name, observacao);

  const text = `Name: ${name}, Numero do Certificado: ${numeroCertificado}, CPF: ${cpf},Telefone: ${telefone}, Nome da Empresa ${nomeDaEmpresa},Data: ${data}, Observação: ${observacao}`;
  //criar lista
  let li = document.createElement("li");
  li.innerText = text;
  users.appendChild(li);
  colocarNoLocalStorage(text);
}

function colocarNoLocalStorage(value) {
  let criarLocalStorage = localStorage.setItem("key", value);
  return criarLocalStorage;
}
//funções de validação!
function validacaoDeNomes(nome, nomeDaEmpresa) {
  let validaNomeeEmpresa = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]$/;
  if ((validaNomeeEmpresa === nomeDaEmpresa, nome)) {
    return console.log("valido");
  }
}

function validarCertificado(parametro) {
  let a = parseFloat(parametro);
  if (isNaN(a)) {
    throw alert("Numero do certificado Incorreto!");
  } else {
    return true;
  }
}

function validarCpf(parameter) {
  let cpfRegeXp = /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/;
  let x = parseFloat(parameter, 10);
  if (cpfRegeXp.test(parameter) && x) {
    return true;
  } else {
    alert("CPF incorreto!");
  }
}

function validarTelefone(parameter) {
  let x = parseFloat(parameter);
  let telefoneRegexp = /^[0-9]{11}$/;
  if (telefoneRegexp.test(parameter) && x) {
  } else {
    throw alert("Número incorreto!");
  }
}

function validarData(data, nomePessoa, obs) {
  const date = new Date();
  let dia = date.getDate();
  let mes = date.getMonth() + 1;
  let ano = date.getFullYear();

  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes < 10) {
    mes = "0" + mes;
  }

  let dataFormatada = dia + "/" + mes + "/" + ano;

  if (dataFormatada === data) {
    alert(`Dia de ligar para o Cliente ${nomePessoa}  ${obs}`);
  } else {
    alert("Cliente Agendado");
  }
}
