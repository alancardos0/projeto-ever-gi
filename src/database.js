const pg = require("pg");

const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

async function getClient() {
  try {
    await client.connect();
    const resultado = await client.query("select * from clientes");
    console.table(resultado.rows);
    await client.end();
  } catch (ex) {
    console.log("Ocorreu o erro no getClient. ERRO" + ex);
  }
}

async function insertClient(
  name,
  numeroCertificado,
  cpf,
  telefone,
  nomeDaEmpresa,
  data,
  observacao
) {
  try {
    console.log("Iniciando conexão!");
    await client.connect();
    console.log(
      `insert into clientes (nome,numeroCertificado,cpf,telefone,nomeDaEmpresa,data,observacao) values (${name}, ${numeroCertificado}, ${cpf}, ${telefone}, ${nomeDaEmpresa}, ${data}, ${observacao})`
    );
    await client.query(
      `insert into clientes (nome,numeroCertificado,cpf,telefone,nomeDaEmpresa,data,observacao) values ('${name}', '${numeroCertificado}', '${cpf}', '${telefone}', '${nomeDaEmpresa}', '${data}', '${observacao}')`
    );
    await client.end();
  } catch (ex) {
    console.log("Ocorreu o erro no insertClient. ERRO" + ex);
  }
}

module.exports = { client, getClient, insertClient };
