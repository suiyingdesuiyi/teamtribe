function show_welcome(){
    var userid=sessionStorage.getItem("userid");
    if(userid!=undefined)
    {
    get_byId(userid,0);
    }
}
function show_name(){
    var userid=sessionStorage.getItem("userid");
    if(userid!=undefined)
    {
      get_byId(userid,1);
    }
}
function server_welcome(result)
{
    document.getElementById('show_welcome').innerHTML="尊敬的"
    +result.user.nickname+",欢迎进入社团格子";
}
function server_name(result)
{
  document.getElementById('show_name').innerHTML=result.user.nickname;
}
function createXMLHttpRequest(){
	var request=false;
	if(window.XMLHttpRequest){
      request=new XMLHttpRequest();
	}
	else
	{
		request=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return request;
}
function ajax(xmlhttp,_method,_url,_param,_callback){
   if(typeof(xmlhttp)=='undefined'){
   	return;
   }
   xmlhttp.onreadystatechange=function(){
   	if(xmlhttp.readyState==4&&xmlhttp.status==200){
   		_callback(xmlhttp);
    }
   	
   }
   xmlhttp.open(_method,_url,true);
   if(_method=="POST"){
   	    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(_param);
   }
   else
   {
   	   xmlhttp.send(null);
   }
}
function login()
{
      var username=document.getElementById('username').value;
      var password=document.getElementById('pwd').value;
      if(username==""){
                document.getElementById('error').innerHTML="用户名不能为空";
	            document.getElementById('error').style.display="block";
                 document.getElementById('username').focus();
                return false;
            }
       else if(password==""){
               document.getElementById('error').innerHTML="密码不能为空";
	            document.getElementById('error').style.display="block";
	            document.getElementById('pwd').focus();
               form1.pwd.focus();
                return false;
            }
        else
        {
          document.getElementById('error').innerHTML="";
        }
        var md32 = hex_md5(password);
        var md16 = md32.substr(8, 16);
        var password=md16.toUpperCase();   
        username=encodeURIComponent(username);
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
var xhr_login=createXMLHttpRequest();
var t;
var data="username="+username+"&password="+password+"&usernameType="+type+"&t="+Math.random();
var url=config.url_login;
document.getElementById('loading').style.display="block";
function connecttoSuccess(request){
	console.log(request.responseText);
  document.getElementById('loading').style.display="none";
	var resultJson=eval('('+request.responseText+')');
	var code=resultJson.code;
	var TeamTribeToken=resultJson.TeamTribeToken;
	var userid=resultJson.id;
	if(code=='0'){
	     sessionStorage.setItem('token',TeamTribeToken);
       sessionStorage.setItem("userid",userid);
      window.location.href="index.html";
	}
	if(code=='2'){
		 document.getElementById('error').innerHTML="用户名或密码不正确";
     document.getElementById('error').style.display="block";
	}
	if(t) clearTimeout(t);
}
function connecttoFail(){
	if(xhr_login){
    document.getElementById('loading').style.display="none";
		xhr_login.abort();
	}
	document.getElementById('error').innerHTML="连接超时";
	document.getElementById('error').style.display="block";
}
if(xhr_login){
	ajax(xhr_login,"POST",url,data,connecttoSuccess);
	t1=setTimeout(connecttoFail,15000);
}
else{
    document.getElementById('error').innerHTML="服务异常";
	  document.getElementById('error').style.display="block";
}
}
function get_byId(id,type)
{
     var xhr_byId=createXMLHttpRequest();
     var token=sessionStorage.getItem("token");
     var data="id="+id+"&TeamTribeToken="+token;
     function connecttoSuccess(request){
          console.log(request.responseText);
          var resultJson=eval("("+request.responseText+")");   
          if(type=='0')
          {

             server_welcome(resultJson);
          }
          else if(type=='1')
          {
            server_name(resultJson);
          }
           else
          {

           update(resultJson.user.nickname,type,resultJson.user.isPublic);
          }
      }
      var url=config.url_byId;
      if(xhr_byId){
        ajax(xhr_byId,"POST",url,data,connecttoSuccess);
      }
     
}
function get_byName()
{
  var username=document.getElementById("info").value;
  var xhr_byName=createXMLHttpRequest();
  var data="username="+username+"&t="+Math.random();
  var url=config.url_byName;
   function connecttoSuccess(request){
    var text=request.responseText;
                    console.log("text:"+text);
                    var resultJson=eval("("+text+")");
                    // var Id=new Array();
                    // var length=0;
                    document.getElementById('content').innerHTML="";
                    for(var item in resultJson.id)
                    {
                      
                      // Id[length]=resultJson.id[item];
                      // var result=find(Id[length]);
                      // console.log("result:"+typeof(result));
                      // console.log("finded "+result.user.id);
                      var num=resultJson.id[item];
                      document.getElementById('content').innerHTML+="<a title=\"添加好友\"><input type=\"button\" class=\"add\" onclick=\"apply("+num+")\" /></a>"
                   +"<span class=\"information\">"+resultJson.id[item]+"&nbsp&nbsp</span>";
                      length++;
                    }
  }
  if(xhr_byName){
    ajax(xhr_byName,"POST",url,data,connecttoSuccess);
  }
}
function getRequest(type,id)
{
  var xhr_getRequest=createXMLHttpRequest();
  var token=sessionStorage.getItem("token");
  var url=config.url_getRequest;
  var data="TeamTribeToken="+token+"&id="+id+"&t="+Math.random();
  function connecttoSuccess(request){
         console.log(request.responseText);
          var resultJson=eval("("+request.responseText+")");
          var id1=resultJson.relationRequest.id1;
          var id=resultJson.relationRequest.id;
          console.log(id);
          var requestReason=resultJson.requestReason;
          document.getElementById('content').innerHTML+="<a title=\"详细信息\"><input type=\"button\" class=\"more\" onclick=\"reply("+id+")\" /></a>"
          +"<span class=\"information\">"+id1+"&nbsp&nbsp</span>";
  }
  if(xhr_getRequest)
  {
    ajax(xhr_getRequest,"POST",url,data,connecttoSuccess);
  }
}
function getMessage()
{
  var xhr_getMessage=createXMLHttpRequest();
  var token=sessionStorage.getItem("token");
  var url=config.url_getMessage;
  var data="TeamTribeToken="+token+"&type="+1+"&t="+Math.random();
  function connecttoSuccess(request){
          console.log(xhr_getMessage.responseText);
          var resultJson=eval("("+xhr_getMessage.responseText+")");
                  var Id=new Array();
                  var Type=new Array();
                  var length=0;
                  document.getElementById('content').innerHTML="";
                  for(var item in resultJson.message)
                  {
                    
                    Id[length]=resultJson.message[item].id;
                    Type[length]=resultJson.message[item].type;
                    console.log(Type[length]+"   "+Id[length]);
                    getRequest(Type[length],Id[length]);
                    length++;
                  }
  }
  if(xhr_getMessage){
    ajax(xhr_getMessage,"POST",url,data,connecttoSuccess);
  }
}
function apply(num)
{
  var xhr_sendRequest=createXMLHttpRequest();
  var url=config.url_sendRequest;
  var token=sessionStorage.getItem("token");
  var reason="";
  var data="TeamTribeToken="+token+"&id="+num
   +"&reason"+reason+"&t="+Math.random();
  function connecttoSuccess(request){
         console.log(request.responseText);
          var resultJson=eval("("+request.responseText+")");
         if(resultJson.code=='0')
          {
            alert('已发送请求');
          }

  }
  if(xhr_sendRequest){
    ajax(xhr_sendRequest,"POST",url,data,connecttoSuccess);
  }
}
function reply(id)
{
  var xhr_sendResponse=createXMLHttpRequest();
  var token=sessionStorage.getItem("token");
  var url=config.url_sendResponse;
  var result='1';
  var reason="";
  var data="TeamTribeToken="+token+"&id="+id+"&result="+
  result+"&reason="+reason+"&t="+Math.random();
  function connecttoSuccess(request){
    console.log(request.responseText);
          var resultJson=eval("("+request.responseText+")");
          var code=resultJson.code;
          console.log(code);
          // if(code==-1)
          // {
          //  alert("服务器异常,请稍后再试");
          // }
          if(code=='0')
          {
            alert("回复成功");
          }
    }
  if(xhr_sendResponse){
    ajax(xhr_sendResponse,"POST",url,data,connecttoSuccess)
  }
}
function friends(){
  var xhr_getRelations=createXMLHttpRequest();
  var token=sessionStorage.getItem("token");
  var data="TeamTribeToken="+token;
  var url=config.url_getRelations;
  function connecttoSuccess(request){
       console.log(request.responseText);
          var resultJson=eval("("+request.responseText+")");
          document.getElementById('content').innerHTML="";

          for(var item in resultJson.relation)
          {
            var id=resultJson.relation[item];
            document.getElementById('content').innerHTML+="<a title=\"进入聊天\"><input type=\"button\" class=\"chat\" /></a>"
              +"<span class=\"information\">"+id+"&nbsp&nbsp</span>";
          }


        }
  if(xhr_getRelations)
  {
    ajax(xhr_getRelations,"POST",url,data,connecttoSuccess);
  }
}
function upload(obj,id){
      file = document.getElementById("upload");
      var files = obj.files;
      var token=sessionStorage.getItem("token");
      img = new Image();
      if(window.URL){
          //File API
          img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
          img.onload = function(e) {
          window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
          }
      }
      file.src=img.src;
      var url=config.url_upload;
      //上传文件
      var fd = new FormData();//实例化一个表单
      var xhr_upload=createXMLHttpRequest();
      // function connecttoSuccess(request){
      //     console.log(request.responseText);
      //     var resultJson=eval('('+request.responseText+')');
      //     var code=resultJson.code;
      //   }
        xhr_upload.onreadystatechange=function()
      {
        if(xhr_upload.readyState==4&&xhr_upload.status==200)
        {
          console.log(xhr_upload.responseText);
          var resultJson=eval('('+xhr_upload.responseText+')');
          var code=resultJson.code;
          if(code=='0')
          {
            var userid=sessionStorage.getItem("userid");
            var filename=resultJson.fileName;
           // get_byId(userid,filename);
          }
        }
      }
          fd.append('TeamTribeToken',token);
          fd.append('image', files[0]);//追加图片元素
          if(xhr_upload)
          {
             
          xhr_upload.open('post',url,true);//请求方式，请求地址
          xhr_upload.send(fd);
          }
  }
  function update(name,filename,isPublic)
  {
     var xhr_update=createXMLHttpRequest();
     var token=sessionStorage.getItem("token");
     function connecttoSuccess(request){
        console.log(request.responseText);
        if(code=='0')
        {
          var filename=sessionStorage.getItem("filename");
          alert('修改成功');
        }
     }
      var url=config.url_update;
      var data="nickname="+name+"&portrait="+filename
      +"&isPublic="+isPublic+"&TeamTribeToken="+token;
      if(xhr_update){
      ajax(xhr_update,"POST",url,data,connecttoSuccess);
     }
  }
  function download(){

      var xhr_download=createXMLHttpRequest();
      var data="fileName="+filename;
      var url=config.url_download;
      function connecttoSuccess(request){
         console.log(request.responseText);
      }
      if(xhr_download){
        ajax(xhr_download,"POST",url,data,connecttoSuccess);
      }


  }
    function scroll(){
       var imgs_div=document.getElementById("imgs"); 
     var nav_div=document.getElementById("nav");  
     //获取到图片轮播的ul对象数组  
     var imgsUl=imgs_div.getElementsByTagName("ul")[0]; 
     imgsUl.style.left="0";
     //获取到远点的ul对象数组  
     var nav=nav_div.getElementsByTagName("ul")[0];  
     //上一个  
     var previous=document.getElementById("previous");  
     //下一个  
     var next =document.getElementById("next");
        var index=1;
     function btnShow(cur_index){ 
     var list=nav.children;  
     for(var i=0;i<nav.children.length;i++){  
          nav.children[i].children[0].className="hidden";  
     }  
     nav.children[cur_index-1].children[0].className="current";  
    }  
      var animTimer;  
     previous.onclick=function(){  
            index-=1;  
            if(index<1){  
                 index=4;  
            }  
            animate(1280);  
            btnShow(index);  
       }  
       next.onclick=function(){ 
            index+=1;  
            if(index>4){  
                 index=1;  
            }  
            animate(-1280);  
            btnShow(index);  
       }  
      
       function animate(offset){ 
            var newLeft=parseInt(imgsUl.offsetLeft)+offset;
            if(newLeft>0){
                 show(-3840);      
            }else if(newLeft<-3840){ 
                 show(0);      
            }else{ 
                 show(newLeft);  
            }  
      
       }  
       function show(offset)
       {
          imgsUl.style.left=offset+"px";
       }
    var timer;  
    function play(){ 
         timer=setInterval(function(){  
          next.onclick();  
         },2000)  
    }  
      function initImgs(cur_index){ 
      clearInterval(timer);  
      clearInterval(animTimer);  
      var off=cur_index*1280;  
      imgsUl.style.left=-off+"px";  
    }  
     
       for(var i=0;i<nav.children.length;i++){  
         nav.children[i].index=i;  
         var sd=nav.children[i].index;  
         nav.children[i].onmouseover=function(){ 
              var now_index=this.index;  
              //这里很重要，要让当前的图片的index的值等于鼠标选中的图片   
              index=this.index+1;  
              initImgs(this.index);  
              btnShow(this.index+1);  
         }  
          nav.children[i].onmouseout=function(){  
               play();  
          }  
       }

  }