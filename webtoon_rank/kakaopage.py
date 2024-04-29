import json
import openpyxl
import requests
from tqdm import tqdm
import time
from bs4 import BeautifulSoup


def epi_info(series_id, state):
    epi_url = 'https://webtoon.kakao.com/content/text/' + str(series_id)
    epi_res = requests.get(epi_url)

    soup = BeautifulSoup(epi_res.content, 'html.parser')
    result = soup.select_one('#__NEXT_DATA__').get_text()
    json_data = json.loads(result)

    series_title = json_data['props']['initialState']['content']['contentMap'][str(series_id)]['title']
    genre = json_data['props']['initialState']['content']['contentMap'][str(series_id)]['genre']
    authors = json_data['props']['initialState']['content']['contentMap'][str(series_id)]['authors']
    viewCount = json_data['props']['initialState']['content']['contentMap'][str(series_id)]['viewCount']
    likeCount = json_data['props']['initialState']['content']['contentMap'][str(series_id)]['likeCount']
    isAdult = json_data['props']['initialState']['content']['contentMap'][str(series_id)]['isAdult']
    try:
        publisher = [value['names'][0] for value in json_data['props']['initialState']['content']['contentMap'][str(series_id)]['authorDetails'] if value['type']=='publisher'][0]
    except:
        publisher = '-'
        
    return [
        series_id,
        series_title,
        authors,
        publisher,
        isAdult,
        viewCount,
        likeCount,
        state
    ]


def get_series():
    # 연재작 수집
    state = '연재_일요일'
    url = 'https://gateway-kw.kakao.com/section/v1/timetables/days?placement=timetable_sun'

    res = requests.get(url)
    contents = res.json()['data'][0]['cardGroups'][0]['cards']

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.append([
        'series_id',
        'series_title',
        'authors',
        'publisher',
        'isAdult',
        'viewCount',
        'likeCount',
        'state'
    ])

    error_page = []

    for series in tqdm(contents):
        series_id = series['content']['id']

        try:
            ws.append(epi_info(series_id, state))
            time.sleep(3)

        except:
            print(series_id)
            error_page.append(series_id)


    wb.save('카카오웹툰_{}.xlsx'.format(state))
    print(error_page)

# 완결작 수집
def get_completed():
    state = '완결'
    url = 'https://gateway-kw.kakao.com/section/v1/timetables/days?placement=timetable_completed'
    res = requests.get(url)
    contents = res.json()['data'][0]['cardGroups'][0]['cards']

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.append([
        'series_id',
        'series_title',
        'authors',
        'publisher',
        'isAdult',
        'viewCount',
        'likeCount',
        'state'
    ])

    error_page = []

    for series in tqdm(contents):
        series_id = series['content']['id']

        try:
            ws.append(epi_info(series_id, state))
            time.sleep(3)

        except:
            print(series_id)
            error_page.append(series_id)


    wb.save('카카오웹툰_완결작_{}.xlsx'.format(2))
    print(error_page)

get_completed()
get_series()