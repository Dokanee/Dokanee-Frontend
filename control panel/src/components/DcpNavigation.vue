<template>
     <v-app-bar app color="white" elevation="0">
            <v-app-bar-nav-icon @click="menuToggle"></v-app-bar-nav-icon>
            <v-img max-width='200' aspect-ratio="1" height='100' src='@/assets/logo.png'></v-img>
            <v-spacer></v-spacer>
            <v-icon>mdi-account</v-icon>
        </v-app-bar>
</template>
<script>
export default {
    name: 'DcpNav',

    data(){
        return {
         menuEnable : false
        }
    },
    methods: {
       menuToggle(){
           this.$store.commit('bergerMenuToggle');
       }
    }

}
</script>
<style scoped>

</style>