var isAPPHeaderShow = false;

if (isAPPHeaderShow) {
	$("header").show()
} else {
	$("header").hide()
}

// 页面加载完毕后 需要全局配置的代码写在这里
if(isAPPHeaderShow){
	$('.content').css('height','100%').css('height','-=44px');
}else{
	$('.content').css('height','100%').css('height','-=0px');
}
$('.content').css('overflow-y','scroll')