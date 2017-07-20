
		var my = angular.module('myapp',['ngRoute']);
		
		my.controller('listCtrl', ['$scope','$http',function($scope,$http,$route) {
			$scope.$route = $route;
			
		}]);
		//余额
		jQuery('.money').html(window.localStorage.accountMoney+' 元');
		//充值
		jQuery('.payHover').hover(function(){
			jQuery('.payNower').show()
		},function(){
			jQuery('.payNower').hide()
		});
		//立即充值
		jQuery('.payNower').click(function(){
			jQuery('.thisUser').html(jQuery('.userNamer').html());
			jQuery('.tipBox0').show();
			jQuery('.cower').show();
		})
		//关闭弹窗
		jQuery(".closebtn0").on("click",function(){
			jQuery(".payMent").css('border','1px solid #ccc');
			jQuery(".moneyNum").css('border','1px solid #ccc');
			payMent = '';
			moneyNum = '';
			jQuery(".tipBox0").hide();
			jQuery(".cower").hide();
		});
		//支付方式
		var payMent,moneyNum;
		jQuery(".payMent").on("click",function(){
			jQuery(this).css('border','1px solid red').siblings().css('border','1px solid #ccc');
			console.log();
			payMent = jQuery(this).attr('alt');
		});
		//支付金额
		jQuery(".moneyNum input").bind('input propertychange',function(){			
			moneyNum = jQuery(this).val();
		});
		jQuery(".qita").focus(function(){
			jQuery(".moneyNum i").hide();
		});
		jQuery(".qita").blur(function(){
			jQuery(".moneyNum i").show();
		});
		jQuery(".moneyNum").unbind('click').click(function(){
			jQuery(this).css('border','1px solid red').siblings().css('border','1px solid #ccc');
			
			moneyNum = jQuery(this).find('input').val();
		});
		jQuery("#confirm0").click(function(){			
			console.log(payMent+moneyNum);
			jQuery('.chongzhiBox').show();
			jQuery('.tipBox0').hide();
			window.open(url+"payorder/alipay.do?payMoney="+moneyNum+"&userId="+window.localStorage.getItem('userId'));
		});
		jQuery('.payNo0').click(function(){
			jQuery(".payMent").css('border','1px solid #ccc');
			jQuery(".moneyNum").css('border','1px solid #ccc');
			payMent = '';
			moneyNum = '';
			jQuery(".cower").hide();
			jQuery(".chongzhiBox").hide();
		})
		jQuery('.payNow0').click(function(){
			jQuery(".payMent").css('border','1px solid #ccc');
			jQuery(".moneyNum").css('border','1px solid #ccc');
			payMent = '';
			moneyNum = '';
			//支付成功会去掉一个接口
			jQuery.ajax({
				type:"get",
				url:url+"accountInfo/findAccountMoney.do?userId="+window.localStorage.getItem('userId'),
				async:true,
				success:function(data){
					console.log(data);
					if (data.status == 0) {
						jQuery('.money').html(data.data+'元');
						window.localStorage.setItem('accountMoney',data.data);
						jQuery(".cower").hide();
						jQuery(".chongzhiBox").hide();
					}
				}
			});
		});
		var hack = true;
		//退出
		jQuery('.logout').click(function(){
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
				window.location.href = 'login.html'
			}			
		});
		});
		jQuery(".userNamer").html(window.localStorage.getItem('userName'));
		jQuery(".listFirst .listli").click(function(){
			jQuery(this).siblings().css("background","none").find(".lista").css({"color":'#ACB5BF',"font-weight":"500"});
			jQuery(this).find('.lista').css({"color":"#ffffff","font-weight":"600"})
			jQuery(this).css({'background':"#3A4D5C"})
			jQuery(this).siblings().find('.lista');
//			jQuery(this).find('.listfula').css('color','#ACB5BF')
			jQuery(this).siblings().find('.tips4').show();
			jQuery(this).siblings().find('.tips5').hide()
		})
		jQuery(".listFirst .listli a.lista").on("click", function () {	
		    jQuery(this).parent("li").siblings().find(".lista").css({"color":'#ACB5BF',"font-weight":"0"});
		    jQuery(this).siblings("div").slideToggle();
		    jQuery(this).parent("li").siblings().find("div").hide(500);
		    jQuery(".listli .listful .listfula").on("click", function () {
		    	jQuery(this).parent().css("color","#FF7301");
		        jQuery(this).css({"color":"#ffffff"}).parent().siblings().children().css({"color":"#ACB5BF"});		        				jQuery(this).parent().parent().parent().parent().siblings().find(".listfula").parent().css({"color":"#ACB5BF","background":"none"});
		        jQuery(this).parent().parent().parent().parent().siblings().find(".listfula").css('color','#ACB5BF')
		    });
		})	
