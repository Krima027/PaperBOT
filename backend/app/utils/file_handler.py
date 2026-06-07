import json
import os


def save_text(text, output_path):

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)


def save_json(data, output_path):

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


def create_directory(path):

    if not os.path.exists(path):
        os.makedirs(path)