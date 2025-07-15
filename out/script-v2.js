// Atualização no script.js para suportar long press no mobile

let longPressTimeout;

function ativarLongPressNaTabela() {
  $('#tabelaRegistros tbody').on('touchstart', 'tr', function (e) {
    const row = $(this);
    const id = row.attr('data-id');
    if (!id) return;

    longPressTimeout = setTimeout(() => {
      exibirPopupMobile(row, id);
    }, 700); // Pressionar por 700ms
  });

  $('#tabelaRegistros tbody').on('touchend touchmove touchcancel', function () {
    clearTimeout(longPressTimeout);
  });
}

function exibirPopupMobile(row, id) {
  const nome = row.find('td[data-label="Nome"]').text();
  const valor = row.find('td[data-label="Total (R$")').text();

  const popup = $(
    `<div id="popupMobile" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-md w-72 text-center">
        <h2 class="text-lg font-bold mb-4">${nome}</h2>
        <p class="text-gray-600 mb-6">${valor}</p>
        <div class="flex justify-around">
          <button onclick="editarRegistro(${id}); fecharPopupMobile();" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Editar</button>
          <button onclick="mostrarConfirmacaoExclusao(${id}); fecharPopupMobile();" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Excluir</button>
        </div>
        <button onclick="fecharPopupMobile()" class="mt-4 text-sm text-gray-500 hover:text-gray-800">Cancelar</button>
      </div>
    </div>`
  );
  $('body').append(popup);
}

function fecharPopupMobile() {
  $('#popupMobile').remove();
}

$(document).ready(() => {
  // ... (demais funções já existentes)
  ativarLongPressNaTabela();
});
