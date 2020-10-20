<template>
    <div class="">
  <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
      height="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
         Signing Out
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    </div>
</template>
<script>
export default {
    data(){
     return {
        dialog: false,
     }
    },
    methods: {
      signOut(){

      }
    },
    mounted(){
       this.dialog = true;
    },
    watch: {
      dialog (val) {
          let i = this;
        if (!val) return
         
        setTimeout(() => {
            localStorage.setItem("access_token","");
            this.dialog = false;
          this.$router.push("/auth/signin");
        }, 4000)
      },
    }
}
</script>