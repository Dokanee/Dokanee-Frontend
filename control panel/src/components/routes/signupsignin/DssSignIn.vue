<template>
  <v-container class="full-height" fluid>
    <v-row style="margin-top:3%; vertical-align: middle; !important" align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card color="white" class="rounded-lg ma-auto " width="450" max-height="1000" style="padding:2.5%; !important">
         <div align="center">
              <v-img max-width='200' min-width="170" aspect-ratio=".5" height='100' src='@/assets/logo.png'></v-img>
              <p>Login with your Dokanee Account</p>
        </div>
          <v-form ref="form" v-model="signIn" lazy-validation class="pa-4">
            <v-row>
              <v-col class="pb-0 pt-0">
              <v-text-field dense
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                outlined
              ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="pb-0 pt-0">
              <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            outlined
            dense
            @click:append="showPassword = !showPassword"
          ></v-text-field>
              </v-col>
            </v-row>
            <a style="color:#25AA94;text-decoration: none;" href="">Forgot Password?</a>
            <br/>
            <br/>
            <br/>
            <v-row> <a style="color:#2196F3;text-decoration: none;margin-left:2.5%" href="/tmp/signup">Create An Account</a>    <v-col class="pb-0 pt-0">
        <v-btn class="float-right" color="matgreen white--text">Log In</v-btn>
     </v-col>
   </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>


export default {
    data() {
    return {
      yourValue: 0,
      showPassword : false,
      showPassword2 : false,
      password: "",
      password2: "",
       rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        }
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
}
</script>
<style scoped>
</style>