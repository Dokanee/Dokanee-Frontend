<template>
  <v-container class="full-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="12" md="8">
        <v-card
          color="white"
          class="rounded-lg ma-auto"
          width="780"
          max-height="1000"
          style="padding:2.5%; !important"
        >
          <v-toolbar flat class="pa-0">
            <v-toolbar-title>
              <v-img
                max-width="200"
                min-width="170"
                aspect-ratio=".5"
                height="100"
                src="@/assets/logo.png"
              ></v-img>
            </v-toolbar-title>
          </v-toolbar>
          <br />
          <v-row>
            <v-col class="pb-0 pt-0 ml-4 dk-grey--text" cols="12" sm="7">
              <b>Create your Dokanee Account</b>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="7" md="7">
              <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
                <v-row>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field dense v-model="first" label="First Name" outlined></v-text-field>
                  </v-col>

                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field dense v-model="last" label="Last Name" outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0">
                    <v-text-field
                      dense
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- <v-row>
              <v-col>
                <VuePhoneNumberInput dark-color="#9e9e9e" default-country-code="BD" required v-model="yourValue" />
              </v-col>
                </v-row>-->

                <v-row>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field
                      v-model="password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      outlined
                      dense
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </v-col>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field
                      v-model="password2"
                      :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="showPassword2 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Confirm"
                      hint="At least 8 characters"
                      counter
                      outlined
                      dense
                      @click:append="showPassword2 = !showPassword2"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field
                      dense
                      v-model="number"
                      :rules="emailRules"
                      label="Phone Number"
                      required
                      type="number"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          dense
                          v-model="dateFormatted"
                          label="Date"
                          persistent-hint
                          outlined
                          required
                          v-bind="attrs"
                          @blur="date = parseDate(dateFormatted)"
                          v-on="on"
                          class="pb-0 pt-0"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0">
                    <v-text-field dense outlined v-model="last" label="Address"></v-text-field>
                  </v-col>
                </v-row>

                <!-- <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
                ></v-checkbox>-->
                <v-row>
                  <a style="color:#2196F3;text-decoration: none;" href="/tmp/signin">Sign In Instead</a>
                  <v-col class="pb-0 pt-0">
                    <v-btn class="float-right" color="matgreen white--text">Register</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
            <v-col cols="12" lg="5" md="5">
              <br />
              <br />
              <v-img class="d-none d-sm-flex" width="95%" src="@/assets/shopping.svg"></v-img>
              <div class="d-none d-sm-flex dk-grey--text text-center justify-center ma-auto">
                Your store in Online
                <br />Start From Now
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      yourValue: 0,
      showPassword: false,
      showPassword2: false,
      password: "",
      password2: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
      },
      date: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>
<style scoped>
</style>