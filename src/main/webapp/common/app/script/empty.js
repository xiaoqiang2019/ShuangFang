/** 使用方法如下
 * $.Empty.showEmptyView({"imgPath":"../common/xueanapp/images/nopage/img_noList.png",
						  "errorMsg":"数据加载时出了问题",
						  "isShowMsg":true,
						  "isShowRetry":true},function(){
							  //don something : can refresh data
		})
		$.Empty.hideEmptyView()//hide empty view
 * 
 * 
 * 
 * */


(function() {
	$.Empty = function() {};
	$.extend($.Empty, {
		showEmptyView: function(p, func) {
			p = $.extend({
				"imgPath": "../../common/app/imags/nopage/img_noList", //默认图片
				"errorMsg": "暂无相关数据", //默认展示文本
				"isShowMsg": true, //默认展示文本
				"isShowRetry": false, //是否展示重新加载按钮,
				"isclear":true,
				"appendDom": "body"
			}, p);
			// position: absolute;left: 0px;right: 0px;bottom: 0px;top: 0px;
			var inithtml =
				'<div class="empty_wrapper"><img src ="../../common/app/imags/nopage/img_noList"/><p></p><a>重新加载</a></div>';
			var css = '<style>\n' +
				'.empty_wrapper{overflow: hidden;height:100%;background-color: transparent;}\n' +
				'.empty_wrapper img{float: left;margin-top: calc(50%/3);width: 190px;height:190px;margin-left: calc(50% - 95px);}\n' +
				'.empty_wrapper p{float: left;background-color: transparent;font-size: 14px;color: #999999;margin-top: 20px;width:100%;text-align: center;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}\n' +
				'.empty_wrapper a{border: 1px solid #3BA2FF;float: left;padding: 5px; width:70px;border-radius: 5px;font-size: 14px;color: #3BA2FF;margin-top: 10px;text-align: center;margin-left: calc(50% - 35px);}\n' +
				+'</style>';
			$("head").append(css);
			var obj = p.appendDom;
			if( p.isclear) {
			$(obj).html("");}
			$(obj).append(inithtml);

			//图片
			if (p.imgPath.length > 0) {
				$(".empty_wrapper img").attr("src", p.imgPath);
			}
			//错误信息
			$(".empty_wrapper p").hide();
			if (p.isShowMsg) {
				$(".empty_wrapper p").show()
				if (p.errorMsg.length > 0) {
					$(".empty_wrapper p").text(p.errorMsg)
				}
			}
			//刷新 or 重新加载
			$(".empty_wrapper a").hide();
			if (p.isShowRetry) {
				$(".empty_wrapper a").show()
				//无网络
				if (p.imgPath == "../../common/app/images/nopage/img_noNetwork.png") {
					$(".empty_wrapper a").text("刷新")
				} else {
					$(".empty_wrapper a").text("重新加载")
				}
			}

			$(".empty_wrapper").fadeIn();
			$(".empty_wrapper").on("tap", "a", function(e) {
				e.stopPropagation();
				if (func) {
					func();
				}
			});
		},
		hideEmptyView: function(p) {
			$(".empty_wrapper").fadeOut();

		}
	});
})();



