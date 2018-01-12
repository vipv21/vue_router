import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Word from '@/components/Word';
import Router1 from '@/components/Router1';
import Router2 from '@/components/Router2';
import Router3 from '@/components/Router3';
Vue.use(Router)

export default new Router({
    mode: 'history', // 使用HTML5 History默认是哈希值的方式
    routes: [
        {
            path: '/',
            component: Hello
        },
        {
            path:'/word',
            component:Word,
            children:[
                {
                    path:'router1/:id',
                    component:Router1
                },
                {
                    path:'router2',
                    component:Router2,
                    beforeEnter(to,form,next){
                        console.log('///',arguments);
                        setTimeout(()=>(next()),1000);
                    }
                },
                {
                    path:'router3',
                    name:'router3',
                    component:Router3
                },
                {
                    path:'router4',  // path路径
                    redirect:'/word/router3'  // 重定向指向的路径
                },
                {
                    path:'router5',
                    redirect:()=>{
                        console.log(arguments);
                        return '/word/router3';
                    }
                }
            ]
        }
    ]
})
