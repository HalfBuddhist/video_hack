::@echo off  
::F:
::cd F:\learning\python\project\battest
::ʹ��start�����µ�dos���ڡ�
::python GUIEntry.py >> log_main 2>&1
::���´�����ǰ̨����pythonw,Ŀǰ���򴰿ڵ���ʧ���˳���
::start pythonw GUIEntry.py >> log_main 2>&1
::���´����к�̨����python GUI PROGRAMME��log_mainҲ��������ġ�
start /b pythonw GUIEntry.py >> log_main 2>&1
::rem ʹ��ping������ͣ3s���������Կ�������python��Ľ��
::ping -n 5 127.0.0.1 > nul
::@echo on