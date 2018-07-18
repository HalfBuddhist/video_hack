#!/usr/bin/env python
# coding=utf-8
"""
require python 3.
"""

import re
# sys.setdefaultencoding("utf-8")

def remove_illegal_unicode_re(p, encoding="utf-8"):
    """
    delete the illegal chars.
    :param p: bytes or unicode str
    :param encoding:
    :return:
    """
    pattern = re.compile('[\\x00-\\x08\\x0b-\\x0c\\x0e-\\x1f]')
    if isinstance(p, bytes):
        pstr = p.decode(encoding, 'ignore')
        # delete illegal char, 删除非法字符
        # 因为以unicode编码的中文字符都是 '\u' 开头的, 不会有 '\x'
        str_legal = pattern.sub('', repr(pstr))
        # 重新生成python对象
        filterstr = eval(str_legal)
        # 转换为 utf-8编码
        bytes_r = filterstr.encode(encoding)
        return bytes_r
    elif isinstance(p, str):
        str_legal = pattern.sub('', repr(p))
        # 重新生成python对象
        filterstr = eval(str_legal)
        return filterstr
    else:
        print(type(p))
    pass


def remove_illegal_unicode(p, encoding="utf-8"):
    """
    remove illegal unicode characters in bytes or str.
    python3 required.
    another method is: s = re.compile('[\\x00-\\x08\\x0b-\\x0c\\x0e-\\x1f]').sub('', str)
    :param p:
    :return: unicode
    """
    if isinstance(p, bytes):
        pstr = p.decode(encoding, 'ignore')
        # delete illegal char, 删除非法字符
        # 因为以unicode编码的中文字符都是 '\u' 开头的, 不会有 '\x'
        str_legal = repr(pstr).replace('\\x', '')
        # 重新生成python对象
        filterstr = eval(str_legal)
        # 转换为 utf-8编码
        bytes_r = filterstr.encode(encoding)
        return bytes_r
    elif isinstance(p, str):
        str_legal = repr(p).replace('\\x', '')
        # 重新生成python对象
        filterstr = eval(str_legal)
        return filterstr
    else:
        print(type(p))