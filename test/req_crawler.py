#!/usr/bin/env python
# coding=utf-8
"""
test the pyquery, py
"""

import requests
from pyquery import PyQuery as pq

url = "http://www.365yg.com/a6540255318931145223"
# url = "http://www.toutiao.com/a6296462662335201793/"

r = requests.get(url)
d = pq(r.content)

open("a6540255318931145223_1.html", "w", encoding='utf-8').write(r.content)

# print d

print(d('meta'))  # video元素不存在
print(d('#video'))  # id是video的元素是存在的