<template>
  <div id="app">
    <!--可以定义不变的内容-->
    <Myhead v-bind:name1="name1"></Myhead>
    <!--定义路由插座-->
    <router-view v-bind:age="age"></router-view>
    <!--可以定义不变的内容-->
  </div>
</template>

<script>
import Myhead from '@/components/Myhead';
export default{
    name:'app',
    data(){
        return{
            name1:'张三',
            age:29
        }
    },
    components:{
        Myhead
    }
}
</script>


