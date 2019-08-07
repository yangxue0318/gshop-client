import Msite from 'pages/Msite/Msite.vue'
import Order from 'pages/Order/Order.vue'
import Profile from 'pages/Profile/Profile.vue'
import Search from 'pages/Search/Search.vue'
import Login from 'pages/Login/Login.vue'
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