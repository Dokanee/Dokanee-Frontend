<template>
  <v-container class="full-height" fluid>
    <v-row style="margin-top:3%; vertical-align: middle; !important" align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card color="white" class="rounded-lg ma-auto " width="450" max-height="1000" style="padding:2.5%; !important">
         <div align="center">
              <v-img max-width='200' min-width="170" aspect-ratio=".5" height='100' src='@/assets/logo.png'></v-img>
              <p>Login with your Dokanee Account</p>
        </div>
          <v-form ref="form" lazy-validation class="pa-4">
            <v-row>
              <v-col class="pb-0 pt-0">
              <v-text-field dense
                v-model="email"
                label="E-mail"
                  :rules="[rules.required]"
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
            required
            dense
            @click:append="showPassword = !showPassword"
          ></v-text-field>
              </v-col>
            </v-row>
            <a style="color:#2196F3;text-decoration: none;" href="#/auth/reset-password">Forgot Password?</a>
            <br/>
            <br/>
            <br/>
            <v-row><v-btn
                    class="elevation-0"
                    style="margin-left:2.5%"
                    to="signup"
                    >
                    Create An Account
                    </v-btn>
                    <!-- <v-btn style="color:#666;text-decoration: none;margin-left:2.5%" href="#/auth/signup">Create An Account</v-btn> -->
                    <v-col class="pb-0 pt-0">
        <v-btn class="float-right" color="matgreen white--text" @click="submit">Log In</v-btn>
     </v-col>
   </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
     <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
      height="300"
    >
    <!--   For notification warning -->
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
         Logging In
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
      <!--  -->
    </v-dialog>
  </v-container>
</template>
<script>

import auth from "@/auth/index.js"
export default {
    data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      dialog: false,
      response: "",
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
  methods: {
    submit(){
      let r =  this.$refs.form.validate();
      if(r == true){
      let i = this;
        this.dialog = true;
       let signInData = {
         email: this.email,
         password: this.password
       }
        // setTimeout(() => {   
            i.response = auth.login(signInData,this.redirect);
            
        // }, 4000)
      }
    },
    redirect(){
      this.$router.push("/cpanel/dashboard");
    }
  },
  mounted(){
    let token = localStorage.getItem('access_token');
    if(token != null) {
  console.log("already logged in");
  // window.location.href = "http://localhost:8080/#/cpanel/dashboard";
  this.$router.push("/cpanel/dashboard");
    }
         
  },
  //   watch: {
  //     response (val) {
  //       console.log("logging" + val);
  //         let i = this;
  //        if(val!=false){
  //     this.dialog = false;
  //   setTimeout(() => {   
  //           window.location.href = "http://localhost:8080/#/";
  //       }, 4000)
  //  }
  //     },
  //   }
}
</script>
<style scoped>
</style>