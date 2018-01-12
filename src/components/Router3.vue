<template>
    <div>
        <h1>我是组件3--{{age}}</h1>
    </div>   
</template>

<script>
    export default{
        props:['age'],
        mounted(){
            console.log(this.$route);
            console.log(this.$route.params);
        }
    }
</script>

<style>
    
</style>