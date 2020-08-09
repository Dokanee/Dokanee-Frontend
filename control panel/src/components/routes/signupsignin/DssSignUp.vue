<template>
  <v-container class="full-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card color="white" class="rounded-lg ma-auto" width="550" max-height="1000">
          <v-toolbar flat class="pa-0">
            <v-toolbar-title>
              <b>Registration From</b>
            </v-toolbar-title>
          </v-toolbar>
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
              <v-text-field dense
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                outlined
                class="ml-4 mr-4 mt-0 mb-0"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-col>
                <VuePhoneNumberInput dark-color="#9e9e9e" default-country-code="BD" required v-model="yourValue" />
              </v-col>
            </v-row>

            <v-row>
              <v-col class="pb-0 pt-0">
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
                  <v-text-field dense
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
                <v-text-field dense outlined v-model="last" label="NID Number" type="number"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pb-0 pt-0">
                <v-text-field dense outlined v-model="last" label="Address"></v-text-field>
              </v-col>
            </v-row>
            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>
   <v-row>     <v-col class="pb-0 pt-0">
        <v-btn class="float-right" color="matgreen white--text">Register</v-btn>
     </v-col>
   </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
  data() {
    return {
      yourValue: 0,
      menu1: false,
      date: new Date().toISOString().substr(0, 10),
    };
  },
  components: {
    VuePhoneNumberInput,
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
.input-tel__input {
}
</style>