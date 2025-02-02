const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true, // Asegúrate de que esté en true
  });

  const page = await browser.newPage();

  // Navega a la página de inicio de sesión
  await page.goto('https://www.mcserverhost.com/login'); // Reemplaza con la URL de la página de inicio de sesión

  // Llena el campo de usuario
  await page.type('#auth-username', 'Gejjk'); // Reemplaza con tu usuario

  // Llena el campo de contraseña
  await page.type('#auth-password', '7SrVLWA_npw_GQd'); // Reemplaza con tu contraseña

  // Si hay un reCAPTCHA, haz clic en él (esto es un ejemplo básico)
  try {
    await page.waitForSelector('.recaptcha-checkbox-border', { timeout: 5000 });
    await page.click('.recaptcha-checkbox-border');
    console.log("reCAPTCHA resuelto.");
  } catch (error) {
    console.log("No se encontró el reCAPTCHA o no fue necesario.");
  }

  // Haz clic en el botón de inicio de sesión
  await page.click('button[action="login"]');

  // Espera a que la navegación termine (redirección después del inicio de sesión)
  await page.waitForNavigation();

  console.log("Sesión iniciada correctamente.");

  // Navega a la página donde está el botón "RENEW"
  await page.goto('https://www.mcserverhost.com/servers/d244c239/dashboard'); // Reemplaza con la URL de la página del botón

  // Espera 2 segundos para que la página cargue completamente
  await page.waitForTimeout(2000); // Espera 2 segundos antes de buscar el botón "RENEW"

  // Espera indefinidamente hasta que el botón "RENEW" esté disponible y haz clic en él
  try {
    await page.waitForSelector('a.billing-button.renew.pseudo'); // Sin timeout, espera indefinidamente
    await page.click('a.billing-button.renew.pseudo');
    console.log("Botón RENEW presionado correctamente.");
  } catch (error) {
    console.log("No se encontró el botón RENEW.");
  }

  // Captura una screenshot para depuración
  await page.screenshot({ path: 'screenshot.png' });
  console.log("Captura de pantalla guardada como screenshot.png");

  // Cierra el navegador
  await browser.close();
})();
