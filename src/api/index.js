
import ajax from './ajax'

//根据经纬度获取详情
const BASE='/api'
const BASE2='/baidu'
export  const reqAddress=(longitude,latitude)=>ajax({
    method:'GET',
    url:BASE+`/position/${latitude},${longitude}`

})

//获取食品分类列表
export const reqCategory=()=>ajax.get(BASE+'index_category',{
    headers:{
        needToken:true
    }
})

//3、根据经纬度获取商铺列表
export const reqShops=({latitude ,longitude})=>ajax({
    url:BASE+'/shops',
    params:{
        latitude,
        longitude
    },
    headers:{
        needToken:true
    }

})

//4发送短信验证码
export const reqSenCode=(phone)=>ajax.get(BASE+'/sendcode',{
    params:{
        phone:phone
    }
})
//5用户名密码登录
export const reqPwdLogin=({
    name,
    pwd,
    captcha
})=>ajax.post(BASE+'/login_pwd',{
    name,
    pwd,
    captcha
})
//6手机号验证码登陆
export const reqSmsLogin=(phone,code)=>ajax.post(BASE+'/login_sms',
    {phone,
    
    code}
)

export const reqAutoLogin=()=>ajax({
    url:BASE+'/auto_login',
    headers:{
        needToken:true
    }
})
//获取商家商品信息
export const reqGoods=()=>ajax('/goods');
//获取商家评价数组
export const reqRatings=()=>ajax('/ratings');
//获取商家商品数组
export const reqInfo=()=>ajax('/info');

