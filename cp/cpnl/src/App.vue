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
 /* font-family: Montserrat,Helvetica,Arial,sans-serif !important; */
 font-family: Open Sans,Helvetica,Arial,sans-serif !important;
}
.product-card .v-image__image--preload {
    filter: blur(.05px);
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
 .bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
