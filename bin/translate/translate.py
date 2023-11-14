import json
import logging
import os.path
import sys

from mtranslate import translate

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

languages = ['en', 'fr']
i18n_dir = 'src/assets/i18n'
json_file = 'root.json'


def translate_text(text: str, target_lang: str):
  translated_text = ""
  try:
    translated_text = translate(text, target_lang, 'en')
  except Exception:
    logger.error("Translation failed due to some issue, please try again later.")
  return translated_text


def translate_values(json_data, target_language: str):
  translated_data = {}
  for key, value in json_data.items():
    for trial in range(0, 3):
      translated_text: str = translate_text(value, target_language)
      if not (translated_text == ""):
        translated_data[key] = translated_text
        break

  output = {
    "locale": target_language,
    "translations": translated_data
  }
  messages_target_files = [
    os.path.join(i18n_dir, f"{target_language}.json"),
  ]
  for messages_target_file in messages_target_files:
    with open(os.path.abspath(messages_target_file), 'w', encoding='utf-8') as file:
      json.dump(output, file, indent=4)

    print(f"Translation completed for {target_language} and saved to {messages_target_file}")


def translate_data(json_object, target_language):
  translate_values(json_object, target_language)


def main():
  try:
    sample = translate("Sample", 'fr', 'en')
    print(f"Translation: {sample}")
  except Exception as e:
    logger.error(e)
    exit(-1)
  if sample == "":
    exit(-1)

  messages_source_file = os.path.join(i18n_dir, json_file)
  with open(messages_source_file, 'r') as file:
    json_data = json.load(file)

  threads = []
  for lang in languages:
    translate_data(json_data['translations'], lang)
    """
    thread = threading.Thread(target=translate_data, args=(json_data['translations'], lang))
    threads.append(thread)

print(threads)
for thread in threads:
    try:
        thread.daemon = True
        thread.start()
    except (KeyboardInterrupt, SystemExit):
        logger.warning(f"Exiting thread {thread.name}...")
        sys.exit()
"""


try:
  main()
except (KeyboardInterrupt, SystemExit):
  logger.warning("Exiting...")
  sys.exit()
