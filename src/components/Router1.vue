<template>
    <div>
        我是路由1的内容
    </div>
</template>

<script>
    export default{
        mounted(){
            console.log(this.$route);
            console.log(this.$route.params.id);
        }
    }
</script>

<style>
    
</style>