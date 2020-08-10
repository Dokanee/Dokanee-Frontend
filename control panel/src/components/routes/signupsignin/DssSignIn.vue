<template>
  <v-container class="full-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card color="white" class="rounded-lg ma-auto" width="550" max-height="1000">
          <v-toolbar flat class="pa-0">
            <v-toolbar-title>
              <b>Sign In</b>
            </v-toolbar-title>
          </v-toolbar>
          <v-form ref="form" v-model="signIn" lazy-validation class="pa-4">
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>


export default {
    data(){
        return {
            signIn: null
        }
    }
}
</script>
<style scoped>
</style>