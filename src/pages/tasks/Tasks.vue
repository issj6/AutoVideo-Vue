<template>
	<div class="title">
		任务记录
	</div>
	<div class="tasks-main-box">
		<div class="filter-box">
			
		</div>
		<div class="data-box">
			<Table border :columns="columns" :data="data">
				<template #action="{ row, index }">
					<Button size="small" type="primary" style="margin-right: 5px" v-if="row.task_status==3" @click="downRes(row)" ghost>下载</Button>
					<Button type="primary" size="small" style="margin-right: 5px" @click="show(row,index)">查看</Button>
					<Button type="error" size="small" @click="remove(row,index)" :disabled="row.task_status==2">删除</Button>
				</template>
			</Table>
		</div>
		<Page :total="total"
		 :page-size="page_size"
		 :page-size-opts="[10,30,50,100]"
		 @on-change="handChangePage"
		 @on-prev="handChangePage"
		 @on-next="handChangePage"
		 @on-page-size-change="handChangePageSize"
		 show-sizer />
	</div>
</template>

<script>
	import {getTaskList,getFuncById,deleteTaskById,downResById} from "@/api/task"
	export default {
		data(){
			return{
				columns: [
					{title: '任务名',key: 'task_name','width':300,'align':'left'},
					{title: '任务类型',key: 'task_type_text','width':120,'align':'center'},
					{title: '任务状态',key: 'task_status_text','width':120,'align':'center'},
					{title: '创建时间',key: 'create_time','width':180,'align':'center'},
					{title: '完成时间',key: 'end_processing_time','width':180,'align':'center'},
					{title: '操作','align':'center',slot:'action'},
				],
				data:[],
				total:0,
				page:1,
				page_size:10,
			}
		},
		methods:{
			getData(){
				getTaskList({
					'page':this.page,
					'page_size':this.page_size
				}).then((res)=>{
					if(res.code==200){
						this.data=res.data.results;
						this.total=res.data.total;
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
			},
			show(row,index){
				getFuncById(row.task_type).then((res)=>{
					if(res.code==200){
						this.$router.push(res.data.router+'/'+row.id)
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
			},
			remove(row,index){
				deleteTaskById(row.id).then((res)=>{
					if(res.code==200){
						this.$Notice.success({
							title:'删除成功'
						})
						this.getData()
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
			},
			handChangePage(page){
				this.page=page
				this.getData()
			},
			handChangePageSize(page_size){
				this.page_size=page_size
				this.getData()
			},
			downRes(row){
				downResById(row.id).then((res)=>{
					if(res.code==200){
						const file_url=res.data.file_url
						
						var lastIndex = row.original_filename.lastIndexOf('.');
						var filename = row.original_filename.substring(0, lastIndex);
						lastIndex = row.res_file.lastIndexOf('.');
						var suffix = row.res_file.substring(lastIndex + 1);	
						
						filename="res_"+filename+'.'+suffix;
						
						fetch(file_url)
						.then(response => response.blob())
						.then(blob => {
						  const url = window.URL.createObjectURL(blob);
						  const a = document.createElement('a');
						  a.style.display = 'none';
						  a.href = url;
						  a.download = filename; // 指定下载的文件名
						  document.body.appendChild(a);
						  a.click();
						  window.URL.revokeObjectURL(url);
						})
						.catch(err => console.error('下载出错:', err));
					}else{
						this.$Notice.success({
							title:res.msg
						})
					}
				}).catch(()=>{
					this.$Notice.error({
						title:"出现异常，请稍后再试"
					})
				})
			}
		},
		created() {
			this.getData()
		},
		mounted() {
			setInterval(this.getData, 15000);
		}
	}
</script>

<style>
	.title{
		font-size: 30px;
		text-align: center;
	}
	.data-box{
		margin: 15px auto;
	}
	.tasks-main-box{
		margin: 15px 30px;
	}
</style>