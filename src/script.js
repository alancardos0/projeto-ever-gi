const { getClient, insertClient } = require("./src/database.js");

const cron = require("node-cron");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

async function quandoClicar() {
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
  validarData(data);
  await insertClient(
    name,
    numeroCertificado,
    cpf,
    telefone,
    nomeDaEmpresa,
    data,
    observacao
  );

  sgMail.setApiKey(process.env.api_key);

  const msg = {
    to: "everton@evergi.com.br",
    from: "alammateus077@gmail.com",
    subject: "Dia de ligar para o Cliente!",
    text: ``,
    html: `Olá EverGi, hoje é dia de ligar para ${name}, numero do certificado é : ${numeroCertificado}, CPF: ${cpf}, telefone para contato é : ${telefone},nome da Empresa:${nomeDaEmpresa} e observação: ${observacao}.`,
  };

  function validarData(date) {
    const dataAtual = new Date(date);
    const minutes = dataAtual.getMinutes();
    const hours = dataAtual.getHours();
    const days = dataAtual.getDate();
    const months = dataAtual.getMonth() + 1;
    const dayOfWeek = dataAtual.getDay();

    return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
  }
  const cronRegexp = validarData(data);
  console.log(cronRegexp);

  cron.schedule(cronRegexp, () => {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email enviado");
      })
      .catch((error) => {
        console.log(error);
      });
  });
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
  let cpfRegeXp = /^[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}$/;
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
