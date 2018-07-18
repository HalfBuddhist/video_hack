__author__ = 'Qingwei'

import urllib
import webbrowser

url = "http://www.365yg.com/a6540255318931145223"

content = urllib.urlopen(url).read()

print(content)

open("a6540255318931145223.html", "w", encoding='utf-8').write(content)


# webbrowser.open_new_tab("163.com.html")

#ebbrowser.open_new_tab("www.163.com")