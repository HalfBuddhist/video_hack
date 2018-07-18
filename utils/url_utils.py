#!/usr/bin/env python
# coding=utf-8
"""
url utile functions and class
"""

import json


def dict_2_url_params(dict_file_path):
    """
    turn the dict params to url format
    :param dict_file_path:
    :return: url format
    """
    with open(dict_file_path, "r", encoding='utf-8') as json_file:
        para_dict = json.load(json_file)

    url_params_str = []
    for key, value in para_dict.items():
        url_params_str.append(key + "=" + value)

    return '&'.join(url_params_str)


def url_2_dict(url_str):
    """
    turn url paramss to dict format.
    :param url_str: url str, eg. # body = "cend=30&channel_id=v25350&cstart=0&eventid=d1264b0c7e862f4b305bece13244744a&fields%5B%5D=title&fields%5B%5D=url&fields%5B%5D=source&fields%5B%5D=date&fields%5B%5D=image&fields%5B%5D=image_urls&fields%5B%5D=comment_count&fields%5B%5D=like&fields%5B%5D=up&fields%5B%5D=down&group_fromid=g181&infinite=true&ranker=search&refresh=0&searchentry=channel_navibar_sec&version=020600&distribution=com.apple.appstore&appid=pro&cv=4.6.2.1&platform=0&net=wifi&reqid=b26x29ij_1523943791188_67"
    :return:
    """
    json_params = {}
    segs = url_str.split('&')
    for seg in segs:
        slots = seg.split('=')
        json_params[slots[0]] = slots[1]
    return json_params


if __name__ == '__main__':
    # print(url_2_dict(
    # "cend=30&channel_id=v25350&cstart=0&eventid=e783fa37936f1cb86d31505758f3c2f8&fields%5B%5D=title&fields%5B%5D=url&fields%5B%5D=source&fields%5B%5D=date&fields%5B%5D=image&fields%5B%5D=image_urls&fields%5B%5D=comment_count&fields%5B%5D=like&fields%5B%5D=up&fields%5B%5D=down&group_fromid=g181&infinite=true&ranker=search&refresh=0&searchentry=channel_navibar_sec&version=020600&distribution=com.apple.appstore&appid=pro&cv=4.6.2.1&platform=0&net=wifi&reqid=b26x29ij_1523948724965_52"))
    # print(
    # url_2_dict(
    # "cend=25&channel_id=v25350&cstart=10&eventid=e783fa37936f1cb86d31505758f3c2f8&fields%5B%5D=title&fields%5B%5D=url&fields%5B%5D=source&fields%5B%5D=date&fields%5B%5D=image&fields%5B%5D=image_urls&fields%5B%5D=comment_count&fields%5B%5D=like&fields%5B%5D=up&fields%5B%5D=down&group_fromid=g181&infinite=true&ranker=search&refresh=1&searchentry=channel_navibar_sec&version=020600&distribution=com.apple.appstore&appid=pro&cv=4.6.2.1&platform=0&net=wifi&reqid=b26x29ij_1523948749501_53"))
    # print(
    # url_2_dict(
    # "cend=35&channel_id=v25350&cstart=20&eventid=e783fa37936f1cb86d31505758f3c2f8&fields%5B%5D=title&fields%5B%5D=url&fields%5B%5D=source&fields%5B%5D=date&fields%5B%5D=image&fields%5B%5D=image_urls&fields%5B%5D=comment_count&fields%5B%5D=like&fields%5B%5D=up&fields%5B%5D=down&group_fromid=g181&infinite=true&ranker=search&refresh=1&searchentry=channel_navibar_sec&version=020600&distribution=com.apple.appstore&appid=pro&cv=4.6.2.1&platform=0&net=wifi&reqid=b26x29ij_1523948770563_54"))
    a = \
        "fp=FSTqLr5qP2XZFl4ZPrU1FlFIcSG1&version_code=6.4.8&app_name=video_article&vid=494463A4-F2FC-4B37-B35C-D7C66DFBC9A0&" \
        "device_id=14231720144&channel=App%20Store&" \
        "resolution=750*1334&aid=32&" \
        "ab_version=321290,326586,252882,240347,336664,318210,318551,334105,325211,335485,325953,321074,337117,320650&" \
        "openudid=9b2d9389ef957d42a29874127e01c8b980edca93&" \
        "live_sdk_version=1.3.0&idfv=494463A4-F2FC-4B37-B35C-D7C66DFBC9A0&ac=WIFI&os_version=11.3&user_version=2.4.8&" \
        "ssmix=a&device_platform=iphone&iid=30578803407&ab_client=a1,f2,f7,e1&" \
        "device_type=iPhone%206S&idfa=0026F972-77FD-4A47-BE77-CBC0D05C0C2E&strict=0&category=subv_video_agriculture&" \
        "min_behot_time=0&concern_id=&count=20&last_refresh_sub_entrance_interval=1525094724&loc_mode=0&" \
        "language=zh-Hans-CN&list_entrance=main_tab&refer=1"
    print(url_2_dict(a))

    # print(url_2_dict(
    # "cend=25&channel_id=v24744&cstart=10&eventid=a30329f8acb13fa007d9e21813bd69ef&fields%5B%5D=title&fields%5B%5D=url&fields%5B%5D=source&fields%5B%5D=date&fields%5B%5D=image&fields%5B%5D=image_urls&fields%5B%5D=comment_count&fields%5B%5D=like&fields%5B%5D=up&fields%5B%5D=down&group_fromid=g181&infinite=true&ranker=search&refresh=1&searchentry=channel_navibar_sec&version=020600&distribution=com.apple.appstore&appid=pro&cv=4.6.2.1&platform=0&net=wifi&reqid=b26x29ij_1524129222132_33"))