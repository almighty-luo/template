import { createApp } from 'vue';
// 从一个单文件组件中导入根组件
import App from './App.vue';
import SvgIcon from '@/components/Svg.vue';

const app = createApp(App);
app.use(SvgIcon).mount('#app');
