<template>
  <v-container class="full-height" fluid>
    <v-row style="margin-top:3%; vertical-align: middle; !important" align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card color="white" class="rounded-lg ma-auto " width="450" max-height="1000" style="padding:2.5%; !important">
         <div align="center">
              <v-img max-width='200' min-width="170" aspect-ratio=".5" height='100' src='@/assets/logo.png'></v-img>
              <p><b>Reset Password</b></p>
        </div>
         <v-stepper v-model="e1" class="elevation-0">
                <v-stepper-items style="border:hidden;box-shadow: none;">
                    
                <v-stepper-content step="1">
                   <v-row
                   style="padding:13px">
                        <v-text style="text-align:center">To reset password please enter you email below. you will receved an email with OTP.</v-text>
                        <v-text-field
                        class="pt-5" 
                        type="email" 
                        label="Email"
                        outlined
                        required
                        dense
                        v-model="email"
                        ></v-text-field>
                    </v-row>
                    <v-btn
                    class="float-right"
                    color="matgreen white--text"
                    @click.passive="generateOTP()"
                    @click="e1 = 2"
                    >
                    Submit
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-row
                   style="padding:13px">
                        <v-text style="text-align:center">A 6-digit OTP is sent to your email address ( {{ email }} )</v-text>
                        <v-text-field class="centered-input  mt-5" type="number" outlined
                        required placeholder="ENTER THE OTP" color="grey lighten-43" v-model="otp"></v-text-field>
                    </v-row>
                    <v-btn
                    class="float-right"
                    color="matgreen white--text"
                    @click="e1 = 3"
                    >
                    Continue
                    </v-btn>

                    <v-btn text @click="e1 = 1">
                    Back
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-row
                   style="padding:13px">
                        <v-text style="text-align:center; margin: 0 auto;">Please enter new secured password.</v-text>

                    </v-row>
                        <v-text-field
                        class="pt-5" 
                        type="password" 
                        label="New Password"
                        outlined
                        required
                        dense
                        v-model="newPassword"></v-text-field>
                        <v-text-field
                        class="pt-2" 
                        type="password" 
                        label="Verify Password"
                        outlined
                        required
                        dense
                        v-model="varifyPassword"></v-text-field>
                    <v-btn
                    class="float-right"
                    color="matgreen white--text"
                    @click.prevent="forgetPassChange()"
                    @click="e1 = 4"
                    >
                    Save
                    </v-btn>

                    <v-btn text @click="e1 = 2">
                    Back
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="4">
                    <v-row
                   style="padding:13px"
                   justify-content="center">
                        <v-text style="text-align:center; color:#25AA94; margin: 0 auto;">Your password is changed successfully</v-text>
                    </v-row>
                    <v-col style="margin:3% auto; text-align:center">
                      <v-btn
                    centered
                    class="elevation-0"
                    :to="{path:'signin'}"
                    >
                    Back to sign in
                    </v-btn>
                    </v-col>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
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
         Please Wait...
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
import Axios from 'axios'
  export default {
    data () {
      return {
        e1: 1,
        email: '',
        resEmail: '',
        otp: '',
        newPassword: '',
        varifyPassword: '',
      }
    },
    methods: {
      generateOTP(){
        console.log("Clicked ok")
        Axios.post('https://dokanee-backend-monolithic.herokuapp.com/auth/generateOTP', {
          email: this.email,
        })
        .then(function(res){
         console.log(res.data);
        })
        .catch(function(error){
          console.log(error,'error');
        })
      },
      forgetPassChange(){
        console.log('otp sent')
        Axios.post('https://dokanee-backend-monolithic.herokuapp.com/auth/forgetPassChange', {
          email: this.email,
          newPassword: this.newPassword,
          otp: this.otp,
        })
        .then(function(res){
          console.log(res.data);
        })
        .catch(function(error){
          console.log(error,'error');
        })
      },
    }
  }
</script>

<style scoped>
    .centered-input >>> input {
      text-align: center
    }
</style>