import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Header from 'components/Header/Header.vue'
import Star from 'components/Star/Star.vue'
import {Button} from 'mint-ui'
import './validate'
import './mock/mockServer'
//注册全局组件
Vue.config.productionTip=false;
Vue.component('Header',Header);
Vue.component('Star',Star);
Vue.component(Button.name,Button)
// new Vue({
//     el:'#app',
//     components:{//第一种方式   引入一个带编译器的文件在脚手架配置文件里面
//         App
//     },
//    template:'<App/>',
//    router//注册路由器
// })
new Vue({  //第二种方式   使用一个渲染的函数
    el:'#app',
    render:h=>h(App),//函数返回组件标签App
     router,
     store,

})