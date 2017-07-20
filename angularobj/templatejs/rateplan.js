my.controller('ratePlanController', ['$scope','$http',function($scope,$http,$route) {
	$scope.$route = $route;
	   
	showPage(1,20,'');	
	//下载
	jQuery('.downbtn').on('click',function(){
		window.location.href=url+"feeplan/export.do?pageNum="+jQuery('.pageNum').val()+"&pageSize="+jQuery('.showNum').find('option:selected').val()+"&conditionParam="+jQuery('.search').val();		
	})
	//页面初始化	
	var pc,cr;
    function showPage(pageIndex,pageSize,conditionParam){
    	//var pc,cr;
    	jQuery.ajax({
	    	type:"get",	    			url:url+"feeplan/getList.do?pageNum="+pageIndex+"&pageSize="+pageSize+"&conditionParam="+conditionParam,
	    	async:true, 
	    	xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
	    	success:function(data){
    			pc = data.data.pages;
    			cr = data.data.pageNum;	
	    		if (data.status == 2) {
	    			//window.location.href = "../../login.html";
	    		}else{
	    			var str = '<tr class="tabTop">'+
								'<td><input class="selectAll" type="checkbox" name="namecheck" value="" /></td>'+
								'<td>序号</td>'+
//								'<td>账号名称</td>'+
								'<td>套餐名称</td>'+
								'<td nowrap="nowrap">套餐价格</td>'+
								'<td>套餐周期</td>'+
								'<td>付费周期</td>'+
								'<td>套餐流量</td>'+
								'<td>操作</td>'+	
							'</tr>';
				for (var i=0 ;i<data.data.list.length;i++) {
	    			str += '<tr  data-id="'+data.data.list[i].feePlanId+'" >'+
						'<td width="30px"><input data-id="'+data.data.list[i].feePlanId+'" type="checkbox" name="name" value=""/></td>'+
						'<td nowrap="nowrap"><a class="datauid">'+Number(i+1)+'</a></td>'+
//						'<td nowrap="nowrap">'+data.data[i].userName+'</td>'+
						'<td>'+data.data.list[i].planName+'</td>'+
						'<td>'+data.data.list[i].palnPrice+' 元/月</td>'+
						'<td>'+data.data.list[i].planCycleName+'</td>'+
						'<td nowrap="nowrap">'+data.data.list[i].payCycle+'个月</td>'
					str +='<td nowrap="nowrap">'+data.data.list[i].planFlow+' MB</td>'
					str +=	'<td  data-id="'+data.data.list[i].feePlanId+'"  nowrap="nowrap"><span class="checkcl"><img src="images/chakan.png"></span><span class="changecl"><img src="images/bianji.png"></span><span class="deletecl"><img src="images/shanchu.png"></span></td>'+
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
	    		jQuery(".tcdPageCode").createPage({
			        pageCount:data.data.pages,
			        current:data.data.pageNum
			    });
			    //翻页
			    jQuery('.tcdNumber').unbind('click').click(function(){
			   		console.log(jQuery(this).html());			   					showPage(jQuery(this).html(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val());
			    });
			    var pagesIndex,nextPage;
			    //上一页
			    jQuery('.prevPage').unbind('click').click(function(){
			     
			    	pagesIndex = jQuery('.pageNum').val();
			    	console.log(pagesIndex); 
			    	if (pagesIndex <= parseInt(jQuery('.total').html())) {
			    		pagesIndex--
			    	}
			    	showPage(pagesIndex,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val());
			    });
			    //下一页
				jQuery('.nextPage').unbind('click').click(function(){
			    	nextPage = jQuery('.pageNum').val();    	 
			    	if (nextPage < parseInt(jQuery('.total').html())) {
			    		nextPage++
			    	}
			    	showPage(nextPage,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val());
			    });
			    //修改
				jQuery('.changecl').unbind('click').click(function(){
					jQuery(".cower").show();
					jQuery(".tipBox2").show();	
					planId = jQuery(this).parent().parent().attr('data-id');
					var str2 ='';
					jQuery.ajax({
						type:"post",
						url:url+"feeplan/findById.do?feePlanId="+planId,
						async:true,
						xhrFields: {
				           withCredentials: true
				        },
				        crossDomain: true,
						success:function(data){
							console.log(data);			   
							//useroId = data.data.userInfo.userId;
			//				console.log(data.data.userInfo.userPwd);
							jQuery('.taocanName2').val(data.data.planName)
							jQuery('.price2').val(data.data.palnPrice)
							jQuery('.planCycle2').html('<option>'+data.data.planCycleName+'</option>'+'<option value="1">1个月</option><option value="3">3个月</option><option value="6">6个月</option><option value="12">12个月</option><option value="24">24个月</option>')
							jQuery('.payCycle2').val(data.data.payCycle)
							jQuery('.planFlow2').val(data.data.planFlow)
							
						}
					});     	
				});
				//查看
				jQuery('.checkcl').unbind('click').click(function(){
					planId = jQuery(this).parent().parent().attr('data-id');
					var str3 ='';
					jQuery.ajax({
						type:"post",
						url:url+"feeplan/findById.do?feePlanId="+planId,
						async:true,
						xhrFields: {
				           withCredentials: true
				        },
				        crossDomain: true,
						success:function(data){
							console.log(data);			   
							//useroId = data.data.userInfo.userId;
			//				console.log(data.data.userInfo.userPwd);
							jQuery('.taocanName3').val(data.data.planName)
							jQuery('.price3').val(data.data.palnPrice)
							jQuery('.planCycle3').html('<option>'+data.data.planCycleName+'</option>'+'<option value="1">1个月</option><option value="3">3个月</option><option value="6">6个月</option><option value="12">12个月</option><option value="24">24个月</option>')
							jQuery('.payCycle3').val(data.data.payCycle)
							jQuery('.planFlow3').val(data.data.planFlow)
							jQuery(".cower").show();
							jQuery(".tipBox3").show();	
						}
					});     	
				});
				
	    	}
    });
    }
    
     //搜索
    jQuery('.seachbtn').click(function(){    		showPage(1,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val())
    })   
    
    //页面跳转
    jQuery('.ymqd').click(function(){
		showPage(1,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val())		
	})
    
    //展示多少数据
    jQuery('.showNum').on('change',function(){
    	var pageSize = jQuery(this).find('option:selected').val();    		showPage(1,pageSize,jQuery('.search').val(),jQuery('.search').val());
    })
    
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
		jQuery('.planCycle').html('<option value="">--请选择--</option><option value="1">1个月</option><option value="3">3个月</option><option value="6">6个月</option><option value="12">12个月</option><option value="24">24个月</option>')
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
	jQuery("#off").on("click",function(){
		jQuery(".tipBox input").val('');
		jQuery("#confirm").val("确定");
		jQuery("#diqu").val('');
		jQuery(".ts").html('');
		jQuery('.planCycle').html('<option value="">--请选择--</option><option value="1">1个月</option><option value="3">3个月</option><option value="6">6个月</option><option value="12">12个月</option><option value="24">24个月</option>')
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
	})
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
				url:url+"feeplan/add.do",
				async:true,
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{					
					planName:jQuery('.taocanName').val(),
					palnPrice:jQuery('.price').val(),
					planCycle:jQuery('.planCycle').find('option:selected').val(),
					planCycleName:jQuery('.planCycle').find('option:selected').text(),
					payCycle:jQuery('.payCycle').val(),
					planFlow:jQuery('.planFlow').val()					
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
						jQuery('.planCycle').html('<option value="">--请选择--</option><option value="1">1个月</option><option value="3">3个月</option><option value="6">6个月</option><option value="12">12个月</option><option value="24">24个月</option>')
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
						showPage(1,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val())
					}
									
				}
			});
		}
		
	})
	var pswchange = '';
	var planId;	
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
				url:url+"feeplan/update.do?feePlanId="+planId,
				async:true,
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{
					planName:jQuery('.taocanName2').val(),
					palnPrice:jQuery('.price2').val(),
					planCycle:jQuery('.planCycle2').find('option:selected').val(),
					planCycleName:jQuery('.planCycle2').find('option:selected').text(),
					payCycle:jQuery('.payCycle2').val(),
					planFlow:jQuery('.planFlow2').val()	
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
	
	//查看返回
	jQuery("#confirm3").on("click",function(){
		jQuery(".cower").hide();
		jQuery(".tipBox3").hide();
	})
	
	//删除
	var strselectedItems;
	jQuery(document).on('click','.deletecl',function(){
		strselectedItems = jQuery(this).parent().attr('data-id');
		jQuery(".cower").show();
     	jQuery(".deleteBox").show();
     	
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
	//确认删除
	jQuery("#deleteIt").on("click",function(){
		jQuery.ajax({
			type:"post",
			url:url+"feeplan/delete.do?feePlanIds="+strselectedItems,
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			//data:{feePlanIds:selectedItems},
			success:function(data){
				console.log(data);
				if (data.status == 0) {
					jQuery(".cower").hide();
     				jQuery(".deleteBox").hide();
					showPage(1)
				} 				
			}
		});
	});
	jQuery('.deletecl').click(function(){
		console.log(111)
	})
    //取消删除按钮
	jQuery("#cencel").on("click",function(){		
		jQuery(".deleteBox").hide();
		jQuery(".cower").hide();
	}) 
}])