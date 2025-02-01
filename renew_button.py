try {
    const renewButton = document.querySelector("a.billing-button.renew.pseudo");
    if (renewButton) {
        renewButton.click();
        console.log("Botón RENEW presionado correctamente.");
    } else {
        console.log("No se encontró el botón RENEW.");
    }
} catch (error) {
    console.error("Error al ejecutar el script:", error);
}
