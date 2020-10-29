<template>
  <div class="block">
    <v-card-content>
      <fieldset>
        <legend>Change Password</legend>
        <v-text-field type="password" required label="Old Password"></v-text-field>
        <v-text-field type="password" required label="New Password"></v-text-field>
        <v-text-field type="password" required label="Verify Password"></v-text-field>
      </fieldset>
      <v-row>
        <v-col class="pb-0 pt-5">
          <v-btn class="float-right" color="matgreen white--text" @click="submit">Save Changes</v-btn>
        </v-col>
      </v-row>
    </v-card-content>
  </div>
</template>>

<script>
export default {
  data() {
    return {
      auth: "Bearer " + localStorage.getItem("access_token"),
    };
  },
};
</script>

<style scoped>
fieldset {
  padding: 15px;
}
</style>