var express = require('express');
var request = require('request');

const token = "zcnUg2LETTRMkZ1M7HLL+pz2RRvlBmUazp4yVEQvh61tIPbr4RILvdMrWTu/6IUwvT20AAYLx2IWpYgQTpsnQyPrprJxb0XPJgiIBWYvdavjxf6tPePMztbOVrk1gW52orOMsjhW7IKCexDP8OWXSAdB04t89/1O/w1cDnyilFU=";

const app = express(); //建立一個express 伺服器
app.post('/' , chatParser); // POST 方法**/

//------------build TCP/IP-------------
function chatParser(req ,res){
     
  // 定义了一个post变量，用于暂存请求体的信息
  var post = '';     
  // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
  req.on('data', function(chunk){   
      post += chunk;
  });

  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  req.on('end', function(){    
      post = JSON.parse(post);
      console.log(post.events[0]);
      var replyToken = post.events[0].replyToken;
      var posttype = post.events[0].type;
      var line_id = post.events[0].source.userId;      
      let text =[{
        "type":"text",
        "text":"您的ID:"+line_id
      },
      {
        "type":"text",
        "text":"\n輸入任何文字可以重複取得此ID，以鍵入start.bat"
      },
      {
        "type":"text",
        "text":"有問題聯絡:xu.6u.30@gmail.com"
      }
    ]
      
      if (posttype == 'message'){        
        replymessage(text);
      }

      if (posttype == 'join' || posttype == 'follow'){
        replymessage(text);
      }

      function replymessage(recpt){ //recpt is message object //for bug detecter
        
            var options = {
                url: "https://api.line.me/v2/bot/message/reply ",
                method: 'POST',
                headers: {
                  'Content-Type':  'application/json', 
                  'Authorization':'Bearer ' + token
                },
                json: {
                    'replyToken': replyToken,
                    'messages': recpt
                }
              };
                
              request(options, function (error, response, body) {
                  if (error) throw error;
                  console.log("(line)");
                  console.log(body);
              });

        
        
        
      }        
  });

}



//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen((process.env.PORT || 8080), function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});
//!!!240




