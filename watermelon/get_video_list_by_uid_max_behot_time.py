#!/usr/bin/env python
# coding=utf-8

import json

with open("get_video_list_by_uid_max_behot_time.json", "r", encoding='utf-8') as f:
    res_json = json.load(f)
#     print(res_json)
#     print(len(res_json['result']))
# print(res_json)
print(len(res_json['data']))

print(res_json['data'][0]['title'])