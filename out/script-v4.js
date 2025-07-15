// 🔐 Supabase config
const supabaseUrl = 'https://qlmmdhklaqyxpdctykjk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbW1kaGtsYXF5eHBkY3R5a2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzMxNzEsImV4cCI6MjA2NDIwOTE3MX0.EZyjWN4QT-Yf5f46dUKSE-sfQoWMIXtIAQPsekQvqzA'; // sua chave
const client = supabase.createClient(supabaseUrl, supabaseKey);

// 🔧 Utilidades
const formatarValor = val =>
  parseFloat(val).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

const getValorFormatado = str =>
  parseFloat(str.replace(/\./g, '').replace(',', '.'));

// 🧩 Inicialização
const tabela = $('#tabelaRegistros').DataTable({
  order: [[3, 'asc'], [1, 'asc']],
  language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json' }
});

// 🧠 Quantidade automática
$('#categoria').on('change', () => {
  const val = $('#categoria').val();
  const desabilita = ['caixa-inicial', 'contratos'].includes(val);
  $('#quantidade').val(1).prop('disabled', desabilita);
});

// 💰 Máscara de valor
$('#valor').on('input', function () {
  let val = $(this).val().replace(/\D/g, '');
  val = (val / 100).toFixed(2).replace('.', ',');
  val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  $(this).val(val);
});

// 🧾 Submit do formulário
$('#formulario').on('submit', async e => {
  e.preventDefault();
  const nome = $('#nome').val();
  const tipo = $('#entrada').val();
  const categoria = $('#categoria').val();
  const quantidade = parseFloat($('#quantidade').val() || 1);
  const valor_unitario = getValorFormatado($('#valor').val());
  const valor_total = quantidade * valor_unitario;

  if (!nome || !tipo || !categoria || isNaN(valor_unitario)) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const payload = {
    nome,
    tipo,
    categoria,
    quantidade,
    valor_unitario,
    valor_total
  };

  if (registroEditando) {
    await client.from('registros_financeiros')
      .update(payload)
      .eq('id', registroEditando);
    mostrarToast('Registro atualizado!');
    registroEditando = null;
  } else {
    await client.from('registros_financeiros').insert(payload);
    mostrarToast('Registro inserido!');
  }

  fecharModal();
  await carregarDados();
});

// 📦 Carregar dados
async function carregarDados() {
  const { data: resumo } = await client.from('resumo_geral').select('*').single();
  const { data: categorias } = await client.from('total_por_categoria').select('*');
  const { data: registros } = await client.from('registros_detalhados').select('*');

  $('#cardEntradas').text(`R$ ${formatarValor(resumo.total_entradas || 0)}`);
  $('#cardSaidas').text(`R$ ${formatarValor(resumo.total_saidas || 0)}`);
  $('#cardSaldo').text(`R$ ${formatarValor(resumo.saldo_caixa || 0)}`);

  const cardBox = $('#cardSaldoBox');
  if ((resumo.saldo_caixa || 0) >= 0) {
    cardBox.removeClass('bg-red-100 border-red-600').addClass('bg-blue-100 border-blue-600');
  } else {
    cardBox.removeClass('bg-blue-100 border-blue-600').addClass('bg-red-100 border-red-600');
  }

  $('#cardsCategorias').empty();
  categorias.forEach(c => {
    $('#cardsCategorias').append(`
      <div class="bg-white border-l-4 border-blue-600 p-4 shadow rounded">
        <h3 class="text-sm font-semibold text-gray-500">${c.categoria}</h3>
        <p class="text-xl font-bold text-gray-800">R$ ${formatarValor(c.total)}</p>
      </div>
    `);
  });

  tabela.clear();
  registros.forEach(r => {
    const row = tabela.row.add([
      new Date(r.data_cadastro).toLocaleString('pt-BR'),
      r.nome,
      r.tipo,
      r.categoria,
      r.quantidade,
      `R$ ${formatarValor(r.valor_total)}`
    ]).draw(false);
    $(row.node()).attr('data-id', r.id);
  });

  const totalGeral = registros.reduce((acc, r) => acc + r.valor_total, 0);
  $('#totalGeral').text(`R$ ${formatarValor(totalGeral)}`);
}

// 🔄 CRUD
let registroEditando = null;

function abrirModal() {
  $('#modal').removeClass('hidden');
}
function fecharModal() {
  $('#modal').addClass('hidden');
  $('#formulario')[0].reset();
  $('#quantidade').prop('disabled', false);
  registroEditando = null;
}

async function excluirRegistro(id) {
  await client.from('registros_financeiros').delete().eq('id', id);
  await carregarDados();
}

function iniciarEdicao(id) {
  client.from('registros_financeiros').select('*').eq('id', id).single().then(({ data }) => {
    if (!data) return;
    $('#nome').val(data.nome);
    $('#entrada').val(data.tipo);
    $('#categoria').val(data.categoria).trigger('change');
    $('#quantidade').val(data.quantidade);
    $('#valor').val(data.valor_unitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
    registroEditando = data.id;
    abrirModal();
  });
}

// Inicialização
carregarDados();
