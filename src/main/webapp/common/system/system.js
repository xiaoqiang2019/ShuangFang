//负载接口地址  不可删除
// get_position.action?userCode=

//保险项目测试环境 https://hnxy.ss360.org/
var system = {
	"jias": "https:\/\/hnxy.ss360.org\/jias\/",
	"qbms": "https:\/\/hnxy.ss360.org\/qbms\/",
	"activity": "https:\/\/hnxy.ss360.org\/activity\/",
	"menhu": "https:\/\/hnxy.ss360.org\/safeportal\/",
	"FILENGINX": "https:\/\/hnxy.ss360.org:8443\/",
	"iot": "https:\/\/iot.ss360.org\/",
	"ACCOUNT": "https:\/\/hnxy.ss360.org\/account\/",
	"FTPServer": "182.92.223.211_21_ftpadmin_ftpadmin\/",
	"client": "https:\/\/hnxy.ss360.org\/rms\/",
	"plugflow": "ngrok.ss360.org\/",
	"CSRMS": "https:\/\/hnxy.ss360.org\/rms\/",
	"static": "https:\/\/hnxy.ss360.org\/static\/",
	"ChefBright ": "https:\/\/hnxy.ss360.org\/csms\/",
	"LIVE_RTMP": "rtmp:\/\/60.205.114.34:1935\/",
	"cfms": "https:\/\/hnxy.ss360.org\/cfms\/",
	"h5app": "https:\/\/hnxy.ss360.org\/webh5\/",
	"equipment": "http:\/\/hnxy.ss360.org:9999\/",
	"check": "https:\/\/hnxy.ss360.org\/safecheck\/",
	"message": "http:\/\/47.95.205.57:8081\/",
	"OSS": "http:\/\/oss-cn-beijing.aliyuncs.com\/",
	"mqttTcp": "tcp:\/\/mqtt.ss360.org:1883\/",
	"RMS": "https:\/\/hnxy.ss360.org\/rms\/",
	"mqttHttp": "http:\/\/mqtt.ss360.org:18083\/",
	"attendance": "https:\/\/hnxy.ss360.org\/attendance\/",
	"usercenter": "https:\/\/hnxy.ss360.org\/",
	"doubleprevention": "https:\/\/hnxy.ss360.org\/prevention\/"
}


// //育教正式环境环境 https://yj.ss360.org/
// var system = {
// 	"jias": "https:\/\/yj.ss360.org\/jias\/",
// 	"qbms": "https:\/\/yj.ss360.org\/qbms\/",
// 	"ChefBright ": "https:\/\/yj.ss360.org\/\/csms\/",
// 	"activity": "https:\/\/yj.ss360.org\/activity\/",
// 	"question": "https:\/\/yj.ss360.org\/",
// 	"cfms": "https:\/\/yj.ss360.org\/\/cfms\/",
// 	"h5app": "https:\/\/yj.ss360.org\/webh5\/",
// 	"equipment": "http:\/\/yj.ss360.org:9999\/",
// 	"check": "https:\/\/yj.ss360.org\/\/safecheck\/",
// 	"message": "http:\/\/60.205.226.212:8081\/",
// 	"menhu": "https:\/\/yj.ss360.org\/safeportal\/",
// 	"FILENGINX": "https:\/\/imyj.ss360.org:8443\/",
// 	"mqttTcp": "tcp:\/\/mqtt.ss360.org:1883\/",
// 	"iot": "https:\/\/iot.ss360.org\/",
// 	"ACCOUNT": "https:\/\/yj.ss360.org\/account\/",
// 	"FTPServer": "60.205.226.212_21_ftpadmin_ftpadmin\/",
// 	"RMS": "https:\/\/yj.ss360.org\/rms\/",
// 	"client": "https:\/\/yj.ss360.org\/rms\/",
// 	"mqttHttp": "http:\/\/mqtt.ss360.org:18083\/",
// 	"attendance": "https:\/\/yj.ss360.org\/\/attendance\/",
// 	"usercenter": "https:\/\/yj.ss360.org\/",
// 	"CSRMS": "https:\/\/yj.ss360.org\/rms\/",
// 	"doubleprevention": "https:\/\/yj.ss360.org\/prevention\/"
// }



