<template>
	<div class="func_title">
		{{title}}
	</div>
	<div class="upload-box">
		<Upload
			:multiple="false"
			type="drag"
			accept="video/*"
			:data="currData"
			:headers="tokenHeaderItem"
			:on-error="handOnError"
			:on-success="handOnSuccess"
			:default-file-list="file_list"
			:disabled="allowSubmit"
			action="/api/api/task/file/">
			<div style="padding: 20px 0">
				<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
				<p>点击或拖拽上传视频文件</p>
			</div>
		</Upload>
	</div>
	<div v-if="is_uploaded" class="func-args-box">
		<div class="step-box">
			<Steps :current="info.task_status-1">
				<Step title="等待中" content="未开始处理"></Step>
				<Step title="正在处理" content="正在进行基本处理"></Step>
				<Step title="等待核对" content="等待人工核对信息"></Step>
				<Step title="处理结束" content="处理结束"></Step>
			</Steps>
		</div>
		<Form :model="args" :label-width="100">
			<!-- 选择语言 -->
			<FormItem label="源语言:">
				<Select class="select-w" v-model="args.source_lang">
					<Option  v-for="lang in langs" :value="lang.key">{{lang.value}}</Option>
				</Select>
			</FormItem>
			<!-- 每句字符 -->
			<FormItem label="每段最长:">
				<Slider style="width: 470px;" v-model="args.each_max_char" 
				:min="10"
				:max="50"
				:step="1"
				show-input></Slider>
			</FormItem>
			
			<FormItem>
				<Button type="primary" @click="handSubmit" :disabled="allowSubmit">提 交</Button>
				<Button style="margin-left: 8px">重 置</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	import store from '@/store/index'
	import {getTaskById,updateTask} from '@/api/task'
	export default {
		data(){
			return{
				title:"提取字幕",
				is_uploaded:false,
				task_id:-1,
				info:{},
				file_list:[],
				args:{
					source_lang:'zh-CN',
					each_max_char:20,
				},
				langs:[
					{'key':"zh-CN",'value':"中文"},
					{'key':'en-US','value':'英语'},
					{'key':'ja-JP','value':'日语'}
				],
			}
		},
		methods:{
			handOnError(error, res, file){
				if(res.code==401){
					this.$store.commit('removeLoginInfo');
					this.$Notice.error({
						title:"身份验证失败，请重新登录"
					});
					this.$router.push("/login")
				}else{
					this.$Notice.error({
						title:res.msg
					});
				}
			},
			handOnSuccess(response, file, fileList){
				if(response.code==200){
					this.is_uploaded=true;
					this.info=response.data;
					this.file_list=[file];
					this.task_id=this.info.id;
					this.title=this.info.task_name;
				}else{
					this.$Notice.error({
						title:response.msg
					})
				}
			},
			handSubmit(){
				updateTask(this.task_id,{'args':this.args}).then((res)=>{
					if(res.code==200){
						this.$Notice.success({
							title:"提交成功，正在等待处理"
						})
						// 前往任务记录
						this.$router.push('/tasks');
					}else{
						this.$Notice.success({
							title:res.msg
						})
					}
				}).catch(()=>{
					this.$Notice.error({
						title:"服务异常，请稍后再试"
					})
				})
			}
		},
		computed:{
			tokenHeaderItem(){
				return {
					'Authorization':'Bearer '+store.state.token
				}
			},
			currData(){
				return {'task_id':this.task_id,'func':this.$route.path}
			},
			allowSubmit(){
				if(this.info.hasOwnProperty("task_status") && this.info.task_status>1){
					return true
				}else{
					return false
				}
			},
		},
		created() {
			if(this.$route.params.id){
				this.task_id=this.$route.params.id
				getTaskById(this.task_id).then((res)=>{
					if(res.code==200){
						this.is_uploaded=true;
						this.info=res.data;
						const file = new File([], res.data.original_filename, {});
						this.file_list=[file]
						this.title=this.info.task_name;
						if(this.info.task_args){
							this.args=JSON.parse(this.info.task_args);
						}
					}else{
						this.$Notice.error({
							title:res.msg
						})
					}
				}).catch(()=>{
					this.$Notice.error({
						title:"服务端出现异常，请稍后再试"
					})
				})
			}
			
		}
	}
</script>

<style>
	.func_title{
		font-size:30px;
		text-align: center;
		margin: 10px 0px;
	}
	.func-args-box{
		/* height: 200px; */
		/* background-color: coral; */
		margin: 15px 0px;
		padding: 10px 30px;
	}
	.select-w{
		width: 150px!important;
	}
	.step-box{
		margin: 10px auto;
		padding: 30px;
	}
</style>