var isAPPLocalTest = false; //发布程序时 必须设置为false

var isLog = 1; //是否打印网络请求

//本地调试使用 发布废除
var localUserCode = "";
var localToken = "";
if (isAPPLocalTest) {
	/**当前登录用户code87000000562  
	 * https://yj.ss360.org 347【保险经理 + 教育局用户】 355【学生】 349【学校用户】 
	 * https://hnxy.ss360.org 37200000030[育测 学校用户] 37200000042【育测学生账户】
	 * http://ceshi.ss360.org 870000005564【学校用户】 870000004932【教育局用户】  
	 * http://14.ss360.org 1400002516
	 */
	localUserCode = "37200000041";
	localToken = "";
}

/**页面跳转封装*/
(function() {
	//设置命名空间
	var CodeSTD = window.CodeSTD || {};
	window.CodeSTD = CodeSTD;

	/**
	 * 创建Form表单
	 * @author wxs
	 * @param config Object
	 *  <p>url:form的Action，提交的后台地址</p>
	 *  <p>method:使用POST还是GET提交表单</p>
	 *  <p>params:参数 K-V</p>
	 * @return Form
	 */
	CodeSTD.form = function(config) {
		config = config || {};

		var url = config.url,
			method = config.method || 'GET',
			params = config.params || {};

		// getBaseTokenString(function(xueanBasetoken) {
		// 	params.basetoken = xueanBasetoken;
		var form = document.createElement('form');
		form.action = url;
		form.method = method;
		form.target = "_self";
		for (var param in params) {
			var value = params[param],
				input = document.createElement('input');
			input.type = 'hidden';
			input.name = param;
			input.value = value;
			form.appendChild(input);
		}
		document.body.appendChild(form);
		$(form).submit();
		return form;
		// });		
	}
})();

/**JQUERY 网咯请求封装*/
function jQuery_ajax(type, url, pars, dataType, jsonCallBack, success, error) {

	//为解决跨域问题 url需要追加str字符串(20200103 范玉静),不是所有都支持
	var str = "?&jsoncallback=?";
	if (jsonCallBack == true && dataType == 'json' && url.indexOf(str) == -1) {
		// 不包含
		url = url + str;
	}

	//为避免ajax接口缓存,增加随机数(毫秒值_0至1000随机数) 20200519吴宛茹新增
	var timestamp = new Date().getTime(); //毫秒时间戳
	var num = Math.floor(Math.random() * 1000 + 1); //随机数
	pars.request_timestamp = timestamp + "_" + num;


	//设置全局beforeSend
	$.ajaxSettings.beforeSend = function(xhr, setting) {
		//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
		if (isLog == 1) {
			var url = setting.url,
				type = setting.type;
			if (type == 'POST') {
				var data = setting.data,
					realUrl = url + "?" + data;
				dLog('网络请求为：' + realUrl)
			} else {
				dLog('网络请求为：' + url)
			}
			dLog('beforeSend:::' + JSON.stringify(setting));
		}
	};
	//设置全局complete
	$.ajaxSettings.complete = function(xhr, status) {
		if (isLog == 1) {
			dLog('complete:::' + status);
		}
	}
	$.ajax({
		url: url,
		type: type,
		data: pars,
		xhrFields: {withCredentials: true},
		beforeSend: function(xhr) {
		    xhr.withCredentials = true;
		},
		// crossDomain:true,
		dataType: dataType.length > 0 ? dataType : 'json',
		timeout: 20000,
		success: function(responseObject) {
			if (isLog == 1) {
				console.log(responseObject);
			}
			requestSuccessReturnDic(responseObject);//判断token是否失效
			success(responseObject);
		},
		error: function(result, textStatus, errorThrown) {
			var error_msg = "请求数据出错!";
			if (textStatus === 'timeout') {
				error_msg = "请求超时!";
			}
			console.log(error_msg, result.responseText, textStatus, errorThrown);
			if (error) {
				error(error_msg);
			}
		},
		fail: function(result) {
			var error_msg = "请求数据失败!";
			console.log(error_msg);
			if (fail) {
				error(error_msg);
			}
		}
	});
}
/**
 * 判断token是否过期，过期需要通知App重新获取
 */
