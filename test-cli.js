// test-cli.js - CLI de testes com Supabase via Node
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const categorias = [
  "caixa-inicial", "cielo-cartão", "cielo-pix", "contratos", "dinheiro",
  "freezer", "infiniti-crédito", "infiniti-débito", "infiniti-pix", "retiradas"
];

const nomes = ["Teste João", "Simulado Maria", "Aleatório Bot", "Cliente X"];
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

async function inserirMocks(qtd = 10) {
  let entradas = 0;
  let saidas = 0;
  let total_geral = 0;
  const categoriasUsadas = new Set();

  for (let i = 0; i < qtd; i++) {
    const nome = nomes[random(0, nomes.length - 1)];
    const tipo = Math.random() > 0.5 ? "entrada" : "saida";
    const categoria = categorias[random(0, categorias.length - 1)];
    const quantidade = categoria === 'contratos' || categoria === 'caixa-inicial' ? 1 : random(1, 5);
    const valor_unitario = random(100, 1000) / 10;
    const valor_total = quantidade * valor_unitario;

    categoriasUsadas.add(categoria);
    tipo === "entrada" ? entradas++ : saidas++;
    total_geral += valor_total;

    const { error } = await sb.from('registros_financeiros').insert({
      nome, tipo, categoria, quantidade, valor_unitario, valor_total
    });

    if (error) console.error("Erro ao inserir:", error);
  }
  console.log("✅ Mocks inseridos com sucesso!");
  console.log(`➡️ Entradas: ${entradas}, Saídas: ${saidas}, Total Geral: R$ ${total_geral.toFixed(2)}`);
  console.log("📌 Categorias usadas:", [...categoriasUsadas].join(", "));
}

async function apagarTudo() {
  const { count, error } = await sb
    .from('registros_financeiros')
    .delete({ count: 'exact' })
    .neq('id', 0);

  if (error) console.error("Erro ao apagar:", error);
  else console.log(`🗑️ Registros removidos: ${count}`);
}

async function listarUltimos(n = 10) {
  const { data, error } = await sb.from('registros_financeiros').select('*').order('id', { ascending: false }).limit(n);
  if (error) console.error("Erro ao listar:", error);
  else console.table(data);
}

async function rodarTudo() {
  console.log("🚨 Executando bateria completa de testes...");
  await apagarTudo();
  await inserirMocks(15);
  await listarUltimos(10);
  console.log("✅ Teste finalizado com sucesso.");
}

// CLI
const comando = process.argv[2];
if (comando === 'inserir') await inserirMocks(10);
else if (comando === 'apagar') await apagarTudo();
else if (comando === 'listar') await listarUltimos(10);
else if (comando === 'rodar-tudo') await rodarTudo();
else console.log("Comando inválido: use inserir, apagar, listar ou rodar-tudo.");
