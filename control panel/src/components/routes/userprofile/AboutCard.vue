<template>
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
</template>>

<script>
  export default {
    data: () => ({
      userinfo:
          {
            "about": "This is about an user info. this is very importent. but here it a dummy text. we are working on it.",
            "phone": "01734543027",
            "address": "23/A Velanagar, Narsingdi, Dhaka, Bangladesh",
            "dob": "31 May 1999",
            "firstName": "Abdullah Al",
            "lastName": "Habib",
            "email": "aalhabib001@gmail.com"
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
      ],
    }),

    methods: {
      getImage () {
        const min = 550
        const max = 560

        return Math.floor(Math.random() * (max - min + 1)) + min
      },
    },
  }
</script>

<style>

</style>