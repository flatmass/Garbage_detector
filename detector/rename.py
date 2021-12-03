import os


for file in os.listdir('data/masks'):
    os.rename(f'data/masks/{file}', f"data/masks/{file.replace('_2_empty', '').replace('_2_full', '')}")