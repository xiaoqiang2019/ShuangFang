var t = null;
t = setTimeout(time, 1000);//開始运行
function time() {
	clearTimeout(t);//清除定时器
	dt = new Date();
	var y = dt.getFullYear();
	var mt = dt.getMonth() + 1;
	var day = dt.getDate();
	var h = dt.getHours();//获取时
	var m = dt.getMinutes();//获取分
	var s = dt.getSeconds();//获取秒
	var t = null;

	//  var a = ["日", "一", "二", "三", "四", "五", "六"];  
	//  var week = new Date().getDay();  
	//var str =a[week];  

	if(document.getElementById("showTime")){
		document.getElementById("showTime").innerHTML = y + "." + Appendzero(mt) + "." + Appendzero(day) + "." + Appendzero(h) + ":" + Appendzero(m) + ":" + Appendzero(s);
		function Appendzero(obj) {
			if (obj < 10) return "0" + "" + obj;
			else return obj;
		}
		t = setTimeout(time, 1000); //设定定时器，循环运行    
	} 
}