function requestSuccessReturnDic(responseObject){
	var ret = responseObject["ret"];
	if (ret == false) {
		var errtype = responseObject["errtype"];
		if (errtype == -1||errtype =='-1') {
			console.log("token已失效 通知app刷新token")
			setupWebViewJavascriptBridge(function(bridge) {
				bridge.callHandler('refreshAppLoginTokenFunc', {}, function(responseData) {
					console.log(responseData)
				});
			});
		}
	}
} 

/**
 * jQueryGet请求操作
 */
function jQuery_Request_Get(url, pars, dataType, jsonCallBack, success, error) {
	jQuery_ajax('get', url, pars, dataType, jsonCallBack, success, error);
	/**
	 * 20200513 与刘志强确认 为支持浏览器访问 删除basetoken交互
	getBaseTokenString(function(xueanBasetoken) {
		pars.basetoken = xueanBasetoken;
		jQuery_ajax('get', url, pars, dataType, jsonCallBack, success, error);
	});
	*/
}

/**
 * jQueryPost请求操作
 */
function jQuery_Request_Post(url, pars, dataType, jsonCallBack, success, error) {
	jQuery_ajax('post', url, pars, dataType, jsonCallBack, success, error);
	/**	
	 * 20200513 与刘志强确认 为支持浏览器访问 删除basetoken交互
	getBaseTokenString(function(xueanBasetoken) {
		pars.basetoken = xueanBasetoken;
		jQuery_ajax('post', url, pars, dataType, jsonCallBack, success, error);
	});
	*/
}

// 获取当前用户基本信息
function getUserInfoRequest(url, usercode, token, func) {
	//console("请求用户个人信息");
	// get_userinfo.action
	var secret = getSecretKey();
	var paramDic = {};
	if (secret.length > 0) {
		var timestamp = moment().valueOf()
		paramDic = {
			"usercode": usercode,
			"token": token,
			"jid": usercode,
			"secret": secret,
			"timestamp": timestamp
		};
	} else {
		paramDic = {
			"usercode": usercode,
			"token": token,
			"jid": usercode
		};
	}

	var urlString = url + "/get_userinfo.action";
	jQuery_Request_Post(urlString, paramDic, "json", true, function(responseData) {
		var ret = responseData["ret"];
		if (ret) {
			var userDic = responseData["info"];
			//console("用户个人信息="+userDic);
			//将用户信息存储在缓存中
			localStorage.setItem("usercode", userDic["jid"]);
			localStorage.setItem("username", userDic["nickname"]);
			localStorage.setItem("headimageurl", userDic["himg"]);
			localStorage.setItem("phone", userDic["phone"]);
			localStorage.setItem("rolename", userDic["role"]);
			localStorage.setItem("orgid", userDic["orgid"]);
			localStorage.setItem("orgname", userDic["orgname"]);
			//登录用户类型 10超级管理员，20系统级普通管理员，30是教育局用户，40学校用户，60学校用户，70是学生，80是家长 100代理商
			localStorage.setItem("usertype", userDic["usertype"]);
			localStorage.setItem("areaid", userDic["areaid"]);
			localStorage.setItem("areaname", userDic["areaname"]);
			localStorage.setItem("useridc", userDic["idcard"]);
			localStorage.setItem("classcode", userDic["classcode"]);
			localStorage.setItem("classname", userDic["classname"]);
			localStorage.setItem("idctimestamp", timestamp); //学生用户，解密身份证信息使用
			//区域是否有下层
			localStorage.setItem("isParent", userDic["isParent"]);
			localStorage.setItem("classcode", userDic["classcode"]);

			//年级(心理测评需要判断用户是小学还是中学)
			localStorage.setItem("grade", userDic["grade"]);
			localStorage.setItem("sex", userDic["sex"]);

			if (func) {
				func()
			}
		} else {
			//console("用户个人信息请求失败")
			if (func) {
				func()
			}
		}
	}, function(error) {
		//console("用户个人信息请求出错");
		if (func) {
			func()
		}
	})
}






