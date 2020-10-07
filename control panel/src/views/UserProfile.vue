<template>
<div id="app" >
    <v-app >
       <dcp-nav-drawer></dcp-nav-drawer>
        <v-main>
            <v-container class="pa-0 fill-height blue-grey lighten-5"  fluid>
                <v-row class="fill-height">
                    <v-col style="margin:3%">
                        <template>
                            <v-card class="mx-auto" max-width="1500" flat>
                                <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
                                <v-row style="margin-left:2.5%;margin-top:-40px;position:related; top: 50px">

                                            <v-list-item>
                                            <v-list-item-avatar size="100">
                                                <img
                                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                                    alt="John"
                                                >
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                <v-list-item-title class="title" style="margin-top:20px;">Abdullah Al Habib</v-list-item-title>
                                                <v-list-item-subtitle>Software Engineer | Dokanee</v-list-item-subtitle>
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
                                        <b>About</b>
                                    </v-card>
                                </v-col>
                                <v-col>
                                  
                                    <v-card>
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
                                            <v-list-item-subtitle> Timeline</v-list-item-subtitle>
                                        </v-tab>

                                        <v-tab to="./edit-profile">
                                            <v-icon>mdi-account-edit</v-icon>
                                            <v-list-item-subtitle> Edit Profile</v-list-item-subtitle>
                                        </v-tab>

                                        <v-tab to="./settings">
                                            <v-icon>mdi-account-settings</v-icon>
                                            <v-list-item-subtitle> Account Settings</v-list-item-subtitle>
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
                                            <b>My Stores</b>
                                        </v-card>
                                        <v-devider></v-devider>
                                        <v-card flat>
                                            <b>Followers</b>
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
import DcpNavDrawer from '@/components/DcpNavDrawer.vue'

export default {
    components: {
   'dcp-nav-drawer' : DcpNavDrawer
  }
}
</script>