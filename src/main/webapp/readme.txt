1、文件夹请全部用小写，最好能体现当前业务的含义。
2、文件名命名请全部用小写，文件名体现体现当前文件对应的功能含义，单词之间用横线进行分割。


//项目部署到服务器后前端应用名称叫static
引用路径示例：https://yj.ss360.org/static/jias/insurance_app/insurance_main.html


20200514 吴宛茹新增
本地调试 
1.获取system.js中各环境对应地址时，浏览器中调用负载接口，替换返回的地址字典即可；
接口示例:https://yj.ss360.org/get_position.action?userCode=19138020802

2.发布程序需删除julong.js文件中localUserCode、localToken的值为空;

实际开发
1.获取接口请求前缀地址：
页面引用:<script src="../../common/system/system.js"></script>
取值示例如下：
用户中心地址为：system.usercenter、保险项目地址为：system.jias;

2.获取token：
页面引用：<script src="../../common/extend/julong/julong.js"></script>
        <script src="../../common/extend/julong/base_common.js"></script>
        <script src="../../common/extend/jquery/jquery.cookie.js"></script>
取值示例如下:
var urltoken = updateNullString(getURLParameter('token'), localToken);
var token = updateNullString($.cookie("token"), urltoken);
解释：先取cookie中的token ，取不到值使用url带的token值，url带的token值也没有取本地定义的值（发布程序时不存在此值）


3.网络请求示例:
网络接口请求写在julong.js中(App开发部封装),接口请求调用示例如下:
var paramDic = {
			"usercode": usercode,
			"token": token,
			"businfo.busid": busid
		};
var url = system.usercenter + "/schoolbus/getInformationOfCurrentBus.action";
jQuery_Request_Post(url, paramDic, "json", true, function(responseData){
			var ret = responseData["ret"];
			if (ret) {} else {
				var msg = updateNullString(responseData["msg"], "获取数据失败");
			}
		}, function(error) {
			var msg = updateNullString(error, "请求失败!")
		});
		
4.获取用户基本信息接口写在julong.js中
取值示例:
//模块入口(主界面)中需要获取用户信息 如用户手机号
var userphone = updateNullString(localStorage.getItem("phone"), "");
if (userphone.length == 0) {
	getUserInfoRequest(system.usercenter,usercode,token,function() {
	userphone = updateNullString(localStorage.getItem("phone"), "");
}

5.HbuildX调试办法：
调整system.js为当前环境对应的服务器地址如12环境，https://ceshi.ss360.org/,
在右侧Web浏览器中输入当前用户中心地址，登录用户，再次加载要调试的静态页即可调试;