import axios from 'axios'
import { useStore } from 'vuex'
import router from '@/router'
import store from '@/store'

// const store=useStore()

const service=axios.create({
	timeout: 8000 // 超时时间
})

//请求拦截器
// instance.interceptors.request.use();

//响应拦截器
service.interceptors.response.use(
  res => {
		//未登录跳转登录
		if(res.code==401){
			console.log("登录状态丢失")
			//清空token信息
			store.commit('removeLoginInfo');
			// const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
			router.push("/login"); 
		}		
		
		return res.data;
  },
  error => {
	if(error.response.data.code==401){
		//清空token信息
		store.commit('removeLoginInfo');
		// const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
		router.push("/login");
		return error.response.data
	}
    return Promise.reject(error)
  }
)

export default service;