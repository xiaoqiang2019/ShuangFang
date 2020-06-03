// 正则

// 判断两位小数点
function judgeTwoDecimalPlacesRegular(string) {
	var decimalRegular = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
	return decimalRegular.test(string);
}

// 判断字符串是否包含表情
function judgeStringIsHaveEmoji(string) {
	var regular = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
	return regular.test(string);
}
