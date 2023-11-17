#!/bin/bash

translate() {
  npm run i18n && python3 bin/translate/translate.py
}

if [ "$1" = "translate" ]; then
    translate
else
    echo "Invalid command. Usage: $0 translate"
fi
