from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import time

# Configura el navegador
chrome_options = Options()
chrome_options.add_argument("--headless=new")  # Ejecutar en segundo plano
chrome_options.add_argument("--disable-gpu")  # Desactivar GPU para mejor rendimiento
chrome_options.add_argument("--no-sandbox")  # Necesario para entornos sin interfaz gráfica

# Usa WebDriver Manager para manejar ChromeDriver
driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

try:
    # Abre la página de inicio de sesión
    driver.get("https://www.mcserverhost.com/login")  # Reemplaza con la URL correcta

    # Espera a que los campos de inicio de sesión estén presentes
    username_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "auth-username"))  # Campo de usuario
    )
    password_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "auth-password"))  # Campo de contraseña
    )
    login_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Iniciar sesión')]"))  # Botón de inicio de sesión
    )

    # Ingresa las credenciales
    username_field.send_keys("Gejjk")  # Nombre de usuario
    password_field.send_keys("7SrVLWA_npw_GQd")  # Contraseña

    # Haz clic en el captcha (botón "No soy un robot")
    captcha_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "recaptcha-checkbox-border"))  # Botón del captcha
    )
    captcha_button.click()

    # Haz clic en el botón de inicio de sesión
    login_button.click()

    # Espera a que la sesión se inicie y redirija a la página principal
    time.sleep(5)  # Ajusta este tiempo si es necesario

    # Haz clic en el botón del servidor
    server_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "server-d244c239"))  # Botón del servidor
    )
    server_button.click()

    # Espera a que la página del servidor cargue
    time.sleep(5)  # Ajusta este tiempo si es necesario

    # Espera a que el botón "RENEW" sea clickeable
    renew_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//a[contains(@class, 'billing-button') and contains(@class, 'renew')]"))  # Botón RENEW
    )
    renew_button.click()

    print("Botón RENEW presionado correctamente.")
except Exception as e:
    print(f"Ocurrió un error: {e}")
finally:
    # Cierra el navegador
    driver.quit()
