const puppeteer = require('puppeteer');

(async () => {
    try {
        // Iniciar el navegador
        const browser = await puppeteer.launch({ headless: true }); // headless: true para ejecución sin interfaz gráfica
        const page = await browser.newPage();

        // Navegar a la página web
        await page.goto('https://ejemplo.com'); // Reemplaza con la URL correcta

        // Buscar el botón "RENEW" usando su clase
        const renewButton = await page.$("a.billing-button.renew.pseudo");

        // Verificar si el botón existe
        if (renewButton) {
            // Hacer clic en el botón
            await renewButton.click();
            console.log("Botón RENEW presionado correctamente.");
        } else {
            console.log("No se encontró el botón RENEW.");
        }

        // Cerrar el navegador
        await browser.close();
    } catch (error) {
        console.error("Error al ejecutar el script:", error);
    }
})();
