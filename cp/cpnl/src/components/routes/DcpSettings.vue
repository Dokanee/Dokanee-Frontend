<template>
             <v-container fluid>
                 <transition name="fade">
                <v-row class="mb-12">
                    <!-- <v-col :md="8">
                        <v-row class="ma-1">
                            <v-card flat width="1000px" class="pa-5">
                            <div class="block">
                            <v-card-title>
                                    Edit Store Info
                            </v-card-title>
                            <v-card-content>

                                <v-row>
                                    <v-col>
                                    <v-text-field type="text" :value="info.storeName" label="Store Name"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                    <v-text-field type="text" :value="info.storeDes" label="Description"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                    <v-text-field type="text" :value="info.storeCat" label="Category"></v-text-field>
                                    </v-col>
                                </v-row>
                                <label for="street">Store Address</label>
                                    <v-row>
                                        <v-col>
                                            <v-text-field id="street" :value="info.address.street" label="Street"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field :value="info.address.dist" label="District"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field :value="info.address.div" label="Division"></v-text-field>
                                        </v-col>
                                    </v-row>
                                <p>You have to enter your password to update info.</p>
                                <v-text-field type="password" required label="Password"></v-text-field>
                                <v-row>
                                    <v-col class="pb-0 pt-5">
                                        <v-btn class="float-right" color="matgreen white--text" @click="submit">Update</v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-content>
                            </div>
                        </v-card>
                        </v-row>
                    </v-col>
                    <v-col :md="4">
                        <v-row class="ma-1">
                            <v-card flat style="width:500px">
                            <div class="block">
                            <v-card-title>
                                    Profile
                            </v-card-title>
                            <v-card-content>
                                <div  class="pa-5" align="center">
                                        <v-avatar size="80">
                                        <img
                                            src="https://www.w3schools.com/howto/img_avatar.png"
                                            alt="John"
                                        >
                                        </v-avatar> <br> <br>

                                        <v-col-content>
                                            <b>Injamamul Haque Sonet</b> <br>
                                            Store Owner <br>
                                        </v-col-content> <br>
                                        <button>
                                            Edit Profile
                                        </button>
                                        <button>
                                            Profile Settings
                                        </button>
                                </div>
                            </v-card-content>
                            </div>
                        </v-card>
                        </v-row>
                        <v-row class="ma-1">
                            <v-card flat style="margin-top:20px;width:500px">  
                            <v-card-title>
                                    Domain
                            </v-card-title>
                            <v-card-content>
                               
                            </v-card-content>
                        </v-card>
                        </v-row>
                    </v-col> -->
                    <v-col>
                        <v-card flat width="1000px" class="pa-5">
 <tabs></tabs>
                        </v-card>
                    </v-col>
 
                </v-row>
            </transition>
            </v-container>
</template>
<script>
import Tabs from "@/components/elements/Tabs";
export default {
    components: {
Tabs
        },
data () {
        
    return {
        auth: 'Bearer ' + localStorage.getItem('access_token'),
        selected: '',
        info:  {
            address: { 
                street: "street 33/A",
                dist: "Narsingdi",
                div: "Dhaka"
            },
            
            storeName: "AB Furniture",
            storeDes: "Dummy store information.....What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            cat: null,
            storeId: "",
            storeCat: '',
            categories: ['Dog', 'Cat', 'Rabbit', 'Turtle', 'Snake'],
        },
    }
},

}
</script>
<style scoped>
button {
    display: inline-block;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
    color: white;
    background-color: teal;
    font-size: small;
    justify-content: center;
    margin: 5px;
}
</style>
