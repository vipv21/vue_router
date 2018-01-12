<template>
    <div>
        <h1 class="title">{{msg}}--{{age}}</h1>
        <ul>
            <input type="button" value="跳转1" @click="go1"/>
            <input type="button" value="跳转2" @click="go2"/>
            <li><router-link to="/word/router1/123">路由1</router-link></li>
            <li><router-link v-bind:to="{path:'/word/router2',query:{id:123}}">路由2</router-link></li>
            <li><router-link v-bind:to="{name:'router3',params:{id:123}}">路由3</router-link></li>
            <li><router-link to="/word/router4">路由4</router-link></li>
            <li><router-link to="/word/router5">路由4</router-link></li>
            <router-view v-bind:age="age"></router-view>
        </ul>
    </div>
</template>

<script>
    export default{
        name:'word',
        props:['age'],
        data(){
            return{
                msg:'我是Word组件'
            }
        },
        methods:{
            go1(){
                this.$router.push({path:'/word/router1/123'});
            },
            go2(){
                this.$router.replace({path:'/word/router2',query:{id:123}});
            }
        }
    }
</script>

<style>
    .title{
        color:#f00;
    }
</style>