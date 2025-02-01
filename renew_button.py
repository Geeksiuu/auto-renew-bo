from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import time
import os

# Cargar credenciales desde variables de entorno
USERNAME = os.getenv("MC_USERNAME", "")
PASSWORD = os.getenv("MC_PASSWORD", "")
LOGIN_URL = "https://www.mcserverhost.com/login"

if not USERNAME or not PASSWORD:
    raise ValueError("Las credenciales no están configuradas. Usa variables de entorno MC_USERNAME y MC_PASSWORD.")

# Configurar opciones del navegador
chrome_options = Options()
chrome_options.add_argument("--headless")  # Ejecutar en segundo plano
chrome_options.add_argument("--disable-gpu")  # Desactivar GPU para mejor rendimiento
chrome_options.add_argument("--no-sandbox")  # Necesario para entornos sin interfaz gráfica
chrome_options.add_argument("--disable-dev-shm-usage")

# Inicializar WebDriver
driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

try:
    driver.get(LOGIN_URL)
    
    # Esperar y localizar los elementos
    username_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "auth-username"))
    )
    password_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "auth-password"))
    )
    login_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Iniciar sesión')]"))
    ))

    # Ingresar credenciales
    username_field.send_keys(USERNAME)
    password_field.send_keys(PASSWORD)
    login_button.click()

    # Esperar a que se inicie la sesión
    time.sleep(5)

    # Intentar hacer clic en el botón del servidor
    server_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "server-d244c239"))
    )
    server_button.click()

    time.sleep(5)  # Esperar carga de página

    # Clic en el botón "RENEW"
    renew_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//a[contains(@class, 'billing-button') and contains(@class, 'renew')]"))
    )
    renew_button.click()

    print("Botón RENEW presionado correctamente.")
except Exception as e:
    print(f"Error: {e}")
finally:
    driver.quit()
