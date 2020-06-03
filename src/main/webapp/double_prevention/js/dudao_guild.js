$(function() {
	//wordStrong();
	$("#content ul").width($("#content ul li:first").width()*$("#content ul li").length);
	$("#header .top_right .vote").hover(function() {
		$(this).children(".hover-tip").css("display", "block");
		$(this).children(".num").css("display", "none");	
	}, function() {
		$(this).children(".hover-tip").css("display", "none");
		$(this).children(".num").css("display", "block");	
	});
	
	
	$("#content .left, #content .right").width(($(document).width()-$("#content").width())/4);
	$("#content .left").css("left", -$("#content .left").width());
	$("#content .right").css("right", -$("#content .right").width());
	
	var showId = 0;
	$("#content span.left").hover(function() {
		if ( checkFirst() ) return ;
		$(this).css("cursor", "pointer");
		$(this).siblings(".sl").stop().animate({
			opacity:0.5	
		});	
	}, function() {
		$(this).siblings(".sl").stop().animate({
			opacity:0
		});	
	}).click(function() {
		if ( checkFirst() ) return ;
		showId --;
		$("#content").attr("showId", showId);
		//$("#footer li").children().removeClass("active").end().children().eq(showId).addClass("active");
		$("#footer li").children().removeClass("active");
		$("#footer li").eq(showId).children().addClass("active");
		center(showId);
	});
	
	$("#content span.right").hover(function() {
		if ( checkLast() )	return ;
		$(this).css("cursor", "pointer");
		$(this).siblings(".sr").stop().animate({
			opacity:0.5
		});	
	}, function() {
		$(this).siblings(".sr").stop().animate({
			opacity:0
		});	
	}).click(function() {
		if ( checkLast() )	return ;	
		showId ++;
		$("#content").attr("showId", showId);
		$("#footer li").children().removeClass("active");
		$("#footer li").eq(showId).children().addClass("active");
		center(showId);	
	});
	
	function checkFirst() {
		if ( $("#content").attr("showId") == 0 ) {
			$("#content span.left").css("cursor", "default");
			return true;		
		}
		return false;
	}
	
	function checkLast() {
		if ( $("#content").attr("showId") == $("#content ul li").length-1 ) {
			$("#content span.right").css("cursor", "default");
			return true;		
		}
		return false;	
	}
		
	/* 首字母大写 */
	function wordStrong() {
		var liList = $("#content ul li");
		for (var j = 0; j < liList.length; j ++) {
			var pList = $("#content .cont_"+(j+1)+" .cont_word p");
			for (var i = 0; i < pList.length; i ++) {
				var p = pList.get(i);
				var pCont = $(p).html();		
				var s = $("<b>"+(i+1)+"</b>");
				s.css("font-size", "24px");		
				$(p).html('');
				s.appendTo(p);
				$(p).append(pCont.substring(1));		
			}
		}
	}	
	
	center(0);
	
	//相对li居中
	function center(liIndex) {
		var li = $("#content ul li").css("opacity", 0.3).eq(liIndex).css("opacity", 1);
		$("#content ul").animate({
			left: (-li.width()*liIndex)
		});		
	}
	
	var footLen = $("#content ul li").length;
	//console.log(footLen);
	$(".total_step").text(footLen);

	var foots = $("#footer ul");
	var ulHtml='';
	var arrow_right1='<i class="arrow_right1"></i>';
	var textArr=['平台端自动下发双重专家验收标准','APP端安全负责人接收任务','APP端安全负责人按标准自查打分','APP端自动生成整改报告','按要求整改至90分以上'];
	for (var i = 0; i < footLen; i ++) {
		if(i==0){
			ulHtml+='<li step="'+i+'"><a class="active" href="#">'+(i+1)+'</a><span class="active">'+textArr[i]+'</span></li>';
		}else{
			ulHtml+='<li step="'+i+'"><a class="" href="#">'+(i+1)+'</a><span>'+textArr[i]+'</span></li>';
		}
		/*var childA = $("<a>").html(i);
		childA.attr("href", "#");
		$("<li>").append(childA).insertBefore(foots.children("[step=last]")).attr("step", i);*/		
	}
	foots.html(ulHtml);
	//foots.append(arrow_right1);
	for (var z = 1; z <=$("#footer ul li").length;z++) {
		//console.log(z);
		$("#current_step_"+z).text(z);
	}
	foots.css("left", ($(window).width()-$(".main-sidebar").width()-foots.width())/2);
	/*$("#menu-toggle").click(function(){
		if($("body").hasClass("sidebar-collapse")){
			foots.css("left", ($(window).width()-foots.width())/2);
		}else{
			foots.css("left", ($(window).width()-$(".main-sidebar").width()-foots.width())/2);
		}	
	})*/
		
	$("#footer li").click(function() {
		$("#footer ul li").children().removeClass("active");
		$(this).children().addClass("active");
		center($(this).attr("step"));
	});
	
	function myAddEvent(obj, e, fn) {
		if ( obj.attachEvent ) {
			obj.attachEvent('on'+e, fn);
		}else obj.addEventListener(e, fn, false);
	}	

	//myAddEvent(window, 'mousewheel', onMouseWheel);
    //myAddEvent(window, 'DOMMouseScroll', onMouseWheel);
	
	
	//myAddEvent(window, 'keydown', onMouseWheel);

	//增加键盘左右箭头滚动事件(鹏)
	 $(window).keydown(function(e){
        //console.log(e.keyCode);
        if(e.keyCode==39){//右
        	if ( checkLast() )	return ;
        	showId ++;
        	$("#content").attr("showId", showId);
			$("#footer ul li").children().removeClass("active").end().eq(showId).children().addClass("active");
        	center(showId);
        }else if(e.keyCode==37){
        	if ( checkFirst() ) return ;
			showId --;
			$("#content").attr("showId", showId);
			$("#footer ul li").children().removeClass("active").end().eq(showId).children().addClass("active");
        	center(showId);
        }
    })
});







