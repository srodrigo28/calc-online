// ver 2.2.1 script.js

const supabaseUrl = 'https://qlmmdhklaqyxpdctykjk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbW1kaGtsYXF5eHBkY3R5a2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzMxNzEsImV4cCI6MjA2NDIwOTE3MX0.EZyjWN4QT-Yf5f46dUKSE-sfQoWMIXtIAQPsekQvqzA' // mantenha o seu
const sb = supabase.createClient(supabaseUrl, supabaseKey)

let idParaExcluir = null

const tabela = $('#tabelaRegistros').DataTable({
  language: {
    url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json',
    search: 'Buscar:',
    lengthMenu: '',
  },
  dom: '<"top"f>rt<"bottom"ip><"clear">',
})

const formatarValor = val => parseFloat(val).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
const getValorFormatado = str => parseFloat(str.replace(/\./g, '').replace(',', '.'))

function abrirModal() {
  $('#modal').removeClass('hidden')
}
function fecharModal() {
  $('#modal').addClass('hidden')
  $('#formulario')[0].reset()
  $('#quantidade').prop('disabled', false)
  $('#registroId').val('')
}
function mostrarConfirmacaoExclusao(id) {
  idParaExcluir = id
  $('#modalConfirmacao').removeClass('hidden')
}
function fecharConfirmacao() {
  idParaExcluir = null
  $('#modalConfirmacao').addClass('hidden')
}
async function confirmarExclusao() {
  if (!idParaExcluir) return
  await sb.from('registros_financeiros').delete().eq('id', idParaExcluir)
  fecharConfirmacao()
  await carregarDados(getDataSelecionada())
}

function abrirModalSemRegistros() {
  $('#modalSemRegistros').removeClass('hidden')
}
function fecharModalSemRegistros() {
  $('#modalSemRegistros').addClass('hidden')
}

function atualizarDataHora() {
  setInterval(() => {
    $('#dataHora').text('Data e hora atual: ' + new Date().toLocaleString('pt-BR'))
  }, 1000)
}

function aplicarMascaraValor() {
  $('#valor').on('input', function () {
    let val = $(this).val().replace(/\D/g, '')
    val = (val / 100).toFixed(2).replace('.', ',')
    val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    $(this).val(val)
  })
}

function controleCategoriaQuantidade() {
  $('#categoria').on('change', () => {
    const val = $('#categoria').val()
    if (val === 'caixa-inicial') {
      $('#quantidade').val(1).prop('disabled', true)
    } else {
      $('#quantidade').prop('disabled', false)
    }
  })
}

function getDataSelecionada() {
  return $('#filtroData').val()
}

function setarDataHojeNoInput() {
  const hoje = new Date()
  const dataFormatada = hoje.toISOString().split('T')[0]
  $('#filtroData').val(dataFormatada)
}

function construirIntervalo(data) {
  const inicio = new Date(data + 'T00:00:00')
  const fim = new Date(data + 'T23:59:59.999')
  return { inicio: inicio.toISOString(), fim: fim.toISOString() }
}

