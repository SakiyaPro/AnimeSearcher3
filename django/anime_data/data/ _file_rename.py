import glob
import os

image_names = glob.glob('./*.jpg')
ng_words = {"＼": "\\",
            "／": "/",
            "：": ":",
            "＊": "*",
            "？": "?",
            "``": '"',
            "＜": "<",
            "＞": ">",
            "｜": "|", }

for image_name in image_names:
    str = image_name.removeprefix("./").removesuffix(".jpg")

    for ng_word_key, ng_word_value in ng_words.items():
        if ng_word_value in str:
            str = str.replace(ng_word_value, ng_word_key)
            os.rename(image_name, "./{str}.jpg")
            image_name = "./{str}.jpg"
