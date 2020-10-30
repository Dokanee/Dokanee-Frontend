<template>
  <v-container class="full-height" fluid>
    <v-row style="margin-top:3%; vertical-align: middle; !important" align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card color="white" class="rounded-lg ma-auto " width="450" max-height="1000" style="padding:2.5%; !important">
         <div align="center">
              <v-img max-width='200' min-width="170" aspect-ratio=".5" height='100' src='@/assets/logo.png'></v-img>
              <p>Reset Password</p>
        </div>
         <v-stepper v-model="e1"  :elevation="10">
                <v-stepper-items>
                    
                <v-stepper-content step="1">
                   <v-row
                   style="padding:13px">
                        <v-text style="text-align:center">To reset password please enter you email below. you will receved an email with otp.</v-text>
                        <v-text-field
                        class="pt-5" 
                        type="email" 
                        label="Email"
                        outlined
                        required
                        dense></v-text-field>
                    </v-row>
                    <v-btn
                    class="float-right"
                    color="matgreen white--text"
                    @click="e1 = 2"
                    >
                    Continue
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-row
                   style="padding:13px">
                        <v-text style="text-align:center">To reset password please enter you email below. you will receved an email with otp.</v-text>
                        <v-text-field type="email" label="Email"></v-text-field>
                    </v-row>
                    <v-btn
                    class="float-right"
                    color="matgreen white--text"
                    @click="e1 = 3"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>
                    Cancel
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-row
                   style="padding:13px">
                        <v-text style="text-align:center">To reset password please enter you email below. you will receved an email with otp.</v-text>
                        <v-text-field type="email" label="Email"></v-text-field>
                    </v-row>
                    <v-btn
                    class="float-right"
                    color="matgreen white--text"
                    @click="e1 = 1"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>
                    Cancel
                    </v-btn>
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
  export default {
    data () {
      return {
        e1: 1,
      }
    },
  }
</script>