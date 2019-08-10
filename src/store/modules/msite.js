//管理msite功能模块相关状态数据的模块
import {
    REQADDRESS,
    REQSHOPS,
    REQCATEGORY,
   
} from '../mutation-type'
import {
    reqAddress,
    reqCategory,
    reqShops,
}from '../../api'

const state={
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组
}
const mutations={
    [REQADDRESS](state,address){
        state.address=address
    },
    [REQCATEGORY](state,categorys){
        state.categorys=categorys
    },
    [REQSHOPS](state,shops){
        state.shops=shops;
    },
}
const actions={
    async getAddress({commit,state}){
        //1调用接口请求函数发请求
       const {latitude,longitude}=state;
       const result=await reqAddress(longitude,latitude)
       //2有了结果,提交commit89 -；v
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

},
}
const getters={}
export default{
    state,
    getters,
    mutations,
    actions
}