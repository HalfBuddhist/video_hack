#!/usr/bin/env python
# coding=utf-8

"""
GUI ENTRY FOR THE CRAWLER.
input:  address, category OR uid(channel.)
output: video, index, log_date, log_main
"""

import tkinter as tk
from tkinter import scrolledtext, Menu, messagebox, ttk
import threading
import os

import yidian.yidian_func as ydf
import watermelon.watermelon as wm

from utils.encode_utils import remove_illegal_unicode_re
from utils.time_utils import time_str_YYYYmmddHHMMSS, get_timestamp_4log
from utils.thread_utils import MyThread
import run_param


class SettingTimeDialog(tk.Toplevel):
    """
    设置弹窗
    """

    def __init__(self):
        super().__init__()
        self.title('设置时间限制')

        # 弹窗界面
        self.setup_UI()


    def setup_UI(self):
        # 第一行（两列）
        row1 = tk.Frame(self)
        row1.pack(fill="x")
        tk.Label(row1, text='最短时长(秒)：', width=10).pack(side=tk.LEFT)
        self.len_min = tk.IntVar(value=run_param.len_video_min)
        tk.Entry(row1, textvariable=self.len_min, width=20).pack(side=tk.RIGHT)

        # 第二行
        row2 = tk.Frame(self)
        row2.pack(fill="x", ipadx=1, ipady=1)
        tk.Label(row2, text='最短时长(秒)：', width=10).pack(side=tk.LEFT)
        self.len_max = tk.IntVar(value=run_param.len_video_max)
        tk.Entry(row2, textvariable=self.len_max, width=20).pack(side=tk.RIGHT)

        # 第三行
        row3 = tk.Frame(self)
        row3.pack(fill="x")
        tk.Button(row3, text="取消", command=self.cancel).pack(side=tk.RIGHT)
        tk.Button(row3, text="确定", command=self.ok).pack(side=tk.RIGHT)


    def ok(self):
        self.userinfo = [self.len_min.get(), self.len_max.get()]  # 设置数据
        self.destroy()  # 销毁窗口

    def cancel(self):
        self.userinfo = None  # 空！
        self.destroy()


