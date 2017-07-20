$(function(){
	$("#login").click(function(){
		var hack = hex_md5($("#passWord").val())
		$.ajax({
			type:"post",
			url:url+"userinfo/login.do",
			async:true,
			dataType:"json",
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			data:{userName:$("#userName").val(),userPwd:hex_md5($("#passWord").val())},
			success:function(data){
				console.log(data);
				if (data.status == 0) {		
					window.localStorage.setItem("userName",data.data.userName);
					window.localStorage.setItem("accountName",data.data.accountName);
					window.localStorage.setItem("userId",data.data.userId);
					window.localStorage.setItem("userRole",data.data.userRole);
					window.localStorage.setItem("lastLoginDate",data.data.lastLoginDate);
					window.localStorage.setItem("lastName",data.data.lastName);
					window.localStorage.setItem("name",data.data.name);
					window.localStorage.setItem("userEmail",data.data.userEmail);
					window.localStorage.setItem("userRole",data.data.userRole);
					window.localStorage.setItem("accountMoney",data.data.accountMoney);
					window.location.href = "index.html"
				} else{
					$(".tips").show();
				}
			}
		});

	})
	//密码可见
	var mark = true;
	$('.kj').click(function(){
		if (mark) {
			$(this).attr('src','images/537686801243541229.png');
			$('#passWord').attr('type','text');
			mark = false;
		} else{
			$(this).attr('src','images/373392828221098864.png');
			$('#passWord').attr('type','password');
			mark = true;
		}
	});
	//判断是否敲击了Enter键 
	$(document).keyup(function(event){ 
	    if(event.keyCode == 13){ 
	      $("#login").trigger("click"); 
	    } 
	});	
})