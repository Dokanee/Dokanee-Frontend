<template>
        
             <v-container class="blue-grey lighten-5 fill-height" fluid>
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
                                        <v-main class="pa-5">
                                        <v-row>
                                        <v-col
                                            v-for="item in props.items"
                                            :key="item.productName"
                                            cols="12"
                                            sm="4"
                                            md="4"
                                            lg="3"
                                        >
                                            <v-hover
                                              v-slot="{ hover }"
                                            >
                                            <v-card @click="addToCart(item.imageLink,item.productName,item.sellPrice)" class="item-selection" :elevation="hover ? 5 : 0" style="text-align:center; cursor:pointer" flat>
                                                <v-img
                                                lazy-src="https://picsum.photos/id/11/10/6"
                                                aspect-ratio="1"
                                                style="height:100px"
                                                :src="item.imageLink"
                                                ></v-img>
                                            <v-card-title class="subheading font-weight-normal pa-3" style="font-size:16px; display:block;text-align:center; height:80px; box-sizing:border-box; overflow:hidden">
                                                {{ item.productName }}
                                            </v-card-title>

                                            <v-divider></v-divider>
                                            <v-card-content>
                                                <v-list-item-content class="pa-3" style="display:block;font-size:12px">
                                                    <v-chip
                                                      :color="getColor(item.inStock)"
                                                      style="font-size:12px"
                                                      dark
                                                    >
                                                      {{getStockAns( item.inStock) }}
                                                    </v-chip>
                                                    <v-chip
                                                    color="matblue"
                                                    style="color:white">
                                                      &#2547; {{ item.sellPrice }}
                                                    </v-chip>
                                                </v-list-item-content>
                                                </v-card-content>
                                            </v-card>
                                          </v-hover>
                                        </v-col>
                                        </v-row>
                                        </v-main>
                                    </template>

                                    <template v-slot:footer>
                                        <v-main class="pa-5">
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
                                        </v-main>
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
                                    Product Cart
                            </v-card-title>
                            <hr>
                            <v-container>
                            
                            <v-row  cols="12" class="trow" v-for="i in selingCart" :key="i.name">
                                  <v-card class="cart-item mt-3 pa-2" width="400px">
                                  <v-row no-gutters>
                                  <v-col
                                  sm="3"
                                  md="3">
                                    <v-img
                                    lazy-src="https://picsum.photos/id/11/10/6"
                                    aspect-ratio="1"
                                    style=""
                                    class="button-full mr-5"
                                    :src="i.ilink"
                                    ></v-img>
                                  </v-col>
                                  <v-col
                                  sm="9"
                                  md="9">
                                      <v-row>
                                        {{ i.name }}
                                      </v-row>
                                      <v-row>
                                        <v-col>
                                            <input type="number" class="quantity" v-model="i.quantity">
                                        </v-col>
                                        <v-col>
                                          <v-chip color="matblue" style="color:white"> &#2547; {{ i.quantity * i.price }}</v-chip>
                                        </v-col>
                                      </v-row>
                                  </v-col>
                                  </v-row>
                                  <v-chip @click="deleteFromCart(i)" class="close">x</v-chip>
                                  </v-card>
                                </v-row>

                                <v-row>
                                  <v-row no-gutters class="mt-3 pa-2" width="400px">
                                  <v-col
                                  sm="3"
                                  md="3">
                                    
                                  </v-col>
                                  <v-col
                                  sm="9"
                                  md="9">
                                      <v-row>
                                        <v-col>
                                            <b>Total:</b>
                                        </v-col>
                                        <v-col>
                                            <b>&#2547; {{ total }}</b>
                                        </v-col>
                                      </v-row>
                                  </v-col>
                                  </v-row>
                                </v-row>
                            <br>
                            <v-btn block color="matgreen" class="button-full">
                              Complete Payment
                            </v-btn>
                            </v-container>
                            </div>
                        </v-card>
                        </v-row>
                    </v-col>
                </v-row>
            </transition>
            </v-container>
</template>
<script>
export default {
data () {
        
    return {
        productQuantity: "1",
        itemsPerPageArray: [4, 8, 12, 50],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 8,
        sortBy: 'name',
        keys: [
          'imageLink',
          'productName',
          'sellPrice',
          'inStock',
        ],
        selingCart: [],
        items: [
          {
            imageLink: 'https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg',
            productName:'Rin Power white Powder 2x',
            sellPrice: 230,
            inStock: true,
          },
          {
            imageLink: 'https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg',
            productName:'Rin Power white Powder',
            sellPrice: 230,
            inStock: true,
          },
          {
            imageLink: 'https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg',
            productName:'Rin Power white',
            sellPrice: 230,
            inStock: false,
          },
          {
            imageLink: 'https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg',
            productName:'RFL Table',
            sellPrice: 230,
            inStock: true,
          },
          {
            imageLink: 'https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg',
            productName:'Rin Power white Power 2x Max Pro Lite',
            sellPrice: 230,
            inStock: false,
          },
          {
            imageLink: 'https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg',
            productName:'Rin Power white Power 2x',
            sellPrice: 230,
            inStock: true,
          },
          {
            imageLink: 'https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg',
            productName:'Rin Power white Power 2x',
            sellPrice: 230,
            inStock: true,
          },
          {
            imageLink: 'https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg',
            productName:'Rin Power white Power 2x',
            sellPrice: 230,
            inStock: true,
          },
          {
            imageLink: 'https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg',
            productName:'Rin Power white Power 2x',
            sellPrice: 230,
            inStock: true,
          },
          {
            imageLink: 'https://wineguide.wein.plus/uploads/editor/images/6739/59c28a0334395_q80.jpg',
            productName:'Rin Power white Power 2x',
            sellPrice: 230,
            inStock: true,
          },
          
        ],
      }
    },
    // created() {
    //   EventBus.$on("addToCart", (payload) => {
    //     this.selingCart.push(payload);
    //   });
    // },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
      total() {
        var total = 0;
        for(var index=0;index<this.selingCart.length;index++){
          var i = this.selingCart[index];
          total += i.quantity * i.price;
        }
        return total;
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
      getColor (c) {
        if (c == false) return '#ea5455'
        else return '#28c76f'
      },
      getStockAns(c){
        if (c == false) return 'Unavailable'
        else return 'Available'
      },
      addToCart(a,b,c) {
        this.selingCart.push({ilink: a,name: b, price: c,quantity: 1});
        console.log(this.selingCart);
      },
      deleteFromCart(i){
        this.selingCart.splice(i, 1);
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
.item-selection {
  border: 1px solid #ddd;
}

.cart-item{
  border: 1px solid #ddd;
}
.quantity {
  width: 50px;
  height: 30px;
  border: 1px solid #ddd;
  padding: 3px;
}
.trow {
 box-sizing: border-box;
 overflow: hidden;
 margin: auto;
 position: relative;
}
.close{
  background-color: thistle;
  color: red;  
  position: absolute;
  right: 5px;
  top: 5px;
  box-sizing: border-box;
  overflow: hidden;
}
.close:hover{
  cursor: pointer;
}
.button-full {
  box-sizing: border-box;
  overflow: hidden;
  margin: auto;
  color:white;
}
</style>
