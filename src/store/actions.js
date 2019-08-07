//间接更新数据的方法
import {
    reqAddress,
    reqCategory,
    reqShops
}from '../api'
import {
    REQADDRESS,
    REQSHOPS,
    REQCATEGORY
} from './mutation-type'
export default {
    //获取当前地址信息的异步
    async getAddress({commit,state}){
         //1调用接口请求函数发请求
        const {latitude,longitude}=state;
        const result=await reqAddress(longitude,latitude)
        //2有了结果,提交commit
        if(result.code===0){
            const address=result.data
           commit(REQADDRESS,address)
        }

    },

    async getCategorys({commit}){
       
       const result=await reqCategory()
       //2有了结果,提交commit
       if(result.code===0){
           const categorys=result.data
          commit(REQCATEGORY,categorys)
       }

   },

   async getShops({commit,state}){
    const {latitude,longitude}=state;
    const result=await reqShops({longitude,latitude})
    //2有了结果,提交commit
    if(result.code===0){
        const shops=result.data
       commit(REQSHOPS,shops)
    }

}
   
    
  
   
}