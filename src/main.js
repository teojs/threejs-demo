import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import components from '@/components'
import utils from '@/utils'
import '@/styles/index.less'
import 'normalize.css'

const app = createApp(App)
app.use(store).use(components).use(router).use(utils)

app.mount('#app')