/**
 * Popup(alert,confirm,prompt)  
 * @param {Object} $
 * @param {Object} window
 * @param {Object} document
 */
(function($, window, document) {
	var JL_CLASS_POPUP = 'mui-popup';
	var JL_CLASS_POPUP_BACKDROP = 'mui-popup-backdrop';
	var JL_CLASS_POPUP_IN = 'mui-popup-in';
	var JL_CLASS_POPUP_OUT = 'mui-popup-out';
	var JL_CLASS_POPUP_INNER = 'mui-popup-inner';
	var JL_CLASS_POPUP_TITLE = 'mui-popup-title';
	var JL_CLASS_POPUP_TEXT = 'mui-popup-text';
	var JL_CLASS_POPUP_INPUT = 'mui-popup-input';
	var JL_CLASS_POPUP_BUTTONS = 'mui-popup-buttons';
	var JL_CLASS_POPUP_BUTTON = 'mui-popup-button';
	var JL_CLASS_POPUP_BUTTON_BOLD = 'mui-popup-button-bold';
	var JL_CLASS_POPUP_BACKDROP = 'mui-popup-backdrop';
	var JL_CLASS_ACTIVE = 'mui-active';

	var popupStack = [];
	var backdrop = (function() {
		var element = document.createElement('div');
		element.classList.add(JL_CLASS_POPUP_BACKDROP);
		element.addEventListener($.EVENT_MOVE, $.preventDefault);
		element.addEventListener('webkitTransitionEnd', function() {
			if (!this.classList.contains(JL_CLASS_ACTIVE)) {
				element.parentNode && element.parentNode.removeChild(element);
			}
		});
		return element;
	}());

	var createInput = function(placeholder) {
		return '<div class="' + JL_CLASS_POPUP_INPUT + '"><textarea placeholder="' + (placeholder || '') +
			'"></textarea></div>';

		//     return '<div class="' + JL_CLASS_POPUP_INPUT + '"><input type="text" autofocus placeholder="' + (placeholder || '') + '"/></div>';
	};
	var createInner = function(message, title, extra) {
		return '<div class="' + JL_CLASS_POPUP_INNER + '"><div class="' + JL_CLASS_POPUP_TITLE + '">' + title +
			'</div><div class="' + JL_CLASS_POPUP_TEXT + '">' + message.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>") +
			'</div>' + (extra || '') + '</div>';
	};
	var JLCreateButtons = function(btnArray) {
		var length = btnArray.length;
		var btns = [];
		for (var i = 0; i < length; i++) {
			btns.push('<span class="' + JL_CLASS_POPUP_BUTTON + (i === length - 1 ? (' ' + JL_CLASS_POPUP_BUTTON_BOLD) : '') +
				'">' + btnArray[i] + '</span>');
		}
		return '<div class="' + JL_CLASS_POPUP_BUTTONS + '">' + btns.join('') + '</div>';
	};

	var JLCreatePopup = function(html, callback) {
		var popupElement = document.createElement('div');
		popupElement.className = JL_CLASS_POPUP;
		popupElement.innerHTML = html;
		var removePopupElement = function() {
			popupElement.parentNode && popupElement.parentNode.removeChild(popupElement);
			popupElement = null;
		};
		// popupElement.addEventListener($.EVENT_MOVE, $.preventDefault);
		popupElement.addEventListener('webkitTransitionEnd', function(e) {
			if (popupElement && e.target === popupElement && popupElement.classList.contains(JL_CLASS_POPUP_OUT)) {
				removePopupElement();
			}
		});
		popupElement.style.display = 'block';
		document.body.appendChild(popupElement);
		popupElement.offsetHeight;
		popupElement.classList.add(JL_CLASS_POPUP_IN);

		if (!backdrop.classList.contains(JL_CLASS_ACTIVE)) {
			backdrop.style.display = 'block';
			document.body.appendChild(backdrop);
			backdrop.offsetHeight;
			backdrop.classList.add(JL_CLASS_ACTIVE);
		}
		var btns = $.qsa('.' + JL_CLASS_POPUP_BUTTON, popupElement);
		var input = popupElement.querySelector('.' + JL_CLASS_POPUP_INPUT + ' input');
		var popup = {
			element: popupElement,
			close: function(index, animate) {
				if (popupElement) {
					var result = callback && callback({
						index: index || 0,
						value: input && input.value || ''
					});
					if (result === false) { //返回false则不关闭当前popup
						return;
					}
					if (animate !== false) {
						popupElement.classList.remove(JL_CLASS_POPUP_IN);
						popupElement.classList.add(JL_CLASS_POPUP_OUT);
					} else {
						removePopupElement();
					}
					popupStack.pop();
					//如果还有其他popup，则不remove backdrop
					if (popupStack.length) {
						popupStack[popupStack.length - 1]['show'](animate);
					} else {
						backdrop.classList.remove(JL_CLASS_ACTIVE);
					}
				}
			}
		};
		var handleEvent = function(e) {
			popup.close(btns.indexOf(e.target));
		};
		$(popupElement).on('tap', '.' + JL_CLASS_POPUP_BUTTON, handleEvent);
		if (popupStack.length) {
			popupStack[popupStack.length - 1]['hide']();
		}
		popupStack.push({
			close: popup.close,
			show: function(animate) {
				popupElement.style.display = 'block';
				popupElement.offsetHeight;
				popupElement.classList.add(JL_CLASS_POPUP_IN);
			},
			hide: function() {
				popupElement.style.display = 'none';
				popupElement.classList.remove(JL_CLASS_POPUP_IN);
			}
		});
		return popup;
	};
	var JLCreatePrompt = function(message, placeholder, title, btnArray, callback, type) {
		if (typeof message === 'undefined') {
			return;
		} else {
			if (typeof placeholder === 'function') {
				callback = placeholder;
				type = title;
				placeholder = null;
				title = null;
				btnArray = null;
			} else if (typeof title === 'function') {
				callback = title;
				type = btnArray;
				title = null;
				btnArray = null;
			} else if (typeof btnArray === 'function') {
				type = callback;
				callback = btnArray;
				btnArray = null;
			}
		}
		if (!$.os.plus || type === 'div') {
			return JLCreatePopup(createInner(message, title || '提示', createInput(placeholder)) + JLCreateButtons(btnArray || [
				'取消', '确认'
			]), callback);
		}
		return plus.nativeUI.prompt(message, callback, title || '提示', placeholder, btnArray || ['取消', '确认']);
	};
	var closePopup = function() {
		if (popupStack.length) {
			popupStack[popupStack.length - 1]['close']();
			return true;
		} else {
			return false;
		}
	};
	var closePopups = function() {
		while (popupStack.length) {
			popupStack[popupStack.length - 1]['close']();
		}
	};

	$.closePopup = closePopup;
	$.closePopups = closePopups;
	$.JLPrompt = JLCreatePrompt;
})(mui, window, document);


