from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time

# 웹 드라이버 초기화 및 페이지 로드
options = webdriver.ChromeOptions()
browser = webdriver.Chrome(options=options)
browser.get("https://blacktoon290.com/")

# 페이지가 완전히 로드될 때까지 대기
WebDriverWait(browser, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "row"))
)

# 천천히 스크롤 다운
scroll_pause_time = 1  # 1초 대기
pixels_to_scroll = 200  # 한 번에 스크롤할 픽셀 수
max_time_limit = 60  # 전체 작업 시간 제한 (60초)
start_time = time.time()  # 작업 시작 시간

while (time.time() - start_time) < max_time_limit:
    # 스크롤 다운
    browser.execute_script("window.scrollBy(0, {})".format(pixels_to_scroll))
    time.sleep(scroll_pause_time)
    # 스크롤 이동 후 새로운 높이를 계산
    new_height = browser.execute_script("return document.body.scrollHeight")
    if new_height == browser.execute_script("return window.pageYOffset + window.innerHeight"):
        break  # 페이지 끝에 도달

# 업데이트된 페이지 소스를 변수에 저장
html_source_updated = browser.page_source
soup = BeautifulSoup(html_source_updated, 'html.parser')

# 웹툰 타이틀 정보를 추출
webtoon_data = []
webtoon_list = soup.select('div.col-4.col-sm-4.col-md-2')  # CSS 선택자로 웹툰 리스트 선택

for webtoon in webtoon_list:
    title_tag = webtoon.select_one('a.toon-link[title]')
    image_tag = webtoon.select_one('img.back-img-style[src$=".png"]')  # PNG 이미지만 선택

    if title_tag and image_tag:
        title = title_tag['title']
        image_url = image_tag['src']
        webtoon_data.append({
            'title': title,
            'image_url': image_url
        })

# 브라우저 종료
browser.quit()

# 출력 확인
for data in webtoon_data:
    print(data)
