import { createApp } from 'vue'
import App from './App.vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css';
import axios from './request/index'
import router from './router'
import store from './store'

createApp(App).mount('#app')


const app=createApp(App)
	.use(router)
  .use(store)
  .use(ViewUIPlus)
	
app.config.globalProperties.$axios=axios;

app.mount('#app');