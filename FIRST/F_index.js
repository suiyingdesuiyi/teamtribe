function show(){
  var userid=sessionStorage.getItem("userid");
  if(userid!=undefined)
  {
    document.getElementById('login').innerHTML="尊敬的"+userid+",欢迎进入社团格子";
  }
 }
 window.onload=function(){
   show();
 }