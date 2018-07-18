#!/usr/bin/env python
# coding=utf-8

from kivy.app import App
from kivy.uix.button import Button
#import lxml

class TestApp(App):
    def build(self):
        return Button(text='Hello World')


TestApp().run()
