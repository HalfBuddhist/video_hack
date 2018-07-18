#!/usr/bin/env python
# coding=utf-8

import json

with open("yidian_chanel.json", "r", encoding="utf-8") as f:
    j = json.load(f)

print(j)
print(len(j["result"]))