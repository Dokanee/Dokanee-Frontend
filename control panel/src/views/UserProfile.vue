<template>
<div id="app" >
    <v-app >
       <dcp-nav-drawer></dcp-nav-drawer>
        <v-main>
            <v-container class="pa-0 fill-height blue-grey lighten-5"  fluid>
                <v-row class="fill-height">
                    <v-col style="margin:2%">
                        <template>
                            <v-card class="mx-auto" max-width="1500" flat>
                                <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
                                <v-row style="margin-left:2.5%;margin-top:-40px;position:related; top: 50px">

                                            <v-list-item>
                                            <v-list-item-avatar size="100">
                                                <img
                                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                                    alt="Profile"
                                                >
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                <v-list-item-title class="title" style="margin-top:20px;">{{ userinfo.firstName }} {{ userinfo.lastName }}</v-list-item-title>
                                                <v-list-item-subtitle>{{ userinfo.role}}</v-list-item-subtitle>
                                                </v-list-item-content>

                                                <v-list-item-action>
                                                <v-btn
                                                    style="margin-top:40px; margin-right:40px;background-color: #2196F3; color: white"
                                                    :class="fav ? 'white--text' : ''"
                                                    icon-text
                                                    @click="fav = !fav"
                                                >
                                                    <v-icon> mdi-plus-circle-outline</v-icon>
                                                    <v-text>Follow</v-text>
                                                </v-btn>
                                                </v-list-item-action>
                                            </v-list-item>
                                </v-row>
                            </v-card>
                            <v-row>
                                <v-col class="col-3">
                                    <v-card flat>
                                    <div class="block">
                                        <v-card-content>
                                            <v-card-text style=" text-transform: uppercase;" >About</v-card-text>
                                            <v-divider></v-divider>
                                            <v-card-subtitle>
                                                {{ userinfo.about }}
                                            </v-card-subtitle>
                                            <v-card-subtitle>
                                                <b>Date of Birth:</b> {{ userinfo.dob }}
                                                <b>Address:</b> <br> {{ userinfo.address }}
                                                <br>
                                                <b>Email:</b> <br> {{ userinfo.email }}
                                                <br>
                                                <b>Phone:</b> <br> {{ userinfo.phone }}
                                            </v-card-subtitle>
                                        </v-card-content>
                                        <v-card-actions class="justify-center">
                                        <v-btn
                                            v-for="(social, i) in socials"
                                            :key="i"
                                            :color="social.color"
                                            class="white--text"
                                            fab
                                            icon
                                            small
                                        >
                                            <v-icon>{{ social.icon }}</v-icon>
                                        </v-btn>
                                        </v-card-actions>
                                    </div>
                                </v-card>
                                </v-col>
                                <v-col>
                                  
                                    <v-card
                                    :elevation="0">
                                        
                                        <v-tabs
                                        v-model="tab"
                                        background-color="matgreen accent-4"
                                        centered
                                        dark
                                        icon-text
                                        >
                                        <v-tabs-slider></v-tabs-slider>

                                        <v-tab to="./profile">
                                            <v-icon size="25">mdi-account</v-icon>
                                            <v-tab-subtitle> Timeline</v-tab-subtitle>
                                        </v-tab>

                                        <v-tab to="./edit-profile">
                                            <v-icon>mdi-account-edit</v-icon>
                                            <v-list-item-subtitle> Edit Profile</v-list-item-subtitle>
                                        </v-tab>

                                        <v-tab to="./settings">
                                            <v-icon>mdi-account-settings</v-icon>
                                            <v-list-item-subtitle> Settings</v-list-item-subtitle>
                                        </v-tab>
                                        </v-tabs>
                                            <v-card flat>
                                            <v-card-text>
                                                <transition name="fade">
                                                    <router-view></router-view>
                                                </transition>
                                            </v-card-text>
                                            </v-card>
                                    </v-card>
                                    
                                </v-col>
                                <v-col class="col-3">
                                        <v-card flat>
                                            <div class="block">
                                                <v-card-content>
                                                    <v-card-text style=" text-transform: uppercase;" >My Stores</v-card-text>
                                                    <v-divider></v-divider>
                                                    <v-card-subtitle>
                                                        This part is under construction.
                                                    </v-card-subtitle>
                                                </v-card-content>
                                            </div>
                                        </v-card>
                                        <v-devider></v-devider>
                                        <v-card style="margin-top:10px" flat>
                                            <div class="block">
                                                <v-card-content>
                                                    <v-card-text style=" text-transform: uppercase;" >Followers</v-card-text>
                                                    <v-divider></v-divider>
                                                    <v-card-subtitle>
                                                        This part is under construction.
                                                    </v-card-subtitle>
                                                </v-card-content>
                                            </div>
                                        </v-card>
                                </v-col>
                            </v-row>
                        </template>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer class="py-3">
            <span class="ml-auto overline">Dokanee &copy;2020</span>
        </v-footer>
    </v-app>
</div>
</template>
<script>
import axios from 'axios'
import DcpNavDrawer from '@/components/DcpNavDrawer.vue'
export default {
    data() {
        return {
        auth: 'Bearer ' + localStorage.getItem('access_token'),
        userinfo:  {
            address: "",
dob: "",
email: "",
firstName: "",
lastName: "",
nid: "",
phone: "",
photoLink: null,
storeIds: [],
userName: ""
        },
        socials: [
        {
          icon: 'mdi-facebook',
          color: 'indigo',
        },
        {
          icon: 'mdi-linkedin',
          color: 'cyan darken-1',
        },
        {
          icon: 'mdi-instagram',
          color: 'red lighten-3',
        },
      ]
    }
    },
    methods: {
      getImage () {
        const min = 550
        const max = 560

        return Math.floor(Math.random() * (max - min + 1)) + min
      },
      userinfoAPI () {
          var self = this
          axios.get('https://dokanee-backend-monolithic.herokuapp.com/profile/', { headers: { 'Authorization': this.auth }})
          .then( response => {
        console.log(response)
        let d = response.data.body;
        this.userinfo = {
address: d.address,
dob: d.dob,
email: d.email,
firstName: d.firstName,
lastName: d.lastName,
nid: d.nid,
phone: d.phone,
photoLink: d.photoLink,
storeIds: d.storeIds,
userName: d.userName
        }
    })
      }
    },
    components: {
   'dcp-nav-drawer' : DcpNavDrawer
  },
  mounted(){
    this.userinfoAPI()
    var token = localStorage.getItem('access_token');
    if(token == "") 
              this.$router.push("/auth/signin");

  }
}
</script>