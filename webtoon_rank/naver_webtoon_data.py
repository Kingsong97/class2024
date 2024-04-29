from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options as ChromeOptions
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import json
from datetime import datetime

def scroll_to_bottom(driver):
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)  # 페이지 로드 대기
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "Poster__image--d9XTI"))
        )
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

options = ChromeOptions()
options.add_argument("--headless")
service = ChromeService(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)
driver.get("https://comic.naver.com/webtoon")

scroll_to_bottom(driver)

soup = BeautifulSoup(driver.page_source, 'html.parser')
webtoons = soup.find_all('li', class_='DailyListItem__item--LP6_T')

webtoon_data = []
for webtoon in webtoons:
    title_tag = webtoon.find('a', class_='ContentTitle__title_area--x24vt')
    image_tag = webtoon.find('img', class_='Poster__image--d9XTI')
    title = title_tag.text.strip() if title_tag else "Title not found"
    image_url = image_tag['src'] if image_tag else "Image URL not found"
    webtoon_data.append({'title': title, 'image_url': image_url})

driver.quit()

current_date = datetime.now().strftime("%Y-%m-%d")
filename = f"naver_webtoon_data_{current_date}.json"
with open(filename, 'w', encoding='utf-8') as file:
    json.dump(webtoon_data, file, ensure_ascii=False, indent=4)

print(f"JSON 파일이 저장되었습니다: {filename}")
