<template>
    <div class="block">

        <v-card-content>
            <v-row>
                <v-col>
                 <b>Logo:</b>   
                </v-col>
            </v-row>
            <v-row>
                
                <v-col>
<v-file-input
                                                 accept="image/*"
                                                 v-model="profilePic"
                                                    filled
                                                    prepend-icon="mdi-camera"
                                                ></v-file-input>
                </v-col>
 
            </v-row>
            <v-row>
                <v-col class="pb-0 pt-5">
          <v-btn class="float-right" color="teal white--text" @click="updateLogo" depressed>Update</v-btn>
</v-col>
            </v-row>
              <!-- 
            <v-row>
                <v-col>
                <v-text-field :value="info.storeName" label="Store Name"></v-text-field>
                </v-col>
                <v-col>
                <v-text-field :value="info.subDomainName" label="Subdomain Name"></v-text-field>
                </v-col>
            </v-row>
          <v-row>
                <v-col>
                    <v-text-field :value="info.storeInfo" label="Store Info"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                <v-text-field type="date" :value="info.dob" label="Date of birth"></v-text-field>
                </v-col>
                <v-col>
                <v-text-field type="tel" :value="info.phone" label="Phone"></v-text-field>
                </v-col>
            </v-row>
            <v-text-field type="email" :value="info.email" label="Email"></v-text-field>
            <v-text-field :value="info.nid" label="NID"></v-text-field>
            <v-text-field :value="info.address" label="Address"></v-text-field>
            <p>You have to enter your password to update info.</p>
            <v-text-field type="password" required label="Password"></v-text-field>
            <v-row>
                <v-col class="pb-0 pt-5">
                    <v-btn class="float-right" color="matgreen white--text" @click="submit">Update</v-btn>
                </v-col>
            </v-row> -->
        </v-card-content>
    </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      auth: 'Bearer ' + localStorage.getItem('access_token'),
        info:  {
        },
        profilePic: ""
    }
  },
  methods: {
      updateLogo(){
          let form = new FormData();
          form.append('image',this.profilePic);

  axios({
    method: 'post',
    url: `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/image/`,
    data: form,
    headers: { Authorization: this.auth }
    })
    .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
      },
        userinfoAPI () {
         let d = this.$store.state.userinfo;
        //  console.log("op")
        //  console.log(d)
        this.info = {
  address: "",
  division: "",
  facebookLink: "",
  googleMapLink: "",
  havePhysicalStore: true,
  storeCategory: "",
  storeInfo: "",
  storeName: "",
  subDomainName: "",
  upzila: "",
  youtubeLink: "",
  zila: ""
        }
  
      }
  },
  mounted(){
      this.userinfoAPI();
  }
}
</script>

<style scoped>

</style>