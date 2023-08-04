let seguroSeguradoraOptions;
const getSeguros = async () => {
  try {
    const data = await fetch('./seguros.json');
    seguroSeguradoraOptions = await data.json();
    console.log(seguroSeguradoraOptions);
  } catch (error) {
    return error.message;
  }
};
getSeguros();

const selectSeguro = document.getElementById('seguro');
const infoSeguro = document.getElementById('info-seguro');
const infoSeguradora = document.getElementById('info-seguradora');
const selectSeguradora = document.getElementById('seguradoras');

selectSeguro.addEventListener('change', () => {
  const selectedSeguro = selectSeguro.value;
  const seguradorasComSeguro = Object.entries(seguroSeguradoraOptions)
    .filter(([seguradora, options]) => options.seguros.includes(selectedSeguro))
    .map(([seguradora]) => seguradora);

  const seguros = seguradorasComSeguro.map((seguradora) => {
    const seguradoras = seguroSeguradoraOptions[seguradora];
    return `<a href="${seguradoras.link}" target="_blank">${seguradora}</a>`;
  });

  infoSeguro.innerHTML = `
        <h2>${selectedSeguro}</h2>
        <ul>${seguros.join('')}</ul>
    `;

  if (selectedSeguro === '0') {
    infoSeguro.innerHTML = '';
  }
});

selectSeguradora.addEventListener('change', () => {
  const selectedSeguradora = selectSeguradora.value;
  if (!seguroSeguradoraOptions.hasOwnProperty(selectedSeguradora)) {
    infoSeguradora.innerHTML = '';
    return;
  }
  const seguradora = seguroSeguradoraOptions[selectedSeguradora];
  const seguros = seguradora.seguros;
  const link = seguradora.link;

  const segurosLinks = seguros.map(
    (seguro) => `<a href="${link}" target="_blank">${seguro}</a>`
  );

  infoSeguradora.innerHTML = `
        <h2>${selectedSeguradora}</h2>
        <ul>${segurosLinks.join('')}</ul>`;
});
