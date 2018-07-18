#!/usr/bin/env python
# coding=utf-8


import threading
from time import ctime


class MyThread(threading.Thread):
    """
    MyThread 子类化Thread
    Thread 的子类更为通用，我们把子类单独放在一个模块中，并加上一个getResult()函数用以返回函数的运行结果。
    """

    def __init__(self, thread_func, args, msg_callback, name=''):
        threading.Thread.__init__(self)
        self.name = name
        self.thread_func = thread_func
        self.args = args
        self.msg_callback = msg_callback
        # self.res = None

    def getResult(self):
        return self.res

    def run(self):
        self.msg_callback('Starting ' + self.name + ' at: ' + ctime())
        self.res = self.thread_func(*self.args)
        # self.res = apply(self.func, self.args) # for python2
        self.msg_callback(self.name + ' finished at: ' + ctime())
