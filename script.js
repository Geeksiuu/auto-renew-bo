const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://www.mcserverhost.com/login', { waitUntil: 'load', timeout: 60000 });

  console.log("Página cargada.");

  // Ingresar credenciales
  await page.type('#auth-username', 'Gejjk');
  await page.type('#auth-password', '7SrVLWA_npw_GQd');

  // Intentar hacer clic en el botón usando evaluate()
  try {
    await page.evaluate(() => {
      document.querySelector('button[action="login"]').click();
    });
    console.log("Botón LOGIN presionado.");
  } catch (error) {
    console.log("No se pudo hacer clic en el botón LOGIN.");
  }

  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

  console.log("Sesión iniciada correctamente.");
  await browser.close();
})();