class MainWindow:
    """
    GUI ENTRY FOR THE CRAWLER.
    """

    def __init__(self):
        self.thread_crawl_monitor = None
        self._log_file = open("log_%s" % (time_str_YYYYmmddHHMMSS()), "a", encoding='utf-8')  # add the log function.
        self._interface_init()

    def _interface_init(self):
        """
        界面初始化
        :return:
        """
        # #####################################################
        # Create base frame that is an instance.
        self.window = tk.Tk()
        self.window.title("视频爬虫")  # Add a title
        self.window.resizable(0, 0)  # Disable resizing the GUI
        self.window.protocol('WM_DELETE_WINDOW', self._close_window)


        # #####################################################
        # Tab Control
        self.tabControl = tk.ttk.Notebook(self.window)  # Create Tab Control
        self.tab_yidian = tk.ttk.Frame(self.tabControl)  # Create a tab
        self.tabControl.add(self.tab_yidian, text='一点视频')  # Add the tab

        self.tab_watermelon = tk.ttk.Frame(self.tabControl)  # create the tab for the watermelon
        self.tabControl.add(self.tab_watermelon, text="西瓜视频")  # add into the tab.


        # self.tab_first = tk.ttk.Frame(self.tabControl)  # Create a tab
        # self.tabControl.add(self.tab_first, text='第一个')  # Add the tab
        #
        # self.tab_xigua = ttk.Frame(self.tabControl)  # Add a second tab
        # self.tabControl.add(self.tab_xigua, text='西瓜视频')  # Make second tab visible
        #
        # self.tab_unknown = ttk.Frame(self.tabControl)  # Add a third tab
        # self.tabControl.add(self.tab_unknown, text='未知')  # Make second tab visible

        self.tabControl.pack(expand=1, fill="both")  # Pack to make visible



        # #####################################################
        # tab_yidian
        self.frame_method = ttk.LabelFrame(self.tab_yidian, text='方法设置')
        self.frame_method.grid(column=0, row=0, padx=4, pady=4)


        # three methods
        values = ["按类别爬取", "按用户爬取", "按地址爬取"]
        # # create three Radiobuttons using one variable
        self.yidian_method = tk.IntVar()
        # Selecting a non-existing index value for radVar
        self.yidian_method.set(0)
        tk.Radiobutton(self.frame_method, text=values[0], variable=self.yidian_method, value=0).grid(column=0, row=1,
                                                                                                     sticky=tk.W)
        tk.Radiobutton(self.frame_method, text=values[1], variable=self.yidian_method, value=1).grid(column=0, row=2,
                                                                                                     sticky=tk.W)

        # Adding a Combobox for category.
        ttk.Label(self.frame_method, text="类别:").grid(column=1, row=1, sticky='E', padx=10)
        self.cate = tk.StringVar()
        self.cateCombobox = ttk.Combobox(self.frame_method, width=12, textvariable=self.cate)
        self.cateCombobox['values'] = ('搞笑', '萌宠', '音乐', '综艺', '动物', '看欧美', '生活')
        self.cateCombobox.grid(column=2, row=1)
        self.cateCombobox.current(0)  # 设置初始显示值，值为元组['values']的下标
        self.cateCombobox.config(state='readonly')  # 设为只读模式
        # print(self.cateCombobox.grid)


        # add a user id text
        ttk.Label(self.frame_method, text="ID:").grid(column=1, row=2, sticky='E', padx=10)
        self.tk_uid = tk.StringVar()
        # Adding a Textbox Entry widget
        ttk.Entry(self.frame_method, width=12, textvariable=self.tk_uid) \
            .grid(column=2, row=2, sticky='W')

        # # add a address bar
        # ttk.Label(self.frame_method, text="地址:").grid(column=1, row=3, sticky='E', padx=10)
        # self.addr = tk.StringVar()
        # # Adding a Textbox Entry widget
        # ttk.Entry(self.frame_method, width=30, textvariable=self.addr).grid(column=2, row=3,
        # sticky='W', columnspan=2)

        # Adding a Button
        tk.Button(self.frame_method, text="下载", width=15, height=3, command=self._yidian_download_pressed). \
            grid(row=1, column=3, rowspan=2, sticky='E')


        # Using a scrolled Text control to display message.
        self.yd_scr = scrolledtext.ScrolledText(self.tab_yidian, width=50, height=25, wrap=tk.WORD)
        self.yd_scr.grid(column=0, row=4, sticky='WE', columnspan=4)
        self.yd_scr.configure(state='disabled')


        # #####################################################
        # tab 2: watermelone
        self.frame_method_wm = ttk.LabelFrame(self.tab_watermelon, text='方法设置')
        self.frame_method_wm.grid(column=0, row=0, padx=4, pady=4)

        # three methods
        # # create three Radiobuttons using one variable
        self._wm_method = tk.IntVar()
        # Selecting a non-existing index value for radVar
        self._wm_method.set(0)
        tk.Radiobutton(self.frame_method_wm, text=values[0], variable=self._wm_method, value=0).grid(column=0, row=1,
                                                                                                     sticky=tk.W)
        tk.Radiobutton(self.frame_method_wm, text=values[1], variable=self._wm_method, value=1).grid(column=0, row=2,
                                                                                                     sticky=tk.W)
        # self.radio_method_2 = tk.Radiobutton(self.frame_method, text=values[2], variable=self.yidian_method, value=2)
        # self.radio_method_2.grid(column=0, row=3, sticky=tk.W)

        # Adding a Combobox for category.
        ttk.Label(self.frame_method_wm, text="类别:").grid(column=1, row=1, sticky='E', padx=10)
        self._wm_cate = tk.StringVar()
        self._tk_cateCombobox_wm = ttk.Combobox(self.frame_method_wm, width=12, textvariable=self._wm_cate)
        self._tk_cateCombobox_wm['values'] = ('音乐', '新农村', '体育', '爱生活', '美食', '游戏', '社会', '影视', '小视频', '推荐')
        self._tk_cateCombobox_wm.grid(column=2, row=1)
        self._tk_cateCombobox_wm.current(0)  # 设置初始显示值，值为元组['values']的下标
        self._tk_cateCombobox_wm.config(state='readonly')  # 设为只读模式

        # add a user id text entry.
        ttk.Label(self.frame_method_wm, text="ID:").grid(column=1, row=2, sticky='E', padx=10)
        self._tk_str_uid_wm = tk.StringVar()
        # Adding a Textbox Entry widget
        ttk.Entry(self.frame_method_wm, width=12, textvariable=self._tk_str_uid_wm) \
            .grid(column=2, row=2, sticky='W')

        # add a address bar
        # ttk.Label(self.frame_method, text="地址:").grid(column=1, row=3, sticky='E', padx=10)
        # self.addr = tk.StringVar()
        # Adding a Textbox Entry widget
        # ttk.Entry(self.frame_method, width=30, textvariable=self.addr). \
        # grid(column=2, row=3, sticky='W', columnspan=2)

        # Adding a Button
        tk.Button(self.frame_method_wm, text="下载", width=15, height=3, command=self._wm_download_pressed). \
            grid(row=1, column=3, rowspan=2, sticky='E')


        # Using a scrolled Text control to display message.
        self._tk_wm_scr = scrolledtext.ScrolledText(self.tab_watermelon, width=50, height=25, wrap=tk.WORD)
        self._tk_wm_scr.grid(column=0, row=4, sticky='WE', columnspan=4)
        self._tk_wm_scr.configure(state='disabled')



        # #####################################################
        # Creating a Menu Bar
        self.menuBar = Menu(self.window)
        self.window.config(menu=self.menuBar)

        # Add menu items
        setting_menu = Menu(self.menuBar, tearoff=0)
        setting_menu.add_command(label="时长", command=self._menu_setting_time_click)
        setting_menu.add_separator()
        self.menuBar.add_cascade(label="设置", menu=setting_menu)


        # #####################################################
        # Change the main windows icon
        # win.iconbitmap(r'C:\Users\feng\Desktop\研.ico')

        # Place cursor into name Entry
        # self.nameEntered.focus()
        # ======================
        # Start GUI
        # ======================
        self.window.mainloop()


    def _func_crawl_monitor(self, crawl_func, crawl_params):
        # crawl monitor thread.
        crawl_thread = MyThread(thread_func=crawl_func, args=crawl_params[0:2], msg_callback=crawl_params[1],
                                name=crawl_params[-1:][0])
        crawl_thread.start()
        crawl_thread.join()
        res_json = crawl_thread.getResult()
        if res_json['status_code'] == 0:
            # succeed
            messagebox.showinfo('通知', '爬取成功！')
        else:
            messagebox.showerror('错误', res_json['message'])


    def _yidian_download_pressed(self):
        # check if crawling
        if self.thread_crawl_monitor and self.thread_crawl_monitor.isAlive():
            messagebox.showinfo('通知', '正在爬取中...')
            return

        # clear the message box
        self.yd_scr.configure(state='normal')
        self.yd_scr.delete("1.0", tk.END)
        self.yd_scr.configure(state='disabled')
        self.yd_scr.yview(tk.END)  # scroll to the end.

        # download pressed
        method = self.yidian_method.get()
        if method == 0:
            self._yidian_msg_callback("Try to crawl yidian by method %s." % method)
            # create the folder
            final_path = run_param.drive_base_path + "yd/" + self.cate.get() + "/"
            if not os.path.exists(final_path):
                os.makedirs(final_path)

            # download by the cate.
            self.thread_crawl_monitor = threading.Thread(target=self._func_crawl_monitor,
                                                         args=(ydf.yidian_crawl_by_cate,
                                                               (self.cate.get(), self._yidian_msg_callback,
                                                                ydf.yidian_crawl_by_cate.__name__)))
            self.thread_crawl_monitor.start()
            # self.thread_crawl = threading.Thread(target=ydf.yidian_crawl_by_cate,
            # args=(self.cate.get(), self._yidian_message_callback))
            # self.thread_crawl.start()
        elif method == 1:
            self._yidian_msg_callback("Try to crawl yidian by method %s." % method)
            # get the uids
            # create the folder
            final_path = run_param.drive_base_path + "yd/" + self.tk_uid.get() + "/"
            if not os.path.exists(final_path):
                os.makedirs(final_path)

            # download by the uid.
            self.thread_crawl_monitor = \
                threading.Thread(target=self._func_crawl_monitor, args=(ydf.yidian_crawl_by_user,
                                                                        (self.tk_uid.get(), self._yidian_msg_callback,
                                                                         ydf.yidian_crawl_by_user.__name__)))
            self.thread_crawl_monitor.start()


        elif method == 2:
            self._yidian_msg_callback("Try to crawl yidian by method %s." % method)
            messagebox.showinfo('通知', '开发中')
            return
        else:
            self._yidian_msg_callback("Try to crawl yidian by wrong method %s." % method)
            messagebox.showinfo('通知', '开发中')
            return

    def _wm_download_pressed(self):
        # check if crawling
        if self.thread_crawl_monitor and self.thread_crawl_monitor.isAlive():
            messagebox.showinfo('通知', '正在爬取中...')
            return

        # clear the message box
        self._tk_wm_scr.configure(state='normal')
        self._tk_wm_scr.delete("1.0", tk.END)
        self._tk_wm_scr.configure(state='disabled')
        self._tk_wm_scr.yview(tk.END)  # scroll to the end.

        # download pressed
        method = self._wm_method.get()
        self._wm_msg_callback("Try to crawl watermelone by method %s." % method)
        if method == 0:
            # get the category.
            t_str_cate = self._wm_cate.get()

            # create the folder
            final_path = run_param.drive_base_path + "wm/" + t_str_cate + "/"
            if not os.path.exists(final_path):
                os.makedirs(final_path)

            # download by the cate.
            self.thread_crawl_monitor = threading.Thread(target=self._func_crawl_monitor,
                                                         args=(wm.crawl_by_category,
                                                               (t_str_cate, self._wm_msg_callback,
                                                                wm.crawl_by_category.__name__)))
            self.thread_crawl_monitor.start()

        elif method == 1:
            # get the uids
            t_str_uid = self._tk_str_uid_wm.get()

            # create the folder
            final_path = run_param.drive_base_path + "wm/" + self._tk_str_uid_wm.get() + "/"
            if not os.path.exists(final_path):
                os.makedirs(final_path)

            # download by the uid.
            self.thread_crawl_monitor = \
                threading.Thread(target=self._func_crawl_monitor, args=(wm.crawl_by_uid,
                                                                        (t_str_uid,
                                                                         self._wm_msg_callback,
                                                                         wm.crawl_by_uid.__name__)))
            self.thread_crawl_monitor.start()

        elif method == 2:
            messagebox.showinfo('通知', '开发中')
            return
        else:
            self._wm_msg_callback("Try to crawl watermelone by wrong method %s." % method)
            messagebox.showinfo('通知', '开发中')
            return

    def _close_window(self):
        self._yidian_msg_callback("Close Window.")
        # close the log file
        if self._log_file:
            self._log_file.close()

        # close the widow and exit.
        self.window.quit()
        self.window.destroy()
        exit()

    def _menu_setting_time_click(self):
        # check if crawling
        if self.thread_crawl_monitor and self.thread_crawl_monitor.isAlive():
            messagebox.showinfo('通知', '正在爬取中,请在下回爬取开始前设置...')
            return

        inputDialog = SettingTimeDialog()
        self.window.wait_window(inputDialog)
        res = inputDialog.userinfo
        if res:
            run_param.len_video_min, run_param.len_video_max = res

            # update message in ui.
            self.yd_scr.configure(state='normal')
            self.yd_scr.insert(tk.END, "设置时间限制：%s - %s" % (run_param.len_video_min, run_param.len_video_max) + '\n')
            self.yd_scr.configure(state='disabled')
            self.yd_scr.yview(tk.END)  # scroll to the end.

        else:
            # no setting.
            pass

    def _yidian_msg_callback(self, message):
        # presovle the message.
        message = get_timestamp_4log() + " " + remove_illegal_unicode_re(message)

        # log it
        if self._log_file:
            self._log_file.write("%s\n" % message)
            self._log_file.flush()

        # update message in ui.
        self.yd_scr.configure(state='normal')
        try:
            self.yd_scr.insert(tk.END, message + '\n')
        except tk.TclError as e:
            # raise e
            self.yd_scr.insert(tk.END, get_timestamp_4log() + 'name wrong encoded.' + '\n')
        self.yd_scr.configure(state='disabled')
        self.yd_scr.yview(tk.END)  # scroll to the end.
        # self.yd_scr.focus_lastfor()
        # self.yd_scr.yview_scroll(-1, 'units')


    def _wm_msg_callback(self, message):
        # presovle the message.
        message = get_timestamp_4log() + " " + remove_illegal_unicode_re(message)

        # log it
        if self._log_file:
            self._log_file.write("%s\n" % message)
            self._log_file.flush()

        # update message in ui.
        self._tk_wm_scr.configure(state='normal')
        try:
            self._tk_wm_scr.insert(tk.END, message + '\n')
        except tk.TclError as e:
            # raise e
            self._tk_wm_scr.insert(tk.END, get_timestamp_4log() + 'name wrong encoded.' + '\n')
        self._tk_wm_scr.configure(state='disabled')
        self._tk_wm_scr.yview(tk.END)  # scroll to the end.
        # self.yd_scr.focus_lastfor()
        # self.yd_scr.yview_scroll(-1, 'units')


t = MainWindow()
