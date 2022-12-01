import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'
const app = createApp(App)
import SvgIcon from '@/components/Svg.vue'
app.use(SvgIcon).mount('#app')