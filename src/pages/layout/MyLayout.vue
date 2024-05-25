<template>
	<Layout>
		<Header class="layout-header">
			<Menu mode="horizontal" :theme="theme" active-name="1" class="top-nav">
				<div class="nav-box">
					<span class="logo">
						<router-link to="/" style="color: inherit;">
							LOGO
						</router-link>
					</span>
					<MenuItem name="1" to="/editnav">
						<Icon type="ios-videocam" />
						音视频处理
					</MenuItem>
					<MenuItem name="2">
						<Icon type="ios-create" />
						自动化生成
					</MenuItem>
					<Submenu name="3">
						<template #title>
							<Icon type="ios-more" />
							更多功能
						</template>
						<MenuGroup title="more">
							<MenuItem name="3-1" to="/tasks">任务记录</MenuItem>
							<MenuItem name="3-2">素材管理</MenuItem>
							<MenuItem name="3-3">平台API</MenuItem>
						</MenuGroup>
					</Submenu>
					<div class="user-info-box">
						{{username}}
						<Button type="primary" size="small" v-if="!is_login" class="login-btn" to="/login" ghost>登 陆</Button>
						<Button type="primary" size="small" v-if="is_login" class="logout-btn" @click="logout" ghost>退 出</Button>
					</div>
				</div>
			</Menu>
		</Header>
		<Content class="layout-content">
			<router-view></router-view>
		</Content>
		<Footer class="layout-footer">Footer</Footer>
	</Layout>
</template>

<script type="text/javascript">
	import store from '@/store/index'
	export default {
		name:'MyLayout',
		data(){
			return{
				username:"未登录",
				is_login:false,
				user_info:"",
			}
		},
		methods:{
			logout(){
				this.$store.commit('removeLoginInfo');
				this.is_login=false;
				this.username="未登录";
				this.$Notice.success({
					title:"已退出登陆"
				});
			}
		},
		created() {
			// 判断是否登录
			if(store.state.token==null | store.state.token==""){
				this.$store.commit('removeLoginInfo');
			}else{
				this.user_info=store.state.userInfo;
				this.is_login=true;
				this.username=this.user_info.username;
			}
		}
	}
</script>

<style>
	
	.layout-footer{
		background: rgb(230,230,230);
		color: #666;
		text-align: center;
	}
	
	.layout-header{
		height: unset;
		background-color: white;
		padding: 0;
	}
	.nav-box{
		width: 1200px;
		margin: auto;
		height: 100%;
	}
	.top-nav{
		width: 100%;
		margin: auto;
	}
	.layout-content{
		background-color: white;
		width: 1200px;
		margin: 0px auto;
		padding: 20px 10px;
	}
	
	.logo{
		float: left;
		width: 100px;
		text-align: center;
		font-size: 30px;
	}
	
	.user-info-box{
		float: right;
		padding-right: 50px;
	}
	.login-btn,.logout-btn{
		margin-left: 15px;
		margin-top: -1px;
	}
</style>