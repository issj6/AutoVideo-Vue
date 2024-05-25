import {createStore} from "vuex"

const store=createStore({
	state:{
		token: JSON.parse(window.localStorage.getItem("TOKEN")),
		userInfo: JSON.parse(window.localStorage.getItem("USER_INFO")),
	},
	mutations:{
		setToken(state,token){
			state.token=token;
			window.localStorage.setItem("TOKEN",JSON.stringify(token));
		},
		setUserInfo(state,data){
			state.userInfo=data;
			window.localStorage.setItem("USER_INFO",JSON.stringify(data));
		},
		removeLoginInfo(state){
			window.localStorage.removeItem("TOKEN");
			window.localStorage.removeItem("USER_INFO");
			state.token="";
			state.userInfo={};
		},
	}
});
export default store;