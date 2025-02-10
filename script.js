const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });

  const page = await browser.newPage();

  // Navega a la página de inicio de sesión
  await page.goto('https://www.mcserverhost.com/login', { waitUntil: 'networkidle2' });

  // Llena el campo de usuario
  await page.type('#auth-username', 'Gejjk');

  // Llena el campo de contraseña
  await page.type('#auth-password', '7SrVLWA_npw_GQd');

  // Si hay un reCAPTCHA, intenta resolverlo
  try {
    await page.waitForSelector('.recaptcha-checkbox-border', { timeout: 5000 });
    await page.click('.recaptcha-checkbox-border');
    console.log("Intentando resolver reCAPTCHA...");
  } catch (error) {
    console.log("No se encontró reCAPTCHA o no fue necesario.");
  }

  // Haz clic en el botón de inicio de sesión
  await Promise.all([
    page.click('button[action="login"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' }) // Espera a que cargue completamente
  ]);

  console.log("Sesión iniciada correctamente.");

  // Navega a la página del servidor
  await page.goto('https://www.mcserverhost.com/servers/d244c239/dashboard', { waitUntil: 'networkidle2' });

  // Espera unos segundos para asegurar la carga completa
  await page.waitForTimeout(3000);

  // Espera hasta que el botón "RENEW" esté disponible y haz clic en él
  try {
    await page.waitForSelector('a.billing-button.renew.pseudo', { visible: true });
    await page.click('a.billing-button.renew.pseudo');
    console.log("Botón RENEW presionado correctamente.");
  } catch (error) {
    console.log("No se encontró el botón RENEW o tardó demasiado en aparecer.");
  }

  // Cierra el navegador
  await browser.close();
})();



