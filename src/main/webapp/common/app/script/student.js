(function($) {
	$.student = function() {};
	var selectGradeCode = "",
		selectGradeName = "",
		selectClassCode = "",
		selectClassName = "";
	//左侧数据源
	function createLeftItem(allist) {
		var html = [];
		for (var i = 0; i < allist.length; i++) {
			var jsonData = allist[i];
			var classname = jsonData['gradename'];
			var classcode = jsonData['gradecode'];
			selectGradeCode = (i == 0) ? classcode : '';
			html.push('<li data-index="' + i + '"><a>' + classname + '</a></li>');
		}
		$('.bjleft ul').append(html.join(''));
		$('.bjleft ul li:first-child').addClass('active').siblings().removeClass("active");
	}

	//动态创建右侧内容 index 左侧item的index 
	function createRightContent(index) {
		var gradeJson = allist[index];
		var gradename = gradeJson['gradename'];
		var gradecode = gradeJson['gradecode'];
		var classlist = gradeJson['classlist'];
		var html = [];
		if (classlist.length <= 0) {
			$.Empty.showEmptyView({
				"imgPath": "../../common/app/images/nopage/img_noNetwork.png",
				"errorMsg": "该年级下无班级",
				"isShowMsg": true,
				"isShowRetry": false,
				"appendDom": ".bjright"
			});


			var imgPath = "../../common/app/images/nopage/img_noList.png";
			html.push('<div class="nothing">\
					<p><img src="' + imgPath + '"><span>无班级</span></p></div>');
		} else {
			html.push('<ul>');
			for (var j = 0; j < classlist.length; j++) {
				var classJson = classlist[j];
				var classname = classJson['classname'];
				var classcode = classJson['classcode'];
				html.push('<li gradecode="' + gradecode + '" gradename="' +
					gradename +
					'" classcode="' +
					classcode + '" classname="' + classname + '" data-index="' + j + '"><a>' + classname + '</a></li>');
			}
			html.push('</ul>')
			$('.bjright').html(html.join(''));
		}

		//需要dom元素加载上来之后在更改状态
		changeSelectClassStatus(index, classlist, gradecode, gradename);
	}
	/* 有选中班级，更新选中班级状态*/
	function changeSelectClassStatus(index, classlist, gradecode, gradename) {
		for (var j = 0; j < classlist.length; j++) {
			var classJson = classlist[j];
			var classcode = classJson['classcode'];
			var classname = classJson['classname'];
			if (selectClassCode) {
				if (selectClassCode == classcode) {
					$(".bjright ul li").eq(j).addClass("active").siblings().removeClass("active");
				}
			}
		}
	}
	// 为student类添加类方法
	$.extend($.student, {

		initStudent: function(p, func) {
			// console.log("---->student initing", p);
			// p = $.extend({

			// }, p);

			var inithtml =
				'<div class="banji dialog">\
			<div class="bjsele">\
				<div class="bjnav">\
					<div class="bjleft">\
						<ul></ul>\
					</div>\
					<div class="bjright">\
					</div>\
				</div>\
				<div class="bjbtn">\
					<a href="#" class="cancel_btn">取消</a>\
					<a href="#" class="confirm_btn">确定</a>\
				</div>\
			</div>\
		</div>';
			$("body").append(inithtml);

			//limit 0获取全校班级+延时班 1根据角色判断所管理班级
			var limit = p.limit;
			var paramDic;
			var url = system.usercenter + "/delayedclass/getAllGradeAndClass.action";
			if (limit == "1") {
				paramDic = {
					usercode: p.usercode,
					includedelay: p.includedelay,
					token: p.token,
					orgid: p.orgid,
					modeltype: "1" //1根据角色去判断,0不根据角色判断
				}
			} else {
				paramDic = {
					usercode: p.usercode,
					includedelay: p.includedelay,
					token: p.token,
					orgid: p.orgid,
					modeltype: "0" //1根据角色去判断,0不根据角色判断
				};

			}
			
			//默认选中的年级值和班级值
			selectGradeCode = updateNullString(p.selectGradeCode, "");
			selectClassCode = updateNullString(p.selectClassCode, "");
			jQuery_Request_Post(url, paramDic, "json", true, function(data) {
				var json = JSON.stringify(data);
				var result = data["ret"];
				if (result) {
					allist = data['data'];
					if (allist.length > 0) {
						createLeftItem(allist);

						var stop = false;
						for (var i = 0; i < allist.length; i++) {
							var gradeJson = allist[i];
							var gradename = gradeJson['gradename'];
							var gradecode = gradeJson['gradecode'];
							var classlist = gradeJson['classlist'];
							if (classlist.length > 0) {
								for (var j = 0; j < classlist.length; j++) {
									var classJson = classlist[j];
									var classcode = classJson['classcode'];
									var classname = classJson['classname'];
									if (classcode.length > 0 && stop == false) {
										selectGradeCode = gradecode;
										selectClassCode = classcode;
										selectClassName = classname;
										selectGradeName = gradename;
										$(".bjleft ul li").eq(i).addClass("active").siblings().removeClass("active");
										createRightContent(i);
										stop = true;
										break;
									}
								}
							}
						}


						if (func) {
							var param = {
								"gradecode": selectGradeCode,
								"gradename": selectGradeName,
								"classcode": selectClassCode,
								"classname": selectClassName
							};
							func(param);
						}
						this.confirmInited = true;
					} else {
						mui.toast("班级数据列表为空！");
					}

				} else {
					var msg = updateNullString(data["msg"], "获取班级失败!")
					mui.toast(msg);
				}
			}, function(error) {
				mui.toast("请求获取班级失败!");
			});
		},

		show: function(func) {
			if (!this.initStudent) {
				this.initStudent(msg);
			}

			//显示出来
			$(".dialog").fadeIn().addClass("active");
			$("body").css("overflow", "hidden")

			//取消按钮点击
			$(".cancel_btn").click(function() {
				$(".dialog").fadeOut().removeClass("active");
				$("body").css("overflow", "inherit")
			});

			//确定按钮点击
			$(".confirm_btn").click(function() {
				if (func) {
					var param = {
						"gradecode": selectGradeCode,
						"gradename": selectGradeName,
						"classcode": selectClassCode,
						"classname": selectClassName
					};
					func(param);
				}
				$(".dialog").fadeOut().removeClass("active");
				$("body").css("overflow", "inherit")
			});
			//左侧item点击
			$(".bjleft ul").on("click", "li", function() {
				var index = $(this).attr('data-index');
				$(this).addClass("active").siblings().removeClass("active");
				createRightContent(index);
			});

			//右侧item点击
			$(".bjright").on("click", "li", function() {
				$(this).addClass("active").siblings().removeClass("active");
				var gradename = $(this).attr('gradename');
				var gradecode = $(this).attr('gradecode');
				var classname = $(this).attr('classname');
				var classcode = $(this).attr('classcode');
				selectGradeCode = gradecode;
				selectGradeName = gradename;
				selectClassCode = classcode;
				selectClassName = classname;
			})
		},
	});
})(jQuery);
