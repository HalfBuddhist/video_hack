#!/usr/bin/env python
# coding=utf-8

import json

with open("yd_news_list_4_channel_get_res_2.json", "r", encoding='utf-8') as f:
    res_json = json.load(f)
    print(len(res_json['result']))