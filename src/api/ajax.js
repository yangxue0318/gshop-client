//能发送ajax的函数，返回值是promise
//1处理Post请求体参数，转换为urlencode格式（默认用的是json）请求拦截器
//2让成功的结果不是response,而是response.data，相应拦截器成功的回调
//3统一处理请求错误，响应拦截器失败的回调
//发送请求获取数据
import axios from 'axios'
import qs from 'qs'
//添加请求拦截器
axios.interceptors.request.use(config=>{
    const {method,data}=config;
    if(method.toUpperCase==='POST'&&data instanceof Object){
       config.data=qs.stringify(data)//传入的格式为urlEncode
    }
    return config
})
//添加响应拦截器
axios.interceptors.response.use(response=>{
    //让成功的结果不是response而是response.data:响应拦截器成功的回调
    return response.data;
    //统一处理请求错误，响应拦截器失败的回调
},error=>{
    alert('请求异步'+error.message)
    //中断promise连
   return new Promise(()=>{})
})
export default axios