async function carregarDados(dataEscolhida) {
  const { inicio, fim } = construirIntervalo(dataEscolhida)

  const { data: registros } = await sb
    .from('registros_detalhados')
    .select('*')
    .gte('data_cadastro', inicio)
    .lte('data_cadastro', fim)

  $('#cardsCategorias').empty()
  $('#cardEntradas').text('R$ 0,00')
  $('#cardSaidas').text('R$ 0,00')
  $('#cardSaldo').text('R$ 0,00')
  $('#cardSaldoBox')
    .removeClass('bg-red-100 border-red-600 bg-blue-100 border-blue-600')
    .addClass('bg-blue-100 border-blue-600')

  tabela.clear()

  if (!registros || registros.length === 0) {
    abrirModalSemRegistros()
    tabela.draw()
    $('#totalGeral').text('R$ 0,00')
    return
  }

  const totalEntradas = registros
    .filter(r => r.tipo === 'entrada')
    .reduce((acc, r) => acc + r.valor_total, 0)
  const totalSaidas = registros
    .filter(r => r.tipo === 'saida')
    .reduce((acc, r) => acc + r.valor_total, 0)
  const saldoCaixa = totalEntradas - totalSaidas

  $('#cardEntradas').text(`R$ ${formatarValor(totalEntradas)}`)
  $('#cardSaidas').text(`R$ ${formatarValor(totalSaidas)}`)
  $('#cardSaldo').text(`R$ ${formatarValor(saldoCaixa)}`)
  $('#cardSaldoBox')
    .removeClass('bg-red-100 border-red-600 bg-blue-100 border-blue-600')
    .addClass(
      saldoCaixa >= 0
        ? 'bg-blue-100 border-blue-600'
        : 'bg-red-100 border-red-600'
    )

  const totaisPorCategoria = {}
  registros.forEach(r => {
    totaisPorCategoria[r.categoria] = (totaisPorCategoria[r.categoria] || 0) + r.valor_total
  })

  Object.entries(totaisPorCategoria).forEach(([categoria, total]) => {
    $('#cardsCategorias').append(`
      <div class="bg-white border-l-4 border-blue-600 p-4 shadow rounded">
        <h3 class="text-sm font-semibold text-gray-500">${categoria}</h3>
        <p class="text-xl font-bold text-gray-800">R$ ${formatarValor(total)}</p>
      </div>
    `)
  })

  registros.forEach(r => {
    tabela.row.add([
      new Date(r.data_cadastro).toLocaleString('pt-BR'),
      r.nome,
      r.tipo,
      r.categoria,
      r.quantidade,
      `R$ ${formatarValor(r.valor_total)}`,
      `<button class='text-blue-500' onclick='editarRegistro(${r.id})'>✏️</button>
       <button class='text-red-500 ml-2' onclick='mostrarConfirmacaoExclusao(${r.id})'>🗑️</button>`
    ])
  })
  tabela.draw()

  const totalGeral = registros.reduce((acc, r) => acc + r.valor_total, 0)
  $('#totalGeral').text(`R$ ${formatarValor(totalGeral)}`)
}

async function editarRegistro(id) {
  const { data } = await sb.from('registros_financeiros').select('*').eq('id', id).single()
  if (data) {
    $('#registroId').val(data.id)
    $('#nome').val(data.nome)
    $('#entrada').val(data.tipo)
    $('#categoria').val(data.categoria).trigger('change')
    $('#quantidade').val(data.quantidade)
    $('#valor').val(data.valor_unitario.toFixed(2).replace('.', ','))
    abrirModal()
  }
}

$('#formulario').on('submit', async e => {
  e.preventDefault()
  const id = $('#registroId').val()
  const nome = $('#nome').val()
  const tipo = $('#entrada').val()
  const categoria = $('#categoria').val()
  const quantidade = parseFloat($('#quantidade').val() || 1)
  const valor_unitario = getValorFormatado($('#valor').val())
  const valor_total = quantidade * valor_unitario

  if (!nome || !tipo || !categoria || isNaN(valor_unitario))
    return alert('Preencha todos os campos corretamente.')

  if (id) {
    await sb
      .from('registros_financeiros')
      .update({ nome, tipo, categoria, quantidade, valor_unitario, valor_total })
      .eq('id', id)
  } else {
    await sb
      .from('registros_financeiros')
      .insert({ nome, tipo, categoria, quantidade, valor_unitario, valor_total })
  }

  fecharModal()
  await carregarDados(getDataSelecionada())
})

$(document).ready(() => {
  atualizarDataHora()
  aplicarMascaraValor()
  controleCategoriaQuantidade()
  setarDataHojeNoInput()
  carregarDados(getDataSelecionada())

  $('#filtroData').on('change', () => {
    fecharModalSemRegistros()
    carregarDados(getDataSelecionada())
  })

  window.abrirModal = abrirModal
  window.fecharModal = fecharModal
  window.editarRegistro = editarRegistro
  window.mostrarConfirmacaoExclusao = mostrarConfirmacaoExclusao
  window.fecharConfirmacao = fecharConfirmacao
  window.confirmarExclusao = confirmarExclusao
  window.fecharModalSemRegistros = fecharModalSemRegistros
})
