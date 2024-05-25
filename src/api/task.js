import request from "@/request/index"
import store from '@/store/index'

export function getFunc(){
	return request({
		method:"GET",
		url:'/api/api/func/',
	});
};

export function getFuncById(fid){
	return request({
		method:"GET",
		url:'/api/api/func/'+fid+'/',
	});
};

export function getTaskById(tid){
	return request({
		method:"GET",
		url:'/api/api/task/'+tid+'/',
		headers: {
			'Authorization':'Bearer '+store.state.token
		},
	});
};

export function deleteTaskById(tid){
	return request({
		method:"DELETE",
		url:'/api/api/task/'+tid+'/',
		headers: {
			'Authorization':'Bearer '+store.state.token
		},
	});
};

export function updateTask(tid,data){
	return request({
		method:"PUT",
		url:'/api/api/task/'+tid+'/',
		data:data,
		headers: {
			'Authorization':'Bearer '+store.state.token
		},
	});
};

export function getTaskList(args){
	const params=Object.keys(args)
                 .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(args[key])}`)
                 .join('&');
	return request({
		method:"GET",
		url:'/api/api/task/?'+params,
		headers: {
			'Authorization':'Bearer '+store.state.token
		},
	});
};

export function downResById(fid){
	return request({
		method:"GET",
		url:'/api/api/task/'+fid+'/down/',
		headers: {
			'Authorization':'Bearer '+store.state.token
		},
	});
};