from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

# Configura el navegador en modo headless (sin interfaz gráfica)
chrome_options = Options()
chrome_options.add_argument("--headless")  # Ejecutar en segundo plano
chrome_options.add_argument("--disable-gpu")  # Desactivar GPU para mejor rendimiento
chrome_options.add_argument("--no-sandbox")  # Necesario para entornos sin interfaz gráfica

# Inicializa el navegador
driver = webdriver.Chrome(options=chrome_options)

try:
    # Abre la página web
    driver.get("https://www.mcserverhost.com/servers/d244c239/dashboard")

    # Espera a que la página cargue completamente
    time.sleep(5)  # Ajusta este tiempo si es necesario

    # Busca el botón por su clase y haz clic en él
    boton = driver.find_element(By.CLASS_NAME, "billing-button.renew.pseudo")
    boton.click()

    print("Botón RENEW presionado correctamente.")
except Exception as e:
    print(f"Ocurrió un error: {e}")
finally:
    # Cierra el navegador
    driver.quit()