//		jQuery(".listFirst .listli").click(function(){
//			jQuery(this).css({"background":"#fff"}).siblings().css("background","none").find(".lista").css("color",'#2A8AD4');
//			jQuery(this).find('.lista').css("color",'#000').children('img').attr("src","img/下箭头 (1).png");
//			jQuery(this).siblings().find('.lista').children('img').attr("src","img/右箭头.png");
//			jQuery(this).find('.tips4').hide();
//			jQuery(this).find('.tips5').show();
//			jQuery(this).siblings().find('.tips4').show();
//			jQuery(this).siblings().find('.tips5').hide()
//		})
//		jQuery(".listFirst .listli").click(function(){
//			if (hack) {
//				jQuery(this).css({"background":"#fff"}).siblings().css("background","none").find(".lista").css("color",'#2A8AD4');
//				jQuery(this).find('.lista').css("color",'#000').children('img').attr("src","img/下箭头 (1).png");
//				jQuery(this).siblings().find('.lista').children('img').attr("src","img/右箭头.png");
//				jQuery(this).find('.tips4').hide();
//				jQuery(this).find('.tips5').show();
//				jQuery(this).siblings().find('.tips4').show();
//				jQuery(this).siblings().find('.tips5').hide();
//				hack = false;
//			} else{
//				jQuery(this).find('.lista').css("color",'#000').children('img').attr("src","img/右箭头.png");
//				jQuery(this).siblings().find('.lista').children('img').attr("src","img/右箭头.png");
//				jQuery(this).find('.tips4').hide();
//				jQuery(this).find('.tips5').show();
//				jQuery(this).siblings().find('.tips4').show();
//				jQuery(this).siblings().find('.tips5').hide();
//				hack = true;
//			}
//			
//		})
//		jQuery(".listFirst .listli a.lista").on("click", function () {	
//		    jQuery(this).parent("li").siblings().find(".lista");
//		    jQuery(this).siblings("div").slideToggle(100).parent("li").siblings().children("div").slideUp(100);
//		    jQuery(".listli .listful .listfula").on("click", function () {
//		    	jQuery(this).parent().css("background","#333333").siblings().css('background','none')
//		        jQuery(this).css({"color":"#fff"}).parent().siblings().children().css({"color":"#808080"});
//		        jQuery(this).parent().parent().parent().parent().siblings().find(".listfula").parent().css({"color":"#000","background":"none"});
//		        jQuery(this).parent().parent().parent().parent().siblings().find(".listfula").css('color','#000')
//		    })
//		})	
		//控制页面跳转
		my.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){		
			$routeProvider
			.when("/s",{
				templateUrl:"html/s.html",
				controller:"sController",
				reload:true
			})
			.when("/first",{
				templateUrl:"html/first.html",
				controller:"firstController"
			})
			.when("/control",{
				templateUrl:"html/control.html",
				controller:"controlController",
				reload:true
			})
			.when("/jueseguanli",{
				templateUrl:"html/jueseguanli.html",
				controller:"jueseguanliController"
			})
			.when("/userList",{
				templateUrl:"html/userList.html",
				controller:"userListController"
			})
			.when("/ratePlan",{
				templateUrl:"html/ratePlan.html",
				controller:"ratePlanController"
			})
			.when("/renewPlan",{
				templateUrl:"html/renewPlan.html",
				controller:"renewPlanController"
			})
			.when("/supplier",{
				templateUrl:"html/supplier.html",
				controller:"supplierController"
			})
			.when("/repertory",{
				templateUrl:"html/repertory.html",
				controller:"repertoryController"
			})
			.when("/outShop",{
				templateUrl:"html/outShop.html",
				controller:"outShopController"
			})
			.when("/orderForm",{
				templateUrl:"html/orderForm.html",
				controller:"orderFormController"
			})			
			.otherwise({
				redirectTo: '/first'
			})
		}])