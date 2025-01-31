from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

# Configura el navegador en modo headless (sin interfaz gráfica)
chrome_options = Options()
chrome_options.add_argument("--headless=new")  # Ejecutar en segundo plano
chrome_options.add_argument("--disable-gpu")  # Desactivar GPU para mejor rendimiento
chrome_options.add_argument("--no-sandbox")  # Necesario para entornos sin interfaz gráfica

# Usa WebDriver Manager para manejar ChromeDriver
driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)

try:
    # Abre la página web
    driver.get("https://www.mcserverhost.com/servers/d244c239/dashboard")

    # Espera a que el botón esté presente en la página
    boton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "billing-button.renew.pseudo"))
    )
    boton.click()

    print("Botón RENEW presionado correctamente.")
except Exception as e:
    print(f"Ocurrió un error: {e}")
finally:
    # Cierra el navegador
    driver.quit()
