async function buscarPais() {
    const nome = document.getElementById("inputPais").value;
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "Carregando...";
  
    try {
      const resposta = await fetch(`https://restcountries.com/v3.1/name/${nome}`);
      if (!resposta.ok) throw new Error("País não encontrado.");
  
      const dados = await resposta.json();
      const pais = dados[0];
  
      const idiomas = Object.values(pais.languages).join(", ");
      const moeda = Object.values(pais.currencies)[0].name;
  
      resultado.innerHTML = `
        <div class="card">
          <h2>${pais.translations.por.common} (${pais.cca2})</h2>
          <p><strong>Capital:</strong> ${pais.capital[0]}</p>
          <p><strong>População:</strong> ${pais.population.toLocaleString()}</p>
          <p><strong>Idiomas:</strong> ${idiomas}</p>
          <p><strong>Moeda:</strong> ${moeda}</p>
          <img src="${pais.flags.svg}" alt="Bandeira de ${pais.name.common}">
        </div>
      `;
    } catch (erro) {
      resultado.innerHTML = `<p style="color:red;">Erro: ${erro.message}</p>`;
    }
  }