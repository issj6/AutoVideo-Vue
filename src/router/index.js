import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index'

const routes = [
	{
		path: '/login',
		name: 'login',
		component: ()=>import('@/pages/login/Login.vue'),
	},
	{
		path: '/reg',
		name: 'register',
		component: ()=>import('@/pages/register/Register.vue'),
	},
	{
		path:'/',
		name:'layout',
		component: ()=>import('@/pages/layout/MyLayout.vue'),
		children:[
			{
				path:'',
				name:"default",
				redirect: "/editnav"
			},
			{
				path:'/editnav',
				name:'editnav',
				component: ()=>import('@/pages/edit/EditNav.vue'),
			},
			{
				path:'/editnav/vt/:id?',
				name:"vt",
				component: ()=>import('@/pages/function/video_translation/VideoTranslation.vue'),
				meta:{requiresAuth:true}
			},
			{
				path:'/editnav/at/:id?',
				name:"at",
				component: ()=>import('@/pages/function/audio_translation/AudioTranslation.vue'),
				meta:{requiresAuth:true}
			},
			{
				path:'/editnav/es/:id?',
				name:"es",
				component: ()=>import('@/pages/function/extraction_subtitle/ExtractionSubtitle.vue'),
				meta:{requiresAuth:true}
			},
			{
				path:'/tasks',
				name:"tasks",
				component: ()=>import('@/pages/tasks/Tasks.vue'),
				meta:{requiresAuth:true}
			},
			// {
			// 	path:'/findc',
			// 	name:'findc',
			// 	component: ()=>import('@/pages/order/FindCourse.vue'),
			// },
			// {
			// 	path:'/user',
			// 	name:'user',
			// 	component: ()=>import('@/pages/user/User.vue'),
			// },
			// {
			// 	path:'/order',
			// 	name:'order',
			// 	component: ()=>import('@/pages/order/OrderView.vue'),
			// },
			// {
			// 	path:'/batch',
			// 	name:'batch',
			// 	component: ()=>import('@/pages/order/BatchOrder.vue'),
			// },
			// {
			// 	path:'/file',
			// 	name:'file',
			// 	component: ()=>import('@/pages/order/FileManage.vue'),
			// },
		]
	}
]

const router = createRouter({
  routes:routes,
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token==null | store.state.token=="") {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router
