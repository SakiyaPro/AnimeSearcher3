from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import chromedriver_binary


def driver():
    # Optionsのインスタンスを生成（変数optionsに格納）
    options = Options()
    # headlessの設定をTrueにする
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-gpu')
    # webdriverの起動
    return webdriver.Chrome(options=options)

def All_Genre():
    # キー:変換前, バリュー:変換後
    genre_conversion = {
        "日常": "日常・ほのぼの",
        "青春": "青春",
        "感動": "感動",
        "恋愛": "恋愛・ラブコメ",
        "ラブコメ": "恋愛・ラブコメ",
        "ハーレム": "ハーレム",
        "逆ハーレム": "逆ハーレム",
        "スポーツ": "スポーツ",
        "バトル": "バトル",
        "ギャグ": "ギャグ・コメディ",
        "ファンタジー風": "ファンタジー",
        "ダークファンタジー": "ダークファンタジー",
        "SF": "SF・ロボット",
        "ロボット": "SF・ロボット",
        "ホラー": "ホラー・ミステリー",
        "ミステリー": "ホラー・ミステリー",
        "作画": "絵がきれい",
        "エロ": "エロあり",
        "音楽もの": "音楽・演奏",
        "腐女子": "腐女子向け",
    }
    return genre_conversion
