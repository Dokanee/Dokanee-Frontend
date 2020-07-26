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
.dd-b-rounded{
    border: 0px solid transparent !important;
    border-radius: 1rem !important;
}
</style>
