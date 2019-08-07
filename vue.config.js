const path=require('path');
//__dirname:代表当前文件的文件夹绝对路径
// 根据目录/或文件夹名得到其对应的绝对路径
function resolve(dir){
    return path.resolve(__dirname,dir)
}

module.exports = {
    configureWebpack: {//编写webpack配置
       
      resolve: {
        extensions: ['.js', '.vue', '.json'],//自添加文件扩展名
        alias: {//模块路径别名
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
          'components':resolve('src/components'),
          'pages':resolve('src/pages')
        }
        
      }
    },
    //配置开发服务中的代理
    devServer:{
      proxy:{
        '/api': {
          target: 'http://localhost:4000',//转发的目录地址
          changeOrigin: true,
          pathRewrite: {//重写路径，让代理服务再转发请求，对路径进行特定修改
            '^/api': '' // 去掉路径中的/api
          },//支持跨域
        },
       
        '/baidu': {
          target: 'http://www.baidu.com',
          changeOrigin: true,
          pathRewrite: {//重写路径，让代理服务再转发请求，对路径进行特定修改
            '^/baidu': '' // 去掉路径中的/api
          },
        },
        
      }
    }
  }