#!/usr/bin/env python
# coding=utf-8

import json
from time import sleep
import sys
import os

import requests

import utils.download_util
import run_param
from utils import url_utils, str_util


map_get_headers = {
    "Host": "m.365yg.com",
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Connection': 'keep-alive',
    'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
    'Accept-Encoding': 'gzip, deflate',
    "Cache-Control": "max-age=0",
    "Upgrade-Insecure-Requests": "1",
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
}

map_dict_headers_4_get_video_json_list = {
    "Host": "is.snssdk.com",
    "Proxy-Connection": "keep-alive",
    'User-Agent': 'Video 2.4.8 rv:2.4.8.3 (iPhone; iOS 11.3; zh_CN) Cronet'
}


def crawl_by_uid(p_str_uid, msg_callback):
    """
    Crawl by the user id for the watermelon site..
    :param p_str_uid: the user to crawl. (str)
    :param msg_callback: callback of the message.
    :return:
    """
    # ###########################################################
    # ## data prepare and initilize paras
    json_res = {}

    # load crawled video index
    crawled_index = {}
    if os.path.exists("wm/index_%s" % p_str_uid):
        # load index
        with open("wm/index_%s" % p_str_uid, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip(" \r\n\t")
                crawled_index[line] = True

    # ###########################################################
    # ## prepare the get url and params.
    # url_get_video_list_4_uid_full = "http://m.365yg.com/video/app/user/home/?to_user_id=52029171784&iid=30578803407&device_id=14231720144&format=json&app=video_article&max_behot_time=1523713438"
    # url_get_video_list_4_uid_simp = "http://m.365yg.com/video/app/user/home/?to_user_id=4492956276&max_behot_time=0"
    url_get_video_list_4_uid_root = "http://m.365yg.com/video/app/user/home/?"
    url_video_params = url_utils.dict_2_url_params("yidian/yd_news_list_4_channel_get_url_paras.json")
    # add the user id
    url_video_params = "to_user_id=" + p_str_uid
    url_get_video_list_4_uid_root += url_video_params


    # ###########################################################
    # ## crawler in a cycle.
    cnt_video = 0  # video downloaded, exclude the videos filterred.
    l_l_max_behot_time = 0
    while True:
        try:
            # form the start and end params
            url_crawl = "%s&max_behot_time=%s" % (url_get_video_list_4_uid_root, l_l_max_behot_time)
            msg_callback(url_crawl)
            # res = utils.download_util.crawl_by_get_in_cycle(url_crawl,
            # params=None,
            # headers=map_get_headers,
            # cookies=cookie_jar,
            # msg_callback=msg_callback)
            res = utils.download_util.crawl_by_get_in_cycle(url_crawl,
                                                            params=None,
                                                            headers=map_get_headers,
                                                            msg_callback=msg_callback)

            # msg_callback(res.text)
            msg_callback(str(res.status_code))
            res_json = json.loads(res.text, encoding="utf-8")
            if res_json['total_number'] > 0:
                # crawling success
                run_param.sleep_base_when_forbidden = 1  # reset the sleep interval.
                msg_callback("Found %s videos." % (len(res_json["data"])))

                # download the video and info
                result = res_json["data"]
                for item in result:
                    if True:
                        # update the max behot time
                        l_l_max_behot_time = item['behot_time']

                        # download begin, get file info.
                        # remove the bad characters in the name.
                        title = item['title'].replace('\\', '').replace('/', '')
                        title = str_util.validateTitle(title)  # remove the illegal chars.
                        mins = item['video_duration'] / 60
                        seconds = item['video_duration'] % 60
                        duration = "%dm%ds" % (mins, seconds)
                        url_video = item['display_url']

                        # get file id for index
                        t_ustr_file_id_server = item['video_detail_info']['video_id']

                        # filter by the duration
                        if item['video_duration'] <= run_param.len_video_min \
                                or item['video_duration'] > run_param.len_video_max:
                            msg_callback("Neglect for length: %s %s." % (url_video, title))
                            continue

                        # filter by the index
                        if t_ustr_file_id_server in crawled_index:
                            msg_callback("Video has been crawled and neglected here.")
                            continue

                        # send message.
                        msg_callback("Downloading: %s to %s." % (url_video, title))
                        cnt_video += 1

                        # download.
                        utils.download_util.download_video_you_get(url_video,
                                                                   "%swm/%s/" % (run_param.drive_base_path, p_str_uid),
                                                                   title, msg_callback=msg_callback)
                        # update the index
                        crawled_index[t_ustr_file_id_server] = True
                    elif 'title' in item and item['ctype'] != 'video_live':
                        msg_callback("News type is [%s], neglect here." % item['ctype'])
                        continue
                    else:
                        # this is posion holder, remove it
                        msg_callback("Found posion holder, remove it.")
                        continue

                # update the next cycle
                sleep(res_json['total_number'] / 10 * run_param.yidian_sleep_every_10)
            else:
                # other errors.
                msg_callback(str(res_json))
                # msg_callback("Crawling failed for: %s." % res_json['reason'])
                msg_callback("Crawling failed, found %s videos." % cnt_video)
                break
        except (BaseException) as e:
            res_message = repr(sys.exc_info()) + os.linesep + repr(e) + repr(e.args)
            msg_callback(res_message)
            json_res = {"status_code": 1, "message": res_message}
            break

    # write back to video index.
    with open("watermelon/index_%s" % p_str_uid, "w", encoding="utf-8") as f:
        for index in crawled_index:
            f.write("%s\n" % index)

    return json_res if json_res else {"status_code": 0, "message": ""}


def crawl_by_category(p_str_category, msg_callback):
    """
    Crawl the watermelon site by the category.
    :param p_str_category: the category in zh_CN
    :param msg_callback: callback function for the message.
    :return:
    """
    # ###########################################################
    # data prepare and initilize
    json_res = {}

    with open("watermelon/wm_category_id.json", "r", encoding='utf-8') as f:
        map_id_channel = json.load(f)

    # load crawled video index
    crawled_index = {}
    if os.path.exists("watermelon/index_%s" % map_id_channel[p_str_category]):
        # load index
        with open("watermelon/index_%s" % p_str_category, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip(" \r\n\t")
                crawled_index[line] = True


    # ###########################################################
    # ## ulr prepare for the crawling.
    url_video_cat_root_path = "http://is.snssdk.com/video/app/stream/v51/?"
    url_video_params = url_utils.dict_2_url_params("watermelon/wm_video_list_4_channel_get_url_paras.json")
    # add the category parameters.
    url_video_params += "&category=" + map_id_channel[p_str_category]
    url_video_cat_root_path += url_video_params


    # ###########################################################
    # ## crawler in a cycle.
    cnt_video = 0
    l_l_max_behot_time = 0
    while True:
        try:
            # form the start and end params
            url_crawl = "%s&max_behot_time=%s" % (url_video_cat_root_path, l_l_max_behot_time)
            msg_callback(url_crawl)
            res = utils.download_util.crawl_by_get_in_cycle(url_crawl,
                                                            params=None,
                                                            headers=map_dict_headers_4_get_video_json_list,
                                                            msg_callback=msg_callback)

            msg_callback(str(res.status_code))
            # print(res.text)  # in utf-8
            res_json = json.loads(res.text, encoding="utf-8")
            if res_json['total_number'] > 0:
                # crawling success
                run_param.sleep_base_when_forbidden = 1  # reset the sleep interval.
                msg_callback("Found %s videos." % (len(res_json["data"])))

                # download the video and info
                result = res_json["data"]
                for it_item_json in result:
                    # get the new json item
                    item = json.loads(it_item_json['content'], encoding='utf-8')
                    if 'media_name' in item:
                        # this is not an advertisement. media name is the name of the media entry.
                        # update the max behot time
                        l_l_max_behot_time = item['behot_time']

                        # download begin, get file info.
                        # remove the bad characters in the name.
                        title = item['title'].replace('\\', '').replace('/', '')
                        title = str_util.validateTitle(title)  # remove the illegal chars.
                        mins = item['video_duration'] / 60
                        seconds = item['video_duration'] % 60
                        duration = "%dm%ds" % (mins, seconds)
                        url_video = item['display_url']

                        # get file id for index
                        t_ustr_file_id_server = item['video_detail_info']['video_id']

                        # filter by the duration
                        if item['video_duration'] <= run_param.len_video_min \
                                or item['video_duration'] > run_param.len_video_max:
                            msg_callback("Neglect for length: %s %s." % (url_video, title))
                            continue

                        # filter by the index
                        if t_ustr_file_id_server in crawled_index:
                            msg_callback("Video has been crawled and neglected here.")
                            continue

                        # send message.
                        msg_callback("Downloading: %s to %s." % (url_video, title))
                        cnt_video += 1

                        # download.
                        utils.download_util.download_video_you_get(
                            url_video, "%swm/%s/" % (run_param.drive_base_path, p_str_category),
                            title, msg_callback=msg_callback)
                        # update the index
                        crawled_index[t_ustr_file_id_server] = True
                    elif 'tag' in item and item['tag'] == 'ad':  # this is an ad.
                        msg_callback("Video type is %s, neglect here." % item['tag'])
                        continue
                    else:
                        # this is posion holder, remove it
                        msg_callback(str(item))  # to debug what the item is.
                        msg_callback("Found something unrecognizable, remove it.")
                        continue
                # update the next cycle
                sleep(run_param.yidian_sleep_every_10)  # only three per time
            else:
                # other errors.
                msg_callback(str(res_json))
                msg_callback("Crawling failed, found %s videos." % cnt_video)
                break
        except (BaseException) as e:
            res_message = repr(sys.exc_info()) + os.linesep + repr(e) + repr(e.args)
            msg_callback(res_message)
            json_res = {"status_code": 1, "message": res_message}
            break

    # write back to video index.
    with open("watermelon/index_%s" % p_str_category, "w", encoding="utf-8") as f:
        for index in crawled_index:
            f.write("%s\n" % index)

    return json_res if json_res else {"status_code": 0, "message": ""}


def crawl_by_cat():
    """
    for test use.
    :return:
    """
    url = "http://is.snssdk.com/video/app/stream/v51/?" \
          "fp=FSTqLr5qP2XZFl4ZPrU1FlFIcSG1&version_code=6.4.8&" \
          "app_name=video_article&vid=494463A4-F2FC-4B37-B35C-D7C66DFBC9A0&" \
          "device_id=14231720144&channel=App%20Store&resolution=750*1334&" \
          "aid=32&ab_version=321290,326586,252882,240347,336664,318210,318551,334105,325211,335485,325953,321074,337117,320650&" \
          "openudid=9b2d9389ef957d42a29874127e01c8b980edca93&" \
          "live_sdk_version=1.3.0&idfv=494463A4-F2FC-4B37-B35C-D7C66DFBC9A0&" \
          "ac=WIFI&os_version=11.3&user_version=2.4.8&ssmix=a&" \
          "device_platform=iphone&iid=30578803407&ab_client=a1,f2,f7,e1&" \
          "device_type=iPhone%206S&idfa=0026F972-77FD-4A47-BE77-CBC0D05C0C2E&" \
          "strict=0&category=subv_video_agriculture&max_behot_time=0&" \
          "concern_id=&count=20&last_refresh_sub_entrance_interval=1525095472&" \
          "loc_mode=0&language=zh-Hans-CN&list_entrance=main_tab&refer=1"
    t_response = utils.download_util.crawl_by_get_in_cycle(url, headers=map_dict_headers_4_get_video_json_list)
    print(t_response.status_code)
    print(t_response.text)


if __name__ == "__main__":
    # test crawl by category.
    crawl_by_cat()

    # test crawl by uid
    # msg_callback = print
    # url_crawl = 'http://m.365yg.com/video/app/user/home/?to_user_id=51039995054&max_behot_time=0'
    # res = utils.download_util.crawl_by_get_in_cycle(url_crawl, params=None,
    # headers=map_get_headers,
    # msg_callback=msg_callback)
    # print(res)
    # print(repr(res.text))