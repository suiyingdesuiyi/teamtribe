function reset()
{
  document.getElementById('username').value="";
  document.getElementById('pwd').value="";
}
function login()
  {
      var xmlhttp;
      var username=document.getElementById('username').value;
      uername=encodeURIComponent(username);
      var password=document.getElementById('pwd').value;
        var md32 = hex_md5(password);
        var md16 = md32.substr(8, 16);
        var password=md16.toUpperCase();
        if(username==""){
                alert("昵称不能为空");
                form1.nickname.focus();
                return false;
            }
       if(password==""){
      alert("密码不能为空");
               form1.pwd.focus();
                return false;
            }
           var type;
            var reg = /^\w+\@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/;
            if(!isNaN(username)&&username.length==11)
            {
                type='2';
            }
            else if(reg.test(username)) {
                type='1';
            }
            else {
                type = '0';
            }
      if(window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
            　if(xmlhttp.readyState==1||xmlhttp.readyState==2||xmlhttp.readyState==3)
            { 
              document.getElementById('loading').style.display="block";
　　        } 

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               var text=xmlhttp.responseText;
               var resultJson=eval("("+text+")");
               var code=resultJson.code;
               var userid=resultJson.id;
               var TeamTribeToken=resultJson.TeamTribeToken;
               console.log(code);
               console.log(text);
               document.getElementById('loading').style.display="none";
                if (code == '0'){
                     sessionStorage.setItem('token',TeamTribeToken);
                     sessionStorage.setItem("userid",userid);
                     window.location.href="index.html";
                }
                if(code=='2')
                {
                  document.getElementById('error').innerHTML="用户名或密码不正确";
                  document.getElementById('error').style.display="block";
                }


            }
        }
      var url=config.url_login;
      var postData="username="+username;
      postData+="&password="+password;
      postData+="&usernameType="+type;
      postData+="&t="+Math.random();
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var t=setTimeout(connecttoFail,0.003);
        xmlhttp.send(postData);
    }
    function connecttoFail()
    {
       if(xmlhttp)
       {
        xmlhttp.abort();
       }
       document.getElementById('error').innerHTML="连接超时";
       document.getElementById('error').style.display="block";

    }