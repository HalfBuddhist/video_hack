#!/usr/bin/env python
# coding=utf-8

import sys, os
import json
import requests
from contextlib import closing
from requests.exceptions import ConnectionError
from time import sleep
from you_get import common as you_get


def crawl_by_post_in_cycle(url, data=None, headers=None, cookies=None, msg_callback=None):
    """
    Get response of a post in cyling sending.
    :return:
    """
    time_sleep = 1
    while True:
        try:
            res = requests.post(url, data=data, headers=headers, cookies=cookies)
        except (BaseException) as e:
            res_message = repr(sys.exc_info()) + os.linesep + repr(e) + repr(e.args)
            if msg_callback:
                msg_callback(res_message)
                msg_callback("Sleep %s minues for next try." % time_sleep)
            sleep(60 * time_sleep)
            time_sleep *= 2
        else:
            return res


def crawl_by_get_in_cycle(url, params=None, headers=None, cookies=None, msg_callback=None):
    """
    Get response of a get request in cyling sending.
    :return:
    """
    time_sleep = 1
    while True:
        try:
            res = requests.get(url, params=params, headers=headers, cookies=cookies)
        except (BaseException) as e:
            res_message = repr(sys.exc_info()) + os.linesep + repr(e) + repr(e.args)
            if msg_callback:
                msg_callback(res_message)
                msg_callback("Sleep %s minues for next try." % time_sleep)
            sleep(60 * time_sleep)
            time_sleep *= 2
        else:
            return res


class ProgressBar(object):
    '''
    下载进度
    '''

    def __init__(self, title, count=0.0, run_status=None, fin_status=None, total=100.0, unit='', sep='/',
                 chunk_size=1.0):
        super(ProgressBar, self).__init__()
        self.info = "[%s] %s %.2f %s %s %.2f %s"
        self.title = title
        self.total = total
        self.count = count
        self.chunk_size = chunk_size
        self.status = run_status or ""
        self.fin_status = fin_status or " " * len(self.statue)
        self.unit = unit
        self.seq = sep

    def __get_info(self):
        """
        【名称】状态 进度 单位 分割线 总数 单位
        :return:
        """
        _info = self.info % (
            self.title, self.status, self.count / self.chunk_size, self.unit, self.seq, self.total / self.chunk_size,
            self.unit)
        return _info

    def refresh(self, count=1, status=None):
        self.count += count
        # if status is not None:
        self.status = status or self.status
        end_str = "\r"
        if self.count >= self.total:
            end_str = '\n'
            self.status = status or self.fin_status
            # print self.__get_info()


def download_video(url, path='./', file_name='undefined', message_callback=None):
    '''
    下载视频
    :param url: 视频url路径
    :param path: path ends with a '/'
    :param file_name: file new name.
    :param message_callback:
    :return:
    '''
    while True:
        time_sleep = 1
        try:
            with closing(requests.get(url, stream=True)) as response:
                chunk_size = 1024
                content_size = int(response.headers['content-length'])
                file_D = path + file_name
                if (os.path.exists(file_D) and os.path.getsize(file_D) == content_size):
                    if message_callback: message_callback('file %s existed and jumps.' % file_name)
                else:
                    progress = ProgressBar(file_name, total=content_size, unit="KB", chunk_size=chunk_size,
                                           run_status="Downloading...", fin_status="Finished.")
                    with open(file_D, "wb") as file:
                        for data in response.iter_content(chunk_size=chunk_size):
                            file.write(data)
                            progress.refresh(count=len(data))
        except (BaseException) as e:
            if message_callback:
                message_callback(repr(sys.exc_info()) + os.linesep + repr(e) + repr(e.args))
                message_callback("Sleep %s minutes for next try." % time_sleep)
            sleep(time_sleep * 60)
            time_sleep *= 2
        else:
            break


def download_video_you_get(url, path='./', file_name='undefined', msg_callback=None):
    """
    Download the video by you-get
    This is a single thread mode.
    :param url: url of the video, maybe not the final path.
    :param path: storage path for the video.
    :param file_name: here the name doesn't include the file type which
    is provided by the you-get.
    :param msg_callback:
    :return:
    """
    sys.argv = ['you-get', '-f', '-o', path, '-O', file_name, url]
    # print("thread before")
    you_get.main()
    # print("thread after")


if __name__ == '__main__':
    download_video_you_get("https://v.qq.com/x/cover/34rg8ntemeszdm4/g0634d23t2p.html", path='./test/',
                           file_name="test", msg_callback=print)

    # downloadVideo(
    # "http://v1-tt.ixigua.com/791554ace8d9cb7c89d19b37f2cf6c54/5ad30842/video/m/220a4ca6a341c244be597820e76075201a61156021300008ca3b67c382b/",
    # "t")

    # download_video(
    # "http://video.yidianzixun.com/video/get-url?key=user_upload/152394690997901c7404544876a2e08e145d0e292f852.mp4",
    # "./video/",
    # "tt.mp4", message_callback=print)