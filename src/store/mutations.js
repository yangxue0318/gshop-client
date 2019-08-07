//直接更新数据的方法
import {
    REQADDRESS,
    REQSHOPS,
    REQCATEGORY
} from './mutation-type'
export default {
    [REQADDRESS](state,address){
        state.address=address
    },
    [REQCATEGORY](state,categorys){
        state.categorys=categorys
    },
    [REQSHOPS](state,shops){
        state.shops=shops;
    }
}