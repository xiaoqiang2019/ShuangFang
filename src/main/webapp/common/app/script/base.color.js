/* 存放学安App相关规范颜色 只做参考 并无实际使用*/


/**学安橙 (用于表示提醒、进行中、等待中、异常、差、轻度污染等弱提示性元素)*/
var kAPPOrangeColor = rgb(255, 137, 65);
/**学安蓝 （主色调，用于需要强调、突出、引导的元素*/
var kAPPBlueColor = rgb(59, 162, 255);
/**专项督导 灰蓝色*/
var kAPPGrayBlueColor = rgb(106, 147, 190);
/**学安红 （用于表示警告、过期、失败、拒绝、异常、不及格、重度污染等强提示性元素）*/
var kAppTitleRedColor = rgb(239, 48, 48);
/**学安绿 （用于表示完成、成功、通过、正常、及格、优秀等提示性元素）*/
var kAppTitleGreenColor = rgb(80, 184, 17);
/**学安黄 （用于专项检查中信息提示）*/
var kAppTitleYellowColor = rgb(160, 122, 80);

var kAPPNavColor = rgb(17, 17, 17); //导航栏标题颜色
var kAPPTableViewLineColor = rgb(222, 222, 222); //通用列表线颜色
var kAppBackgrondColor = rgb(239, 239, 244); //主界面背景色 接近白色
var kAppTitleBlackColor = rgb(17, 17, 17); //一级标题颜色 黑色
var kAppTitleDrakGrayColor = rgb(102, 102, 102); //二级字体颜色 深灰
var kAppTitleGrayColor = rgb(153, 153, 153); //二级字体颜色 灰色
var kAppTitleLightGrayColor = rgb(187, 187, 187); //辅助字体颜色 浅灰
var kAPPBusinessTopColor = rgb(18, 188, 243); //业务顶部过渡色值

var randomColor = Math.floor(Math.random() * (255 + 1 - 0) + 0);//随机颜色

// { display: none; / 不占据空间，无法点击 / } 
// /**/
// { visibility: hidden; / 占据空间，无法点击 / } 
// /**/
// { position: absolute; top: -999em; / 不占据空间，无法点击 / } 
// /**/
// { position: relative; top: -999em; / 占据空间，无法点击 / } 
// /**/
// { position: absolute; visibility: hidden; / 不占据空间，无法点击 / } 
// /**/
// { height: 0; overflow: hidden; / 不占据空间，无法点击 / } 
// /**/
// { opacity: 0; filter:Alpha(opacity=0); / 占据空间，可以点击 / } 
// /**/
// { position: absolute; opacity: 0; filter:Alpha(opacity=0); / 不占据空间，可以点击 / } 
// /**/
// { 
// zoom: 0.001; 
// -moz-transform: scale(0); 
// -webkit-transform: scale(0); 
// -o-transform: scale(0); 
// transform: scale(0); 
// / IE6/IE7/IE9不占据空间，IE8/FireFox/Chrome/Opera占据空间。都无法点击 / 
// } 
// /**/
// { 
// position: absolute; 
// zoom: 0.001; 
// -moz-transform: scale(0); 
// -webkit-transform: scale(0); 
// -o-transform: scale(0); 
// transform: scale(0); 
// / 不占据空间，无法点击 / 
// }