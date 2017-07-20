var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
    21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",
    34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
    43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川"
    ,52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",
    64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
function isCardID(sId){
    var iSum=0 ;
    var info="" ;
    if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
    sId=sId.replace(/x$/i,"a");
    if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";
    sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
    var d=new Date(sBirthday.replace(/-/g,"/")) ;
    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
    for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
    if(iSum%11!=1) return "你输入的身份证号非法";
    return true;//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女")
}
//遮招弹窗
function showmsg(msg) {
    jQuery("#msginfo").html(msg);
    jQuery("#errormsg").show(300);
    setTimeout(function () {
        jQuery("#errormsg").hide(300);
    }, 3000);
}

function showmsgurl(msg,url)
{
    jQuery("#msginfo").html(msg);
    jQuery("#errormsg").show(300);
    setTimeout(function () {
        jQuery("#errormsg").hide(300);
    }, 3000);
    window.location.href = url;
}

(function () {
    jQuery.isTelephone= function (a) {//验证电话（包括手机和座机）
        var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}jQuery/;
        var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7}|177[0-9]{8})jQuery/;
        var value = jQuery(a).val();
        if (isMob.test(value) || isPhone.test(value)) {
            return true;
        }
        else {
            return false;
        }
    },
    jQuery.getQry = function (name) {//获取页面传参
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|jQuery)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]); return null;
    },
    jQuery.isEmpt = function (a) {//判断表单为空
        if (jQuery(a).val() == "" || jQuery(a).val() == null) {
            return true;
        }
        else {
            return false;
        }
    }
})();
  // alert(window.location.pathname)
document.addEventListener("plusready", function() {
    // 注册返回按键事件  
    plus.key.addEventListener('backbutton', function() {  
        // 事件处理  
        if(document.title=='首页'){
        	plus.nativeUI.confirm("退出程序？", function(event) {  
	            if (event.index) {  
	                plus.runtime.quit();  
	            }  
        	}, null, ["取消", "确定"]); 
        }else{
        	//window.location.href="../index.html?env="+ENV
        	history.back()
        }
    }, false);  
});  
window.onload = function(){
	jQuery('img').each(function() {
		if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) { 
			this.src = '../img/loading.gif'; 
		} 
	});
}




