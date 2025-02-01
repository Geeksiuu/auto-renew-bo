const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Desactiva el sandbox
  });
  const page = await browser.newPage();
  await page.goto('URL_DE_LA_PAGINA_WEB'); // Reemplaza con la URL de la página web

  // Ejecutar el código en el contexto de la página
  const result = await page.evaluate(() => {
    const renewButton = document.querySelector("a.billing-button.renew.pseudo");
    if (renewButton) {
      renewButton.click();
      return "Botón RENEW presionado correctamente.";
    } else {
      return "No se encontró el botón RENEW.";
    }
  });

  console.log(result);

  await browser.close();
})();
