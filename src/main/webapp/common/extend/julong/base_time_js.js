// 日期格式化 moment 时间用法
// moment().format('MMMM Do YYYY, h:mm:ss a'); // 十二月 2日 2019, 12:54:21 下午
// moment().format('dddd');                    // 星期一
// moment().format("MMM Do YY");               // 12月 2日 19
// moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
// moment().format();                          // 2019-12-02T12:54:21+08:00
// 相对时间
// moment("20111031", "YYYYMMDD").fromNow(); // 8 年前
// moment("20120620", "YYYYMMDD").fromNow(); // 7 年前
// moment().startOf('day').fromNow();        // 13 小时前
// moment().endOf('day').fromNow();          // 11 小时内
// moment().startOf('hour').fromNow();       // 1 小时前
// 日历时间
// moment().subtract(10, 'days').calendar(); // 2019年11月22日
// moment().subtract(6, 'days').calendar();  // 上周二下午12点54
// moment().subtract(3, 'days').calendar();  // 上周五下午12点54
// moment().subtract(1, 'days').calendar();  // 昨天下午12点54分
// moment().calendar();                      // 今天下午12点54分
// moment().add(1, 'days').calendar();       // 明天下午12点54分
// moment().add(3, 'days').calendar();       // 本周四下午12点54
// moment().add(10, 'days').calendar();      // 2019年12月12日
// 多语言支持
// moment().format('L');    // 2019-12-02
// moment().format('l');    // 2019-12-02
// moment().format('LL');   // 2019年12月2日
// moment().format('ll');   // 2019年12月2日
// moment().format('LLL');  // 2019年12月2日下午12点54分
// moment().format('lll');  // 2019年12月2日下午12点54分
// moment().format('LLLL'); // 2019年12月2日星期一下午12点54分
// moment().format('llll'); // 2019年12月2日星期一下午12点54分




//定时 缓存
var MyLocalStorage ={		
		Cache : {			
			/**
			 * 总容量5M
			 * 存入缓存，支持字符串类型、json对象的存储
			 * 页面关闭后依然有效 ie7+都有效
			 * @param key 缓存key
			 * @param stringVal
			 * @time 数字 缓存有效时间（秒） 默认60s 
			 * 注：localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。不能控制缓存时间，故此扩展
			 * */
			put : function(key,stringVal,time){
				try{
					if(!localStorage){return false;}
					if(!time || isNaN(time)){time=60;}
					var cacheExpireDate = (new Date()-1)+time*1000;
					var cacheVal = {val:stringVal,exp:cacheExpireDate};
					localStorage.setItem(key,JSON.stringify(cacheVal));//存入缓存值
					console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期");
				}catch(e){}	
			},
			/**获取缓存*/
			get : function (key){
				try{
					if(!localStorage){return false;}
					var cacheVal = localStorage.getItem(key);
					var result = JSON.parse(cacheVal);
					var now = new Date()-1;
					if(!result){return null;}//缓存不存在
					if(now>result.exp){//缓存过期
						this.remove(key);					
						return "";
					}
					//console.log("get cache:"+key);
					return result.val;
				}catch(e){
					this.remove(key);
					return null;
				}
			},/**移除缓存，一般情况不手动调用，缓存过期自动调用*/
			remove : function(key){
				if(!localStorage){return false;}
				localStorage.removeItem(key);
			},/**清空所有缓存*/
			clear : function(){
				if(!localStorage){return false;}
				localStorage.clear();
			}
		}//end Cache
}
//定时存数 当天24点过期
var MyLocalStorage24 ={		
		Cache : {			
			/**
			 * 总容量5M
			 * 存入缓存，支持字符串类型、json对象的存储
			 * 页面关闭后依然有效 ie7+都有效
			 * @param key 缓存key
			 * @param stringVal
			 * @time 数字 缓存有效时间（秒） 默认60s 
			 * 注：localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。不能控制缓存时间，故此扩展
			 * */
			put : function(key,stringVal){
				try{
					if(!localStorage){return false;}
					// //1.获取当前日期
					// var date=new Date();
					// //2. 获取当前分钟
					// var min=date.getMinutes();
					// //3. 设置当前时间+5分钟：把当前分钟数+5后的值重新设置为date对象的分钟数
					// date.setMinutes(min+5);
					// var cacheExpireDate = date.valueOf();
					
					var cacheExpireDate = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1).valueOf();

					var cacheVal = {val:stringVal,exp:cacheExpireDate};
					localStorage.setItem(key,JSON.stringify(cacheVal));//存入缓存值
					console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期");
				}catch(e){}	
			},
			/**获取缓存*/
			get : function (key){
				try{
					if(!localStorage){return false;}
					var cacheVal = localStorage.getItem(key);
					var result = JSON.parse(cacheVal);
					var now = new Date()-1;
					if(!result){return null;}//缓存不存在
					if(now>result.exp){//缓存过期
					console.log(key+"缓存过期,移除key："+key);
					
						this.remove(key);					
						return "";
					}
					console.log('key:'+key+" value:"+result.val);
					return result.val;
				}catch(e){
					this.remove(key);
					return null;
				}
			},/**移除缓存，一般情况不手动调用，缓存过期自动调用*/
			remove : function(key){
				if(!localStorage){return false;}
				localStorage.removeItem(key);
			},/**清空所有缓存*/
			clear : function(){
				if(!localStorage){return false;}
				localStorage.clear();
			}
		}//end Cache
}

