import Vue from 'vue'
import VeeValidate, { Field } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)//内部定义一个全局指令
//提示信息本地化如若没有他提示错误就是英文的错误
VeeValidate.Validator.localize('zh_CN',{
    messages:zh_CN.messages,
    attributes:{
        name:'用户名',
        code:'验证码',
        phone:'手机号'
    }
})
//自定义验证规则
VeeValidate.Validator.extend('mobile',{
    validate:value=>{
        return /^1\d{10}$/.test(value)
    },
    getMessage:field=>field+'必须是11位手机号码'
})