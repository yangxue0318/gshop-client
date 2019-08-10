import Msite from 'pages/Msite/Msite.vue'
import Order from 'pages/Order/Order.vue'
import Profile from 'pages/Profile/Profile.vue'
import Search from 'pages/Search/Search.vue'
import Login from 'pages/Login/Login.vue'
import Shops from 'pages/Shop/Shops.vue'
import Goods from '../pages/Shop/Goods/Goods.vue'
import Ratings from '../pages/Shop/Ratings/Ratings.vue'
import Info from '../pages/Shop/Info/Info.vue'
//所有路由配置的数组
 export default[
    {
        path:'/msite',
        component:Msite,
        meta:{
            showFooter:true
        }
    },
    {
        path:'/shops',
        component:Shops,//注册路由 
        children:[
            {
                path:'/shops/goods',
                component:Goods,
            },
            {
                path:'/shops/ratings',
                component:Ratings,
            },
            {
                path:'/shops/info',
                component:Info,
            },
            {
                path:'',
                redirect:'/shops/goods'
            }
        ]
    },
    {
        path:'/order',
        component:Order,
        meta:{
            showFooter:true
        }
    },
    {
        path:'/search',
        component:Search,
        meta:{
            showFooter:true
        }
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/profile',
        component:Profile,
        meta:{
            showFooter:true
        }
    },
   
    {
        path:'/',
        redirect:'/msite'
    }
]