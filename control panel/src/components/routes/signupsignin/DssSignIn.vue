<template>
  <v-container class="full-height" fluid>
    <v-snackbar
      v-model="alert"
      timeout=3000
       absolute
      center
      rounded="pill" class="text-center"
      top
      color="red"
    >
      {{ apiResponse }}
    </v-snackbar>
    <v-row style="margin-top:3%; vertical-align: middle; !important" align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card color="white" class="rounded-lg ma-auto " width="450" max-height="1000" style="padding:2.5%; !important">
       <v-progress-linear
        :active="dialog"
        :indeterminate="dialog"
        absolute
        top
        color="matgreen"
      ></v-progress-linear>
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
            <router-link style="color:#2196F3;text-decoration: none;"  :to="{path:'reset-password'}">Forgot Password?</router-link>
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
  </v-container>
</template>
<script>

import axios from 'axios';
const API_URL = 'https://dokanee-backend-monolithic.herokuapp.com/'
const LOGIN_URL = API_URL + 'auth/signin/'
const SIGNUP_URL = API_URL + 'auth/signup'

const options = {
    headers: {
        'Content-Type': 'application/json',
    }
  };
export default {
    data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      dialog: false,
        apiResponse: null,
      alert: false,
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
            i.response = this.login(signInData);
            
        // }, 4000)
      }
    },
    login(data) {
    
    axios.post(LOGIN_URL, data)
    .then(response => {
      console.log(response)
      localStorage.setItem('id_token', response.id_token)
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem("role",response.data.role)
    
      // this.user.authenticated = true
      console.log(localStorage)

      // Redirect to a specified route
      this.$router.push("/cpanel/dashboard");
    })
    .catch(err => {
      console.log(err.response)
      if (err.response.status === 401) {
      // client received an error response (5xx, 4xx)
     this.apiResponse = "Password or Email or Both didn't match!";
      this.dialog = false;
      this.alert = true;
       
    } else if (err.request) {
      // client never received a response, or request never left
    } else {
      // anything else
    }
    });

    
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