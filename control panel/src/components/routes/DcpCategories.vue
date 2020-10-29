<template>
  <div class>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="96%">
          <v-toolbar color="teal" dark>
            <v-toolbar-title>Categories</v-toolbar-title>
             
            <v-spacer></v-spacer>
             <v-btn color="white black--text" depressed> <v-icon color="white--text">mdi-plus</v-icon>Add Category</v-btn>
          </v-toolbar>

          <v-list>
            <v-list-group
              v-for="item in categoryData"
              :key="item.categoryName"
              v-model="item.active"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.categoryName"></v-list-item-title>
                </v-list-item-content>
              </template>
                     <v-list-item color="purple--text" active>
                       <v-list-item-icon>
          <v-icon color="purple">
            mdi-plus
          </v-icon>
        </v-list-item-icon>
         <v-list-item-content>
                        
                  <v-list-item-title >Add another</v-list-item-title>
                </v-list-item-content>
                     </v-list-item>
                     
              <v-list-item v-for="sub in item.subCategoryModels" :key="sub.subCategoryName">
                <v-list-item-content>
                  <v-list-item-title v-text="sub.subCategoryName"></v-list-item-title>
                </v-list-item-content>
                 <v-list-item-action   class="d-inline">
          <v-btn icon 
          class="d-inline">
            <v-icon color="#03A9F4">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon
           class="d-inline">
             <v-icon color="red lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryData: [],
      items: [
        {
          action: "mdi-ticket",
          items: [{ title: "List Item" }],
          title: "Attractions",
        },
        {
          action: "mdi-silverware-fork-knife",
          active: true,
          items: [
            { title: "Breakfast & brunch" },
            { title: "New American" },
            { title: "Sushi" },
          ],
          title: "Dining",
        },
        {
          action: "mdi-school",
          items: [{ title: "List Item" }],
          title: "Education",
        },
        {
          action: "mdi-run",
          items: [{ title: "List Item" }],
          title: "Family",
        },
        {
          action: "mdi-bottle-tonic-plus",
          items: [{ title: "List Item" }],
          title: "Health",
        },
        {
          action: "mdi-content-cut",
          items: [{ title: "List Item" }],
          title: "Office",
        },
        {
          action: "mdi-tag",
          items: [{ title: "List Item" }],
          title: "Promotions",
        },
      ],
    };
  },
  watch: {
    "$store.state.fullCategoryResponse": function () {
      this.categoryData = this.$store.state.fullCategoryResponse;
    },
  },
  methods: {
    initData() {
      let state = this.$store.state;
      this.categoryData = state.fullCategoryResponse;
    },
  },
  mounted() {
    this.initData();
  },
};
</script>