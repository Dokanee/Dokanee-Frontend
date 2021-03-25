<template>
  <v-sheet elevation="1">
    <v-tabs
      background-color="teal"
      fixed-tabs
      dark
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab to="/settings/general-settings">
        <v-icon size="25">mdi-account</v-icon>
        <v-tab-subtitle>General Setings</v-tab-subtitle>
      </v-tab>

      <v-tab to="/settings/store-info">
        <v-icon>mdi-account-edit</v-icon>
        <v-list-item-subtitle>Store Info</v-list-item-subtitle>
      </v-tab>
    </v-tabs>
    <v-card flat>
      <v-card-text>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-card-text>
    </v-card>
    <!-- <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>-->
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      tabsHeader: ["General Settings", "Store Info"]
    };
  }
};
</script>