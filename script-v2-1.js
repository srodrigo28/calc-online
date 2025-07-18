// ver 2.1 script.js

const supabaseUrl = 'https://qlmmdhklaqyxpdctykjk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbW1kaGtsYXF5eHBkY3R5a2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzMxNzEsImV4cCI6MjA2NDIwOTE3MX0.EZyjWN4QT-Yf5f46dUKSE-sfQoWMIXtIAQPsekQvqzA';
const sb = supabase.createClient(supabaseUrl, supabaseKey);

let idParaExcluir = null;

const tabela = $('#tabelaRegistros').DataTable({
 language: {
    url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json',
    search: "Buscar:",
     lengthMenu: "", // Remove o "Show entries"
  },
  dom: '<"top"f>rt<"bottom"ip><"clear">', // Remove o seletor de quantidade
});

const formatarValor = val => parseFloat(val).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
const getValorFormatado = str => parseFloat(str.replace(/\./g, '').replace(',', '.'));

function abrirModal() {
  $('#modal').removeClass('hidden');
}

function fecharModal() {
  $('#modal').addClass('hidden');
  $('#formulario')[0].reset();
  $('#quantidade').prop('disabled', false);
  $('#registroId').val('');
}

function mostrarConfirmacaoExclusao(id) {
  idParaExcluir = id;
  $('#modalConfirmacao').removeClass('hidden');
}

function fecharConfirmacao() {
  idParaExcluir = null;
  $('#modalConfirmacao').addClass('hidden');
}

async function confirmarExclusao() {
  if (!idParaExcluir) return;
  await sb.from('registros_financeiros').delete().eq('id', idParaExcluir);
  fecharConfirmacao();
  await carregarDados();
}

function atualizarDataHora() {
  setInterval(() => {
    $('#dataHora').text('Data e hora atual: ' + new Date().toLocaleString('pt-BR'));
  }, 1000);
}

function aplicarMascaraValor() {
  $('#valor').on('input', function () {
    let val = $(this).val().replace(/\D/g, '');
    val = (val / 100).toFixed(2).replace('.', ',');
    val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    $(this).val(val);
  });
}

function controleCategoriaQuantidade() {
  $('#categoria').on('change', () => {
    const val = $('#categoria').val();
    if (val === 'caixa-inicial') {
      $('#quantidade').val(1).prop('disabled', true);
    } else {
      $('#quantidade').prop('disabled', false);
    }
  });
}

async function carregarDados() {
  const { data: resumo } = await sb.from('resumo_geral').select('*').single();
  const { data: categorias } = await sb.from('total_por_categoria').select('*');
  const { data: registros } = await sb.from('registros_detalhados').select('*');

  $('#cardEntradas').text(`R$ ${formatarValor(resumo?.total_entradas || 0)}`);
  $('#cardSaidas').text(`R$ ${formatarValor(resumo?.total_saidas || 0)}`);
  $('#cardSaldo').text(`R$ ${formatarValor(resumo?.saldo_caixa || 0)}`);

  const cardBox = $('#cardSaldoBox');
  if ((resumo?.saldo_caixa || 0) >= 0) {
    cardBox.removeClass('bg-red-100 border-red-600').addClass('bg-blue-100 border-blue-600');
  } else {
    cardBox.removeClass('bg-blue-100 border-blue-600').addClass('bg-red-100 border-red-600');
  }

  $('#cardsCategorias').empty();
  categorias?.forEach(c => {
    $('#cardsCategorias').append(`
      <div class="bg-white border-l-4 border-blue-600 p-4 shadow rounded">
        <h3 class="text-sm font-semibold text-gray-500">${c.categoria}</h3>
        <p class="text-xl font-bold text-gray-800">R$ ${formatarValor(c.total)}</p>
      </div>
    `);
  });

  tabela.clear();
  registros?.forEach(r => {
    tabela.row.add([
      new Date(r.data_cadastro).toLocaleString('pt-BR'),
      r.nome,
      r.tipo,
      r.categoria,
      r.quantidade,
      `R$ ${formatarValor(r.valor_total)}`,
      `<button class='text-blue-500' onclick='editarRegistro(${r.id})'>✏️</button>
       <button class='text-red-500 ml-2' onclick='mostrarConfirmacaoExclusao(${r.id})'>🗑️</button>`
    ]);
  });
  tabela.draw();

  const totalGeral = registros?.reduce((acc, r) => acc + r.valor_total, 0) || 0;
  $('#totalGeral').text(`R$ ${formatarValor(totalGeral)}`);
}

async function editarRegistro(id) {
  const { data } = await sb.from('registros_financeiros').select('*').eq('id', id).single();
  if (data) {
    $('#registroId').val(data.id);
    $('#nome').val(data.nome);
    $('#entrada').val(data.tipo);
    $('#categoria').val(data.categoria).trigger('change');
    $('#quantidade').val(data.quantidade);
    $('#valor').val(data.valor_unitario.toFixed(2).replace('.', ','));
    abrirModal();
  }
}

$('#formulario').on('submit', async (e) => {
  e.preventDefault();
  const id = $('#registroId').val();
  const nome = $('#nome').val();
  const tipo = $('#entrada').val();
  const categoria = $('#categoria').val();
  const quantidade = parseFloat($('#quantidade').val() || 1);
  const valor_unitario = getValorFormatado($('#valor').val());
  const valor_total = quantidade * valor_unitario;

  if (!nome || !tipo || !categoria || isNaN(valor_unitario)) return alert('Preencha todos os campos corretamente.');

  if (id) {
    await sb.from('registros_financeiros').update({ nome, tipo, categoria, quantidade, valor_unitario, valor_total }).eq('id', id);
  } else {
    await sb.from('registros_financeiros').insert({ nome, tipo, categoria, quantidade, valor_unitario, valor_total });
  }

  fecharModal();
  await carregarDados();
});

$(document).ready(() => {
  atualizarDataHora();
  aplicarMascaraValor();
  controleCategoriaQuantidade();
  carregarDados();

  window.abrirModal = abrirModal;
  window.fecharModal = fecharModal;
  window.editarRegistro = editarRegistro;
  window.mostrarConfirmacaoExclusao = mostrarConfirmacaoExclusao;
  window.fecharConfirmacao = fecharConfirmacao;
  window.confirmarExclusao = confirmarExclusao;
});
