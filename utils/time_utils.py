#!/usr/bin/env python
# coding=utf-8
"""
date and time utils
"""

import time

# get the unix time stamp, in milliseconds. 每个时间戳都以自从1970年1月1日午夜（历元）经过了多长时间来表示。
# 时间戳单位最适于做日期运算。但是1970年之前的日期就无法以此表示了。太遥远的日期也不行，UNIX和Windows只支持到2038年。
current_milli_time = lambda: int(round(time.time() * 1000))
current_seconds_time = lambda: int(round(time.time()))


def time_str_YYYYmmddHHMMSS():
    """
    格式化成2018_04_21_10_55_34形式
    :return:
    """
    return time.strftime("%Y_%m_%d_%H_%M_%S", time.localtime())


def time_str_standard():
    # 格式化成2016-03-20 11:45:39形式
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())


def get_timestamp_4log():
    """
    得到标准的时间戳，用于log
    :return:
    """
    return "[%s]" % (time_str_standard())


if __name__ == "__main__":
    print(str(current_milli_time()))
    print(time_str_YYYYmmddHHMMSS())
    print(get_timestamp_4log())