/**
 * JLPopovers
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} name
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name) {

	var CLASS_POPOVER = 'mui-popover';
	var CLASS_POPOVER_ARROW = 'mui-popover-arrow';
	var CLASS_ACTION_POPOVER = 'mui-popover-action';
	var CLASS_BACKDROP = 'mui-backdrop';
	var CLASS_BAR_POPOVER = 'mui-bar-popover';
	var CLASS_BAR_BACKDROP = 'mui-bar-backdrop';
	var CLASS_ACTION_BACKDROP = 'mui-backdrop-action';
	var CLASS_ACTIVE = 'mui-active';
	var CLASS_BOTTOM = 'mui-bottom';

	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			$.targets._JLPopover = document.getElementById(target.hash.replace('#', ''));
			if ($.targets._JLPopover && $.targets._JLPopover.classList.contains(CLASS_POPOVER)) {
				return target;
			} else {
				$.targets._JLPopover = null;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 60,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	var onPopoverShown = function(e) {
		this.removeEventListener('webkitTransitionEnd', onPopoverShown);
		// this.addEventListener($.EVENT_MOVE, $.preventDefault);
		$.trigger(this, 'shown', this);
	}
	var onPopoverHidden = function(e) {
		setStyle(this, 'none');
		this.removeEventListener('webkitTransitionEnd', onPopoverHidden);
		// this.removeEventListener($.EVENT_MOVE, $.preventDefault);
		$.trigger(this, 'hidden', this);
	};

	var backdrop = (function() {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener($.EVENT_MOVE, $.preventDefault);
		element.addEventListener('tap', function(e) {
			var popover = $.targets._JLPopover;
			if (popover) {
				popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
				popover.classList.remove(CLASS_ACTIVE);
				removeBackdrop(popover);
			}
		});

		return element;
	}());
	var removeBackdropTimer;
	var removeBackdrop = function(popover) {
		backdrop.setAttribute('style', 'opacity:0');
		$.targets.JLPopover = $.targets._JLPopover = null; //reset
		removeBackdropTimer = $.later(function() {
			if (!popover.classList.contains(CLASS_ACTIVE) && backdrop.parentNode && backdrop.parentNode === document.body) {
				document.body.removeChild(backdrop);
			}
		}, 350);
	};
	window.addEventListener('tap', function(e) {
		if (!$.targets.JLPopover) {
			return;
		}
		var toggle = false;
		var target = e.target;
		for (; target && target !== document; target = target.parentNode) {
			if (target === $.targets.JLPopover) {
				toggle = true;
			}
		}
		if (toggle) {
			e.detail.gesture.preventDefault(); //fixed hashchange
			togglePopover($.targets._JLPopover, $.targets.JLPopover);
		}

	});

	var togglePopover = function(popover, anchor, state) {
		if ((state === 'show' && popover.classList.contains(CLASS_ACTIVE)) || (state === 'hide' && !popover.classList.contains(
				CLASS_ACTIVE))) {
			return;
		}
		removeBackdropTimer && removeBackdropTimer.cancel(); //取消remove的timer
		//remove一遍，以免来回快速切换，导致webkitTransitionEnd不触发，无法remove
		popover.removeEventListener('webkitTransitionEnd', onPopoverShown);
		popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
		backdrop.classList.remove(CLASS_BAR_BACKDROP);
		backdrop.classList.remove(CLASS_ACTION_BACKDROP);
		var _popover = document.querySelector('.mui-popover.mui-active');
		if (_popover) {
			//			_popover.setAttribute('style', '');
			_popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
			_popover.classList.remove(CLASS_ACTIVE);
			//			_popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
			//同一个弹出则直接返回，解决同一个popover的toggle
			if (popover === _popover) {
				removeBackdrop(_popover);
				return;
			}
		}
		var isActionSheet = false;
		if (popover.classList.contains(CLASS_BAR_POPOVER) || popover.classList.contains(CLASS_ACTION_POPOVER)) { //navBar
			if (popover.classList.contains(CLASS_ACTION_POPOVER)) { //action sheet popover
				isActionSheet = true;
				backdrop.classList.add(CLASS_ACTION_BACKDROP);
			} else { //bar popover
				backdrop.classList.add(CLASS_BAR_BACKDROP);
				//				if (anchor) {
				//					if (anchor.parentNode) {
				//						var offsetWidth = anchor.offsetWidth;
				//						var offsetLeft = anchor.offsetLeft;
				//						var innerWidth = window.innerWidth;
				//						popover.style.left = (Math.min(Math.max(offsetLeft, defaultPadding), innerWidth - offsetWidth - defaultPadding)) + "px";
				//					} else {
				//						//TODO anchor is position:{left,top,bottom,right}
				//					}
				//				}
			}
		}
		setStyle(popover, 'block'); //actionsheet transform
		popover.offsetHeight;
		popover.classList.add(CLASS_ACTIVE);
		backdrop.setAttribute('style', '');
		document.body.appendChild(backdrop);
		calPosition(popover, anchor, isActionSheet); //position
		backdrop.classList.add(CLASS_ACTIVE);
		popover.addEventListener('webkitTransitionEnd', onPopoverShown);
	};
	var setStyle = function(popover, display, top, left) {
		var style = popover.style;
		if (typeof display !== 'undefined')
			style.display = display;
		if (typeof top !== 'undefined')
			style.top = top + 'px';
		if (typeof left !== 'undefined')
			style.left = left + 'px';
	};
	var calPosition = function(popover, anchor, isActionSheet) {
		if (!popover || !anchor) {
			return;
		}

		if (isActionSheet) { //actionsheet
			setStyle(popover, 'block')
			return;
		}

		var wWidth = window.innerWidth;
		var wHeight = window.innerHeight;

		var pWidth = popover.offsetWidth;
		var pHeight = popover.offsetHeight;

		var aWidth = anchor.offsetWidth;
		var aHeight = anchor.offsetHeight;
		var offset = $.offset(anchor);

		var arrow = popover.querySelector('.' + CLASS_POPOVER_ARROW);
		if (!arrow) {
			arrow = document.createElement('div');
			arrow.className = CLASS_POPOVER_ARROW;
			popover.appendChild(arrow);
		}
		var arrowSize = arrow && arrow.offsetWidth / 2 || 0;



		var pTop = 0;
		var pLeft = 0;
		var diff = 0;
		var arrowLeft = 0;
		var defaultPadding = popover.classList.contains(CLASS_ACTION_POPOVER) ? 0 : 5;

		var position = 'top';
		if ((pHeight + arrowSize) < (offset.top - window.pageYOffset)) { //top
			pTop = offset.top - pHeight - arrowSize;
		} else if ((pHeight + arrowSize) < (wHeight - (offset.top - window.pageYOffset) - aHeight)) { //bottom
			position = 'bottom';
			pTop = offset.top + aHeight + arrowSize;
		} else { //middle
			position = 'middle';
			pTop = Math.max((wHeight - pHeight) / 2 + window.pageYOffset, 0);
			pLeft = Math.max((wWidth - pWidth) / 2 + window.pageXOffset, 0);
		}
		if (position === 'top' || position === 'bottom') {
			pLeft = aWidth / 2 + offset.left - pWidth / 2;
			diff = pLeft;
			if (pLeft < defaultPadding) pLeft = defaultPadding;
			if (pLeft + pWidth > wWidth) pLeft = wWidth - pWidth - defaultPadding;

			if (arrow) {
				if (position === 'top') {
					arrow.classList.add(CLASS_BOTTOM);
				} else {
					arrow.classList.remove(CLASS_BOTTOM);
				}
				diff = diff - pLeft;
				arrowLeft = (pWidth / 2 - arrowSize / 2 + diff);
				arrowLeft = Math.max(Math.min(arrowLeft, pWidth - arrowSize * 2 - 6), 6);
				arrow.setAttribute('style', 'left:' + arrowLeft + 'px');
			}
		} else if (position === 'middle') {
			arrow.setAttribute('style', 'display:none');
		}
		setStyle(popover, 'block', pTop, pLeft);
	};

	$.createMask = function(callback) {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener($.EVENT_MOVE, $.preventDefault);
		element.addEventListener('tap', function() {
			mask.close();
		});
		var mask = [element];
		mask._show = false;
		mask.show = function() {
			mask._show = true;
			element.setAttribute('style', 'opacity:1');
			document.body.appendChild(element);
			return mask;
		};
		mask._remove = function() {
			if (mask._show) {
				mask._show = false;
				element.setAttribute('style', 'opacity:0');
				$.later(function() {
					var body = document.body;
					element.parentNode === body && body.removeChild(element);
				}, 350);
			}
			return mask;
		};
		mask.close = function() {
			if (callback) {
				if (callback() !== false) {
					mask._remove();
				}
			} else {
				mask._remove();
			}
		};
		return mask;
	};
	// $.fn是指jquery的命名空间,加上fn上的方法及属性,会对jquery实例每一个有效。 如扩展$.fn.abc(), 即$.fn.abc()是对 jquery 扩展了一个 abc 方法
	$.fn.JLPopover = function() {
		var args = arguments;
		this.each(function() {
			$.targets._JLPopover = this;
			if (args[0] === 'show' || args[0] === 'hide' || args[0] === 'toggle') {
				togglePopover(this, args[1], args[0]);
			}
		});
	};

})(mui, window, document, 'JLPopover');
