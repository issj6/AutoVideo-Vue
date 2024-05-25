<template>
    <div class="demo-login">
		<div id="title">
			登录
		</div>
        <Login @on-submit="handleSubmit">
            <UserName name="username" />
            <Password name="password" />
            <Submit />
        </Login>
		<div class="to-page">
			<router-link to="/" style="text-align: left;">首页</router-link>
			<router-link to="/reg" style="float: right;">去注册</router-link>
		</div>
    </div>
</template>
<script>
	import {login} from '@/api/user';
	export default{
		methods: {
			handleSubmit (valid, { username, password }) {
				login({"username":username,"password":password}).then((res)=>{
					if(res.code==200){
						this.$store.commit('setToken',res.data.token.access);
						this.$store.commit('setUserInfo',res.data.user_info);
						this.$Notice.success({
							title:"登陆成功！"
						});
						this.$router.push("/")
					}else{
						this.$store.commit('removeLoginInfo');
						this.$Notice.error({
							title:res.msg
						});
					}
				}).catch(()=>{
					this.$store.commit('removeLoginInfo');
					this.$Notice.error({
						title:"系统出现错误，请稍后再试！"
					});
				})
			}
		}
	}
</script>
<style>
    .demo-login{
        width: 400px;	
		padding: 30px 50px;
		box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
		margin: 0 auto !important;
		margin-top: 200px!important;
    }
    .demo-auto-login{
        margin-bottom: 24px;
        text-align: left;
    }
    .demo-auto-login a{
        float: right;
    }
	#title{
		font-size: 26px;
		text-align: center;
		margin: 0 0 10px 0;
	}
	.to-page{
		margin-top: 20px;
	}
</style>
