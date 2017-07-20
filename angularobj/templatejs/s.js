my.controller('sController', ['$scope','$http',function($scope,$http,$route) {
	$scope.$route = $route;	
//	showPage();
//	//添加日期转换
//	function time(timer){
//		return  new Date(timer).toLocaleString().replace('/', ".").replace('/', ".").replace('下午', "").replace('上午', "").slice(0,16);
//	}
//	//页面初始化
//	function showPage(){
//	    jQuery.ajax({
//	    	type:"get",
//	    	url:url+'payorder/getList.do?userId=2',
//	    	async:true,
//	    	success:function(data){
//	    		console.log(data)	    		
//			    //jQuery(".searchBox").html(data.msg);			   	    		
//	    		var str = '<tr class="tabTop">'+
//								'<td><input class="selectAll" type="checkbox" name="namecheck" value=" " /></td>'+
//								'<td>添加日期</td>'+
//								'<td>ICCID</td>'+
//								
//								'<td>运营商账户ID</td>'+
//							'</tr>';
//	    		for (var i=0 ;i<data.data.payOrders.length;i++) {
//	    			str += '<tr>'+
//						'<td width="20px"><input type="checkbox" name="name" data-id="'+data.data.payOrders[i].orderNum+'"/></td>'+
//						'<td nowrap="nowrap">'+time(data.data.payOrders[i].payDate)+'</td>'+
//						'<td nowrap="nowrap">'+data.data.payOrders[i].payMoney+'</td>'+
//						'<td>'+data.data.payOrders[i].payOrderId+'</td>'+		
//					'</tr>';
//									
//	    		};
//	    		jQuery(".tablist").append(str);
//		    }			
//	    });
//  }
}])