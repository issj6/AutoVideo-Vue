import request from "@/request/index"
import store from '@/store/index'

export function register(data){
	return request({
		method:"POST",
		url:'/api/api/register/',
		data:data
	});
};

export function login(data){
	return request({
		method:"POST",
		url:'/api/api/login/',
		data:data
	});
};