// //12测试环境  https://ceshi.ss360.org/
// var system = {
// 	"qbms": "https:\/\/ceshi.ss360.org\/qbms\/",
// 	"activity": "https:\/\/ceshi.ss360.org\/activity\/",
// 	"linshi": "http:\/\/y.ss360.com\/",
// 	"menhu": "https:\/\/ceshi.ss360.org\/safeportal\/",
// 	"FILENGINX": "https:\/\/ceshi.ss360.org:8443\/",
// 	"usercenter_": "https:\/\/ceshi.ss360.org\/",
// 	"iot": "https:\/\/64.ss360.org\/",
// 	"ACCOUNT": "https:\/\/ceshi.ss360.org\/account\/",
// 	"Third": "https:\/\/ceshi.ss360.org\/third\/",
// 	"client": "https:\/\/ceshi.ss360.org\/rms\/",
// 	"plugflow": "ngrok.ss360.org\/",
// 	"portal": "http:\/\/ceshi.ss360.com\/safeportal\/",
// 	"CSRMS": "https:\/\/ceshi.ss360.org\/rms\/",
// 	"question": "https:\/\/96.ss360.org\/",
// 	"LIVE_RTMP": "rtmp:\/\/218.28.27.180:1935\/",
// 	"h5app": "https:\/\/ceshi.ss360.org\/webh5\/",
// 	"equipment": "https:\/\/ceshi.ss360.org:9999\/",
// 	"check": "https:\/\/ceshi.ss360.org\/safecheck\/",
// 	"message": "http:\/\/192.168.1.12:8081\/",
// 	"OSS": "http:\/\/oss-cn-beijing.aliyuncs.com\/",
// 	"mqttTcp": "tcp:\/\/192.168.1.20:1883\/",
// 	"RMS": "https:\/\/ceshi.ss360.org\/rms\/",
// 	"mqttHttp": "http:\/\/mqtt.ss360.org:18083\/",
// 	"attendance": "https:\/\/ceshi.ss360.org\/attendance\/",
// 	"usercenter": "https:\/\/ceshi.ss360.org\/",
// 	"doubleprevention": "https:\/\/ceshi.ss360.org\/prevention\/"
// }



// //14测试环境 http://192.168.1.14/
// var system = {
// 	"qbms": "https:\/\/14.ss360.org\/qbms\/",
// 	"activity": "https:\/\/14.ss360.org\/activity\/",
// 	"menhu": "https:\/\/14.ss360.org\/safeportal\/",
// 	"message_": "http:\/\/192.168.1.68:8081\/",
// 	"FILENGINX": "https:\/\/14.ss360.org:8443\/",
// 	"iot": "https:\/\/64.ss360.org\/",
// 	"usercenter_": "https:\/\/192.168.1.14\/",
// 	"ACCOUNT": "https:\/\/14.ss360.org\/account\/",
// 	"Third": "https:\/\/14.ss360.org\/third\/",
// 	"FTPServer": "192.168.1.14_21_ftpadmin_ftpadmin\/",
// 	"client": "https:\/\/ceshi.ss360.org\/rms\/",
// 	"plugflow": "ngrok.ss360.org\/",
// 	"CSRMS": "https:\/\/ceshi.ss360.org\/rms\/",
// 	"question": "https:\/\/96.ss360.org\/",
// 	"ChefBright ": "https:\/\/14.ss360.org\/csms\/",
// 	"LIVE_RTMP": "rtmp:\/\/60.205.114.34:1935\/",
// 	"cfms": "https:\/\/14.ss360.org\/cfms\/",
// 	"h5app": "https:\/\/14.ss360.org\/webh5\/",
// 	"equipment": "https:\/\/14.ss360.org:9999\/",
// 	" ACCOUNT": "https:\/\/14.ss360.org\/account\/",
// 	"check": "https:\/\/14.ss360.org\/safecheck\/",
// 	"message": "http:\/\/192.168.1.14:8081\/",
// 	"OSS": "http:\/\/oss-cn-beijing.aliyuncs.com\/",
// 	"mqttTcp": "tcp:\/\/mqtt.ss360.org:1883\/",
// 	"assess": "https:\/\/14.ss360.org\/assess\/",
// 	"RMS": "https:\/\/14.ss360.org\/rms\/",
// 	"mqttHttp": "http:\/\/mqtt.ss360.org:18083\/",
// 	"usercenter": "https:\/\/14.ss360.org\/",
// 	"attendance": "https:\/\/14.ss360.org\/attendance\/",
// 	"doubleprevention": "https:\/\/14.ss360.org\/prevention\/"
// }



