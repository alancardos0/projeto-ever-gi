const users = document.getElementById("usuarios");
const name = document.getElementById("name").value;
const numeroCertificado = document.getElementById("numeroCertificado").value;
const cpf = document.getElementById("cpf").value;
const telefone = document.getElementById("telefone").value;
const nomeDaEmpresa = document.getElementById("nomeDaEmpresa").value;
const data = document.getElementById("data").value;
const observacao = document.getElementById("observacao").value;

function quandoClicar() {
  const text = `Name: ${name}, Numero do Certificado: ${numeroCertificado}, CPF: ${cpf},Telefone: ${telefone}, Nome da Empresa ${nomeDaEmpresa},Data: ${data}, Observação: ${observacao}`;
  let li = document.createElement("li");
  li.innerText = text;
  users.appendChild(li);
  colocarNoLocalStorage(text);
}

function colocarNoLocalStorage(value) {
  let criarLocalStorage = localStorage.setItem("key", value);
  return criarLocalStorage;
}
function validarNomeCertificado(parameter, parameter1) {
  if (isNaN(parameter)) {
    throw "Digite o número corretamente!";
  }

  return !!parameter1.match(
    /^(?![ ])(?!.*[ ]{2})((?:e|da|do|das|dos|de|d'|D'|la|las|el|los)\s*?|(?:[A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'][^\s]*\s*?)(?!.*[ ]$))+$/
  );
}
validarNomeCertificado(name, numeroCertificado);

function transformarRegeXp(parameter) {
  let cpfRegeXp = /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/;
  if (parameter === cpfRegeXp) {
    quandoClicar();
  } else {
    throw "CPF INVALIDO!";
  }
}
transformarRegeXp(cpf);
