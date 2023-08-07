
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/styles/index.scss'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn, //配置element-plus为中文
})

app.use(createPinia())
app.use(router)

app.mount('#app')
