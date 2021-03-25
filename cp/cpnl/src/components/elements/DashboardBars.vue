<template>
        <v-card flat :class="gradient" class="rounded-lg bg" :max-width="getMaxWidth">
          <v-row class="no-gutters">
            <div class="col-auto">
              <div class="white fill-height">&nbsp;</div>
            </div>
            <div class="col pa-3 py-4 white--text d-inline">
              <h5   class="text-truncate text-uppercase white--text text--lg--h5">{{text}}</h5>
              <h1  class="d-inline white--text">{{ data }}</h1>
              <v-icon x-large class="float-right white--text">{{icon}}</v-icon>
            </div>
          </v-row>
        </v-card>
</template>
<script>
export default {
    props: ["txt","clr","icn","dta","grad"],
    data(){
        return{
          color: this.clr,
          colorText: this.clr + "--text",
          text: this.txt,
          icon: this.icn,
          data: this.dta,
          gradient: this.grad
        }
    },
    watch: {
        dta: {
             handler(n, o) {
      this.data = n
    },
    deep: true
        }
    },
  computed: {
    getMaxWidth(){
      switch (this.$vuetify.breakpoint.name) {
        // case "xs":
        //   return 200;
        // case "sm":
        //   return 200;
        // case "md":
        //   return 220;
        // case "lg":
        //   return 240;
        case "xl":
          return 300;
      }
    }
  },
  methods: {
   getStyle(){
     return `background: -webkit-linear-gradient(200deg, ${this.gradient}) !important;`;
   }
  }
    
}
</script>
<style scoped>

.grad1{
  /* background: -webkit-linear-gradient(to right,#1aae88d6,#4d9abf);
  background: linear-gradient(to right,#1aae88d6,#4d9abf); */
  background: url(../../assets/bbls.svg) no-repeat,-webkit-linear-gradient(to right,#4d9abf,#1aae88d6);
  background:url(../../assets/bbls.svg) no-repeat, linear-gradient(to right,#4d9abf,#1aae88d6);

}
.grad2{
 background: #EF5350;  /* fallback for old browsers */
background: url(../../assets/bbls.svg) no-repeat,-webkit-linear-gradient(to right, #ec407aeb, #ef5350e3);  /* Chrome 10-25, Safari 5.1-6 */
background: url(../../assets/bbls.svg) no-repeat,linear-gradient(to right, #ec407aeb, #ef5350e3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.grad3{
background: #363795cf;  /* fallback for old browsers */
background: url(../../assets/bbls.svg) no-repeat,-webkit-linear-gradient(to right,#363795c7, #005c97ab);  /* Chrome 10-25, Safari 5.1-6 */
background: url(../../assets/bbls.svg) no-repeat,linear-gradient(to right, #363795c7, #005c97ab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.grad4{
background: #ff7043f0;  /* fallback for old browsers */
background: url(../../assets/bbls.svg) no-repeat,-webkit-linear-gradient(to right,#ff7043f0, #ff8f00ba);  /* Chrome 10-25, Safari 5.1-6 */
background: url(../../assets/bbls.svg) no-repeat,linear-gradient(to right, #ff7043f0, #ff8f00ba); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.bg{
    background-size: cover, auto;
}
</style>