<template>
  <div class>
    <v-app>
      <v-main>
        <v-container class="fill-height signupin-bg" fluid>
          <v-snackbar
            v-model="alert"
            timeout="3000"
            center
            rounded="pill"
            class="text-center"
            top
            :color="alertType"
          >{{ apiResponse }}</v-snackbar>
          <v-row align="center" justify="center" cols="12" class="fill-height text-center pa-none">
            <v-col lg="8" sm="10" xs="10">
              <!-- <transition name="fade">
                            <router-view></router-view>
              </transition>-->
              <v-stepper v-model="steps" max-width="800" vertical>
                <v-progress-linear
                  :active="created"
                  :indeterminate="created"
                  absolute
                  top
                  color="matgreen"
                ></v-progress-linear>
                <v-img
                  max-width="200"
                  min-width="170"
                  aspect-ratio=".5"
                  height="100"
                  src="@/assets/logo.png"
                ></v-img>
                <v-stepper-step :complete="steps > 1" step="1">
                  Create a Store
                  <small>provide needed information</small>
                </v-stepper-step>
                <v-stepper-content step="1">
                  <v-card flat class="mb-12" height="300px" max-width="800">
                    <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
                      <v-row>
                        <v-col class="pb-0 pt-0" cols="12" lg="12" sm="12">
                          <v-text-field
                            dense
                            v-model="formData.storeName"
                            label="Store Title"
                            :rules="[v => !!v || 'Title is required']"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col class="pb-0 pt-0" cols="12" sm="12">
                          <v-text-field
                            dense
                            v-model="formData.storeInfo"
                            label="Description"
                            :rules="[v => !!v || 'Description is required']"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col class="pb-0 pt-0" cols="12" sm="12">
                          <v-select
                            dense
                            outlined
                            :items="physicalStoreValue"
                            item-text="txt"
                            item-value="val"
                            v-model="formData.havePhysicalStore"
                            label="Physical Store"
                          ></v-select>
                        </v-col>
                        <v-col class="pb-0 pt-0" cols="12" sm="12">
                          <!-- <v-text-field
                            dense
                            v-model="formData.storeCategory"
                            label="Category"
                            :rules="[v => !!v || 'Category is required']"
                            required
                            outlined
                          ></v-text-field> -->
                          <v-select
                            dense
                            outlined
                            :items="categoryValue"
                             :rules="[v => !!v || 'Category is required']"
                            v-model="formData.storeCategory"
                            label="Category"
                          ></v-select>
                        </v-col>
                        <!-- <v-col class="pb-0 pt-0" cols="12" sm="12"> -->
                          <v-row class="no-gutters" >
                            <v-col class="pb-0 pt-0" cols="12"  lg=8 sm=8 xs=8>
 <v-text-field
                            dense
                            v-model="formData.subDomainName"
                            label="Sub Domain"
                            :rules="[v => !!v || 'Sub Domain is required',rules.name, rules.available]"
                            required
                            outlined
                          
                          >
                          </v-text-field>
                            </v-col>
     <v-col>
 <span class="black--text">.dokanee.com.bd</span>
     </v-col>
                          </v-row>

                        <v-row>
                          <!-- class="float-right" -->
                          <v-col >
 <span>
                            You can add custom
                            <b>domain</b> later
                          </span>
                          </v-col>
                         
                        </v-row>
                      </v-row>
                      <v-btn
                        color="secondary"
                        class="float-right"
                        @click="validateAndContinue"
                        :disabled="!valid"
                      >Continue</v-btn>
                    </v-form>
                  </v-card>
                </v-stepper-content>
                <!--  -->
                <v-stepper-step :complete="steps > 2" step="2">
                  Additional Info
                  <small>provide needed information</small>
                </v-stepper-step>

                <v-stepper-content step="2">
                  <v-card flat class="mb-12" height="300px" max-width="800">
                    <v-form ref="forms" v-model="valid2" lazy-validation class="pa-4">
                      <v-row>
                        <v-col class="pb-0 pt-0" cols="12" lg="12" sm="12">
                          <v-text-field
                            dense
                            v-model="formData.address"
                            label="Store Address"
                            :rules="[v => !!v || 'Address is required']"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col class="pb-0 pt-0" cols="12" sm="12">
                          <!-- <v-text-field
                            dense
                            v-model="formData.division"
                            label="Division"
                            :rules="[v => !!v || 'Division is required']"
                            required
                            outlined
                          ></v-text-field> -->
                          <v-select
                            dense
                            required
                            outlined
                            :items="divisionList"
                             :rules="[v => !!v || 'Division is required']"
                            v-model="formData.division"
                            label="Division"
                          ></v-select>
                        </v-col>

                        <v-col class="pb-0 pt-0" cols="12" sm="12">
                          <!-- <v-text-field
                            dense
                            v-model="formData.zila"
                            label="Zilla"
                            :rules="[v => !!v || 'Zilla is required']"
                            required
                            outlined
                          ></v-text-field> -->
                          <v-select
                            dense
                              required
                            outlined
                            :items="districtList"
                            item-text="name"
                             :rules="[v => !!v || 'District is required']"
                            v-model="formData.zila"
                            label="District"
                          ></v-select>
                        </v-col>
                        <v-col class="pb-0 pt-0" cols="12" sm="12">
                          <v-text-field
                            dense
                            v-model="formData.upzila"
                            label="Upzila"
                            :rules="[v => !!v || 'Upazilla is required']"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col class="float-right">
                          <span>
                            You can add custom
                            <b>domain</b> later
                          </span>
                        </v-col>
                      </v-row>
                      
                      <v-btn
                        color="secondary"
                        class="float-right"
                        @click="validateAndContinue"
                        :disabled="!valid2"
                      >Continue</v-btn>
                       <v-btn color="gray" @click="steps = 1" class="float-right" text>Previous</v-btn>
                    </v-form>
                  </v-card>
                </v-stepper-content>

                <!--  -->
                <v-stepper-step step="3">Choose A template</v-stepper-step>

                <v-stepper-content step="3">
                  <v-card flat class="mb-12" height="200px">
                    <v-row>
                      <v-col>
                        <v-card
                          flat
                          class="mb-12 cursor-pointer"
                          color="blue"
                          height="100px"
                          max-width="100px"
                        ></v-card>
                      </v-col>

                      <!-- <v-col>
                        <v-card flat class="mb-12" color="pink" height="100px" max-width="100px"></v-card>
                      </v-col>

                      <v-col>
                        <v-card flat class="mb-12" color="grey" height="100px" max-width="100px"></v-card>
                      </v-col> -->
                    </v-row>
                  </v-card>
                  <v-btn @click="createStore" color="secondary" class="float-right">Create Store</v-btn>
                  <v-btn @click="steps = 2" class="float-right" text>Previous</v-btn>
                </v-stepper-content>
              </v-stepper>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer class="py-2 transparent" color>
        <span class="ml-auto overline">Dokanee &copy;2020</span>
      </v-footer>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token")
  }
};
export default {
  data() {
    return {
      auth: "Bearer " + localStorage.getItem("access_token"),
      steps: 1,
      valid: true,
      valid2: true,
      available: true,
      created: false,
      apiResponse: null,
      physicalStoreValue: [{txt: "Yes",val:true}, {txt: "No",val:false}],
      categoryValue: ["Mobile Shop",
"Furniture",
"Grocery" ,
"Electronics",
"Fashion & Clothes",
"Computer Accessories",
"Book Shop"],
divisionList : [
  "Dhaka - ঢাকা",
  "Rangpur - রংপুর",
  "Chattogram - চট্টগ্রাম",
  "Rajshahi - রাজশাহী",
  "Khulna - খুলনা",
  "Barishal - বরিশাল",
  "Sylhet - সিলেট",
  "Mymensingh - ময়মনসিংহ"
],
districtList: [
  {id: 28, name: "Bagerhat - বাগেরহাট"},
  {id: 11, name: "Bandarban - বান্দরবন"},
  {id: 35, name: "Barguna - বরগুনা"},
  {id: 33, name: "Barisal - বরিশাল"},
  {id: 34, name: "Bhola - ভোলা"},
  {id: 14, name: "Bogura - বগুড়া "},
  {id: 3, name: "Brahmanbaria - ব্রাম্মন বাড়িয়া"},
  {id: 6, name: "Chandpur - চাদপুর"},
  {id: 18, name: "Chapainawabganj - চাপায় নব্বগন্জ"},
  {id: 8, name: "Chattogram - চট্টগ্রাম "},
  {id: 24, name: "Chuadanga - চুয়াডাঙ্গা "},
  {id: 1, name: "Comilla - কুমিল্লা "},
  {id: 9, name: "Coxsbazar - কক্সবাজার"},
  {id: 47, name: "Dhaka -  ঢাকা"},
  // {id: 71, name: "Dhaka-North - উত্তর ঢাকা"},
  // {id: 72, name: "Dhaka-South - দক্ষিন ঢাকা"},
  {id: 75, name: "Dhaka-City - ঢাকা শহর"},
  {id: 54, name: "Dinajpur - দিনাজপুর "},
  {id: 52, name: "Faridpur - ফরিদপুর "},
  {id: 2, name: "Feni - ফেনি"},
  {id: 57, name: "Gaibandha - গাইবান্ধা"},
  {id: 41, name: "Gazipur - গাজীপুর "},
  {id: 51, name: "Gopalganj - গোপালগঞ্জ "},
  {id: 38, name: "Habiganj - হবিগন্জ"},
  {id: 63, name: "Jamalpur - জামালপুর "},
  {id: 20, name: "Jashore - যশোর"},
  {id: 30, name: "Jhalakathi - ঝালুকাঠি "},
  {id: 29, name: "Jhenaidah - ঝিনাইদহ্"},
  {id: 17, name: "Joypurhat - জয়পুরহাট "},
  {id: 10, name: "Khagrachhari - খাগড়াছড়ি "},
  {id: 27, name: "Khulna - খুলনা "},
  {id: 45, name: "Kishoreganj - কিশোরগন্জ"},
  {id: 60, name: "Kurigram - কুড়িগ্রাম"},
  {id: 25, name: "Kushtia - কুষ্টিয়া "},
  {id: 7, name: "Lakshmipur - লক্ষীপুর"},
  {id: 55, name: "Lalmonirhat - লালমনিরহাট"},
  {id: 50, name: "Madaripur - মাদারীপুর "}, 
  {id:26, name: "Magura - মাগুরা "},
  {id: 46, name: "Manikganj - মানিকগঞ্জ "},
  {id: 22, name: "Meherpur - মেহেরপুর "},
  {id: 37, name: "Moulvibazar - মৌলবি বাজার"},
  {id: 48, name: "Munshiganj - মুন্সিগন্জ"},
  {id: 62, name: "Mymensingh - মেহেরপুর "},
  {id: 19, name: "Naogaon - নওগাঁ "},
  {id: 23, name: "Narail - নড়াইল "},
  {id: 43, name: "Narayanganj - নারায়ণগন্জ"},
  {id: 40, name: "Narsingdi - নরসিংদী "},
  {id: 16, name: "Natore - নাটোর"},
  {id: 64, name: "Netrokona - নেত্রকোনা "},
  {id: 56, name: "Nilphamari - নিলফামারীর "},
  {id: 5, name: "Noakhali - নোয়াখালী "},
  {id: 13, name: "Pabna - পাবনা "},
  {id: 53, name: "Panchagarh - পঞ্চগড় "},
  {id: 31, name: "Patuakhali - পটুয়াখালী "},
  {id: 32, name: "Pirojpur - পিরোজপুর "},
  {id: 49, name: "Rajabari - রাজবাড়ী "},
  {id: 15, name: "Rajshahi - রাজশাহী "},
  {id: 4, name: "Rangamati - রাঙ্গামাটি "},
  {id: 59, name: "Rangpur - রংপুর "},
  {id: 21, name: "Satkhira - সাতক্ষিরা "},
  {id: 42, name: "Shariatpur - শরিয়তপুর "},
  {id: 61, name: "Sherpur - শেরপুর "},
  {id: 12, name: "Sirajganj - সিরাজগঞ্জ "},
  {id: 39, name: "Sunamganj - সুনামগঞ্জ "},
  {id: 36, name: "Sylhet - সিলেট"},
  {id: 44, name: "Tangat - টাঙ্গাইল"},
  {id: 58, name: "Thakurgaon - ঠাকুরগাঁও"}
],
      alert: false,
      alertType: "red",
      response: "",
      rules: {
        required: value => !!value || "Required.",
        name: value => {
          var letters = /^[A-Za-z]+$/;
          var sub = /^[a-z][a-z\-]*[a-z0-9]*$/;
          return (
            sub.test(value) ||
            "Invalid subdomain name!."
          );
        },
        subAlphaCheck: value => {
          var letters = /^[A-Za-z]+$/;
          var sub = /[^a-zA-Z0-9\-]/;
          const ALPHA_NUMERIC_REGEX = /^[a-z][a-z\-]*[a-z0-9]*$/;
          const START_END_HYPHEN_REGEX = /\A[^-].*[^-]\z/i;
          const reservedNames = ['www', 'ftp', 'mail', 'pop', 'smtp', 'admin', 'ssl', 'sftp'];
          // if (reservedNames.includes(value))
        //  return (
        //    reservedNames.includes(value) ||
        //     "Invalid subdomain name!."
        //   );
          //  if (ALPHA_NUMERIC_REGEX.test(value))
          return (
            ALPHA_NUMERIC_REGEX.test(value) ||
            "Invalid subdomain name!"
          );
        },
         subSpecialCheck: value => {
          const START_END_HYPHEN_REGEX = /\A[^-].*[^-]\z/i;
          const reservedNames = ['www', 'ftp', 'mail', 'pop', 'smtp', 'admin', 'ssl', 'sftp'];
          return (
            !START_END_HYPHEN_REGEX.test(value) ||
            "Invalid subdomain name!"
          );
        },
        subReservedCheck: value => {
          const reservedNames = ['www', 'ftp', 'mail', 'pop', 'smtp', 'admin', 'ssl', 'sftp'];
          if(reservedNames.includes(value)) return "Invalid Subdomain!"
          else return true
        },
         min: v => v.length >= 5 || "Min 5 characters",
          max: v => v.length <= 63 || "Max 63 characters",
        available: value => {
          if (this.available == false) return "Subdomain not available";
          else return true;
        }
      },
      formData: {
        address: null,
        division: null,
        havePhysicalStore: true,
        storeCategory: null,
        storeInfo: null,
        storeName: null,
        subDomainName: null,
        upzila: null,
        zila: null
      }
    };
  },
  watch: {
      '$route': {
        handler: (to, from) => {
          document.title = 'Dokanee - Create Store!'
        },
         immediate: true
      }
    },
  methods: {
    validateAndContinue() {
      let v = this.$refs.form.validate();
      if (v == true) {
        switch (this.steps) {
          case 1:
            this.checkDomain();
            break;
          case 2:
            this.steps++;
            break;
          case 3:
            break;
        }

        // this.steps = 2;
      }
    },
    createStore() {
      this.created = true;
      axios
        .post(
          "https://dokanee-backend-monolithic.herokuapp.com/dashboard/store",
          JSON.stringify(this.formData),
          options
        )
        .then(response => {
          console.log(response);
          if (response.status == 201) {
            this.apiResponse = "Store created successfully!";
            this.alertType = "green";
            this.alert = true;
            this.$router.push("dashboard");
          }
          // this.user.authenticated = true
          // console.log(localStorage)
        })
        .catch(err => {
          this.created = false;
          console.log(err.response);
        });
    },
    checkDomain() {
      axios
        .get(
          `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/check?subDomain=${this.formData.subDomainName}`,
          { headers: { Authorization: this.auth } }
        )
        .then(response => {
          if (response.status === 200) {
            this.steps = 2;
          }
        })
        .catch(err => {
          if (err.response.status === 400) {
            this.alert = true;
            this.apiResponse = "Subdomain not available!";
          }
        });
    }
  }
};
</script>
<style scoped>
.signupin-bg {
  background: #ebeef0;
  /* background: -webkit-linear-gradient(-45deg,#00b0ff ,#8bc34a); */
}
.tansparent {
  background: transparent !important;
  color: white !important;
}
.subdomain-field{
  display: inline-block;
  width: 70%;
}
</style>