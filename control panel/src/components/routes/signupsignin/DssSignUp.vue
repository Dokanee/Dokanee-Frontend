<template>
  <v-container class="full-height" fluid>
    <v-snackbar
      v-model="alert"
      timeout=3000
       absolute
      center
      rounded="pill" class="text-center"
      top
      :color=alertType
    >
      {{ apiResponse }}
    </v-snackbar>
    <v-row  align="center" justify="center">
      <v-col cols="12" lg="12" md="8">
        <v-card
          color="white"
          class="rounded-lg ma-auto"
          width="780"
          max-height="1000"
          style="padding:2.5%; !important"
        >
          <v-progress-linear
        :active="loadingResponse"
        :indeterminate="loadingResponse"
        absolute
        top
        color="matgreen"
      ></v-progress-linear>
        <span>
          <v-toolbar flat class="pa-0">
            <v-toolbar-title>
              <v-img
                max-width="200"
                min-width="170"
                aspect-ratio=".5"
                height="100"
                src="@/assets/logo.png"
              ></v-img>
            </v-toolbar-title>
          </v-toolbar>
          <br />
          <v-row>
            <v-col class="pb-0 pt-0 ml-4 dk-grey--text" cols="12" sm="7">
              <b>Create your Dokanee Account</b>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="7" md="7">
              <v-form ref="form" lazy-validation class="pa-4">
                <v-row>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field dense v-model="formData.firstName"  :rules="[rules.required, rules.counter]" required label="First Name" outlined></v-text-field>
                  </v-col>

                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field dense v-model="formData.lastName" :rules="[rules.required, rules.counter]" required label="Last Name" outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0">
                    <v-text-field
                      dense
                      v-model="formData.email"
                      :rules="[rules.required, rules.email]"
                      label="E-mail"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- <v-row>
              <v-col>
                <VuePhoneNumberInput dark-color="#9e9e9e" default-country-code="BD" required v-model="yourValue" />
              </v-col>
                </v-row>-->

                <v-row>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field
                      v-model="formData.password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.counter]"
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
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field
                      v-model="password2"
                      :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                   :rules="[rules.required, rules.counter, (formData.password === password2) || 'Password must match']"
                      :type="showPassword2 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Confirm"
                      hint="At least 8 characters"
                      counter
                      outlined
                      dense
                      @click:append="showPassword2 = !showPassword2"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field
                      dense
                      v-model="formData.phoneNo"
                      :rules="[rules.required]"
                      label="Phone Number"
                      required
                      type="number"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <!-- <v-menu
                      ref="datePickerMenu"
                      v-model="datePickerMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          dense
                          v-model="formData.dob"
                          label="Date"
                          persistent-hint
                          outlined
                          required
                          v-bind="attrs"
                         
                          v-on="on"
                          class="pb-0 pt-0"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title @input="datePickerMenu = false"></v-date-picker>
                    </v-menu> -->
                    <v-menu
        ref="menu"
        v-model="datePickerMenu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="formData.dob"
            label="Date of Birth"
            prepend-icon="mdi-calendar"
            readonly
            outlined
            :rules="[rules.required]" 
            required
            dense
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="formData.dob"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="datePickerMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0">
                    <v-text-field dense outlined v-model="formData.address" :rules="[rules.required]" required label="Address"></v-text-field>
                  </v-col>
                </v-row>

                <!-- <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
                ></v-checkbox>-->
                <v-row>
                  <v-btn
                    class="elevation-0"
                    style="margin-left:3%"
                    :to="{path:'signin'}"
                    >
                    Back to sign in
                    </v-btn>
                  <v-col class="pb-0 pt-0">
                    <v-btn class="float-right" color="matgreen white--text" @click="submit">Register</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
            <v-col cols="12" lg="5" md="5">
              <br />
              <br />
              <v-img class="d-none d-sm-flex" width="95%" src="@/assets/shopping.svg"></v-img>
              <div class="d-none d-sm-flex dk-grey--text text-center justify-center ma-auto">
                Your store in Online
                <br />Start From Now
              </div>
            </v-col>
          </v-row>
        </span>
          <!-- <v-progress-circular
          v-show="loadingResponse"
      :size="130"
      :width="11"
      color="pink"
      indeterminate
      align="center" justify="center"
    ></v-progress-circular> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios'
//import apis from "@/auth/apis.js";
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
      windowWidth: window.innerWidth,
      loadingResponse: false,
      yourValue: 0,
      showPassword: false,
      showPassword2: false,
      datePickerMenu: false,
      apiResponse: null,
      alert: false,
      alertType: "",
      password: "",
      password2: "",
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
      date: new Date().toISOString().substr(0, 10),
      formData: {
        address: "",
        dob: "",
        email: "",
        firstName: "",
        lastName: "",
        nid: "",
        password: "",
        phoneNo: "",
        role: ["OWNER"],
      },
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    showImage(){
      return this.windowWidth > 950;
    },
    passwordConfirmationRule() {
      return () => (this.password === this.password2) || 'Password must match'
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
 mounted(){
   window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
   // if(localStorage.getItem("access_token"))
 },
  methods: {
    submit(){
      console.log(this.formData)
        let r =  this.$refs.form.validate();
        if(r == true){
      this.loadingResponse = true;
      this.signup(JSON.stringify(this.formData));
        }
    },
      signup(data) {
    console.log(data);
    axios.post(SIGNUP_URL, data, options)
    .then(response => {
      console.log(response)
      if(response.status == 200){
      if(response.data.massage != "OK") {
        this.apiResponse = response.data.massage;
        this.alertType  = "red";
        this.alert = true;
         this.loadingResponse = false;
        }else{
          this.apiResponse = "Account has been created successfully!";
          this.alertType = "green"
this.alert = true;
         this.loadingResponse = false;

      // localStorage.setItem('id_token', response.id_token)
      // localStorage.setItem('access_token', response.data.accessToken)
        }
    }
      // this.user.authenticated = true
      // console.log(localStorage)
    })
     .catch(err => console.log(err.response));
     
  },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>
<style scoped>
</style>