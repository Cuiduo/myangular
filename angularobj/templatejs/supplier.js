my.controller('supplierController', ['$scope','$http',function($scope,$http,$route) {
	$scope.$route = $route;
	
	//页面初始化
	showPage(1)
    function showPage(pageIndex){
    	jQuery.ajax({
	    	type:"get",
	    	url:url+"providerInfo/getList.do?pageNum="+pageIndex,
	    	async:true, 
	    	xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
	    	success:function(data){
	    		console.log(data)
	    		if (data.status == 2) {
	    			
	    		}else{
	    			var str = '<tr class="tabTop">'+
								'<td><input class="selectAll" type="checkbox" name="namecheck" value="" /></td>'+
								'<td>序号</td>'+
								'<td>供应商类别</td>'+
								'<td nowrap="nowrap">分类</td>'+
								'<td>来源</td>'+
								'<td>供应商联系人</td>'+
								'<td>联系人电话</td>'+
								'<td>操作</td>'+	
							'</tr>';
				for (var i=0 ;i<data.data.list.length;i++) {
	    			str += '<tr  data-id="'+data.data.list[i].providerId+'" >'+
						'<td width="30px"><input data-id="'+data.data.list[i].providerId+'" type="checkbox" name="name" value=""/></td>'+
						'<td nowrap="nowrap"><a class="datauid">'+Number(i+1)+'</a></td>'+
//						'<td nowrap="nowrap">'+data.data[i].userName+'</td>'+
						'<td>'+data.data.list[i].providerType+'</td>'+
						'<td>'+data.data.list[i].providerName+'</td>'+
						'<td>'+data.data.list[i].providerRoot+'</td>'+
						'<td nowrap="nowrap">'+data.data.list[i].providerPerson+'</td>'
					str +='<td nowrap="nowrap">'+data.data.list[i].providerTel+'</td>'
					str +=	'<td  data-id="'+data.data.list[i].providerId+'"  nowrap="nowrap"><span class="checkcl"><img src="images/chakan.png"></span><span class="changecl"><img src="images/bianji.png"></span><span class="deletecl"><img src="images/shanchu.png"></span></td>'+
					'</tr>';								
	    		};
	    		jQuery(".tabBox table").html(str);
	    		//当前页
	    		jQuery('.pageNum').val(data.data.pageNum);
	    		//总页数
	    		jQuery('.total').html(data.data.pages)
				//全选	    
			    jQuery(".selectAll").click(function(){ 
					if(this.checked){ 
						jQuery("input[name='name']").each(function(){this.checked=true;}); 
						}else{ 
						jQuery("input[name='name']").each(function(){this.checked=false;}); 
						} 
					} 
					);
					jQuery(".tcdPageCode").createPage({
			        pageCount:data.data.pages,
			        current:data.data.pageNum,
			        backFn:function(p){
			            showPage(p)
			        }
			    });
	    		}			   
	    	}
    });
    }
    
    //新建按钮
	jQuery("#editer").on("click",function(){
		jQuery(".cower").show();
		jQuery(".tipBox").show();		
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
		jQuery('.providerType').html('<option value="">--请选择--</option><option value="运营商">运营商</option><option value="产品类">产品类</option><option value="服务类">服务类</option><option value="配件类">配件类</option>	<option value="系统类">系统类</option>')
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
	
	//确认提交
	jQuery("#confirm").on("click",function(){	
		
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
		if (jQuery(".juese").val() == '--请选择--') {
			jQuery(".ts8").css("color","red").html("(必填)");
			return false;
		}
		if(jQuery('.taocanName').val() == ''){
			jQuery(".ts").css("color","red").html("(必填)");
			return false;
		}
		else{
			
			jQuery.ajax({
				type:"post",
				url:url+"providerInfo/add.do",
				async:true,
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{					
					providerName:jQuery('.providerName').val(),
					providerType:jQuery('.providerType').find('option:selected').val(),
					providerRoot:jQuery('.providerRoot').val(),
					providerPerson:jQuery('.providerPerson').val(),
					providerTel:jQuery('.providerTel').val()			
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
						jQuery('.providerType').html('<option value="">--请选择--</option><option value="运营商">运营商</option><option value="产品类">产品类</option><option value="服务类">服务类</option><option value="配件类">配件类</option>	<option value="系统类">系统类</option>')
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
						showPage(1)
					}
									
				}
			});
		}
		
	})
	var pswchange = '';
	var planId;
	//修改
	jQuery(document).on('click','.changecl',function(){
		jQuery(".cower").show();
		jQuery(".tipBox2").show();	
		planId = jQuery(this).parent().parent().attr('data-id');
		var str2 ='';
		jQuery.ajax({
			type:"post",
			url:url+"providerInfo/findById.do?providerId="+planId,
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			success:function(data){
				console.log(data);			   
				//useroId = data.data.userInfo.userId;
//				console.log(data.data.userInfo.userPwd);
				jQuery('.providerName2').val(data.data.providerName)
				jQuery('.providerRoot2').val(data.data.providerRoot)
				jQuery('.providerType2').html('<option>'+data.data.providerType+'</option>'+'<option value="运营商">运营商</option><option value="产品类">产品类</option><option value="服务类">服务类</option><option value="配件类">配件类</option><option value="系统类">系统类</option>')
				jQuery('.providerPerson2').val(data.data.providerPerson)
				jQuery('.providerTel2').val(data.data.providerTel)
				
			}
		});     	
	})
	
	
	//确认提交
	jQuery("#confirm2").on("click",function(){		
		
		if (jQuery(".taocanName2").val() == '') {
			jQuery(".ts2").css("color","red").html("(必填)");
			return false;
		}
//		if (jQuery(".xxdz2").val() == '') {
//			jQuery(".ts3").css("color","red").html("(必填)");
//			return false;
//		}
//		if (jQuery(".juese2").val() == '--请选择--') {
//			jQuery(".ts4").css("color","red").html("(必填)");
//			return false;
//		}				
//		if (flage != true) {
//			jQuery(".ts9").css("color","red").html(flage);
//			return false;
//		}
		
		
		else{
			
			jQuery.ajax({
				type:"post",
				url:url+" providerInfo/update.do?providerId="+planId,
				async:true,
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{
					providerName:jQuery('.providerName2').val(),
					providerType:jQuery('.providerType2').find('option:selected').val(),
					providerRoot:jQuery('.providerRoot2').val(),
					providerPerson:jQuery('.providerPerson2').val(),
					providerTel:jQuery('.providerTel2').val()
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
						showPage(1)
					}
									
				}
			});
		}
		
	})
	
	//删除
	var strselectedItems;
	jQuery(document).on('click','.deletecl',function(){
		strselectedItems = jQuery(this).parent().attr('data-id');
		jQuery(".cower").show();
     	jQuery(".deleteBox").show();
     	
	})	
	//确认删除
	jQuery("#deleteIt").on("click",function(){
		jQuery.ajax({
			type:"post",
			url:url+"providerInfo/delete.do?providerIds="+strselectedItems,
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			//data:{feePlanId:selectedItems},
			success:function(data){
				console.log(data);
				showPage(1)
				//if (data.status == 0) {
					jQuery(".cower").hide();
     				jQuery(".deleteBox").hide();
					
				//} 				
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