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

map_post_headers = {
    'Host': 'a1.go2yd.com',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Accept-Language': 'zh-Hans;q=1, zh-Hant;q=0.9, zh-Hans-CN;q=0.8',
    'Content-Length': '1478',
    'Accept-Encoding': 'br,',
    'User-Agent': 'yidian-pro/4.6.2 (iPhone; iOS 11.3; Scale/2.00)'
}

map_get_headers = {
    'Host': 'a1.go2yd.com',
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Accept-Language': 'zh-Hans;q=1, zh-Hant;q=0.9, zh-Hans-CN;q=0.8',
    'Accept-Encoding': 'br,',
    'User-Agent': 'yidian-pro/4.6.2 (iPhone; iOS 11.3; Scale/2.00)'
}

map_post_data = {
    'clientInfo%5BuserInfo%5D%5Bcountry%5D': 'CN', 'clientInfo%5BdeviceInfo%5D%5BscreenWidth%5D': '750',
    'clientInfo%5BuserInfo%5D%5BserviceProvider%5D': '%E4%B8%AD%E5%9B%BD%E7%94%B5%E4%BF%A1',
    'clientInfo%5BdeviceInfo%5D%5Bmodel%5D': 'iPhone',
    'clientInfo%5BuserInfo%5D%5BplainIfa%5D': '0026F972-77FD-4A47-BE77-CBC0D05C0C2E',
    'reqid': 'b26x29ij_1523943791188_67', 'cv': '4.6.2.1',
    'clientInfo%5BuserInfo%5D%5Bregion%5D': '%E4%B8%AD%E5%9B%BD',
    'clientInfo%5BdeviceInfo%5D%5Bdevice%5D': '',
    'platform': '0', 'version': '020600', 'net': 'wifi',
    'clientInfo%5BuserInfo%5D%5Bifa%5D': '5ef9a039be1b5ae299140646e83ce2f5',
    'clientInfo%5BdeviceInfo%5D%5BiosVersion%5D': '11.3',
    'clientInfo%5BdeviceInfo%5D%5BscreenResolution%5D': '',
    'clientInfo%5BdeviceInfo%5D%5BscreenHeight%5D': '1334',
    'clientInfo%5BuserInfo%5D%5BappVersion%5D': '4.6.2.1',
    'clientInfo%5BuserInfo%5D%5Blanguage%5D': 'zh-Hans',
    'clientInfo%5BdeviceInfo%5D%5BscreenDensity%5D': '', 'appid': 'pro',
    'clientInfo%5BuserInfo%5D%5Bmac%5D': '',
    'distribution': 'com.apple.appstore'
}

map_get_params = {
    'appid': 'pro',
    'password': '223def41868f65bce07f17cf4415f7729f7749ca',
    'secret': 'e3e00911abb9ad1f4daee4f2c4351b60c5567944',
    'username': 'HG_37154CD18566',
    'version': '020600'
}


def yidian_login(msg_callback=None):
    """
    login yidian
    :return: cookie jar
    """
    # ###########################################################
    # ## get the cookie id or session id.
    # url_source_get = "https://a1.go2yd.com/Website/user/login-as-guest?appid=pro&cv=4.6.2.1&distribution=com.apple.appstore&idfa=5ef9a039be1b5ae299140646e83ce2f5&net=wifi&password=223def41868f65bce07f17cf4415f7729f7749ca&platform=0&reqid=1523942301029_16&secret=e3e00911abb9ad1f4daee4f2c4351b60c5567944&username=HG_37154CD18566&version=020600"
    # url_simple_login_get = "https://a1.go2yd.com/Website/user/login-as-guest?appid=pro&password=223def41868f65bce07f17cf4415f7729f7749ca&secret=e3e00911abb9ad1f4daee4f2c4351b60c5567944&username=HG_37154CD18566&version=020600"
    url_simple_login_get = "https://a1.go2yd.com/Website/user/login-as-guest"
    # http works too.
    # r = requests.get(url_simple_login_get)
    r = utils.download_util.crawl_by_get_in_cycle(url_simple_login_get, params=map_get_params,
                                                  msg_callback=msg_callback)
    # print r.status_code
    # print r.text
    # print(r.cookies)
    JSESSIONID = r.cookies["JSESSIONID"]
    if msg_callback:
        msg_callback("session id:\t%s" % JSESSIONID)
    # session set
    jar = requests.cookies.RequestsCookieJar()
    jar.set("JSESSIONID", JSESSIONID)
    return jar


