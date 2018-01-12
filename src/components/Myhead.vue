<template>
    <div>
        <h3>{{title}}--{{name1}}</h3>
        <input type="button" value="前进" @click="next"/>
        <input type="button" value="后进" @click="prevent"/>
        <ul>
            <li><router-link to="/">Hello页面</router-link></li>
            <li><router-link :to="word">word页面</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default{
        props:['name1'],
        data(){
            return{
                title:'我是项目主入口',
                word:'/word'
            }
        },
        methods:{
            next(){
                this.$router.go(1);
            },
            prevent(){
                this.$router.go(-1);
            }
        }
    }
</script>


<style>
    a{
        text-decoration:none;
    }
    .router-link-exact-active{
        color:#f00;
    }
</style>