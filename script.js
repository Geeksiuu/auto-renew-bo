const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true, 
  });

  const page = await browser.newPage();
  await page.goto('https://www.mcserverhost.com/login', { waitUntil: 'networkidle2' });

  // Esperar y escribir usuario y contraseña
  await page.waitForSelector('#auth-username', { timeout: 10000 });
  await page.type('#auth-username', 'Gejjk');

  await page.waitForSelector('#auth-password', { timeout: 10000 });
  await page.type('#auth-password', '7SrVLWA_npw_GQd');

  // Intentar encontrar y hacer clic en el botón de login
  try {
    await page.waitForXPath("//button[contains(text(), 'Iniciar sesión')]", { timeout: 10000 });
    const [loginButton] = await page.$x("//button[contains(text(), 'Iniciar sesión')]");
    await loginButton.click();
  } catch (error) {
    console.log("No se encontró el botón de inicio de sesión.");
  }

  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  console.log("Sesión iniciada correctamente.");
  await browser.close();
})();