// //32开发环境 http://192.168.1.32/
// var system = {
// 	"jias": "http:\/\/y.ss360.com\/jias\/",
// 	"qbms": "http:\/\/www.ss360.com\/qbms\/",
// 	"activity": "http:\/\/www.ss360.com\/activity\/",
// 	"synchronous": "http:\/\/www.ss360.com\/sync\/",
// 	"securitybrain": "http:\/\/192.168.1.209:8088\/",
// 	"menhu": "http:\/\/rms.ss360.com\/safeportal\/",
// 	"message_": "http:\/\/192.168.1.68:8081\/",
// 	"FILENGINX": "http:\/\/rms.ss360.com:8081\/",
// 	"iot": "http:\/\/y.ss360.com\/",
// 	"usercenter_": "http:\/\/www.ss360.com\/",
// 	"ACCOUNT": "http:\/\/fan.ss360.com\/account\/",
// 	"Third": "http:\/\/alex.ss360.com\/third\/",
// 	"FTPServer": "192.168.1.33_21_ftpadmin_ftpadmin\/",
// 	"client": "http:\/\/rms.ss360.com\/rms\/",
// 	"plugflow": "ngrok.ss360.org\/",
// 	"ACC": "http:\/\/fan.ss360.com:8081\/account\/",
// 	"static": "http:\/\/www.ss360.com\/static\/",
// 	"ChefBright ": "http:\/\/www.ss360.com\/csms\/",
// 	"question": "http:\/\/96.ss360.org\/",
// 	"LIVE_RTMP": "rtmp:\/\/60.205.113.32:1935\/",
// 	"cfms": "http:\/\/y.ss360.com\/cfms\/",
// 	"h5app": "http:\/\/y.ss360.com\/webh5\/",
// 	"HS_Rabbitmq": "app01.huasu.net\/",
// 	" ACCOUNT": "http:\/\/fan.ss360.com\/account\/",
// 	"equipment": "http:\/\/www.ss360.com:9999\/",
// 	"softSys": "http:\/\/alex.ss360.com\/",
// 	"check": "http:\/\/y.ss360.com\/",
// 	"message": "http:\/\/192.168.1.68:8081\/",
// 	"mqttTcp": "tcp:\/\/192.168.1.93:1883\/",
// 	"OSS": "http:\/\/oss-cn-beijing.aliyuncs.com\/",
// 	"assess": "http:\/\/fan.ss360.com\/assess\/",
// 	"RMS": "http:\/\/rms.ss360.com\/rms\/",
// 	"aib": "http:\/\/fan.ss360.com\/rms\/",
// 	"mqttHttp": "http:\/\/192.168.1.93:18083\/",
// 	"attendance": "http:\/\/test.ss360.com\/attendance\/",
// 	"usercenter": "http:\/\/www.ss360.com\/",
// 	"doubleprevention": "http:\/\/fan.ss360.com\/prevention\/"
// }


// //全国平台地址 https://www.ss360.org/
// var system = {
// 	"qbms": "https:\/\/www.ss360.org\/qbms\/",
// 	"activity": "https:\/\/www.ss360.org\/activity\/",
// 	"synchronous": "https:\/\/www.ss360.org\/sync\/",
// 	"menhu": "https:\/\/www.ss360.org\/safeportal\/",
// 	"FILENGINX": "https:\/\/im.ss360.org\/",
// 	"iot": "https:\/\/iot.ss360.org\/",
// 	"ACCOUNT": "https:\/\/www.ss360.org\/account\/",
// 	"Third": "https:\/\/www.ss360.org\/third\/",
// 	"FTPServer": "47.93.122.162_21_ftpadmin_ftpadmin\/",
// 	"client": "https:\/\/www.ss360.org\/rms\/",
// 	"plugflow": "ngrok.ss360.org\/",
// 	"CSRMS": "https:\/\/vip.ss360.org\/rms\/",
// 	"ChefBright ": "https:\/\/www.ss360.org\/csms\/",
// 	"question": "https:\/\/ucenter.ss360.org\/",
// 	"LIVE_RTMP": "rtmp:\/\/60.205.114.34:1935\/",
// 	"h5app": "https:\/\/www.ss360.org\/webh5\/",
// 	"cfms": "https:\/\/www.ss360.org\/cfms\/",
// 	"equipment": "https:\/\/www.ss360.org:9999\/",
// 	"check": "https:\/\/www.ss360.org\/safecheck\/",
// 	"message": "http:\/\/182.92.64.16:80\/",
// 	"OSS": "http:\/\/oss-cn-beijing.aliyuncs.com\/",
// 	"mqttTcp": "tcp:\/\/mqtt.ss360.org:1883\/",
// 	"service": "https:\/\/ucenter.ss360.org\/service\/",
// 	"RMS": "https:\/\/www.ss360.org\/rms\/",
// 	"mqttHttp": "http:\/\/mqtt.ss360.org:18083\/",
// 	"attendance": "https:\/\/www.ss360.org\/attendance\/",
// 	"usercenter": "https:\/\/www.ss360.org\/",
// 	"doubleprevention": "https:\/\/www.ss360.org\/prevention\/"
// }
