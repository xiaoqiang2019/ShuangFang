Vue.component('empty', {
	// 声明 props 属性值不能使用大写
	props: {
		showretry: {
			type: Boolean,
			 default: false,
		},
		errormsg: {
			type: String,
			default:""
		},
		isneterror: {
			type: Boolean,
			default:false
		}
	},
	template: '<div class="empty_wrapper" style="overflow: hidden;height:100%;background-color: transparent;"><img :src ="imagepath"style="float: left;margin-top: calc(50%/3);width: 190px;height:190px;margin-left: calc(50% - 95px);" /><p style="float: left;background-color: transparent;font-size: 14px;color: #999999;margin-top: 20px;width:100%;text-align: center;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{errormsg}}</p><a v-show="showretry" @click="retryclick"   style="border: 1px solid #3BA2FF;float: left;padding: 5px; width:70px;border-radius: 5px;font-size: 14px;color: #3BA2FF;margin-top: 10px;text-align: center;margin-left: calc(50% - 35px);">{{ retrymsg }}</a></div>',
	data: function() {
		return {
			retrymsg:"重新加载",
			imagepath:"../../common/app/images/nopage/img_noList.png"
		}
	},
	methods:{
		retryclick:function(){
			this.$emit('retryclick')
		},
		
		xa_setRetryBtnMsg :function(){
			if(this.isneterror){
				this.retrymsg="刷新";
				this.errormsg="网络似乎有点问题";
				this.imagepath="../../common/app/images/nopage/img_noNetwork.png"
			}else{
				this.retrymsg="重新加载";
				this.imagepath="../../common/app/images/nopage/img_noList.png";
			}
			
		}
		
	},
	mounted: function mounted() {
		this.xa_setRetryBtnMsg();
	}
})

