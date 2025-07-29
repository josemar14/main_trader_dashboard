async function carregarDados() {
  const res = await fetch("data.json?" + new Date().getTime());
  const dados = await res.json();

  document.getElementById("banca").textContent = `$ ${dados.banca.toFixed(2)}`;
  document.getElementById("price-wbnb").textContent = dados.pares.WBNB.price.toFixed(4);
  document.getElementById("price-twt").textContent = dados.pares.TWT.price.toFixed(4);

  const historico = dados.transacoes.slice().reverse();
  const tabela = document.getElementById("historico");
  tabela.innerHTML = "";
  historico.forEach(tx => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${tx.data}</td>
      <td>${tx.token}</td>
      <td>${tx.tipo}</td>
      <td>$${tx.valor.toFixed(2)}</td>
    `;
    tabela.appendChild(tr);
  });

  const ctx = document.getElementById("lucroChart").getContext("2d");
  const labels = historico.map(tx => tx.data);
  const valores = historico.map(tx => tx.valor);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Lucro ($)',
        data: valores,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

carregarDados();
setInterval(carregarDados, 30000); // Atualiza a cada 30s
                    
