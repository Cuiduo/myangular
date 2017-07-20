my.controller('jueseguanliController', ['$scope','$http',function($scope,$http,$route) {
	$scope.$route = $route;
//	$scope.load = function (){     
//	   
//  }
//  $scope.refresh = function () {
//      $scope.load();
//  }
	//初始化函数
	showPage(1,20,'');	
	//下载
	jQuery('.downbtn').on('click',function(){
		window.location.href=url+"role/export.do?pageNum="+jQuery('.pageNum').val()+"&pageSize="+jQuery('.showNum').find('option:selected').val()+"&conditionParam="+jQuery('.search').val();		
	})
	//页面初始化	
	var pc,cr;
    function showPage(pageIndex,pageSize,conditionParam){
    	//var pc,cr;
    	jQuery.ajax({
	    	type:"get",	    			url:url+"role/getList.do?pageNum="+pageIndex+"&pageSize="+pageSize+"&conditionParam="+conditionParam,
	    	async:true, 
	    	xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
	    	success:function(data){
	    		jQuery('.tcdPageCode').html('');
    			pc = data.data.pages;
    			cr = data.data.pageNum;	
	    		console.log(data);	    		
	    		if (data.status == 0) {
	    			var str = '<tr class="tabTop">'+
								'<td nowrap="nowrap">角色名称</td>'+
								'<td nowrap="nowrap">角色描述</td>'+
								'<td nowrap="nowrap">操作</td>'+
							'</tr>';
	    		for (var i=0 ;i<data.data.list.length;i++) {
	    			str += '<tr data-id="'+data.data.list[i].roleId+'">'+						
								'<td nowrap="nowrap">'+data.data.list[i].name+'</td>'+
								'<td nowrap="nowrap">'+data.data.list[i].roleDescribe+'</td>'+						
								'<td nowrap="nowrap"><span class="checkcl"><img src="images/chakan.png"></span><span class="changecl"><img src="images/bianji.png"></span><span class="deletecl"><img src="images/shanchu.png"></span></td>'+
							'</tr>';										
	    		};
	    		jQuery(".tabBox table").html(str);	
	    		//console.log(jQuery("#check"))
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
	    		//判断查看修改删除按钮的显示与否
//				var checkInput = jQuery("#look").val();
//				var changeInput = jQuery("#update").val();
//				var deleteInput = jQuery("#delete").val();
//				if (checkInput == 'undefined' || checkInput =='') {
//					jQuery(".checkcl").hide();
//				} else{
//					jQuery(".checkcl").show();
//				}
//				if (changeInput == 'undefined' || changeInput =='') {
//					jQuery(".changecl").hide();
//				} else{
//					jQuery(".changecl").show();
//				}
//				if (deleteInput == 'undefined' || deleteInput =='') {
//					jQuery(".deletecl").hide();
//				} else{
//					jQuery(".deletecl").show();			
//				}
				//查看
				jQuery('.checkcl').unbind('click').click(function(){
					console.log(jQuery(this).parent().parent('tr').attr("data-id"))
					jQuery.ajax({
						type:"post",
						url:url+"role/findRoleByRoleIdForLook.do",
						data:{roleId:jQuery(this).parent().parent('tr').attr("data-id")},
						async:true,
						xhrFields: {
				           withCredentials: true
				        },
				        crossDomain: true,
						success:function(data){
							console.log(data);	
							jQuery(".cower").show();
							jQuery(".tipBox").eq(0).show();	
							jQuery(".title").html("查看");
							jQuery("#confirm").hide();
							jQuery("#name").val(data.data.name).attr("readonly",true);
							jQuery("#url").val(data.data.roleDescribe).attr("readonly",true);
							zTrees	= jQuery.fn.zTree.init(jQuery("#treeDemo"), setting, data.data.ztrees);
						}
					});
				});
				
				//修改
				var changeId = '';
				jQuery('.changecl').unbind('click').click(function(){
					changeId = jQuery(this).parent().parent('tr').attr("data-id");		
					console.log(changeId)
					jQuery.ajax({
						type:"post",
						url:url+"role/findRoleByRoleId.do",
						data:{
							roleId:	changeId			
							},
						xhrFields: {
				           withCredentials: true
				        },
				        crossDomain: true,
						async:true,
						success:function(data){
							console.log(data);
							jQuery(".cower").show();
							jQuery(".tipBox").eq(1).show();
							jQuery(".title").html("修改");
							jQuery("#name").removeAttr("readonly");
							jQuery("#url").removeAttr("readonly");
							jQuery("#name2").val(data.data.name);
							jQuery("#url2").val(data.data.roleDescribe);
							zTrees	= jQuery.fn.zTree.init(jQuery("#treeDemo2"), setting, data.data.ztrees);				
						}
					});
				})
				
				
	    	}
	    }});
	}
    
    //搜索
    jQuery('.seachbtn').click(function(){    		showPage(1,jQuery('.showNum').find('option:selected').val(),jQuery('.search').val())
    })    
    		
    //展示多少数据
    jQuery('.showNum').on('change',function(){
    	var pageSize = jQuery(this).find('option:selected').val();    		showPage(1,pageSize,jQuery('.search').val(),jQuery('.search').val());
    })
    
    //跳转页码
    jQuery('.ymqd').click(function(){    		showPage(jQuery('.pageNum').val(),jQuery('.showNum').find('option:selected').val(),jQuery('.search').val());
    })
    
	var checkedNode = '';
	var zTrees = '';
	//新增权限按钮	
	jQuery("#editer").on("click",function(){
		jQuery(".cower").show();
		jQuery(".tipBox").eq(0).show();
		jQuery(".title").html("添加")
		jQuery.ajax({
			type:"post",
			url:url+"role/toAdd.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			success:function(data){
				console.log(data);
			    zTrees	= jQuery.fn.zTree.init(jQuery("#treeDemo"), setting, data.data.ztrees);				
			}
		});		
	});	
	//存放查看和修改的checkbox的变量
	var v = [];
	var n = '';
	var x = [];
	var y = '';
	//获取所选值
	function onCheck(e,treeId,treeNode){
            var treeObj=jQuery.fn.zTree.getZTreeObj("treeDemo");
            nodes=treeObj.getCheckedNodes(true);
            for(var i=0;i<nodes.length;i++){
				v.push(Number(nodes[i].id));
				n =  v.join(',')
            }            
    }
	function onCheck2(e,treeId,treeNode){
            var treeObj=jQuery.fn.zTree.getZTreeObj("treeDemo2");
            nodes=treeObj.getCheckedNodes(true);
            for(var i=0;i<nodes.length;i++){
				x.push(Number(nodes[i].id));
				y =  x.join(',')
            }            
    }
	//提交
	jQuery("#confirm").on("click",function(){
		if (jQuery("#name").val() == '') {
			jQuery('.ts').css("color","red");
			return false;
		}
		if(jQuery("#url").val() == ''){
			jQuery('.ts2').css("color","red");
			return false;
		}		
		else{
			onCheck();
			console.log(n.length)
			if(n.length < 1){
				jQuery(".sbts").show();
				setTimeout(showtip,3000);
				function showtip(){
					jQuery(".sbts").hide();
				}
				return false;
			}else{
				jQuery.ajax({
					type:"post",
					url:url+"role/add.do",
					async:true,
					xhrFields: {
			           withCredentials: true
			        },
			        crossDomain: true,
					data:{					
						permissionIds:n,
						name:jQuery("#name").val(),
						roleDescribe:jQuery("#url").val()
					},
					dataType:"json",
					success:function(data){						
						if (data.status == 0) {								
							//window.location.reload();
							showPage(1,20,'');
							jQuery("#name").val('');
							jQuery("#url").val('');
							jQuery(".tipBox").hide();
							jQuery(".cower").hide();
						}
					}
				});
			}					
		}
		
	})	
	//关闭弹窗
	jQuery(".closebtn").on("click",function(){
		jQuery("#name").val('').attr('readonly',false);
		jQuery("#url").val('').attr('readonly',false);
		jQuery("#name2").val('').attr('readonly',false);
		jQuery("#url2").val('').attr('readonly',false);
		zTrees = '';
		jQuery("#confirm").show().val("确定");
		jQuery("#off").val("取消");		
		jQuery(".tipBox").hide();
		jQuery(".cower").hide();
	});
	jQuery("#off").on("click",function(){
		jQuery("#name").val('').attr('readonly',false);
		jQuery("#url").val('').attr('readonly',false);
		jQuery("#name2").val('').attr('readonly',false);
		jQuery("#url2").val('').attr('readonly',false);
		zTrees = '';		
		jQuery("#confirm").show().val("确定");
		jQuery("#off").val("取消");		
		jQuery(".tipBox").hide();
		jQuery(".cower").hide();
	})
	jQuery("#off2").on("click",function(){
		jQuery("#name").val('').attr('readonly',false);
		jQuery("#url").val('').attr('readonly',false);
		jQuery("#name2").val('').attr('readonly',false);
		jQuery("#url2").val('').attr('readonly',false);
		zTrees = '';
		jQuery("#confirm").val("确定");
		jQuery("#off").val("取消");		
		jQuery(".tipBox").hide();
		jQuery(".cower").hide();
	})
	
	
	//提交2
	jQuery(".confirm2").on("click",function(){
		onCheck2();
		console.log(changeId)
		console.log(y);
		if (y != '') {
			jQuery.ajax({
				type:"post",
				url:url+"role/update.do",
				async:true,
				xhrFields: {
		           withCredentials: true
		        },
		        crossDomain: true,
				data:{				
					roleId:changeId,
					permissionIds:y,
					name:jQuery("#name2").val(),
					roleDescribe:jQuery("#url2").val()
				},
				dataType:"json",
				success:function(data){
					if (data.status == 0) {	
						jQuery(".tipBox").hide();
						jQuery(".cower").hide();
						showPage(1,20,'');
						//window.location.reload();
					}
				}
			});	
		}else{
			alert("权限不能为空")
			return false;
		}			
	})		
	
	//删除
	jQuery(document).on('click','.deletecl',function(){
		console.log("delete");
		jQuery(".cower").show();
		jQuery(".deleteBox").show();
		changeId = jQuery(this).parent().parent('tr').attr("data-id");
		console.log(changeId);		
	})
	//确认删除
	jQuery("#deleteIt").on("click",function(){
		console.log(changeId);
		jQuery.ajax({
			type:"post",
			url:url+"role/delete.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			data:{roleId:changeId},
			success:function(data){
				console.log(data);
				if (data.status == 0) {
					//window.location.reload();
					showPage(jQuery('.pageNum').val(),20,jQuery('.search').val());
					jQuery(".deleteBox").hide();
					jQuery(".cower").hide();
				}
			}
		});		
	});
	//取消删除按钮
	jQuery("#cencel").on("click",function(){		
		jQuery(".deleteBox").hide();
		jQuery(".cower").hide();
	})
	
	//注销
	jQuery(".comName").html(window.localStorage.getItem("accountName"));
	jQuery(".username").html(window.localStorage.getItem("userName"));
	jQuery(".loginOut").click(function(){
		console.log(222);
		jQuery.ajax({
			type:"post",
			url:url+"userinfo/loginOut.do",
			async:true,
			xhrFields: {
	           withCredentials: true
	        },
	        crossDomain: true,
			success:function(data){
				console.log(data)
				window.localStorage.clear();
			}
		});
	});
	
	//树形结构图
	var setting = {
		check: {
			enable: true
		},
		data: {
			simpleData: {
				enable: true
			}
		}
		};
		var zNodes =[
			{ id:1, pId:0, name:"超级管理员","chkDisabled":true},
			{ id:11, pId:1, name:"管理员"},
			{ id:111, pId:11, name:"渠道商"},
			{ id:112, pId:11, name:"客户"},
			{ id:12, pId:1, name:"用户"},
			{ id:121, pId:12, name:"随意勾选 1-2-1"},
			{ id:122, pId:12, name:"随意勾选 1-2-2"},
			{ id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
//			{ id:2, pId:0, name:"随意勾选 2", open:true},
			{ id:21, pId:2, name:"随意勾选 2-1"},
			{ id:22, pId:2, name:"随意勾选 2-2", open:true},
			{ id:221, pId:22, name:"随意勾选 2-2-1"},
			{ id:222, pId:22, name:"随意勾选 2-2-2"},
			{ id:23, pId:2, name:"随意勾选 2-3"}
		];
		
		var code;		
		function setCheck() {
			var zTree = jQuery.fn.zTree.getZTreeObj("treeDemo"),
			py = jQuery("#py").attr("checked")? "p":"",
			sy = jQuery("#sy").attr("checked")? "s":"",
			pn = jQuery("#pn").attr("checked")? "p":"",
			sn = jQuery("#sn").attr("checked")? "s":"",
			type = { "Y":py + sy, "N":pn + sn};
			zTree.setting.check.chkboxType = type;
			showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
		}
		function showCode(str) {
			if (!code) code = jQuery("#code");
			code.empty();
			code.append("<li>"+str+"</li>");
		}
}])