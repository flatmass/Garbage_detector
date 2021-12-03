import json
import requests
from os import path

DATA_PATH = 'data'
IMG_PATH = 'imgs'
ANNOTATION_PATH = 'masks'


def process(obj, index, percent):
    name = data['External ID']

    file_content = requests.get(img_url)
    with open(path.join(DATA_PATH, IMG_PATH, name), 'wb') as img:
        img.write(file_content.content)

    file_content = requests.get(obj['instanceURI'])
    with open(path.join(DATA_PATH, ANNOTATION_PATH, name[:-4] + f'_{index}_{obj["value"]}' '_mask' + '.jpg'), 'wb') as img:
        img.write(file_content.content)

    last_percent = percent
    percent = int(count / len(dataset) * 100)
    if percent != last_percent:
        print('Downloaded %i%% images' % (percent,))
    return percent


if __name__ == '__main__':
    with open('export.json', 'r') as js:
        dataset = json.load(js)

    percent = 0
    for count, data in enumerate(dataset):
        try:
            img_url = data['Labeled Data']
            # 0 индекс потому что на изображении только один размеченный обьект
            for index, obj in enumerate(data['Label']['objects']):
                percent = process(obj, index, percent)
        except Exception as ex:
            continue

