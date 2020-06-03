(function($) {
	$.uploadHelper = function() {};
	function dataURLtoFile(dataurl, filename) {//将base64转换为文件
	    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
	    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	    while(n--){
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return new File([u8arr], filename, {type:mime});
	}
	$.extend($.uploadHelper, {
		uploadBase64Img: function(p,success,error) {
			var newImgFile = p.base64Data;
			var rmsSystemUrl = p.rms_system_url;//真正上传的地址
			var uploadUrl = rmsSystemUrl+ "/swfupload/publicUploadFile.do?userCode=admin&imgFormat=0&system=usercenter&fileSaveType=1&fileUser=admin";
			var file = dataURLtoFile(newImgFile,new Date().valueOf()+".png");
			// Create a new AJAX request
			var xhr  = new XMLHttpRequest();
			// Start the upload
			// Use the faster FormData if it exists
			// Create a new FormData object
			var formData = new FormData();
			// Add the form data
			formData.append("upfile", file);
			// Open the AJAX call
			xhr.open("post", uploadUrl, true);
			// On progress function
			xhr.upload.addEventListener('progress', function(e) {
				 var percent = Math.round((e.loaded / e.total) * 100);
				// dLog("上传进度="+percent)
			}, false);
			
			// On complete function
			xhr.addEventListener('load', function(e) {
				if (this.readyState == 4) {
					if (this.status == 200) {
						if(success){
							var data = JSON.parse(this.responseText);
							success(data.rmsIP + data.rmsPath);
						}
					} else if (this.status == 404) {
						if(error){
							error("图片上传失败");
						}
					} else if (this.status == 403) {
						if(error){
							error("上传失败，403 Forbidden");
						}
					} else {
						if(error){
							error("上传失败，Unknown Error");
						}
					}
				}
			});
			// Send the form data (multipart/form-data)
			xhr.send(formData);
		},
	});
})(jQuery);
