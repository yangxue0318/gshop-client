//最核心的管理对象
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'
//声明
Vue.use(Vuex)
export default new Vuex.Store({
   
    mutations,
    actions,
    getters,
    modules:{//vuex多模块变成
        msite:msite,
        shop:shop,
        user:user
    }
 
})