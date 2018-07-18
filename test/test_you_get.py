#!/usr/bin/env python
# coding=utf-8
"""
use you-get in a environment.
"""

import sys, os
from you_get import common as you_get


def _call_method1():
    sys.argv = ['you-get', '-h']
    t = you_get.main()


def _call_method2():
    os.system("you-get '-c'")


def _call_method3():
    you_get.main()

if __name__ == "__main__":
    _call_method1()
