<template>
    <div class="">
 <v-app >
        <v-main>
            <v-container class="fill-height signupin-bg"  fluid>
                <v-row align="center" justify="center"  cols='12' class="fill-height text-center pa-none">
                    <v-col lg="8" sm="10" xs="10">
                        <!-- <transition name="fade">
                            <router-view></router-view>
                        </transition> -->
                        <v-stepper
    v-model="steps"
     max-width="800"
    vertical
  >
  <v-img
                max-width="200"
                min-width="170"
                aspect-ratio=".5"
                height="100"
                src="@/assets/logo.png"
              ></v-img>
    <v-stepper-step
      :complete="steps > 1"
      step="1"
    >
     Create a Store
      <small>provide needed information</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card
      flat
        class="mb-12"
        height="300px"
        max-width="800"
      >
       <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
 <v-row>
                  <v-col class="pb-0 pt-0" cols="12" lg="12" sm="12">
                    <v-text-field dense v-model="formData.storeName" label="Store Title" :rules="[v => !!v || 'Title is required']"
        required outlined></v-text-field>
                  </v-col>

                  <v-col class="pb-0 pt-0" cols="12" sm="12">
                    <v-text-field dense v-model="formData.storeInfo" label="Description" :rules="[v => !!v || 'Description is required']"
        required outlined></v-text-field>
                  </v-col>
 <v-col class="pb-0 pt-0" cols="12" sm="12">
                    <v-text-field dense v-model="formData.storeCategory" label="Category" :rules="[v => !!v || 'Category is required']"
        required outlined></v-text-field>
                  </v-col>
                  <v-col class="pb-0 pt-0" cols="12" sm="12">
                    <v-text-field dense v-model="formData.subDomainName" label="Domain" :rules="[v => !!v || 'Domain is required', rules.name, rules.available]"
        required outlined></v-text-field>
                  </v-col>
                  <v-col class="float-right">
                  <span>You can add custom <b>domain</b> later</span>
                  </v-col>
 </v-row>
  <v-btn
        color="secondary"
        class="float-right"
        @click="validateAndContinue"
       :disabled="!valid"
      >
        Continue
      </v-btn>
       </v-form>
      </v-card>
     
      <!-- <v-btn text>
        Cancel
      </v-btn> -->
    </v-stepper-content>
<!--  -->
 <v-stepper-step
      :complete="steps > 2"
      step="2"
    >
     Additional Info
      <small>provide needed information</small>
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
      flat
        class="mb-12"
        height="300px"
        max-width="800"
      >
       <v-form ref="forms" v-model="valid2" lazy-validation class="pa-4">
 <v-row>
                  <v-col class="pb-0 pt-0" cols="12" lg="12" sm="12">
                    <v-text-field dense v-model="formData.address" label="Store Address" :rules="[v => !!v || 'Address is required']"
        required outlined></v-text-field>
                  </v-col>

                  <v-col class="pb-0 pt-0" cols="12" sm="12">
                    <v-text-field dense v-model="formData.division" label="Division" :rules="[v => !!v || 'Division is required']"
        required outlined></v-text-field>
                  </v-col>

                  <v-col class="pb-0 pt-0" cols="12" sm="12">
                    <v-text-field dense v-model="formData.zilla" label="Zilla" :rules="[v => !!v || 'Zilla is required']"
        required outlined></v-text-field>
                  </v-col>
                   <v-col class="pb-0 pt-0" cols="12" sm="12">
                    <v-text-field dense v-model="formData.upzila" label="Upzila" :rules="[v => !!v || 'Upzilla is required']"
        required outlined></v-text-field>
                  </v-col>
                  <v-col class="float-right">
                  <span>You can add custom <b>domain</b> later</span>
                  </v-col>
 </v-row>
  <v-btn
        color="secondary"
        class="float-right"
        @click="validateAndContinue"
       :disabled="!valid"
      >
        Continue
      </v-btn>
       </v-form>
      </v-card>
     
      <!-- <v-btn text>
        Cancel
      </v-btn> -->
    </v-stepper-content>

<!--  -->
    <v-stepper-step
      :complete="steps > 3"
      step="3"
    >
      Choose A template
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
      flat
        class="mb-12"
        height="200px"
      >
      <v-row>
      <v-col>
         <v-card
       
      flat
        class="mb-12 cursor-pointer"
        color="blue"
        height="100px"
        max-width="100px"
      >
       </v-card>
      </v-col>
     

       <v-col>
           <v-card
      flat
        class="mb-12"
        color="pink"
        height="100px"
        max-width="100px"
      >
       </v-card>
      </v-col>
     
       <v-col>
          <v-card
      flat
        class="mb-12"
        color="grey"
        height="100px"
        max-width="100px"
      >
       </v-card>
      </v-col>
       </v-row>
       
      </v-card>
      <v-btn
        color="secondary"
         class="float-right"
      >
        Create Store
      </v-btn>
      <v-btn
       @click="steps = 2"
        class="float-right"
        text>
        Previous
      </v-btn>
    </v-stepper-content>

    
  </v-stepper>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer class="py-2 transparent" color=''>
            <span class="ml-auto overline">Dokanee &copy;2020</span>
        </v-footer>
    </v-app>
    </div>
</template>
<script>
import axios from "axios";
export default {
     data () {
      return {
         auth: 'Bearer ' + localStorage.getItem('access_token'),
        steps: 1,
        valid: true,
        valid2: true,
        available: true,
         rules: {
          required: value => !!value || 'Required.',
          name: value => {
           var letters = /^[A-Za-z]+$/
            return letters.test(value) || 'Invalid subdomain name only Alphabets allowed!.'
          },
          available: value => {
            if(this.available == false)
            return 'Subdomain not available'
            else return true;
          }
        },
        formData: {
            address : null,
  division: null,
  havePhysicalStore: true,
  storeCategory: null,
  storeInfo: null,
  storeName: null,
  subDomainName: null,
  upzila: null,
  zila: null
        }
      }
    },
    methods: {
      validateAndContinue(){
       let v = this.$refs.form.validate();
        if(v == true)
         //this.checkDomain()
         this.steps = 2;
      },
      checkDomain(){
        axios.get(`https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/check?subDomain=${this.formData.subDomainName}`, { headers: { 'Authorization': this.auth }})
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err.body));
      }
    }
}
</script>
<style scoped>
.signupin-bg{
    background: #ebeef0;
    /* background: -webkit-linear-gradient(-45deg,#00b0ff ,#8bc34a); */
}
.tansparent{
    background: transparent !important;
    color: white !important;
}
</style>