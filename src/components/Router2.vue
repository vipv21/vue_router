<template>
    <div>
        我是路由2内容
    </div>
</template>

<script>
    export default{
        mounted(){
            console.log(this.$route);
            console.log(this.$route.query.id);
        }
    }
</script>

<style>
</style>