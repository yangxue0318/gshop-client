import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)
export default new VueRouter({//应用中所有组件路由
    mode:'history',
    routes,
})