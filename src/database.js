const pg = require("pg");

const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

export async function getClient() {
  try {
    console.log("Iniciando conexão!");
    await client.connect();
    console.log("Conexão realizada com sucesso!");
    const resultado = await client.query("select * from clientes");
    console.table(resultado.rows);
  } catch (ex) {
    console.log("Ocorreu o erro no getClient. ERRO" + ex);
  } finally {
    await client.end();
    console.log("Cliente desconectado");
  }
}

export async function insertClient(
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
    console.log("Conexão realizada com sucesso!");
    await client.query(
      `insert ${name} ${numeroCertificado} ${cpf} ${telefone} ${nomeDaEmpresa} ${data} ${observacao} * from clientes`
    );
  } catch (ex) {
    console.log("Ocorreu o erro no insertClient. ERRO" + ex);
  } finally {
    await client.end();
    console.log("Cliente desconectado");
  }
}

module.exports = client;
