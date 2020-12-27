<template>
  <div id="app">
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
body{
 font-family: Montserrat,Helvetica,Arial,sans-serif !important;
 
}
.partition-info{
  line-height: 1 !important;
}
.dd-b-rounded{
    border: 0px solid transparent !important;
    border-radius: 1rem !important;
}
.grad-bg{
   background: #05a081;
 }
 .v-info--reveal {
align-items: center;
bottom: 0;
justify-content: center;
opacity: .8;
position: absolute;
width: 100%;
}
table.v-table thead th {
      font-size: 20px !important;
  font-weight: bold;
 }
</style>
