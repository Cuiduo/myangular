my.controller('outShopController', ['$scope','$http',function($scope,$http,$route) {
	$scope.$route = $route;
	//分页
//	jQuery(".tcdPageCode").createPage({
//      pageCount:1,
//      current:1,
//      backFn:function(p){
//          console.log(p);
//      }
//  });
    jQuery('#editer').val('出库')
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
								'<td>出库单号</td>'+
								'<td nowrap="nowrap">用户类型</td>'+
								'<td>账号名称</td>'+
								'<td>姓名</td>'+
								'<td>联系电话</td>'+
								'<td>商品名称</td>'+
								'<td>出库数量</td>'+
								'<td>出库时间</td>'+	
								'<td>销售金额</td>'+	
								'<td>销售总金额</td>'+	
								'<td>操作</td>'+	
							'</tr>';
				for (var i=0 ;i<data.data.length;i++) {
	    			str += '<tr  data-id="'+data.data[i].providerId+'" >'+
						'<td width="30px"><input data-id="'+data.data[i].providerId+'" type="checkbox" name="name" value=""/></td>'+
						'<td nowrap="nowrap"><a class="datauid">'+Number(i+1)+'</a></td>'+
//						'<td nowrap="nowrap">'+data.data[i].userName+'</td>'+
						'<td>'+data.data[i].providerName+'</td>'+
						'<td>'+data.data[i].providerType+'</td>'+
						'<td>'+data.data[i].providerType+'</td>'+
						'<td>'+data.data[i].providerType+'</td>'+
						'<td>'+data.data[i].providerType+'</td>'+
						'<td>'+data.data[i].providerType+'</td>'+
						'<td>'+data.data[i].providerType+'</td>'+
						'<td>'+data.data[i].providerRoot+'</td>'+
						'<td nowrap="nowrap">'+data.data[i].providerPerson+'</td>'
					str +='<td nowrap="nowrap">'+data.data[i].providerTel+'</td>'
					str +=	'<td  data-id="'+data.data.list[i].inputId+'"  nowrap="nowrap"><span class="checkcl"><img src="images/chakan.png"></span><span class="changecl"><img src="images/bianji.png"></span><span class="deletecl"><img src="images/shanchu.png"></span></td>'+
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
					} 
					);
				//加载页码	    
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
    
	//出库    
    changess(0);
	
	function changess(numbers){
		jQuery('.qqq input:eq('+numbers+')').bind('input propertychange', function(){
			
			var aaa = jQuery('.qqq input:eq('+numbers+')').val();
			if(aaa.indexOf('/n')!= -1){
				jQuery('.qqq input:eq('+numbers+')').val(jQuery('.qqq input:eq('+numbers+')').val().substring(0,jQuery('.qqq input:eq('+numbers+')').val().length-2));
				
				jQuery(".qqq").append("<input type='text' style='border:none'  class='decrition_inp inp'/>");
				for(var o=jQuery('.qqq input').length-2;o>numbers;o--){
					jQuery('.qqq input:eq('+(o+1)+')').val(jQuery('.qqq input:eq('+o+')').val());
					jQuery('.qqq input:eq('+o+')').val("");
				}
				jQuery('.qqq input:eq('+(numbers+1)+')').focus();
				forInput();
				changess(jQuery('.qqq input').length-1);
				
			}
		});
		jQuery('.qqq input:eq('+numbers+')').keypress(function(e){
	 		var e = e || window.event;  
			if(e.keyCode == 13){ 
			   	jQuery(".qqq").append("<input type='text'  class='decrition_inp inp'/>");
				for(var o=jQuery('.qqq input').length-2;o>numbers;o--){
					jQuery('.qqq input:eq('+(o+1)+')').val(jQuery('.qqq input:eq('+o+')').val());
					jQuery('.qqq input:eq('+o+')').val("");
				}
				jQuery('.qqq input:eq('+(numbers+1)+')').focus();
				forInput();
				changess(jQuery('.qqq input').length-1);
			}
		})
		jQuery('.qqq input:eq('+numbers+')').keydown(function(e){
	 	 	var e = e || window.event; 
	 	 	if(e.keyCode==8){
	 	 		//return false;
	 	 		
			  	if(jQuery('.qqq input:eq('+numbers+')').val()==""&&numbers!=0){
			  		jQuery('.qqq input:eq('+numbers+')').remove();
			  		jQuery('.qqq input:eq('+(numbers-1)+')').val(jQuery('.qqq input:eq('+(numbers-1)+')').val()+(jQuery('.qqq input:eq('+(numbers-1)+')').val().substring(jQuery('.qqq input:eq('+(numbers-1)+')').val().length-1,jQuery('.qqq input:eq('+(numbers-1)+')').val().length)));
			  		for(var o=numbers+1;o<jQuery('.qqq input').length;o++){
						jQuery('.qqq input:eq('+(o-1)+')').val(jQuery('.qqq input:eq('+o+')').val());
					}
			  		jQuery('.qqq input:eq('+(jQuery('.qqq input').length-1)+')').val("");
			  		jQuery('.qqq input:eq('+(numbers-1)+')').focus();
			  		forInput();
			  	}
		 	}
	 	 	if(e.keyCode==46){
			  	if(jQuery('.qqq input:eq('+numbers+')').val()==""){
			  		for(var o=numbers+1;o<jQuery('.qqq input').length;o++){
						jQuery('.qqq input:eq('+(o-1)+')').val(jQuery('.qqq input:eq('+o+')').val());
					}
			  		jQuery('.qqq input:eq('+(jQuery('.qqq input').length-1)+')').val("");
			  		jQuery('.qqq input:eq('+numbers+')').focus();
			  		forInput();
			  	}
		 	}
		})
	}
  
	var arr = [];
	function forInput(){		
		var bbb = 0;
		var ccc;		
		for(var i=0;i<(jQuery('.qqq input').length-1);i++){
			if (jQuery('.qqq input:eq('+i+')').val() == '') {
				continue;
			}
			ccc = true;			
			for(var j=(jQuery('.qqq input').length-1)-1;j>i;j--){
				
				if((jQuery('.qqq input:eq('+i+')').val())==(jQuery('.qqq input:eq('+j+')').val())
				&&(jQuery('.qqq input:eq('+i+')').val())!=""){
					ccc = false;
//					jQuery('.qqq input:eq('+i+')').val("重复了！");
					jQuery('.qqq input:eq('+j+')').css('color','red').addClass('woqule');
				}
			}			
			if(ccc){
				bbb++;				
			}
			if (jQuery('.qqq .decrition_inp').val() != '') {
				jQuery('.haomuch').html(bbb);
				if (Number(jQuery('.haomuch').html()) >= Number(jQuery('.inTotal').html())) {
					console.log('enough')
				}
				//arr.push(jQuery('.qqq input:eq('+i+')').val());
			}else{
				bbb = 0;
				jQuery('.haomany').val(0);
			}
			
			
		}
		
	}
	

   console.log('enough')
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
		jQuery('.providerType').html('<option value="">--请选择--</option><option value="移动">移动</option><option value="联通">联通</option><option value="电信">电信</option>')
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
		for (var i=0;i<jQuery('.qqq .decrition_inp').length;i++) {
			if (jQuery(jQuery('.qqq .decrition_inp')[i]).hasClass('woqule')) {
				
			}else{
				arr.push(jQuery(jQuery('.qqq .decrition_inp')[i]).val())
			}
		}
		//console.log(a)
//		if (jQuery(".juese").val() == '--请选择--') {
//			jQuery(".ts8").css("color","red").html("(必填)");
//			return false;
//		}
//		if(jQuery('.taocanName').val() == ''){
//			jQuery(".ts").css("color","red").html("(必填)");
//			return false;
//		}
//		else{
//			
			jQuery.ajax({
				type:"post",
				url:url+"flowCard/add.do",
				async:true,
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{					
					iccids:arr.join(','),
					userId:window.localStorage.getItem('userId'),
					operator:jQuery('.providerType option:selected').val()
				},
				dataType:"json",
				success:function(data){
					console.log(data)
					if(data.status == 1){
						jQuery(".ts").html('无iccid').css("color",'red');
						return false;
					}
					if (data.status == 2) {
						jQuery(".ts").html(data.msg).css("color",'red');
					}
					if (data.status == 0) {
						jQuery(".tipBox input").val('');
						jQuery("#confirm").val("确定");
						jQuery("#diqu").val('');
						jQuery(".ts").html('');
						//jQuery('.providerType').html('<option value="">--请选择--</option><option value="移动">移动</option><option value="联通">联通</option><option value="电信">电信</option>')
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
//		}
		
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