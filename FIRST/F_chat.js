	 var token=sessionStorage.getItem("token");
	 var userid=sessionStorage.getItem('userid');
	 function create()
	 {
	 	  var xmlhttp;
	     if(window.XMLHttpRequest)
			{
				xmlhttp=new XMLHttpRequest();
			}
			else
			{
				xmlhttp=new ActiveXObject("Microsoft.xhr_sendRequestHTTP");
			}
			return xmlhttp;
	 }
	 function find(num)
		{
			var xhr_byId=create();
			var token=
			xhr_byId.onreadystatechange=function(){
				if(xhr_byId.readyState==4&&xhr_byId.status==200)
				{
					console.log(xhr_byId.responseText);
					var resultJson=eval("("+xhr_byId.responseText+")");
					console.log("resultJson.id:"+resultJson.user.id);
					return resultJson;
					// document.getElementById('jieguo').innerHTML+="<a title=\"添加好友\"><input type=\"button\" class=\"add\" onclick=\"apply("+num+")\" /></a>"
					// +"<span class=\"jilu\">"+resultJson.user.nickname+"&nbsp&nbsp</span>";
				}
			}
			var url=config.url_byId;
			var postData="id="+num;
			postData+="&TeamTribeToken="+token;
			xhr_byId.open("POST",url,true);
			xhr_byId.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xhr_byId.send(postData);
		}
			function search(){
				var username=document.getElementById("info").value;
				if(username=="")
				{
					return;
		         }
				 var xhr_byName=create();
				 xhr_byName.onreadystatechange=function(){
					if(xhr_byName.readyState==4&&xhr_byName.status==200)
					{
						var text=xhr_byName.responseText;
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
				}
				var url=config.url_byName;
				var postData="username="+username;
				postData+="&t="+Math.random();
				xhr_byName.open("POST",url,true);
				 xhr_byName.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		        xhr_byName.send(postData);
			}
		
		function friends()
		{
			var xhr_getRelations=create();
			xhr_getRelations.onreadystatechange=function(){
				if(xhr_getRelations.readyState==4&&xhr_getRelations.status==200)
				{
					console.log(xhr_getRelations.responseText);
					var resultJson=eval("("+xhr_getRelations.responseText+")");
					document.getElementById('content').innerHTML="";

					for(var item in resultJson.relation)
					{
						var id=resultJson.relation[item];
						document.getElementById('content').innerHTML+="<a title=\"进入聊天\"><input type=\"button\" class=\"chat\" /></a>"
					    +"<span class=\"information\">"+id+"&nbsp&nbsp</span>";
					}


				}
			}
			var url=config.url_getRelations;
			var postData="TeamTribeToken="+token;
			console.log(token);
			xhr_getRelations.open("POST",url,true);
			xhr_getRelations.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xhr_getRelations.send(postData);
		}
		function apply(num)
		{
			var xhr_sendRequest=create();
			console.log("apply   "+token);
			xhr_sendRequest.onreadystatechange=function(){
				if(xhr_sendRequest.readyState==4&&xhr_sendRequest.status==200)
				{
					console.log(xhr_sendRequest.responseText);
					console.log(num);
					var resultJson=eval("("+xhr_sendRequest.responseText+")");
					if(resultJson.code=='0')
					{
						alert('已发送请求');
					}
				}
			}
			var url=config.url_sendRequest;
			var postData="TeamTribeToken="+token;
			postData+="&id="+num;
			var reason="";
			postData+="&reason"+reason;
			postData+="&t="+Math.random();
			xhr_sendRequest.open("POST",url,true);
			 xhr_sendRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xhr_sendRequest.send(postData);
		}
		function getMessage()
		{
			var xhr_getMessage=create();
			console.log("message   "+token);
			xhr_getMessage.onreadystatechange=function(){
				if(xhr_getMessage.readyState==4&&xhr_getMessage.status==200)
				{
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
			}
			var url=config.url_getMessage;
			var postData="TeamTribeToken="+token;
			postData+="&type="+1;
			postData+="&t="+Math.random();
			xhr_getMessage.open("POST",url,true);
			xhr_getMessage.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xhr_getMessage.send(postData);

		}
		function getRequest(type,id)
		{
			var url;
			if(type=1)
			{
				url=config.url_getRequest;
			}
			var xhr_getRequest=create();
			xhr_getRequest.onreadystatechange=function(){
				if(xhr_getRequest.readyState==4&&xhr_getRequest.status==200)
				{
					console.log(xhr_getRequest.responseText);
					var resultJson=eval("("+xhr_getRequest.responseText+")");
					var id1=resultJson.relationRequest.id1;
					var id=resultJson.relationRequest.id;
					console.log(id);
					var requestReason=resultJson.requestReason;
					document.getElementById('content').innerHTML+="<a title=\"详细信息\"><input type=\"button\" class=\"more\" onclick=\"reply("+id+")\" /></a>"
					+"<span class=\"information\">"+id1+"&nbsp&nbsp</span>";
				}
			}
			var postData="TeamTribeToken="+token;
			postData+="&id="+id;
			postData+="&t="+Math.random();
			xhr_getRequest.open("POST",url,true);
			xhr_getRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xhr_getRequest.send(postData);
		}
		function reply(id)
		{  
			var xhr_sendResponse=create();
			console.log(id);
			xhr_sendResponse.onreadystatechange=function(){
				if(xhr_sendResponse.readyState==4&&xhr_sendResponse.status==200)
				{
					console.log(xhr_sendResponse.responseText);
					var resultJson=eval("("+xhr_sendResponse.responseText+")");
					var code=resultJson.code;
					console.log(code);
					// if(code==-1)
					// {
					// 	alert("服务器异常,请稍后再试");
					// }
					if(code=='0')
					{
						alert("回复成功");
					}
				}
			}
			var url=config.url_sendResponse;
			var result='1';
			var reason="ok";
			var postData="TeamTribeToken="+token;
			postData+="&id="+id;
			postData+="&result="+result;
			postData+="&reason="+reason;
			postData+="&t="+Math.random();
			xhr_sendResponse.open("POST",url,true);
			xhr_sendResponse.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xhr_sendResponse.send(postData);


		}
	//   function upload()
	// {
	//   var xhr_upload=create();
	  
	//    xhr_upload.onreadystatechange=function()
	//     {
	//       if(xhr_upload.readyState==4&&xhr_upload.status==200)
	//       {
	//         console.log(xhr_upload.responseText);
	//       }
	//     }
	//     var url=url_upload;
	//     var postData="TeamTribeToken="+toke;
	//      postData+="&image="+image;
	//      postData+="&t="+Math.random();
	//      url_upload.open("POST",url,true);
	//      url_upload.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//      url_upload.send(postData);

	// }
	   function upload(obj,id) {
	    file = document.getElementById("upload");
	    var files = obj.files;
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
	        var fd = new FormData(),//实例化一个表单
	        xhr_upload=create();
	        xhr_upload.onreadystatechange=function()
	    {
	      if(xhr_upload.readyState==4&&xhr_upload.status==200)
	      {
	        console.log(xhr_upload.responseText);
	        var resultJson=eval('('+xhr_upload.responseText+')');
	        var code=resultJson.code;
	        if(code=='0')
	        {
	        	var resultJson=eval('('+xhr_upload.responseText+')');
	        	var fileName=resultJson.fileName;
	        	var result=find(userid);
	            var isPublic=result.user.isPublic;
	        	update(name,fileName,isPublic);
	        }
	      }
	    }
	        fd.append('TeamTribeToken',token);
	        fd.append('image', files[0]);//追加图片元素

	        xhr_upload.open('post',url,true);//请求方式，请求地址
	        xhr_upload.send(fd);
	}
	function update(name,filename,isPublic)
	{
	   var xhr_upload=create();
	   var result=find(userid);
	   console.log(result);
	   var isPublic=result.user.isPublic;
	   xhr_upload.onreadystatechange=function(){
	   	if(xhr_upload.readyState==4&&xhr_upload.status==200)
	   	{
	   		console.log(xhr_upload.responseText);
	   		if(code=='0')
	   		{
	   			alert('修改成功');
	   		}
	   	 }
	   }
	   var url=config.url_upload;
	    xhr_upload.open('POST',url,true);
	    var postData="nickname="+name;
	    postData+="&portrait="+filename;
	    postData+="&isPublic="+isPublic;
	    postData+="&TeamTribeToken="+token;
	    xhr_upload.send(postData);
	}