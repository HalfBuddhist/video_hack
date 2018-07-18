#!/usr/bin/env python
# coding=utf-8

import re


def validateTitle(title):
    """
    去除非法字符，用于windows下文件的标题
    去除标题中的非法字符 (Windows)
    """
    rstr = r"[\/\\\:\*\?\"\<\>\|\n，？！!]"  # '/\:*?"<>|\n，？！!'
    new_title = re.sub(rstr, "", title)
    return new_title