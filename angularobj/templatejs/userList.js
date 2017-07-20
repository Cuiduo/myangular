my.controller('userListController', ['$scope','$http',function($scope,$http,$route) {
	$scope.$route = $route;    
    //console.log(jQuery('.prov').find('option').eq(0).val())
    jQuery("#address").citySelect({
        prov: '北京',
        city: '东城区'
    });
	//面初始化
	showPage1(1,20,'');
	//下载
	jQuery('.downbtn').on('click',function(){
		window.location.href=url+"userinfo/export.do?pageNum="+jQuery('.pageNum').val()+"&pageSize="+jQuery('.showNum').find('option:selected').val()+"&conditionParam="+jQuery('.search').val();		
	})
	var pc,cr;
    function showPage1(pageIndex,pageSize,conditionParam){
    	//var pc,cr;
    	jQuery.ajax({
	    	type:"get",	    			url:url+"userinfo/getList.do?pageNum="+pageIndex+"&pageSize="+pageSize+"&conditionParam="+conditionParam,
	    	async:true, 
	    	xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
	    	success:function(data){
	    		console.log(data)
	    		jQuery('.tcdPageCode2').html('');
	    		if (data.status == 2) {
	    			//window.location.href = "../../login.html";
	    		}else{
	    			pc = data.data.pages;
	    			cr = data.data.pageNum;	    			
	    			var str = '<tr class="tabTop">'+
								'<td><input class="selectAll" type="checkbox" name="namecheck" value="" /></td>'+
								'<td>序号</td>'+
								'<td>账号名称</td>'+
								'<td>性别</td>'+
								'<td nowrap="nowrap">姓名</td>'+
								'<td>联系电话</td>'+
								'<td>角色</td>'+
								'<td>企业名称</td>'+
//								'<td>用户分类</td>'+	
								'<td>操作</td>'+	
							'</tr>';
				for (var i=0 ;i<data.data.list.length;i++) {
	    			str += '<tr data-id="'+data.data.list[i].userId+'">'+
						'<td width="30px"><input type="checkbox" name="name" value="" data-id="'+data.data.list[i].userId+'" /></td>'+
						'<td nowrap="nowrap"><a class="datauid" data-uid="'+data.data.list[i].userId+'">'+Number(i+1)+'</a></td>'+
						'<td nowrap="nowrap">'+data.data.list[i].userName+'</td>'+
						'<td>'+data.data.list[i].userSex+'</td>'+
						'<td>'+data.data.list[i].userRealName+'</td>'+
						'<td>'+data.data.list[i].userTel+'</td>'+
						'<td nowrap="nowrap">'+data.data.list[i].userRoleName+'</td>'
					str +='<td nowrap="nowrap">'+data.data.list[i].companyName+'</td>'
					str +=	'<td  data-id="'+data.data.list[i].userId+'"  nowrap="nowrap"><span class="checkcl"><img src="images/chakan.png"></span><span class="changecl"><img src="images/bianji.png"></span><span class="deletecl"><img src="images/shanchu.png"></span></td>'+
					'</tr>';								
	    		};
	    		jQuery(".tabBox table").html(str);
	    		//当前页
	    		jQuery('.pageNum').val(data.data.pageNum);
	    		//总页数
	    		jQuery('.total').html(data.data.pages);
				//全选	    
			    jQuery(".selectAll").click(function(){ 
					if(this.checked){ 
						jQuery("input[name='name']").each(function(){this.checked=true;}); 
						}else{ 
						jQuery("input[name='name']").each(function(){this.checked=false;}); 
						} 
				});
				
	    		}
	    		jQuery(".tcdPageCode2").createPage({		
			        pageCount:data.data.pages,
			        current:data.data.pageNum
			    });
			    //翻页
			    jQuery('.tcdNumber').unbind('click').click(function(){
			   		console.log(jQuery(this).html());
			   		showPage1(jQuery(this).html(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val());
			    });
			    var pagesIndex,nextPage;
			    //上一页
			     jQuery('.prevPage').unbind('click').click(function(){
			    	pagesIndex = jQuery('.pageNum2').val();
			    	console.log(pagesIndex); 
			    	if (pagesIndex <= parseInt(jQuery('.total2').html())) {
			    		pagesIndex--
			    	}
			    	showPage1(pagesIndex,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val());
			    });
			    //下一页
			    jQuery('.nextPage').unbind('click').click(function(){
			    	nextPage = jQuery('.pageNum2').val();    	 
			    	if (nextPage < parseInt(jQuery('.total2').html())) {
			    		nextPage++
			    	}
			    	showPage1(nextPage,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val());
			    });
		    	//查看
				jQuery('.checkcl').unbind('click').click(function(){
					var str3 ='';
					jQuery.ajax({
						type:"post",
						url:url+"userinfo/findUserInfoDetail.do?userId="+jQuery(this).parent().parent().attr('data-id'),
						async:true,
						xhrFields: {
				           withCredentials: true
				        },
				        crossDomain: true,
						success:function(data){
							console.log(data);
						    pswchange = data.data.userInfo.userPwd;
							
							jQuery('#userName3').val(data.data.userInfo.userName);
							jQuery('.userProvince3').val(data.data.userInfo.userProvince);
							jQuery('.userCity3').val(data.data.userInfo.userCity);
							jQuery('.userDistrict3').val(data.data.userInfo.userDistrict);
							jQuery('.password3').val();
							useroId = data.data.userInfo.userId;
							jQuery('.xingming3').val(data.data.userInfo.userRealName);
							jQuery('.userIdCard3').val(data.data.userInfo.userIdCard);
							jQuery('.sex3').val(data.data.userInfo.userSex);
							jQuery('#userTel3').val(data.data.userInfo.userTel);
							jQuery('.xxdz3').val(data.data.userInfo.userAdrDet);
							jQuery('.minzu3').val('');
							jQuery('.companyName3').val(data.data.userInfo.companyName);
							jQuery('.companyPersion13').val(data.data.userInfo.companyPersion1);
							jQuery('.companyTel3').val(data.data.userInfo.companyPersion1Tel);
							jQuery('.userIdCard3').val(data.data.userInfo.userIdCard);
							jQuery('.businessLicense3').val(data.data.userInfo.businessLicense);
							jQuery('.companyAdress3').val(data.data.userInfo.companyAdress);
							jQuery('.companyEmail3').val(data.data.userInfo.companyEmail);
							jQuery('.companyWebsite3').val(data.data.userInfo.companyWebsite);
							
							//jQuery(".es-list").eq(1).html(str)
							jQuery(".cower").show();
							jQuery(".tipBox3").show();
						}
					});  
					
				})
		    
		    	//修改
				jQuery('.changecl').unbind('click').click(function(){		
					var str2 ='';
					jQuery.ajax({
						type:"post",
						url:url+"userinfo/findUserInfoDetail.do?userId="+jQuery(this).parent().parent().attr('data-id'),
						async:true,
						xhrFields: {
				           withCredentials: true
				        },
				        crossDomain: true,
						success:function(data){
							console.log(data);
							jQuery("#address2").citySelect({
						        prov: data.data.userInfo.userProvince,
						        city: data.data.userInfo.userCity,
						        dist: data.data.userInfo.userDistrict
						    });
						    pswchange = data.data.userInfo.userPwd;
							str2 ='<option value="'+data.data.userInfo.userRole+'">'+data.data.userInfo.userRoleName+'</option>';
							jQuery('#userName2').val(data.data.userInfo.userName);
							jQuery('.password2').val();
							useroId = data.data.userInfo.userId;
							console.log(data.data.userInfo.userPwd);
							jQuery('.xingming2').val(data.data.userInfo.userRealName);
							jQuery('.userIdCard2').val(data.data.userInfo.userIdCard);
							jQuery('.sex2').val(data.data.userInfo.userSex);
							jQuery('#userTel2').val(data.data.userInfo.userTel);
							jQuery('.xxdz2').val(data.data.userInfo.userAdrDet);
							jQuery('.minzu').val('');
							jQuery('.companyName2').val(data.data.userInfo.companyName);
							jQuery('.companyPersion12').val(data.data.userInfo.companyPersion1);
							jQuery('.companyTel2').val(data.data.userInfo.companyPersion1Tel);
							jQuery('.userIdCard2').val(data.data.userInfo.userIdCard);
							jQuery('.businessLicense2').val(data.data.userInfo.businessLicense);
							jQuery('.companyAdress2').val(data.data.userInfo.companyAdress);
							jQuery('.companyEmail2').val(data.data.userInfo.companyEmail);
							jQuery('.companyWebsite2').val(data.data.userInfo.companyWebsite);
							jQuery('.password2').bind('input propertychange', function() {
								pswchange = jQuery('.password2').val();
								console.log(pswchange)
							})
							//jQuery(".es-list").eq(1).html(str)
							for (var j=0;j<data.data.roles.length;j++) {
								str2 += "<option value='"+data.data.roles[j].roleId+"'>"+data.data.roles[j].name+"</option>"
								jQuery(".tipBox2 .juese2").html(str2);
							}
							jQuery(".cower").show();
							jQuery(".tipBox2").show();
						}
					});     	
				})	
			    
	    	}
	    	
    });
    
    }
   
    //搜索
    jQuery('.seachbtn').click(function(){    		showPage1(1,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val())
    })    
    		
    //展示多少数据
    jQuery('.showNum').on('change',function(){
    	var pageSize = jQuery(this).find('option:selected').val();    		showPage1(1,pageSize,jQuery('.search').val(),jQuery('.search').val());
    })
    
    //跳转页码
    jQuery('.ymqd2').click(function(){    		showPage1(jQuery('.pageNum2').val(),jQuery('.showNum2').find('option:selected').val(),jQuery('.search').val());
    })
    
    //新建按钮
	jQuery("#editer").on("click",function(){
		jQuery(".cower").show();
		jQuery(".tipBox").show();
		jQuery('#customer').editableSelect({
		    effects: 'fade'
		});
		jQuery('#accountName').editableSelect({
		    effects: 'fade',
		    duration: 200
		});
		var str ='';
		jQuery.ajax({
			type:"post",
			url:url+"role/findAllRole.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			data:{userId:window.localStorage.getItem("userId")},
			success:function(data){
				console.log(data);
				str ='<option>--请选择--</option>';
//				var obj = '<li class="es-visible">'+data.data.accountName+'</li>'
//				jQuery(".es-list").eq(0).html(obj)
//				for (var i=0 ;i<data.data.customerNames.length;i++) {
//					str += '<li class="es-visible">'+data.data.customerNames[i].customerName+'</li>'					
//				}
				jQuery(".es-list").eq(1).html(str)
				for (var j=0;j<data.data.length;j++) {
					str += "<option value='"+data.data[j].roleId+"'>"+data.data[j].name+"</option>"
					jQuery(".juese").html(str);
				}
			}
		});
	})
	//关闭弹窗
	jQuery(".closebtn").on("click",function(){
		jQuery(".tipBox input").val('');
		jQuery("#confirm").val("确定");
		jQuery("#diqu").val('');
		jQuery(".ts").html('');
		jQuery(".ts1").html('');
		jQuery(".ts2").html('');
		jQuery(".ts3").html('');
		jQuery(".ts4").html('');
		jQuery(".ts5").html('');
		jQuery(".ts6").html('');
		jQuery(".ts7").html('');
		jQuery(".ts8").html('');
		jQuery(".ts9").html('');
		jQuery(".qqmsg h4").html('所有选项都是必填的，除非另有说明')
		jQuery(".tipBox").hide();
		jQuery(".cower").hide();
	});
	jQuery(".closebtn2").on("click",function(){		
		jQuery(".tipBox2").hide();
		jQuery(".cower").hide();
	});
	jQuery(".closebtn3").on("click",function(){		
		jQuery(".tipBox3").hide();
		jQuery(".cower").hide();
	});
	jQuery("#confirm3").on("click",function(){		
		jQuery(".tipBox3").hide();
		jQuery(".cower").hide();
	});
	//确认提交
	jQuery("#confirm").on("click",function(){		
		var reg = /^1[3|4|5|7|8][0-9]{9}$/; //手机号验证规则
		var phoneNum = jQuery("#userName").val();//手机号码
		var flag = reg.test(phoneNum); //true
		var flage = isCardID(jQuery(".userIdCard").val());//身份证号
		console.log(flag)
//		if (flag == false) {			
//			jQuery(".ts").css("color","red").html("请输入正确的手机号").css('display','block');
//			return false;						
//		}	
		if (jQuery(".password").val() == '' || jQuery(".password").val().length < 6  || jQuery(".password").val().length > 18 ) {
			jQuery(".ts1").css("color","red").html("(必填)");
			return false;
		}
		if (jQuery(".xingming").val() == '') {
			jQuery(".ts2").css("color","red").html("(必填)");
			return false;
		}
		if (jQuery(".xxdz").val() == '') {
			jQuery(".ts3").css("color","red").html("(必填)");
			return false;
		}
		if (jQuery(".juese").val() == '--请选择--') {
			jQuery(".ts4").css("color","red").html("(必填)");
			return false;
		}				
//		if (flage != true) {
//			jQuery(".ts9").css("color","red").html(flage);
//			return false;
//		}
		if (jQuery(".juese").val() == '--请选择--') {
			jQuery(".ts8").css("color","red").html("(必填)");
			return false;
		}
		else{
			
			jQuery.ajax({
				type:"post",
				url:url+"userinfo/addUserInfo.do",
				async:true,
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{
					userName:jQuery("#userName").val(),
					userPwd:hex_md5(jQuery(".password").val()),
					userProvince:jQuery('.prov').val(),
					userCity:jQuery('.city').val(),
					userDistrict:jQuery('.dist').val(),
					userAdrDet:jQuery('.xxdz').val(),
					userSex:jQuery('.sex option:selected').val(),
					userNation:jQuery('.nation').val(),
					userRealName:jQuery('.xingming').val(),
					userIdCard:jQuery('.userIdCard').val(),
					userTel:jQuery('#userTel').val(),
//					superiorUserName:jQuery('.juese option:selected').val(),
					companyName:jQuery('.companyName').val(),
					companyAdress:jQuery('.companyAdress').val(),
					companyTel:jQuery('.companyTel').val(),
					companyWebsite:jQuery('.companyWebsite').val(),
					companyPersion1:jQuery('.companyPersion1').val(),
					companyPersion1Tel:jQuery('.companyPersion1').val(),
					businessLicense:jQuery('.businessLicense').val(),					
					companyEmail:jQuery(".companyEmail").val(),					
					userRole:jQuery(".juese option:selected").val()
				},
				dataType:"json",
				success:function(data){
					console.log(data)
					if(data.status == 1){
						jQuery(".ts").html(data.msg).css("color",'red')
					}
					if (data.status == 0) {
						jQuery(".tipBox input").val('');
						jQuery("#confirm").val("确定");
						jQuery("#diqu").val('');
						jQuery(".ts").html('');
						jQuery(".ts1").html('');
						jQuery(".ts2").html('');
						jQuery(".ts3").html('');
						jQuery(".ts4").html('');
						jQuery(".ts5").html('');
						jQuery(".ts6").html('');
						jQuery(".ts7").html('');
						jQuery(".ts8").html('');
						jQuery(".ts9").html('');
						jQuery(".tipBox").hide();
						jQuery(".cower").hide();
						showPage1(1,20,'')
					}
									
				}
			});
		}
		
	})
	var pswchange = '';
	var useroId;
	
	//确认提交
	jQuery("#confirm2").on("click",function(){		
		var reg = /^1[3|4|5|7|8][0-9]{9}$/; //手机号验证规则
		var phoneNum = jQuery("#userName2").val();//手机号码
		var flag = reg.test(phoneNum); //true
		var flage = isCardID(jQuery(".userIdCard2").val());//身份证号
		console.log(pswchange)
		console.log(flag)
//		if (flag == false) {			
//			jQuery(".ts").css("color","red").html("请输入正确的手机号").css('display','block');
//			return false;						
//		}	
//		if (jQuery(".password2").val() == '' || jQuery(".password").val().length < 6  || jQuery(".password").val().length > 18 ) {
//			jQuery(".ts1").css("color","red").html("(必填)");
//			return false;
//		}
		if (jQuery(".xingming2").val() == '') {
			jQuery(".ts2").css("color","red").html("(必填)");
			return false;
		}
		if (jQuery(".xxdz2").val() == '') {
			jQuery(".ts3").css("color","red").html("(必填)");
			return false;
		}
		if (jQuery(".juese2").val() == '--请选择--') {
			jQuery(".ts4").css("color","red").html("(必填)");
			return false;
		}				
//		if (flage != true) {
//			jQuery(".ts9").css("color","red").html(flage);
//			return false;
//		}
		
		
		else{
			
			jQuery.ajax({
				type:"post",
				url:url+"userinfo/updateUserInfo.do?userId="+useroId,
				async:true,
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{
					userName:jQuery("#userName2").val(),
					userPwd:hex_md5(jQuery(".password2").val()),
					userProvince:jQuery('.prov').val(),
					userCity:jQuery('.city').val(),
					userDistrict:jQuery('.dist').val(),
					userAdrDet:jQuery('.xxdz2').val(),
					userSex:jQuery('.sex2 option:selected').val(),
					userNation:jQuery('.nation2').val(),
					userRealName:jQuery('.xingming2').val(),
					userIdCard:jQuery('.userIdCard2').val(),
					userTel:jQuery('#userTel2').val(),
//					superiorUserName:jQuery('.juese option:selected').val(),
					companyName:jQuery('.companyName2').val(),
					companyAdress:jQuery('.companyAdress2').val(),
					companyTel:jQuery('.companyTel2').val(),
					companyWebsite:jQuery('.companyWebsite2').val(),
					companyPersion1:jQuery('.companyPersion12').val(),
					companyPersion1Tel:jQuery('.companyPersion12').val(),
					businessLicense:jQuery('.businessLicense2').val(),					
					companyEmail:jQuery(".companyEmail2").val(),					
					userRole:jQuery(".juese2 option:selected").val()
				},
				dataType:"json",
				success:function(data){
					console.log(data)
					if(data.status == 1){
						jQuery(".ts").html(data.msg).css("color",'red')
					}
					if (data.status == 0) {
						jQuery(".tipBox2 input").val('');
						jQuery("#confirm2").val("确定");
//						jQuery("#diqu").val('');
						jQuery(".ts").html('');
						jQuery(".ts1").html('');
						jQuery(".ts2").html('');
						jQuery(".ts3").html('');
						jQuery(".ts4").html('');
						jQuery(".ts5").html('');
						jQuery(".ts6").html('');
						jQuery(".ts7").html('');
						jQuery(".ts8").html('');
						jQuery(".ts9").html('');
						jQuery(".tipBox2").hide();
						jQuery(".cower").hide();
						showPage1(1,20,'')
					}
									
				}
			});
		}
		
	})
	
	//删除
	var strselectedItems;
	jQuery(document).on('click','.deletecl',function(){
		strselectedItems = jQuery(this).parent().parent().attr('data-id');
		jQuery(".cower").show();
     	jQuery(".deleteBox").show();
     	
	})	
	//确认删除
	jQuery("#deleteIt").on("click",function(){
		jQuery.ajax({
			type:"post",
			url:url+"userinfo/deleteUserInfo.do?userId="+strselectedItems,
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			data:{userId:selectedItems},
			success:function(data){
				console.log(data);
				if (data.status == 0) {
					jQuery(".cower").hide();
     				jQuery(".deleteBox").hide();
					showPage1(1,20,'')
				} 				
			}
		});
	});
	jQuery('.deletecl').click(function(){
		console.log(111)
	})
	//删除
    var selectedItems = [];
    var strselectedItems = '';
     jQuery(".deletebtn").on("click",function(){ 
		jQuery("input[name='name']:checked").each(function(){
			selectedItems.push(jQuery(this).attr("data-id"));			
		});
		if (selectedItems != "") {
     		strselectedItems = selectedItems.join(",");	
     		jQuery(".cower").show();
			jQuery(".deleteBox").show();
     	} else{
     		jQuery(".tiplit").show();
            setTimeout(timer,3000);                	
        	function timer(){
        		jQuery(".tiplit").hide()
        	}  
     	}		
	})    
    //取消删除按钮
	jQuery("#cencel").on("click",function(){		
		jQuery(".deleteBox").hide();
		jQuery(".cower").hide();
	}) 
}])