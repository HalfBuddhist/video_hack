::@echo off  
::F:
::cd F:\learning\python\project\battest
::使用start是在新的dos窗口。
::python GUIEntry.py >> log_main 2>&1
::在新窗口中前台运行pythonw,目前会因窗口的消失而退出。
::start pythonw GUIEntry.py >> log_main 2>&1
::在新窗口中后台运行python GUI PROGRAMME，log_main也是有输出的。
start /b pythonw GUIEntry.py >> log_main 2>&1
::rem 使用ping命令暂停3s，这样可以看到调用python后的结果
::ping -n 5 127.0.0.1 > nul
::@echo on