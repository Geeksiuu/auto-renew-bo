const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true, // Ejecuta en modo sin interfaz gráfica
  });

  const page = await browser.newPage();

  // Credenciales escritas directamente en el código (NO RECOMENDADO)
  const username = "Gejjk";
  const password = "7SrVLWA_npw_GQd";

  // Navega a la página de inicio de sesión
  await page.goto('https://www.mcserverhost.com/login', { waitUntil: 'networkidle2' });

  // Llena el campo de usuario y contraseña
  await page.type('#auth-username', username);
  await page.type('#auth-password', password);

  // Espera y hace clic en el botón de inicio de sesión
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  console.log("Sesión iniciada correctamente.");

  // Ir a la página del servidor
  await page.goto('https://www.mcserverhost.com/servers/d244c239/dashboard', { waitUntil: 'networkidle2' });

  // Espera a que el botón "RENEW" esté disponible y haz clic en él
  try {
    await page.waitForSelector('a.billing-button.renew.pseudo', { timeout: 5000 });
    await page.click('a.billing-button.renew.pseudo');
    console.log("Botón RENEW presionado correctamente.");
  } catch (error) {
    console.log("No se encontró el botón RENEW.");
  }

  // Captura de pantalla para verificar
  await page.screenshot({ path: 'renew-success.png' });

  // Cierra el navegador
  await browser.close();
})();

