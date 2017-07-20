my.controller('controlController', ['$scope','$http',function($scope,$http,$route) {
	$scope.$route = $route;
	
	//关闭弹窗
	jQuery(".closebtn").on("click",function(){
		jQuery("#name").val('');
		jQuery("#parentPermissionId2").empty();
		jQuery("#url").val('');
		jQuery("#name2").val('');
	    jQuery("#url2").val('');
		jQuery("#confirm").val("确定");
		jQuery("#off").val("取消");		
		jQuery(".tipBox").hide();
		jQuery(".cower").hide();
	});
	
	jQuery("#off").on("click",function(){
		jQuery("#name").val('');
		jQuery("#parentPermissionId2").empty();
		jQuery("#url").val('');
		jQuery("#name2").val('');
	    jQuery("#url2").val('');
		jQuery("#confirm").val("确定");
		jQuery("#off").val("取消");		
		jQuery(".tipBox").eq(0).hide();
		jQuery(".cower").hide();
	})
	jQuery("#off2").on("click",function(){	
		jQuery("#name2").val('');
		jQuery("#parentPermissionId2").empty();
		jQuery("#url2").val('');
		jQuery("#confirm").val("确定");
		jQuery("#off").val("取消");		
		jQuery(".tipBox").eq(1).hide();
		jQuery(".cower").hide();
	})
	//实例化tree对象
	var myTree= new GridTree();	
		//创建表格的函数
		function test(data){ 
		    var GridColumnType = [				                   
								{
									header : '权限名称',
									headerIndex : 'name',
									columntype : {
										inputtype : 'html',
										htmlStr : '<span>$</span>',
										nameId : 'textbox'
									}
								}, {
									header : 'URL',
									headerIndex : 'url',
									columntype : {
										inputtype : 'html',
										htmlStr : '<span>$</span>',
										nameId : 'textbox'
									}
								}
								, {
									header : '操作',
									headerIndex : 'permissionId',
									columntype : {
										inputtype : 'html',
	//									htmlStr : '<a href=\'#/limit_xg?id=$\');">修改</a>&nbsp;<a href=\'#/limit_del?id=$\');">删除</a>',
										htmlStr : '<a class="change"><img src="images/bianji.png"></a>&nbsp;<a class="delete"><img src="images/shanchu.png"></a>',
										nameId : 'textbox'
									}
								}];
			var content = {columnModel:GridColumnType,        
	                hidddenProperties:['permissionId','name'],
	                data:data,
	                idColumn:'permissionId',
	                parentColumn:'parentPermissionId',
	                tableId:'testTable',
	                el:'newtableTree'
	                };
				myTree.loadData(content);
				myTree.makeTable();	
		}
	//初始化
	show();
	function show(){
		jQuery.ajax({
			type:"get",
			url:url+"permission/findAllPermissionName.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			success:function(data){
				console.log(data);
				if (data.status == 1) {				
					//show();
					jQuery('#newtableTree').html('')
				}
				if (data.status == 0) {
					test(data.data);
					
				}

				//判断修改删除按钮的显示与否			
//				var changeInput = jQuery("#update").val();
//				var deleteInput = jQuery("#delete1").val();				
//				if (changeInput == 'undefined' || changeInput == undefined) {
//					jQuery(".change").hide();
//				} else{
//					jQuery(".change").show();
//				}
//				if (deleteInput == 'undefined' || deleteInput == undefined) {
//					jQuery(".delete").hide();
//				} else{
//					jQuery(".delete").show();
//				}
			}
		});
	}	
	var str
	//新增权限按钮	
	jQuery("#editer").on("click",function(){
		jQuery(".cower").show();
		jQuery(".tipBox").eq(0).show();
		jQuery.ajax({
			type:"post",
			url:url+"permission/findAllPermissionName.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			success:function(data){
				console.log(data);
				str = '<option  value="0">0</option>';
				for (var i=0;i<data.data.length;i++) {
					str += "<option value='"+data.data[i].permissionId+"'>"+data.data[i].name+"</option>";
					jQuery("#parentPermissionId").html(str)
				}
			}
		});
		
	});
	//提交
	jQuery("#confirm").on("click",function(){		
		jQuery.ajax({
			type:"post",
			url:url+"permission/add.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			data:{				
				parentPermissionId:jQuery("#parentPermissionId").val(),
				name:jQuery("#name").val(),
				url:jQuery("#url").val()
			},
			dataType:"json",
			success:function(data){
				console.log(data)
				if (data.status == 0) {	
					jQuery("#name").val('');
					jQuery("#parentPermissionId2").empty();
					jQuery("#url").val('');
					jQuery("#name2").val('');
				    jQuery("#url2").val('');
					jQuery("#confirm").val("确定");
					jQuery("#off").val("取消");		
					jQuery(".tipBox").hide();
					jQuery(".cower").hide();
					show()
				}
			}
		});		
	})
	//修改
	var num = '';
	jQuery(".change").on('click',function(){
		console.log(11111)
	})
	jQuery(document).on("click",".change",function(){
		console.log("change");
		
		num = jQuery(this).parent().parent().parent('tr').attr("permissionid");
		console.log(num)
		jQuery.ajax({
			type:"post",
			url:url+"permission/toUpdate.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
	        data:{permissionId:num},
	        success:function(data){
	        	console.log(data);
	        	jQuery(".cower").show();
				jQuery(".tipBox").eq(1).show();
	        	if (data.status == 0) {
	        		jQuery("#name2").val(data.data.permission.name);
	        		jQuery("#url2").val(data.data.permission.url);	        		
					jQuery("#parentPermissionId2").html("<option value='"+data.data.permission.parentPermissionId+"'>"+data.data.permission.parentName+"</option>")
					for (var i=0;i<data.data.allPermissionNames.length;i++) {
						jQuery("#parentPermissionId2").append("<option value='"+data.data.allPermissionNames[i].permissionId+"'>"+data.data.allPermissionNames[i].name+"</option>");
					}
					
	        	}
	        }
		});
	});
	jQuery("#confirm2").on("click",function(){		
		console.log(num)
		jQuery.ajax({
			type:"post",
			url:url+"permission/update.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
	        data:{
	        	permissionId:num,
	        	parentPermissionId:jQuery("#parentPermissionId2").val(),
				name:jQuery("#name2").val(),
				url:jQuery("#url2").val()
	        },
	        success:function(data){
	        	console.log(data);
	        	if (data.status == 0) {
	        		jQuery("#name").val('');
					jQuery("#parentPermissionId2").empty();
					jQuery("#url").val('');
					jQuery("#name2").val('');
				    jQuery("#url2").val('');
					jQuery("#confirm").val("确定");
					jQuery("#off").val("取消");		
					jQuery(".tipBox").hide();
					jQuery(".cower").hide();
	        		show()		
	        	}
	        }
		});
	})
	//删除
	jQuery(document).on("click",".delete",function(){
		console.log("delete");		
		jQuery(".cower").show();
		jQuery(".deleteBox").show();
		num = jQuery(this).parent().parent().parent('tr').attr("permissionid");
		console.log(num)		
	})
	//确认删除
	jQuery("#deleteIt").on("click",function(){
		console.log(num)
		jQuery.ajax({
			type:"post",
			url:url+"permission/delete.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
	        data:{permissionId:num},
	        success:function(data){
	        	console.log(data);
	        	jQuery(".cower").show();
				jQuery(".deleteBox").show();
	        	if (data.status == 1) {
	        		jQuery(".deleteBox p").html(data.msg);
	        		show();
	        	}
	        	if(data.status == 0){
	        		//$(".deleteBox p").html("确认删除");
	        		jQuery(".deleteBox p").html("确认删除");	
					jQuery("#name2").val('');
				    jQuery("#url2").val('');
					jQuery(".deleteBox").hide();
					jQuery(".cower").hide();
	        		show()
	        	}
	        }
		});
	});
	//取消删除按钮
	jQuery("#cencel").on("click",function(){		
		jQuery(".deleteBox p").html("确认删除");	
		jQuery("#name2").val('');
	    jQuery("#url2").val('');
		jQuery(".deleteBox").hide();
		jQuery(".cower").hide();
	});
	
	
	
	
	
