//管理user功能模块相关状态数据的模块
import {
    REQUSER,
    RESET_USER,
    RESET_TOKEN,
    RESETBR_TOKEN,

} from '../mutation-type'
import {
   
    reqAutoLogin,

}from '../../api'
const state={
    user:{},//用户
    token:localStorage.getItem('token_key'),//当前用户对应的token
}
const mutations={
    [REQUSER](state,{user}){
        state.user=user;
    },
    [RESET_USER](state){
        state.user={};
    },
    [RESET_TOKEN](state,{token}){
        state.token=token;
    },
    [ RESETBR_TOKEN](state){
        state.token='';
    },
}
const actions={
    saveUser({commit},user){
        const token=user.token;
        //将token保存在内存当中
        localStorage.setItem('token_key',token)
        //将tokey保存在state
        commit( RESET_TOKEN,{token})
        //从user中删除token
       delete user.token 
        commit(REQUSER,{user})
    },
    //退出登录
    logout({commit}){
        commit(RESET_USER);
        commit(RESETBR_TOKEN);
        localStorage.removeItem('token_key');
    },
    
      //自动登录的异步action
      async autoLogin({commit,state}){
          if(state.token){
              const result=await reqAutoLogin();
            //   console.log(result.user)
              if(result.code===0){
                  const user=result.data
                  commit(REQUSER,{user})
              }
          }
      } ,
}
const getters={}
export default{
    state,
    getters,
    mutations,
    actions
}