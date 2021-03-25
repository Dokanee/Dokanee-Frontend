<template>
    <div class="block">
        <v-card-content>
            <v-row>
                <v-col>
                <v-text-field :value="info.firstName" label="First Name"></v-text-field>
                </v-col>
                <v-col>
                <v-text-field :value="info.lastName" label="Last Name"></v-text-field>
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
            </v-row>
        </v-card-content>
    </div>
</template>>

<script>

export default {
  data() {
    return {
      auth: 'Bearer ' + localStorage.getItem('access_token'),
        info:  {
            address: "Dhaka, Bangladesh",
            dob: "12 Dec 1999",
            email: "ihsonnet@gmail.com",
            firstName: "Injamamul Haque",
            lastName: "Sonet",
            nid: "1234567899",
            phone: "01734543027",
            photoLink: null,
            storeIds: [],
            userName: "ihsonnet"
        },
    }
  },
  methods: {
        userinfoAPI () {
         let d = this.$store.state.userinfo;
        //  console.log("op")
        //  console.log(d)
        this.info = {
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
  
      }
  },
  mounted(){
      this.userinfoAPI();
  }
}
</script>

<style scoped>

</style>