//	var myTree= new GridTree();
//	show();
//	//初始化页面
//	function show(){
//		jQuery.ajax({
//			type:"get",
//			url:url+"permission/findAllPermissionName.do",
//			async:true,
//			xhrFields: {
//	           withCredentials: true
//	        },
//	        crossDomain: true,
//			success:function(data){
//				console.log(data);
//				if (data.status == 2) {
//					return false;
//	    		}
//				if (data.status == 0) {
//					test(data.data)
//				}				
//			}
//		});
//	}	
//	//创建表格的函数
//	function test(data){ 
//	    var GridColumnType = [				                   
//							{
//								header : '权限名称',
//								headerIndex : 'name',
//								columntype : {
//									inputtype : 'html',
//									htmlStr : '<span>$</span>',
//									nameId : 'textbox'
//								}
//							}, {
//								header : 'URL',
//								headerIndex : 'url',
//								columntype : {
//									inputtype : 'html',
//									htmlStr : '<span>$</span>',
//									nameId : 'textbox'
//								}
//							}
//							, {
//								header : '操作',
//								headerIndex : 'permissionId',
//								columntype : {
//									inputtype : 'html',
////									htmlStr : '<a href=\'#/limit_xg?id=$\');">修改</a>&nbsp;<a href=\'#/limit_del?id=$\');">删除</a>',
//									htmlStr : '<a class="change">修改</a>&nbsp;<a class="delete">删除</a>',
//									nameId : 'textbox'
//								}
//							}];
//		var content = {
//			    columnModel:GridColumnType,
//              hidddenProperties:['permissionId','name'],
//              data:data,
//              idColumn:'permissionId',
//              parentColumn:'parentPermissionId',
//              tableId:'testTable',
//              el:'newtableTree'
//              };
//			myTree.loadData(content);
//			myTree.makeTable();	
//	}
	
}])