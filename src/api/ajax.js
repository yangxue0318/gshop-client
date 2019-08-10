//能发送ajax的函数，返回值是promise
//1处理Post请求体参数，转换为urlencode格式（默认用的是json）请求拦截器
//2让成功的结果不是response,而是response.data，相应拦截器成功的回调
//3统一处理请求错误，响应拦截器失败的回调
///4如果需要携带token的请求，从state中取出
//5没有不发请求，进入失败的流程
//6有，添加到请求投中Authorization=token
//发送请求获取数据
import axios from 'axios'
import qs from 'qs'
import store from '../store'
import { Toast } from 'mint-ui'
import router from '../router'
//添加请求拦截器
axios.interceptors.request.use(config => {
    const { method, data } = config;
    if (method.toUpperCase() === 'POST' && data instanceof Object) {
        config.data = qs.stringify(data)//传入的格式为urlEncode
    }
    ////4如果需要携带token的请求，从state中取出
    if (config.headers.needToken) {
        const token = store.state.user.token
        if (!token) {
            const error = new Error('没有token,不能发请求');
            error.status = 401
            throw error;

        } else {
            //6有，添加到请求投中Authorization=token
            config.headers['Authorization'] = token
        }
    }
    //5没有不发请求，进入失败的流程

    return config
})
//添加响应拦截器
axios.interceptors.response.use(response => {
    //让成功的结果不是response而是response.data:响应拦截器成功的回调
    return response.data;
    //统一处理请求错误，响应拦截器失败的回调
}, error => {
    const { message, response,status } = error
    //发请求前没有需要的token就失败
    if (!response) {
        if (status == 401) {
            if (router.currentRoute.path !== '/login') {
                //提示
                Toast(message);
                //跳转到登录页面
                router.replace('./login')
            }
        }
    } else {
        //发了请求token过期了
        const status=response.status
        if (status === 401) {
            if (router.currentRoute.path !== '/login') {
                Toast(response.data.message);
                //退出登录
                store.dispatch('logout')
                router.replace('./login')
            }
        } else if (status == 404) {
            Toast('请求的资源不存在')
        } else {
            Toast('请求错误' + message);
        }
    }
    // 中断promise链
    return new Promise(() => { })
})
export default axios