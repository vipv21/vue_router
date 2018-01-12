> `vue`适合做大型单页面项目,利用`vue-cli`构建项目的时候会提示是否安装路由模块[参考中文文档](https://router.vuejs.org/zh-cn/)

### 一、`vue`中路由的使用

* 1、定义组件

    ```javascript
    <template>
      <div class="hello">
        <h1 @click="info" :class="color">{{ msg }}</h1>
      </div>
    </template>
    
    <script>
    export default {
      name: 'hello',
      data () {
        return {
          msg: '我是Hello组件',
          color:'color'
        }
      },
      methods:{
          info(){
              console.log('你点击了我');
          }
      }
    }
    </script>
    
    <style>
        .color{
            color:#630;
        }
    </style>
    ```
* 2、配置路由文件

    ```javascript
    import Vue from 'vue'
    import Router from 'vue-router'
    import Hello from '@/components/Hello'
    import Word from '@/components/Word';
    Vue.use(Router)
    
    export default new Router({
        routes: [
            {
                path: '/',
                component: Hello
            },
            {
                path:'/index',
                component:Word
            }
        ]
    })
    ```
* 3、配置路由插座`<router-view></router-view>`

    ```javascript
    <template>
      <div id="app">
        <!--可以定义不变的内容-->
        <h3>{{title}}</h3>
        <!--定义路由插座-->
        <router-view></router-view>
        <!--可以定义不变的内容-->
      </div>
    </template>
    
    <script>
    export default{
        name:'app',
        data(){
            return{
                title:'我是项目主入口'
            }
        }
    }
    </script>
    ```
    
* 4、路由文件注入到`main.js`文件中


    ```javascript
    import Vue from 'vue';
    import Router from 'vue-router';
    import App from './App';
    import router from './router/index';
    
    
    Vue.config.productionTip = false;
    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        router,
        render(h){
            return h(App);
        }
    })
    ```
    
### 二、配置路由的跳转
> 路由的跳转使用标签`router-link`

* 1、知道路径的跳转

    ```javascript
    <ul>
        <li><router-link to="/">Hello页面</router-link></li>
        <li><router-link to="/word">word页面</router-link></li>
    </ul>
    <!-- 定义路由插座 -->
    <router-view></router-view>
    ```
    
* 2、`to`是通过绑定数据到上面


    ```javascript
    ...
    <ul>
        <li><router-link to="/">Hello页面</router-link></li>
        <li><router-link :to="word">word页面</router-link></li>
    </ul>
    <!-- 定义路由插座 -->
    <router-view></router-view>
    ...
    <script>
    export default{
        name:'app',
        data(){
            return{
                title:'我是项目主入口',
                word:'/word'
            }
        }
    }
    </script>
    ```
    
### 三、定义子路由

* 1、定义路由跳转


    ```javascript
    ...
    <ul>
        <li><router-link to="/word/router1">路由1</router-link></li>
        <li><router-link to="/word/router2">路由2</router-link></li>
        <router-view></router-view>
    </ul>
    ...
    ```
    
* 2、路由的跳转


    ```javascript
    ...
    {
        path:'/word',
        component:Word,
        children:[
            {
                path:'router1',
                component:Router1
            },
            {
                path:'router2',
                component:Router2
            }
        ]
    }
    ...
    ```
    
### 四、路由之间传递参数`params`方式

* 1、路由跳转的时候定义要传递参数形式

    ```javascript
    ...
    {
        path:'router1/:id',
        component:Router1
    },
    ...
    ```
    
* 2、页面跳转的时候传递参数

    ```javascript
    <!--123就是传递的id值-->
    <li><router-link to="/word/router1/123">路由1</router-link></li>
    ```
    
* 3、在组件中接收传递过去的参数

    ```javascript
    export default{
        mounted(){
            console.log(this.$route);
            console.log(this.$route.params.id);
        }
    }
    ```
    
### 五、路由之间传递参数`query`方式
* 1、在路由跳转地方传递`query`参数

    ```javascript
    <li><router-link v-bind:to="{path:'/word/router2',query:{id:123}}">路由2</router-link></li>
    ```
    
* 2、在组件的`mounted`中接收

    ```javascript
    export default{
        mounted(){
            console.log(this.$route);
            console.log(this.$route.query.id);
        }
    }
    ```
   
### 六、关于`vue`脚本中操作页面的跳转及传递参数
 
* 1、使用`push`实现页面跳转


    ```javascript
    methods:{
        go1(){
            // 使用params传递参数
            this.$router.push({path:'/word/router1/123'});
        }
    }
    ```

* 2、使用`replace`实现页面的跳转

    ```javascript
    methods:{
        go2(){
            // 使用query传递参数
            this.$router.replace({path:'/word/router2',query:{id:123}});
        }
    }
    ```

### 七、关于前进与后退
* 1、页面代码

    ```html
    <input type="button" value="前进" @click="next"/>
    <input type="button" value="后进" @click="prevent"/>
    ```
    
* 2、事件方法代码

    ```javascript
    ....
    methods:{
        next(){
            this.$router.go(1);
        },
        prevent(){
            this.$router.go(-1);
        }
    }
    ....
    ```
    
### 八、重定向

* 1、配置路由

    ```javascript
    ...
    {
        path:'router',  // path路径 
        redirect:'/word/router3'  // 重定向指向的路径
    }
    ...
    ```
    
* 2、配置页面跳转

    ```html
    <li><router-link to="/word/router">路由4</router-link></li>
    ```
* 3、重定向函数

    ```javascript
    {
        path:'router5',
        redirect:()=>{
            console.log(arguments);
            return '/word/router3';
        }
    }
    ```
    
### 九、路由的钩子函数

* 1、`beforeEnter`的使用
    ```
    ...
    {
        path:'router2',
        component:Router2,
        beforeEnter(to,form,next){
            console.log('///',arguments);
            setTimeout(()=>(next()),1000);
        }
    },
    ...
    ```
    
* 2、`beforeRouteUpdate`的使用
* 3、`beforeRouteLeave`的使用

### 十、路由实现组件间传递数据
* 1、直接传递到组件

    ```html
    <Myhead v-bind:name1="name1"></Myhead>
    ```
    ```javascript
    <script>
    import Head from '@/components/Head';
    export default{
        name:'app',
        data(){
            return{
                name1:'张三'
            }
        },
        components:{
            Myhead
        }
    }
    </script>
    ```
    
* 2、组件`Head`中接收

    ```javascript
    export default{
        props:['name1'],
        data(){
        ...
    ```
    
* 3、传递到`router-view`上

    ```html
    <router-view v-bind:age="age"></router-view>
    ```
    ```javascript
    export default{
        name:'word',
        props:['age'],
        ...
    ```