def yidian_crawl_by_cate(cate, msg_callback=None):
    """
    Crawl by the cate
    :param cate: the cate to crawl. str name.
    :param msg_callback: callback
    :return:
    """
    # ###########################################################
    # data prepare and initilize
    run_param.yidian_interval_cstart = 0
    run_param.yidian_interval = 10
    run_param.yidian_channel_name = cate
    json_res = {}

    with open("yidian/yidian_channel_id.json", "r", encoding='utf-8') as f:
        map_id_channel = json.load(f)

    # load crawled video index
    crawled_index = {}
    if os.path.exists("yidian/index_%s" % map_id_channel[run_param.yidian_channel_name]):
        # load index
        with open("yidian/index_%s" % map_id_channel[run_param.yidian_channel_name], "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip(" \r\n\t")
                crawled_index[line] = True

    # login
    cookie_jar = yidian_login(msg_callback)


    # ###########################################################
    # ## get the list of videos
    # url_video_cat_list_post = 'https://a1.go2yd.com/Website/channel/news-list-for-channel?cend=30&channel_id=v25350&cstart=2&eventid=d1264b0c7e862f4b305bece13244744a&fields%5B%5D=title&fields%5B%5D=url&fields%5B%5D=source&fields%5B%5D=date&fields%5B%5D=image&fields%5B%5D=image_urls&fields%5B%5D=comment_count&fields%5B%5D=like&fields%5B%5D=up&fields%5B%5D=down&group_fromid=g181&infinite=true&ranker=search&refresh=0&searchentry=channel_navibar_sec&version=020600&distribution=com.apple.appstore&appid=pro&cv=4.6.2.1&platform=0&net=wifi&reqid=b26x29ij_1523943791188_67'
    url_video_cat_root_path = "https://a1.go2yd.com/Website/channel/news-list-for-channel?"
    url_video_params = url_utils.dict_2_url_params("yidian/yd_news_list_4_channel_post_url_paras.json")
    # add the reqid params
    # reqid = "b26x29ij_" + str(time_utils.current_milli_time()) + "_" + "56"
    # url_video_params += "&reqid=" + reqid
    # print  url_video_params
    # add the channel id
    url_video_params += "&channel_id=" + map_id_channel[run_param.yidian_channel_name]
    url_video_cat_root_path += url_video_params


    # ###########################################################
    # ## crawler in a cycle.
    cnt_video = 0

    while True:
        try:
            # form the start and end params
            url_crawl = url_video_cat_root_path + "&cstart=" + str(run_param.yidian_interval_cstart) + "&cend=" + str(
                run_param.yidian_interval_cstart + run_param.yidian_interval)
            if msg_callback:
                msg_callback(url_crawl)
            res = utils.download_util.crawl_by_post_in_cycle(url_crawl, data=map_post_data,
                                                             headers=map_post_headers,
                                                             cookies=cookie_jar,
                                                             msg_callback=msg_callback)
            # res = requests.post(url_crawl, data=payload, cookies=cookie_jar)
            if msg_callback:
                msg_callback(str(res.status_code))
            # print(res.text)  # in utf-8

            res_json = json.loads(res.text, encoding="utf-8")
            if res_json['status'] == u'failed' and res_json['code'] == 0 and res_json[
                'reason'] == 'BLENDER_RESULT is null':
                # crawl to the end.
                if msg_callback:
                    msg_callback("Crawling failed for: %s." % res_json['reason'])
                    msg_callback("Crawling Finished, found %s videos." % cnt_video)
                break
            elif res_json['status'] == u'failed' and res_json['code'] == 250 and res_json[
                'reason'] == 'user access forbidden':
                # forbidden by ip
                if msg_callback:
                    msg_callback("Crawling failed for: %s." % res_json['reason'])
                    msg_callback("Sleep %s minutes to restart." % run_param.sleep_base_when_forbidden)
                sleep(60 * run_param.sleep_base_when_forbidden)
                run_param.sleep_base_when_forbidden *= 2
                continue
            elif res_json['status'] == u'success' and res_json['code'] == 0:
                # crawling success
                run_param.sleep_base_when_forbidden = 1
                if msg_callback:
                    msg_callback("Found %s videos." % (len(res_json["result"])))
                # cat_str = res_json['channel_name'].encode("utf-8")

                # download the video and info
                result = res_json["result"]
                video_t_cnt = 0  # to update the cstart
                for item in result:
                    # print(item)
                    if 'title' in item:
                        video_t_cnt += 1
                        # download, get file info.
                        title = item['title'].replace('\\', '').replace('/',
                                                                        '')  # remove the bad characters in the name.
                        mins = item['duration'] / 60
                        seconds = item['duration'] % 60
                        duration = "%dm%ds" % (mins, seconds)
                        if "video_urls" not in item:
                            # get video_url, file_id_server,
                            if "video_url" not in item:
                                if msg_callback:
                                    msg_callback("Neglect for no video url: %s." % (title))
                                continue
                            else:
                                video_url_t = item['video_url'].replace('\\', '')
                                if video_url_t.startswith("http://sh.file.myqcloud.com/"):
                                    if msg_callback:
                                        msg_callback("Neglect for the site: %s." % video_url_t)
                                    continue
                                else:
                                    # should download
                                    url_video = video_url_t
                        else:
                            t_json_video_urls = item['video_urls']
                            url_video = t_json_video_urls[len(t_json_video_urls) // 2]['url'].replace('\\', '')

                        # get file type
                        dot_segs = url_video.split(".")
                        file_type = dot_segs[len(dot_segs) - 1]
                        # video_name = "[%s][%s][%s].%s" % (cat_str, title, duration, dot_segs[len(dot_segs) - 1])
                        video_name = "%s.%s" % (title, file_type)
                        video_name = str_util.validateTitle(video_name)

                        # get file id for index
                        slash_segs = url_video.split("/")
                        file_name_server = slash_segs[len(slash_segs) - 1]
                        file_id_server = file_name_server.split(".")[0]

                        # filter by the duration
                        if item['duration'] <= run_param.len_video_min or item['duration'] > run_param.len_video_max:
                            if msg_callback:
                                msg_callback("Neglect for length: %s %s." % (url_video, video_name))
                            continue

                        # filter by the index
                        if file_id_server in crawled_index:
                            if msg_callback:
                                msg_callback("Video has been crawled and neglected here.")
                            continue

                        # send message.
                        if msg_callback:
                            msg_callback("Downloading: %s to %s." % (url_video, video_name))

                        cnt_video += 1
                        utils.download_util.download_video(url_video,
                                                           "%syd/%s/" % (run_param.drive_base_path, cate), video_name,
                                                           message_callback=msg_callback)
                        # func type(item["title"]), item['title']
                        # update the index
                        crawled_index[file_id_server] = True
                    else:
                        # this is posion holder, remove it
                        continue

                # update the next cycle
                run_param.yidian_interval_cstart += video_t_cnt
                sleep(run_param.yidian_sleep_every_10)
            else:
                # other errors.
                if msg_callback:
                    msg_callback(str(res_json))
                    msg_callback("Crawling failed for: %s." % res_json['reason'])
                    msg_callback("Crawling failed, found %s videos." % cnt_video)
                break
        except (Exception, BaseException) as e:
            res_message = repr(sys.exc_info()) + os.linesep + repr(e) + repr(e.args)
            if msg_callback:
                msg_callback(res_message)
            json_res = {"status_code": 1, "message": res_message}
            break


    # write back to video index.
    with open("yidian/index_%s" % map_id_channel[run_param.yidian_channel_name], "w", encoding="utf-8") as f:
        for index in crawled_index:
            f.write("%s\n" % index)

    return json_res if json_res else {"status_code": 0, "message": ""}


def yidian_crawl_by_user(uid, msg_callback):
    """
    Crawl by the user id.
    :param uid: the user to crawl. (str)
    :param msg_callback: callback
    :return:
    """
    # ###########################################################
    # ## data prepare and initilize paras
    run_param.yidian_interval_cstart = 0
    run_param.yidian_interval = 20
    json_res = {}

    # load crawled video index
    crawled_index = {}
    if os.path.exists("yidian/index_%s" % uid):
        # load index
        with open("yidian/index_%s" % uid, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip(" \r\n\t")
                crawled_index[line] = True


    # ###########################################################
    # ## login
    cookie_jar = yidian_login(msg_callback)


    # ###########################################################
    # ## prepare the get url and params.
    # url_video_cat_list_post = 'https://a1.go2yd.com/Website/channel/news-list-for-channel?cend=30&channel_id=v25350&cstart=2&eventid=d1264b0c7e862f4b305bece13244744a&fields%5B%5D=title&fields%5B%5D=url&fields%5B%5D=source&fields%5B%5D=date&fields%5B%5D=image&fields%5B%5D=image_urls&fields%5B%5D=comment_count&fields%5B%5D=like&fields%5B%5D=up&fields%5B%5D=down&group_fromid=g181&infinite=true&ranker=search&refresh=0&searchentry=channel_navibar_sec&version=020600&distribution=com.apple.appstore&appid=pro&cv=4.6.2.1&platform=0&net=wifi&reqid=b26x29ij_1523943791188_67'
    url_video_uid_root_path = "https://a1.go2yd.com/Website/channel/news-list-for-channel?"
    url_video_params = url_utils.dict_2_url_params("yidian/yd_news_list_4_channel_get_url_paras.json")
    # add the reqid params
    # reqid = "b26x29ij_" + str(time_utils.current_milli_time()) + "_" + "56"
    # url_video_params += "&reqid=" + reqid
    # print  url_video_params
    # add the channel id
    url_video_params += "&channel_id=" + uid
    url_video_uid_root_path += url_video_params


    # ###########################################################
    # ## crawler in a cycle.
    cnt_video = 0

    while True:
        try:
            # form the start and end params
            url_crawl = "%s&cstart=%d&cend=%d" % (url_video_uid_root_path, run_param.yidian_interval_cstart,
                                                  run_param.yidian_interval_cstart + run_param.yidian_interval)
            msg_callback(url_crawl)
            res = utils.download_util.crawl_by_get_in_cycle(url_crawl,
                                                            params=None,
                                                            headers=map_get_headers,
                                                            cookies=cookie_jar,
                                                            msg_callback=msg_callback)
            msg_callback(str(res.status_code))

            res_json = json.loads(res.text, encoding="utf-8")
            if res_json['status'] == u'failed' and res_json['code'] == 0 \
                    and res_json['reason'] == 'BLENDER_RESULT is null':
                # crawl to the end.
                msg_callback("Crawling failed for: %s." % res_json['reason'])
                msg_callback("Crawling Finished, found %s videos." % cnt_video)
                break
            elif res_json['status'] == u'failed' and res_json['code'] == 250 \
                    and res_json['reason'] == 'user access forbidden':
                # forbidden by ip
                msg_callback("Crawling failed for: %s." % res_json['reason'])
                msg_callback("Sleep %s minutes to restart." % run_param.sleep_base_when_forbidden)
                sleep(60 * run_param.sleep_base_when_forbidden)
                run_param.sleep_base_when_forbidden *= 2
                continue
            elif res_json['status'] == u'success' and res_json['code'] == 0:
                # crawling success
                run_param.sleep_base_when_forbidden = 1  # reset the sleep interval.
                msg_callback("Found %s videos." % (len(res_json["result"])))
                # cat_str = res_json['channel_name'].encode("utf-8")

                # download the video and info
                result = res_json["result"]
                video_t_cnt = 0  # to update the cstart
                for item in result:
                    if 'title' in item and item['ctype'] == 'video_live':
                        # download begin, get file info.
                        # remove the bad characters in the name.
                        video_t_cnt += 1
                        title = item['title'].replace('\\', '').replace('/', '')
                        mins = item['duration'] / 60
                        seconds = item['duration'] % 60
                        duration = "%dm%ds" % (mins, seconds)
                        if "video_urls" not in item:
                            # get video_url, file_id_server,
                            if "video_url" not in item:
                                msg_callback("Neglect for no video url: %s." % (title))
                                continue
                            else:
                                video_url_t = item['video_url'].replace('\\', '')
                                if video_url_t.startswith("http://sh.file.myqcloud.com/"):
                                    msg_callback("Neglect for the site: %s." % video_url_t)
                                    continue
                                else:
                                    # should download
                                    url_video = video_url_t
                        else:
                            t_json_video_urls = item['video_urls']
                            url_video = t_json_video_urls[len(t_json_video_urls) // 2]['url'].replace('\\', '')

                        # get file type
                        dot_segs = url_video.split(".")
                        file_type = dot_segs[len(dot_segs) - 1]
                        # video_name = "[%s][%s][%s].%s" % (cat_str, title, duration, dot_segs[len(dot_segs) - 1])
                        video_name = "%s.%s" % (title, file_type)
                        video_name = str_util.validateTitle(video_name)

                        # get file id for index
                        slash_segs = url_video.split("/")
                        file_name_server = slash_segs[len(slash_segs) - 1]
                        file_id_server = file_name_server.split(".")[0]

                        # filter by the duration
                        if item['duration'] <= run_param.len_video_min or item['duration'] > run_param.len_video_max:
                            msg_callback("Neglect for length: %s %s." % (url_video, video_name))
                            continue

                        # filter by the index
                        if file_id_server in crawled_index:
                            msg_callback("Video has been crawled and neglected here.")
                            continue

                        # send message.
                        msg_callback("Downloading: %s to %s." % (url_video, video_name))

                        cnt_video += 1
                        utils.download_util.download_video(url_video, "%syd/%s/" % (run_param.drive_base_path, uid),
                                                           video_name,
                                                           message_callback=msg_callback)
                        # func type(item["title"]), item['title']
                        # update the index
                        crawled_index[file_id_server] = True
                    elif 'title' in item and item['ctype'] != 'video_live':
                        video_t_cnt += 1
                        msg_callback("News type is [%s], neglect here." % item['ctype'])
                        continue
                    else:
                        # this is posion holder, remove it
                        msg_callback("Found posion holder, remove it.")
                        continue

                # update the next cycle
                run_param.yidian_interval_cstart += video_t_cnt
                sleep(run_param.yidian_sleep_every_10)
            else:
                # other errors.
                msg_callback(str(res_json))
                msg_callback("Crawling failed for: %s." % res_json['reason'])
                msg_callback("Crawling failed, found %s videos." % cnt_video)
                break
        except (BaseException) as e:
            res_message = repr(sys.exc_info()) + os.linesep + repr(e) + repr(e.args)
            msg_callback(res_message)
            json_res = {"status_code": 1, "message": res_message}
            break

    # write back to video index.
    with open("yidian/index_%s" % uid, "w", encoding="utf-8") as f:
        for index in crawled_index:
            f.write("%s\n" % index)

    return json_res if json_res else {"status_code": 0, "message": ""}