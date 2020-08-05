<template>
         <div class='blue-grey lighten-5 container-dashboard' >
             <v-container fluid>
    <v-row >
       <v-col
        v-for="(categorie, i) in categories"
         :key='categorie'
         lg='6' class=''>
             <v-card min-height='410' color='white' min-width='360' class='rounded-t-lg no-gutters'>
                 <v-card-text class='grad-bg white--text text-center rounded-t-lg'>
                   {{categorie}}
                 </v-card-text>
                 <v-row class='pa-4'>
                   <v-col
                   v-for='item in items[i]'
                   :key='item'
                   lg='4'
                   >
                   <v-card>
 <v-img :src=item.img>
                 </v-img>
                 <v-card-text class='text-center'>
                   {{ item.name }}
                 </v-card-text>
                   </v-card>
                   </v-col>
                 </v-row>
             </v-card>
       </v-col>
    </v-row>
  </v-container>
    </div>
</template>
<script>
export default {
    data: () => ({
      categories: ['health', 'food','electronics'],
      items: [
        [{
          name: 'aCE Plus',
          img: 'https://cdn.vuetifyjs.com/images/cards/store.jpg'
        },
        {
         name: 'Napa',
          img: 'https://cdn.vuetifyjs.com/images/cards/store.jpg'
        },
        {
          name: 'Leo',
          img: 'https://cdn.vuetifyjs.com/images/cards/store.jpg'
        },
        {
          name: 'Rupa',
          img: 'https://cdn.vuetifyjs.com/images/cards/store.jpg'
        }],
        
        [
          {
          name: 'Frozen Yogurt',
          img: 'https://cdn.vuetifyjs.com/images/cards/store.jpg'
        },
        {
         name: 'Frozen Yogurt',
          img: 'https://cdn.vuetifyjs.com/images/cards/store.jpg'
        },
        {
          name: 'Frozen Yogurt',
          img: 'https://cdn.vuetifyjs.com/images/cards/store.jpg'
        },
        {
          name: 'Frozen Yogurt',
          img: 'https://cdn.vuetifyjs.com/images/cards/store.jpg'
        },
        ]
      ],
    }),
}
</script>
<style scoped>

</style>