<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
    name: 'App',
    components: {
    
}
}
</script>
<style>
*{
  font-family: sans-serif, Helvetica, Arial !important;
}
.dd-b-rounded{
    border: 0px solid transparent !important;
    border-radius: 1rem !important;
}
.grad-bg{
 /* background: -webkit-linear-gradient(200deg,#4d9abf,#1aae88);
  background: linear-gradient(200deg,#4d9abf,#1aae88);
   background: -moz-linear-gradient(200deg,#4d9abf,#1aae88); */
   background: #05a081;
 }
</style>
