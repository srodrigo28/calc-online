// test.js – Script de Testes Automatizados

const supabaseUrl = 'https://qlmmdhklaqyxpdctykjk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbW1kaGtsYXF5eHBkY3R5a2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzMxNzEsImV4cCI6MjA2NDIwOTE3MX0.EZyjWN4QT-Yf5f46dUKSE-sfQoWMIXtIAQPsekQvqzA';
const sb = supabase.createClient(supabaseUrl, supabaseKey);

const categorias = [
  "caixa-inicial", "cielo-cartão", "cielo-pix", "contratos", "dinheiro",
  "freezer", "infiniti-crédito", "infiniti-débito", "infiniti-pix", "retiradas"
];

const nomes = ["Teste João", "Simulado Maria", "Aleatório Bot", "Cliente X"];

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

async function inserirMocks(qtd = 10) {
  for (let i = 0; i < qtd; i++) {
    const nome = nomes[random(0, nomes.length - 1)];
    const tipo = Math.random() > 0.5 ? "entrada" : "saida";
    const categoria = categorias[random(0, categorias.length - 1)];
    const quantidade = categoria === 'contratos' || categoria === 'caixa-inicial' ? 1 : random(1, 5);
    const valor_unitario = random(100, 1000) / 10;
    const valor_total = quantidade * valor_unitario;

    const { error } = await sb.from('registros_financeiros').insert({
      nome, tipo, categoria, quantidade, valor_unitario, valor_total
    });

    if (error) console.error("Erro ao inserir:", error);
  }
  console.log("✅ Mocks inseridos com sucesso!");
}

async function apagarTudo() {
  const { data, error } = await sb.from('registros_financeiros').delete().neq('id', 0);
  if (error) console.error("Erro ao apagar:", error);
  else console.log("🗑️ Registros removidos: ", data?.length);
}

async function listarUltimos(n = 10) {
  const { data, error } = await sb.from('registros_financeiros').select('*').order('id', { ascending: false }).limit(n);
  if (error) console.error("Erro ao listar:", error);
  else console.table(data);
}

// Testes manuais (descomente o que quiser rodar):
// inserirMocks(15);
// apagarTudo();
// listarUltimos(10);