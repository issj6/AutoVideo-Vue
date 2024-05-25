<template>
	<Grid :col="5" :border="false">
		<GridItem v-for="item in function_list">
			<Card :to="item.router" class="card-box">
				<div style="text-align:center" class="card-content">
					<img :src="item.image" class="card-image">
					<div class="card-text">
						<h3>{{item.title}}</h3>
						<span class="card-description">
							<!-- {{item.description}} -->
							<Ellipsis :text="item.description" :lines="3" tooltip/>
						</span>
					</div>
				</div>
			</Card>
		</GridItem>
	</Grid>
</template>

<script>
	import {getFunc} from '@/api/task'
	export default {
		data(){
			return{
				function_list:[
					// {
					// 	title:"视频翻译",
					// 	description:"将视频的语音转换成另一种语言的发音，能够选择语言、发音人等",
					// 	image:"https://marketplace.canva.com/Z0eB4/MAFZG2Z0eB4/2/tl/canva-MAFZG2Z0eB4.png",
					// 	url:"vt"
					// },
					// {
					// 	title:"音频翻译",
					// 	description:"将语音转换成另一种语言的发音，能够选择语言、发音人等",
					// 	image:"https://marketplace.canva.com/SKkkc/MAETB4SKkkc/1/tl/canva-MAETB4SKkkc.png"
					// },
					// {
					// 	title:"提取字幕",
					// 	description:"上传视频或音频，语音识别提取出字幕，可导出srt",
					// 	image:"https://marketplace.canva.com/l6JRE/MAFJULl6JRE/1/tl/canva-MAFJULl6JRE.png"
					// },
					// {
					// 	title:"文本配音",
					// 	description:"上传srt或txt文件，生成语音及新的srt文件",
					// 	image:"https://marketplace.canva.com/SIkHk/MAFsKOSIkHk/1/tl/canva-MAFsKOSIkHk.png"
					// },
					// {
					// 	title:"字幕翻译",
					// 	description:"上传视频，添加双语字幕（不翻译语音）",
					// 	image:"https://marketplace.canva.com/bk8Uo/MAE2FWbk8Uo/1/tl/canva-MAE2FWbk8Uo.png"
					// },
					// {
					// 	title:"分离音频",
					// 	description:"",
					// 	image:"https://marketplace.canva.com/dmwQE/MAFo9ddmwQE/1/tl/canva-MAFo9ddmwQE.png"
					// },
					// {
					// 	title:"添加字幕",
					// 	description:"",
					// 	image:"https://marketplace.canva.com/dmwQE/MAFo9ddmwQE/1/tl/canva-MAFo9ddmwQE.png"
					// },
					// {
					// 	title:"视频变速",
					// 	description:"",
					// 	image:"https://marketplace.canva.com/dmwQE/MAFo9ddmwQE/1/tl/canva-MAFo9ddmwQE.png"
					// },
					// {
					// 	title:"视频镜像",
					// 	description:"",
					// 	image:"https://marketplace.canva.com/dmwQE/MAFo9ddmwQE/1/tl/canva-MAFo9ddmwQE.png"
					// },
					// {
					// 	title:"视频去重",
					// 	description:"",
					// 	image:"https://marketplace.canva.com/dmwQE/MAFo9ddmwQE/1/tl/canva-MAFo9ddmwQE.png"
					// },
					// {
					// 	title:"横屏转竖屏",
					// 	description:"",
					// 	image:"https://marketplace.canva.com/dmwQE/MAFo9ddmwQE/1/tl/canva-MAFo9ddmwQE.png"
					// },
					// {
					// 	title:"视频转码",
					// 	description:"",
					// 	image:"https://marketplace.canva.com/dmwQE/MAFo9ddmwQE/1/tl/canva-MAFo9ddmwQE.png"
					// },
				]
			}
		},
		created() {
			// 获取功能列表
			getFunc().then((res)=>{
				if(res.code==200){
					this.function_list=res.data
				}else{
					this.$Notice.error({
						title:res.msg
					})
				}
			}).catch(()=>{
				this.$Notice.error({
					title:"系统出现错误，请稍后再试！"
				})
			})
		}
	}
</script>

<style>
	.card-content{
		/* background-color: coral; */
		height: 200px;
	}
	.card-box{
		color: inherit; /* 让链接使用其父元素的文本颜色 */
		text-decoration: none; /* 移除下划线 */
	}
	.card-image{
		/* width: 100%; */
		/* width: 100%; */
		height: 130px;
		max-width: 100%;
		object-fit: cover;
	}
	.card-text{
		margin: 10px 10px;
	}
	.card-description{
		font-size: 13px;
		color: #666;
	}
</style>