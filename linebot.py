import requests

def linebot(msg):
    token = "zcnUg2LETTRMkZ1M7HLL+pz2RRvlBmUazp4yVEQvh61tIPbr4RILvdMrWTu/6IUwvT20AAYLx2IWpYgQTpsnQyPrprJxb0XPJgiIBWYvdavjxf6tPePMztbOVrk1gW52orOMsjhW7IKCexDP8OWXSAdB04t89/1O/w1cDnyilFU="
    my_headers = {'Content-Type':  'application/json', 
              'Authorization':'Bearer ' + token}
    my_data = {"to": id,
               'messages':"hi" }
    r = requests.post('https://api.line.me/v2/bot/message/push', headers = my_headers,data = my_data)
    print("(line)"+r.text)