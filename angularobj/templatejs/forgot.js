$(function(){
	jQuery('#userName').on('focus',function(){
		jQuery('.tips').html('');
	})
	jQuery('.getCode').click(function(){
		var reg = /^1[3|4|5|7|8][0-9]{9}$/; //手机号验证规则
		var phoneNum = jQuery("#userName").val();//手机号码
		var flag = reg.test(phoneNum); //true;
		console.log(phoneNum)
		if (flag == false) {
			jQuery('.tips').html('请输入正确的手机号');
			return false;
		} else{
			$.ajax({
				type:"post",
				url:url+"sms/getSmsCode.do",
				async:true,
				dataType:"json",
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{
					userName:jQuery("#userName").val()				
				},
				success:function(data){
					console.log(data);
				}
			});
		}
	});
	$('#passWord2').on('focus',function(){
		$('.loginBox .loginLeft span').hide();
	})
	$("#login").click(function(){	
		if ($('#passWord').val() != $('#passWord2').val()) {
			$('.loginBox .loginLeft span').show();
			return false;
		}
		var hack = hex_md5($("#passWord").val());
			$.ajax({
				type:"post",
				url:url+"userinfo/resetPwd.do",
				async:true,
				dataType:"json",
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{
					userName:jQuery("#userName").val(),
					smsCode:$('.code').val(),
					userPwd:hack
				},
				success:function(data){
					console.log(data);	
					if (data.status == 1) {
						jQuery('.tips').html(data.msg);
					} 
					if (data.status == 0) {		
						window.localStorage.setItem("userName",data.data.userName);
	//					window.localStorage.setItem("accountName",data.data.accountName);
	//					window.localStorage.setItem("userId",data.data.userId);
	//					window.localStorage.setItem("userRole",data.data.userRole);
	//					window.localStorage.setItem("lastLoginDate",data.data.lastLoginDate);
	//					window.localStorage.setItem("lastName",data.data.lastName);
	//					window.localStorage.setItem("name",data.data.name);
	//					window.localStorage.setItem("userEmail",data.data.userEmail);
	//					window.localStorage.setItem("userRole",data.data.userRole);
	//					window.localStorage.setItem("userMoney",data.data.userMoney);
						window.location.href = "login.html";
					} 
				}
			});
		//}
		
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
//	$(document).keyup(function(event){ 
//	    if(event.keyCode == 13){ 
//	      $("#login").trigger("click"); 
//	    } 
//	});	
})