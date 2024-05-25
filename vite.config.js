import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  publicDir:"public",
  
  clearScreen:true,
  resolve:{
  	alias:{
  		'@':path.resolve(__dirname,'./src'),
  	},
  },
  server:{
	open:true,
	'proxy':{
		'/api':{
			target:'http://127.0.0.1:8000',
			rewrite:path=>path.replace(/^\/api/,""),
			changeOrigin:true
		}
		// '/':{
		// 	target:'http://127.0.0.1:8000',
		// 	changeOrigin:true
		// }
	}
  }
})



