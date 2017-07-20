my.controller('orderFormController', ['$scope','$http',function($scope,$http,$route) {
	$scope.$route = $route; 
	var pc,cr;
    //添加日期转换
	function time(timer){
		return  new Date(timer).toLocaleString().replace('/', "-").replace('/', "-");
	}   
   
    //省市区三级联动
    jQuery("#address").citySelect({
        prov: "北京",
        city: "东城区",
        dist: "none",
        nodata: "none"
    }); 
    //下载
	jQuery('.downbtn').on('click',function(){
		window.location.href=url+"orderInfo/export.do?pageNum="+jQuery('.pageNum').val()+"&pageSize="+jQuery('.showNum').find('option:selected').val()+"&conditionParam="+jQuery('.search').val()+"&userId="+window.localStorage.getItem('userId');		
	})
	//页面初始化
	showPage(1,20,'','');;
    function showPage(pageIndex,pageSize,conditionParam,k){
    	jQuery.ajax({
	    	type:"get",	    			url:url+"orderInfo/getListByUserId.do?pageNum="+pageIndex+"&pageSize="+pageSize+"&conditionParam="+conditionParam,
	    	async:true, 
	    	xhrFields: {
	           withCredentials: true
	        },
	        data:{userId:window.localStorage.getItem("userId")},
	        crossDomain: true,
	    	success:function(data){
	    		console.log(data);
	    		//分页
				pc = data.data.pages;
    			cr = data.data.pageNum;	
	    		if (data.status == 1) {
	    			jQuery('.tabBox').html('');
	    		}else{
	    			var str = '<tr class="tabTop">'+
								'<td><input class="selectAll" type="checkbox" name="namecheck" value="" /></td>'+
								'<td>序号</td>'+
								'<td>商品名称</td>'+
								'<td>订单号</td>'+
								'<td>下单时间</td>'+
								'<td nowrap="nowrap">账单金额</td>'+
								'<td>联系人</td>'+
								'<td>联系人电话</td>'+
								'<td>状态</td>'+
//								'<td>创建时间</td>'+	
								'<td>操作</td>'+	
							'</tr>';
				for (var i=0 ;i<data.data.list.length;i++) {					
	    			str += '<tr data-id="'+data.data.list[i].orderId+'">'+
						'<td width="30px"><input type="checkbox" name="name" value="" data-id="'+data.data.list[i].orderId+'" /></td>'+
						'<td nowrap="nowrap"><a class="datauid" data-uid="'+data.data.list[i].orderId+'">'+(Number(k)+Number(i+1))+'</a></td>'+
						'<td nowrap="nowrap">'+data.data.list[i].goodsName+'</td>'+
						'<td>'+data.data.list[i].orderNum+'</td>'+
						'<td>'+time(data.data.list[i].addTime)+'</td>'+
						'<td>'+data.data.list[i].totalPrice+'</td>'+
						'<td>'+data.data.list[i].contactName+'</td>'+
//						'<td>'+data.data.list[i].totalPrice+'</td>'+
						'<td nowrap="nowrap">'+data.data.list[i].contactTel+'</td>'
						if (data.data.list[i].orderState == 1) {
							str +='<td nowrap="nowrap">待支付</td>'
						}
						if (data.data.list[i].orderState == 2) {
							str +='<td nowrap="nowrap">支付成功，待出库</td>'
						}
						if (data.data.list[i].orderState == 3) {
							str +='<td nowrap="nowrap">支付失败</td>'
						}
						if (data.data.list[i].orderState == 4) {
							str +='<td nowrap="nowrap">已出库</td>'
						}
					//str +='<td nowrap="nowrap">'+getLocalTime(data.data.list[i].addTime)+'</td>'
					str +=	'<td  data-id="'+data.data.list[i].orderId+'"  nowrap="nowrap"><span class="checkcl"><img src="images/chakan.png"></span><span class="deletecl"><img src="images/shanchu.png"></span></td>'+
					'</tr>';	    		
	    		}
				
	    		jQuery(".tabBox table").html(str);
	    		//当前页
	    		jQuery('.pageNum').val(data.data.pageNum);
	    		//总页数
	    		jQuery('.total').html(data.data.pages);
	    		jQuery(".tcdPageCode").createPage({
			        pageCount:pc,
			        current:cr
			    });
			    
			    //翻页
			    jQuery('.tcdNumber').unbind('click').click(function(){	
			    	if (jQuery(this).html() == 1) {
			    		showPage(jQuery(this).html(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),'');
			    	} else{
			    		showPage(jQuery(this).html(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),jQuery('.showNum').find('option:selected').val());
			    	}
			    	
			   });
			    var pagesIndex,nextPage;
			    //上一页
			    jQuery('.prevPage').unbind('click').click(function(){
			     
			    	pagesIndex = jQuery('.pageNum').val();
			    	if (pagesIndex <= parseInt(jQuery('.total').html())) {
			    		pagesIndex--;
			    	}
			    	if (pagesIndex == 1) {
			    		showPage(pagesIndex,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),'');
			    	} else{
			    		showPage(pagesIndex,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),jQuery('.showNum').find('option:selected').val());
			    	}
			    	
			    });
			    //下一页
				jQuery('.nextPage').unbind('click').click(function(){
			    	nextPage = jQuery('.pageNum').val();    	 
			    	if (nextPage < parseInt(jQuery('.total').html())) {
			    		nextPage++;
			    	}
			    	if (nextPage == 1) {
			    		showPage(nextPage,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),'')
			    	} else{
			    		showPage(nextPage,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),jQuery('.showNum').find('option:selected').val());
			    	}
			    	
			    });
				//全选	    
			    jQuery(".selectAll").click(function(){ 
					if(this.checked){ 
						jQuery("input[name='name']").each(function(){this.checked=true;}); 
						}else{ 
						jQuery("input[name='name']").each(function(){this.checked=false;}); 
						} 
				});					
	    		}	
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
							jQuery(".cower").show();
							jQuery(".tipBox2").show();
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
							jQuery('.minzu').val(data.data.userInfo.userCity);
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
						}
					});     	
				})
	
	    	}
    });
    }
    
    //选择
    
    
    //搜索
    jQuery('.seachbtn').click(function(){    		showPage(1,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),jQuery('.showNum').find('option:selected').val())
    });    
    		
    //展示多少数据
    jQuery('.showNum').on('change',function(){
    	var pageSize = jQuery(this).find('option:selected').val();    		showPage(1,pageSize,jQuery('.search').val(),jQuery('.search').val(),jQuery('.showNum').find('option:selected').val());
    });
    
    //跳转页码
    jQuery('.ymqd').click(function(){    		showPage(jQuery('.pageNum').val(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),jQuery('.showNum').find('option:selected').val());
    });
    
    //新建按钮
	jQuery("#editer").on("click",function(){		
		var str,str2;
		jQuery.ajax({
			type:"post",
			url:url+"providerInfo/findAll.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			data:{userId:window.localStorage.getItem("userId")},
			success:function(data){
				console.log(data);
				str2 ='<option value="">--请选择--</option>';
				for (var j=0;j<data.data.length;j++) {
					str2 += "<option data-id='"+data.data[j].providerType+"' value='"+data.data[j].providerId+"'>"+data.data[j].providerName+"</option>"
					jQuery(".providerName").html(str2);
				}
			}
		});
		jQuery.ajax({
			type:"post",
			url:url+"feeplan/getAll.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			data:{userId:window.localStorage.getItem("userId")},
			success:function(data){
				str ='<option value="">--请选择--</option>';			
				jQuery(".es-list").eq(1).html(str)
				for (var j=0;j<data.data.length;j++) {
					str += "<option data-id='"+data.data[j].palnPrice+"' value='"+data.data[j].feePlanId+"'>"+data.data[j].planName+"</option>"
					jQuery(".zfjh").html(str);
				}
				jQuery('.zfjh').change(function(){
					if (jQuery('.zfjh option:selected').val() == '') {
						jQuery('.danjia').val('');
						return false;
					} else{
						jQuery('.danjia').val(jQuery('.zfjh option:selected').attr('data-id'));
					}
					
				});
				jQuery('.amountNum').bind('input propertychange', function(){
					jQuery('.totalPrice').val(Number(jQuery('.zfjh option:selected').attr('data-id'))*Number(jQuery('.amountNum').val()))
				})
				
				
			}
		});
		jQuery(".cower").show();
		jQuery(".tipBox").show();
	});
	
	//分类
	jQuery('.providerName').on('change',function(){
		var changeId = jQuery(this).find('option:selected').attr('data-id');
		jQuery('.fenlei').val(changeId);
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
		jQuery("#address").citySelect({
	        prov: "北京",
	        city: "东城区",
	        dist: "none",
	        nodata: "none"
	    }); 
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
	//确认提交订单
	jQuery("#confirm").on("click",function(){		
		var reg = /^1[3|4|5|7|8][0-9]{9}$/; //手机号验证规则
		var phoneNum = jQuery(".contactTel").val();//手机号码
		var flag = reg.test(phoneNum); //true
		//var flage = isCardID(jQuery(".userIdCard").val());//身份证号		
		
		//console.log(flag)
		if (flag == false) {			
			jQuery(".ts3").css("color","red").html("请输入正确的手机号").css('display','block');
			return false;						
		}	
//		if (jQuery(".password").val() == '' || jQuery(".password").val().length < 6  || jQuery(".password").val().length > 18 ) {
//			jQuery(".ts1").css("color","red").html("(必填)");
//			return false;
//		}
//		if (jQuery(".xingming").val() == '') {
//			jQuery(".ts2").css("color","red").html("(必填)");
//			return false;
//		}
//		if (jQuery(".xxdz").val() == '') {
//			jQuery(".ts3").css("color","red").html("(必填)");
//			return false;
//		}
//		if (jQuery(".juese").val() == '--请选择--') {
//			jQuery(".ts4").css("color","red").html("(必填)");
//			return false;
//		}				
////		if (flage != true) {
////			jQuery(".ts9").css("color","red").html(flage);
////			return false;
////		}
//		if (jQuery(".juese").val() == '--请选择--') {
//			jQuery(".ts8").css("color","red").html("(必填)");
//			return false;
//		}
		else{			
			jQuery.ajax({
				type:"post",
				url:url+"orderInfo/add.do",
				async:true,
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{
					userId:window.localStorage.getItem("userId"),
					goodsName:jQuery('.spmc option:selected').text(),
					providerId:jQuery('.spmc option:selected').val(),
					providerType:jQuery('.fenlei').val(),
					planName:jQuery('.zfjh option:selected').text(),
					feePlanId:jQuery('.zfjh option:selected').val(),
					price:jQuery('.danjia').val(),
					amountNum:jQuery('.amountNum').val(),
					totalPrice:jQuery('.totalPrice').val(),
					contactName:jQuery('.contactName').val(),
					province:jQuery('.prov').val(),
					city:jQuery('.city').val(),
					district:jQuery('.dist').val(),					
					contactTel:jQuery('.contactTel').val(),
					addressDet:jQuery('.addressDet').val(),
					postCode:jQuery('.orderState').val(),
					remark:jQuery('.remark').val()
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
						jQuery("#address").citySelect({
					        prov: "北京",
					        city: "东城区",
					        dist: "none",
					        nodata: "none"
					    });
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
						jQuery('.orderForm').show();
						jQuery('.orderForm p span').html(data.data.totalPrice)
						//showPage(1)
						//支付
						jQuery('.payNow').on('click',function(){
							//showPage(jQuery('.pageNum').val(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val());
							jQuery('.orderForm').hide();
							jQuery('.cower').hide();
							showPage(jQuery('.pageNum').val(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),jQuery('.showNum').find('option:selected').val());
							//window.open(url+"payorder/alipay.do?payMoney="+jQuery('.orderForm p span').html()+"&orderNum="+data.data.orderNum);
							
						});
					}
									
				}
			});
		}
		
	})
	
	//稍后支付
	jQuery(".payNo").on('click',function(){
		jQuery(".cower").hide();
		jQuery('.orderForm').hide();
		jQuery(".tipBox input").val('');
		jQuery("#confirm").val("确定");
		jQuery("#address").citySelect({
	        prov: "北京",
	        city: "东城区",
	        dist: "none",
	        nodata: "none"
	    });
	    jQuery('.orderForm').hide();
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
		showPage(jQuery('.pageNum').val(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),jQuery('.showNum').find('option:selected').val());
	})
	
	//查看
	jQuery(document).on('click','.checkcl',function(){
			jQuery(".cower").show();
			jQuery(".tipBox3").show();
//			jQuery.ajax({
//				type:"post",
//				url:url+"?userId="+jQuery(this).parent().parent().attr('data-id'),
//				async:true,
//				xhrFields: {
//		           withCredentials: true
//		        },
//		        crossDomain: true,
//				success:function(data){
//					console.log(data);
//					
//					jQuery('#userName2').val(data.data.userInfo.userName);
//					jQuery('.password2').val();
//					jQuery('.xingming2').val(data.data.userInfo.userRealName);
//					jQuery('.userIdCard2').val(data.data.userInfo.userIdCard);
//					jQuery('.sex2').val(data.data.userInfo.userSex);;
//					jQuery('.xxdz2').val(data.data.userInfo.userAdrDet);
//					jQuery('.minzu').val(data.data.userInfo.userCity);
//					jQuery('.companyName2').val(data.data.userInfo.companyName);
//					jQuery('.companyPersion12').val(data.data.userInfo.companyPersion1);
//					jQuery('.companyTel2').val(data.data.userInfo.companyPersion1Tel);
//					jQuery('.userIdCard2').val(data.data.userInfo.userIdCard);
//					jQuery('.businessLicense2').val(data.data.userInfo.businessLicense);
//					jQuery('.companyAdress2').val(data.data.userInfo.companyAdress);
//					jQuery('.companyEmail2').val(data.data.userInfo.companyEmail);
//					jQuery('.companyWebsite2').val(data.data.userInfo.companyWebsite);					
//				}
//			});
	})
	
	//查看的返回
	jQuery("#confirm3").on("click",function(){
		console.log(111)
		jQuery(".cower").hide();
		jQuery(".tipBox3").hide();
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
						showPage(jQuery('.pageNum').val(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),jQuery('.showNum').find('option:selected').val());
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
			url:url+"orderInfo/delete.do?orderId="+strselectedItems,
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			data:{orderId:selectedItems},
			success:function(data){
				console.log(data);
				if (data.status == 0) {
					jQuery(".cower").hide();
     				jQuery(".deleteBox").hide();
					showPage(jQuery('.pageNum').val(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val(),jQuery('.showNum').find('option:selected').val());
				} 				
			}
		});
	});
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