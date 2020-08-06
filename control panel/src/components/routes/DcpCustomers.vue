<template>
         <div class='blue-grey lighten-5 container-dashboard' >
             <v-container fluid>
        <template>
        <v-data-table
            :headers="headers"
            :items="person"
            sort-by="id"
            class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar flat color="#ECEFF1">
                <v-toolbar-title>Customers</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider><v-btn
                    color="#239EE2"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >{{person.length}}</v-btn>
                
                <v-spacer></v-spacer>
                
                <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="#25AA94"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >Add Customer</v-btn>
                </template>
                <v-card>
                    <v-card-title style="background-color:#EBEEF0" >
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.phone" label="Phone Number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.gender" label="Gender"></v-text-field>
                        </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    style="margin:10px"
                    color="#25AA94"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="close">Cancel</v-btn>
                    
                    <v-btn
                    style="margin:10px"
                    color="#25AA94"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                   @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
                
            </v-toolbar>
            </template>
            <template v-slot:item.avater="{ item }">
              <v-avatar style="margin:5px;boeder-color:red">
                <img
                  :src="item.avater"
                  :alt="John"
                >
              </v-avatar>
            <!-- <div class="p-2">
              <v-img  :src="item.avater" :alt="item.name" height="60px"></v-img>
            </div> -->
          </template>
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
            <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
        </template>
    </v-container>
    </div>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'avater',
        },
        { text: 'Name', value: 'name' },
        { text: 'ID', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phone' },
        { text: 'Gender', value: 'gender' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      person: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        id: '',
        email: '',
        phone: '',
        gender: '',
      },
      defaultItem: {
        name: '',
        id: 0,
        email: 0,
        phone: 0,
        gender: 0,
        avater: "No Image",
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.person = [
          {"id":1,"name":"Eldredge Ploughwright","email":"eploughwright0@globo.com","gender":"Male","phone":"+39 458 452 5490","avater":"https://robohash.org/minimaaliquamomnis.jpg?size=50x50&set=set1"},
{"id":2,"name":"Sheba Themann","email":"sthemann1@japanpost.jp","gender":"Female","phone":"+7 454 704 1718","avater":"https://robohash.org/laboriosamatqueipsa.jpg?size=50x50&set=set1"},
{"id":3,"name":"Renate Caroll","email":"rcaroll2@pen.io","gender":"Female","phone":"+93 688 360 2416","avater":"https://robohash.org/nemovelitvelit.jpg?size=50x50&set=set1"},
{"id":4,"name":"Elmira Dunne","email":"edunne3@washingtonpost.com","gender":"Female","phone":"+7 616 687 7335","avater":"https://robohash.org/eosautfuga.jpg?size=50x50&set=set1"},
{"id":5,"name":"Evin Gianolo","email":"egianolo4@bandcamp.com","gender":"Male","phone":"+420 304 636 5750","avater":"https://robohash.org/estplaceatsint.jpg?size=50x50&set=set1"},
{"id":6,"name":"Johannes Riccardo","email":"jriccardo5@spotify.com","gender":"Male","phone":"+86 335 656 3803","avater":"https://robohash.org/iureexplicabofugit.jpg?size=50x50&set=set1"},
{"id":7,"name":"Bennett Ommundsen","email":"bommundsen6@marriott.com","gender":"Male","phone":"+371 327 409 5139","avater":"https://robohash.org/nobiseaqueaperiam.jpg?size=50x50&set=set1"},
{"id":8,"name":"Britt Huleatt","email":"bhuleatt7@booking.com","gender":"Female","phone":"+351 849 994 9299","avater":"https://robohash.org/solutaconsecteturdelectus.jpg?size=50x50&set=set1"},
{"id":9,"name":"Richmound Dring","email":"rdring8@nature.com","gender":"Male","phone":"+86 153 318 2464","avater":"https://robohash.org/utanimisint.jpg?size=50x50&set=set1"},
{"id":10,"name":"Patience Woltman","email":"pwoltman9@tuttocitta.it","gender":"Female","phone":"+62 668 917 7600","avater":"https://robohash.org/saepeearumcupiditate.jpg?size=50x50&set=set1"},
{"id":11,"name":"Mandi Cluley","email":"mcluleya@livejournal.com","gender":"Female","phone":"+55 836 161 5913","avater":"https://robohash.org/impedittotamsed.jpg?size=50x50&set=set1"},
{"id":12,"name":"Katey Papierz","email":"kpapierzb@paypal.com","gender":"Female","phone":"+62 249 643 2513","avater":"https://robohash.org/perferendisundenatus.jpg?size=50x50&set=set1"},
{"id":13,"name":"Dalis Greetham","email":"dgreethamc@usatoday.com","gender":"Male","phone":"+56 321 961 5167","avater":"https://robohash.org/minimaharumea.jpg?size=50x50&set=set1"},
{"id":14,"name":"Allie Pinshon","email":"apinshond@yandex.ru","gender":"Female","phone":"+7 525 862 8358","avater":"https://robohash.org/aliquamquiset.jpg?size=50x50&set=set1"},
{"id":15,"name":"Nana Fradson","email":"nfradsone@cbc.ca","gender":"Female","phone":"+505 830 795 6002","avater":"https://robohash.org/etdictaea.jpg?size=50x50&set=set1"},
{"id":16,"name":"Meade Hector","email":"mhectorf@wix.com","gender":"Female","phone":"+63 877 946 3395","avater":"https://robohash.org/porrodignissimosdolor.jpg?size=50x50&set=set1"},
{"id":17,"name":"Caren Digle","email":"cdigleg@linkedin.com","gender":"Female","phone":"+54 911 475 5942","avater":"https://robohash.org/teneturnesciuntdolores.jpg?size=50x50&set=set1"},
{"id":18,"name":"Peadar Weavill","email":"pweavillh@unblog.fr","gender":"Male","phone":"+86 285 263 9176","avater":"https://robohash.org/numquaminventorecumque.jpg?size=50x50&set=set1"},
{"id":19,"name":"Maury Buckeridge","email":"mbuckeridgei@reference.com","gender":"Male","phone":"+7 483 632 6082","avater":"https://robohash.org/veniamvoluptatenihil.jpg?size=50x50&set=set1"},
{"id":20,"name":"Ronald Fawlkes","email":"rfawlkesj@jimdo.com","gender":"Male","phone":"+63 402 210 5454","avater":"https://robohash.org/utquossint.jpg?size=50x50&set=set1"},
{"id":21,"name":"Auberta Cotherill","email":"acotherillk@loc.gov","gender":"Female","phone":"+48 928 819 2749","avater":"https://robohash.org/magnamquivoluptatum.jpg?size=50x50&set=set1"},
{"id":22,"name":"Wadsworth Tocher","email":"wtocherl@biglobe.ne.jp","gender":"Male","phone":"+54 435 595 2745","avater":"https://robohash.org/fugasuntdicta.jpg?size=50x50&set=set1"},
{"id":23,"name":"Mollee Hanscom","email":"mhanscomm@google.com.br","gender":"Female","phone":"+86 501 411 4480","avater":"https://robohash.org/voluptatemquiaeum.jpg?size=50x50&set=set1"},
{"id":24,"name":"Shellysheldon Moorerud","email":"smoorerudn@lulu.com","gender":"Male","phone":"+7 814 118 1432","avater":"https://robohash.org/rerumanimiaut.jpg?size=50x50&set=set1"},
{"id":25,"name":"Louella Reuben","email":"lreubeno@irs.gov","gender":"Female","phone":"+30 799 242 7693","avater":"https://robohash.org/exautdolorum.jpg?size=50x50&set=set1"},
{"id":26,"name":"Clayborn Sterland","email":"csterlandp@virginia.edu","gender":"Male","phone":"+54 663 155 3510","avater":"https://robohash.org/repellataliquidquia.jpg?size=50x50&set=set1"},
{"id":27,"name":"Rickie Hulles","email":"rhullesq@nasa.gov","gender":"Female","phone":"+91 191 530 6294","avater":"https://robohash.org/repellendusautemporro.jpg?size=50x50&set=set1"},
{"id":28,"name":"Maurise Tomaszynski","email":"mtomaszynskir@chronoengine.com","gender":"Male","phone":"+7 463 315 2616","avater":"https://robohash.org/eosquiavel.jpg?size=50x50&set=set1"},
{"id":29,"name":"Chevy Loughran","email":"cloughrans@deliciousdays.com","gender":"Male","phone":"+27 224 263 2730","avater":"https://robohash.org/seddolortempore.jpg?size=50x50&set=set1"},
{"id":30,"name":"Em Castagnaro","email":"ecastagnarot@toplist.cz","gender":"Male","phone":"+81 261 888 6907","avater":"https://robohash.org/quideminsed.jpg?size=50x50&set=set1"}
        ]
      },

      editItem (item) {
        this.editedIndex = this.person.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.person.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.person.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.person[this.editedIndex], this.editedItem)
        } else {
          this.person.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style scoped>
.poo {
  backgrpund-color:red; border-width:1px; border-radious:25px;
}
</style>