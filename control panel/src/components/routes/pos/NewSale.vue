<template>
         <div class='blue-grey lighten-5 container-dashboard ma-1'>
             <v-container fluid>
                 <transition name="fade">
                <v-row class="mb-12">
                    <v-col :md="8">
                        <v-row class="ma-1">
                            <v-card flat width="1000px" class="mx-auto">
                                <v-data-iterator
                                    :items="items"
                                    :items-per-page.sync="itemsPerPage"
                                    :page="page"
                                    :search="search"
                                    :sort-by="sortBy.toLowerCase()"
                                    :sort-desc="sortDesc"
                                    hide-default-footer
                                    >
                                    <template v-slot:header>
                                        <v-toolbar
                                        dark
                                        color="matgreen"
                                        class="mb-1"
                                        >
                                        <v-title class="font-weight-bold">Point Of Sales</v-title>
                                        <v-spacer></v-spacer>
                                        <v-text-field
                                            v-model="search"
                                            clearable
                                            flat
                                            solo-inverted
                                            hide-details
                                            prepend-inner-icon="mdi-magnify"
                                            label="Search"
                                        ></v-text-field>
                                        </v-toolbar>
                                    </template>                                
                                    <template v-slot:default="props">
                                        <v-content class="pa-5">
                                        <v-row>
                                        <v-col
                                            v-for="item in props.items"
                                            :key="item.name"
                                            cols="12"
                                            sm="6"
                                            md="6"
                                            lg="4"
                                        >
                                            
                                            <v-card>
                                                <v-img
                                                lazy-src="https://picsum.photos/id/11/10/6"
                                                aspect-ratio="1"
                                                src="https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg"
                                                ></v-img>
                                            <v-card-title class="subheading font-weight-normal">
                                                {{ item.name }}
                                            </v-card-title>

                                            <v-divider></v-divider>

                                                <v-list-item-content class="pa-5" style="display:block">
                                                    Price: {{ item.name }} <br>
                                                    Stock: {{ item.name }}
                                                </v-list-item-content>
                                            </v-card>
                                        </v-col>
                                        </v-row>
                                        </v-content>
                                    </template>

                                    <template v-slot:footer>
                                        <v-content class="pa-5">
                                        <v-row
                                        class="mt-2"
                                        align="center"
                                        justify="center"
                                        >
                                        <span class="grey--text">Items per page</span>
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                dark
                                                text
                                                color="primary"
                                                class="ml-2"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                {{ itemsPerPage }}
                                                <v-icon>mdi-chevron-down</v-icon>
                                            </v-btn>
                                            </template>
                                            <v-list>
                                            <v-list-item
                                                v-for="(number, index) in itemsPerPageArray"
                                                :key="index"
                                                @click="updateItemsPerPage(number)"
                                            >
                                                <v-list-item-title>{{ number }}</v-list-item-title>
                                            </v-list-item>
                                            </v-list>
                                        </v-menu>

                                        <v-spacer></v-spacer>

                                        <span
                                            class="mr-4
                                            grey--text"
                                        >
                                            Page {{ page }} of {{ numberOfPages }}
                                        </span>
                                        <v-btn
                                            fab
                                            dark
                                            color="blue darken-3"
                                            class="mr-1"
                                            @click="formerPage"
                                        >
                                            <v-icon>mdi-chevron-left</v-icon>
                                        </v-btn>
                                        <v-btn
                                            fab
                                            dark
                                            color="blue darken-3"
                                            class="ml-1"
                                            @click="nextPage"
                                        >
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-btn>
                                        </v-row>
                                        </v-content>
                                    </template>
                            </v-data-iterator>
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
                                        
                                </div>
                            </v-card-content>
                            </div>
                        </v-card>
                        </v-row>
                        <v-row class="ma-1">
                           <v-btn>
                               Sell It
                           </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </transition>
            </v-container>
    </div>
</template>
<script>
export default {
data () {
        
    return {
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'name',
        keys: [
          'Name',
          'Calories',
          'Fat',
          'Carbs',
          'Protein',
          'Sodium',
          'Calcium',
          'Iron',
        ],
        items: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%',
          },
        ],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
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
