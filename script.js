async function carregarDados() {
  const response = await fetch('data.json');
  const data = await response.json();

  // Atualiza preços
  document.getElementById('price-wbnb').innerText = data.precos?.WBNB || '-';
  document.getElementById('price-twt').innerText = data.precos?.TWT || '-';

  // Atualiza banca
  document.getElementById('banca').innerText = `${data.banca?.toFixed(2)} USDT`;

  // Atualiza histórico
  const historico = document.getElementById('historico');
  historico.innerHTML = '';
  data.transacoes.slice().reverse().forEach(tx => {
    historico.innerHTML += `
      <tr>
        <td>${tx.data}</td>
        <td>${tx.token}</td>
        <td>${tx.tipo}</td>
        <td>${tx.valor}</td>
      </tr>
    `;
  });

  // Atualiza gráfico
  const lucroCtx = document.getElementById('lucroChart').getContext('2d');
  const labels = data.grafico.map(x => x.data);
  const valores = data.grafico.map(x => x.lucro);

  new Chart(lucroCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Lucro USDT',
        data: valores,
        borderColor: '#00ffcc',
        fill: false
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

carregarDados();
setInterval(carregarDados, 15000); // Atualiza a cada 15 segundos
    
