<template>
  <div class="blue-grey lighten-5 container-dashboard">
    <v-container fluid>
      <!-- <transition name="fade"> -->
        <v-card class="pa-4">
<v-row>
          <v-col>
            <div>
              <b>Primary Color:</b>
            </div>
            <v-card
              width="80"
              height="60"
              @click.stop="primaryColorOn =! primaryColorOn"
              :color="form.primaryColor"
              class="ma-4"
            ></v-card>
          </v-col>

          <v-col>
            <div>
              <b>Secondary Color:</b>
            </div>
            <v-card
              width="80"
              height="60"
              @click.stop="secondaryColorOn =! secondaryColorOn"
              :color="form.secondaryColor"
              class="ma-4"
            ></v-card>
          </v-col>
        </v-row>
        <v-row>
           <v-col class="pb-0 pt-5">
          <v-btn class="float-right" color="teal white--text" @click="updateTemplateInfo" depressed>Update</v-btn>
           </v-col>
        </v-row>
        <!-- <v-row class="mt-6">
          <v-col>
            <div>
              <v-col width="200" class="emty">
                <v-file-input
                  style="position:relative;top:95px;left:57px"
                  accept="image/*"
                  v-model="slider1"
                  filled
                  prepend-icon="mdi-camera"
                  class="img-inputs"
                  hide-input
                  @change="test($event)"
                ></v-file-input>
              </v-col>
              <img :src="sliders" width="350" height="120" />
            </div>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col>
           <b>
             Slider Images:
             </b> 
             <v-col v-show="!haveSliders">
                <v-file-input
                    accept="image/*"
                    filled
                    chips
                    v-model="sliders"
                    multiple
                    prepend-icon="mdi-camera"
                  ></v-file-input>
             </v-col>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
       <v-row v-show="!haveSliders">
           <v-col class="pb-0 pt-5">
          <v-btn class="float-right" @click="uploadSliders" color="teal white--text" depressed>Upload</v-btn>
           </v-col>
        </v-row>
        <v-row v-if="haveSliders">
  <v-col
          v-for="(img,i) in sliderImages"
          :key="i"
          cols="12"
          lg="6"
          md="12"
          sm="12"
          xs="12"
        >
        <v-card elevation="1">
   <v-img
        
                        :src="img"
                        width="600"
                        max-height="220"
                      ></v-img>
        </v-card>
  </v-col>
        </v-row>

    <!--  -->
    <v-dialog v-model="primaryColorOn" max-width="300px">
      <v-card>
        <v-card-title style="background-color:#EBEEF0">
          <span class="headline">Primary Color</span>
        </v-card-title>
        <v-color-picker dot-size="6" hide-mode-switch mode="rgba" v-model="form.primaryColor"></v-color-picker>
        <v-card-actions>
          <v-btn depressed color="blue darken--3 white--text" @click="primaryColorOn = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--  -->
    <v-dialog v-model="secondaryColorOn" max-width="300px">
      <v-card>
        <v-card-title style="background-color:#EBEEF0">
          <span class="headline">Secondary Color</span>
        </v-card-title>
        <v-color-picker dot-size="6" hide-mode-switch mode="rgba" v-model="form.secondaryColor"></v-color-picker>
        <v-card-actions>
          <v-btn depressed color="blue darken--3 white--text" @click="secondaryColorOn = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-card>
        

    <!--  -->
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      auth: "Bearer " + localStorage.getItem("access_token"),
      primaryColorOn: false,
      slider1: null,
      sliders: [],
      secondaryColorOn: false,
      haveSliders: false,
      form: {
        primaryColor: "fffff",
        secondaryColor: "ffffff",
      },
      sliderImages: [],
    };
  },
  methods: {
    updateTemplateInfo(){
   axios({
        method: "put",
        url: `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/template`,
        data: this.form,
        headers: {
          Authorization: this.auth,
        }
      })
        .then(function(response) {
          //handle success
          console.log(response);
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    },
    uploadSliders() {
      let form = new FormData();
      console.log(this.sliders)
      for (let i = 0; i < this.sliders.length; i++) {
        form.append("image", this.sliders[i]);
      }
      axios({
        method: "post",
        url: `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/template/slider/`,
        data: form,
        headers: {
          Authorization: this.auth,
          "Content-Type": "multipart/form-data"
        }
      })
        .then(function(response) {
          //handle success
          console.log(response);
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    },
    test(e) {
      console.log(this.slider1);
      this.sliders = URL.createObjectURL(this.slider1);
      // URL.revokeObjectURL(file);
    },
    loadTemplateInfo() {
      axios
        .get(
          `https://dokanee-backend-monolithic.herokuapp.com/dashboard/store/${this.$store.state.currentSelectedStore}/template`,
          { headers: { Authorization: this.auth } }
        )
        .then(r => {
          console.log(r);
          if (r.status == 200) {
            let data = r.data.data;
            console.log(data);
            //updating the local form data
            this.form = {
              primaryColor: data.primaryColor || "ffffff",
              secondaryColor: data.secondaryColor || "000000",
              templateId: data.templateId
            };
            if(data.sliderImages.length != 0){
this.haveSliders = true;
this.sliderImages = data.sliderImages
            } 
            else{

            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  watch: {
    "$store.state.storeinfoloaded": function() {
      this.loadTemplateInfo();
    }
  }
};
</script>

<style scoped>
.img-inputs {
  width: 200;
  height: 120;
}
.emty  .v-icon.v-icon.v-icon--link {
    color: red !important;
}
</style>