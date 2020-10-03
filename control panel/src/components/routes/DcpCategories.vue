<template>
         <div class='blue-grey lighten-5 container-dashboard' >
             <v-container fluid>
<v-row>
    <v-data-table
    :headers="headers"
    :items="subCategories"
    item-key="name"
    sort-by="name"
    group-by="category"
    class="elevation-1 ma-4"
    show-group-by
  >
  <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
</v-data-table>
</v-row>
            </v-container>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Categorie Names',
            align: 'start',
            value: 'name',
            groupable: false,
          },
          { text: 'Category', value: 'category', align: 'right' },
          { text: 'Actions', value: 'actions', align: 'right' },
        ],
        subCategories: [
          
        ],
      editedIndex: -1,
      editedItem: {
        name: '',
        category: 0,
        dairy: 0
      },
      defaultItem: {
         name: '',
        category: 0,
        dairy: 0
      },
      }
    },
    methods: {
        init(){
this.subCategories = [
    {
            name: 'Frozen Yogurt',
            category: 'Ice cream',
            dairy: 'Yes',
          },
          {
            name: 'Ice cream sandwich',
            category: 'Ice cream',
            dairy: 'Yes',
          },
          {
            name: 'Eclair',
            category: 'Cookie',
            dairy: 'Yes',
          },
          {
            name: 'Cupcake',
            category: 'Pastry',
            dairy: 'Yes',
          },
          {
            name: 'Gingerbread',
            category: 'Cookie',
            dairy: 'No',
          },
          {
            name: 'Jelly bean',
            category: 'Candy',
            dairy: 'No',
          },
          {
            name: 'Lollipop',
            category: 'Candy',
            dairy: 'No',
          },
          {
            name: 'Honeycomb',
            category: 'Toffee',
            dairy: 'No',
          },
          {
            name: 'Donut',
            category: 'Pastry',
            dairy: 'Yes',
          },
          {
            name: 'KitKat',
            category: 'Candy',
            dairy: 'Yes',
          },
]
        },
        editItem (item) {
        this.editedIndex = this.subCategories.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.subCategories.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },
    },
    created() {
    this.init();
    }
  }
</script>
<style scoped>

</style>
