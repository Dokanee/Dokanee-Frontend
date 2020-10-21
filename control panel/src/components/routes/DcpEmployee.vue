<template>
         <div class='blue-grey lighten-5 container-dashboard' >
             <v-container fluid>
                <transition name="fade">
                <v-row>
                <v-row class="ma-5 gutter-12">
                    <v-card align="center" class="pa-5" flat width="100%">
                        <div class="block">
                            <v-card-content>
                                <v-icon size="50" color="matblue" class='ma-2'>mdi-account-network</v-icon><br>
                                <h3>Now. You can add employee to manage your store.</h3><br>
                                <v-text>To help you to manage this store you can add anyone as an employee. To add a new employee click "ADD NEW EMPLOYEE" or add someone who already have Employee ID in dokanee, click "ADD EMPLOYEE BY EMAIL".</v-text><br>
                            </v-card-content>
                            <v-row class="ma-3" justify="center">
                                <v-dialog
                                v-model="dialog"
                                persistent
                                max-width="500px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    class="ma-2" 
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    Add New Employee
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title style="background-color:#EBEEF0">
                                    <span class="headline">Add New Employee</span>
                                    </v-card-title>
                                    <v-card-text>
                                    <v-container>
                                        <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                            label="Email*"
                                            required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                            label="Password*"
                                            type="password"
                                            required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                        >
                                            <v-text-field
                                            label="NID*"
                                            type="text"
                                            required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                        >
                                            <v-text-field
                                            label="Phone*"
                                            type="text"
                                            required
                                            ></v-text-field>
                                        </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue matblue"
                                        text
                                        @click="dialog = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="dialog = false"
                                    >
                                        Add Employee
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                                </v-dialog>
                                <v-dialog
                                v-model="dialog2"
                                persistent
                                max-width="500px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    class="ma-2" 
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    Add Employee by Email
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title style="background-color:#EBEEF0">
                                    <span class="headline">Add New Employee</span>
                                    </v-card-title>
                                    <v-card-text>
                                    <v-container>
                                        <v-row justify="center">
                                        <v-container-text><h3>Enter the email of employee you want ro add.</h3></v-container-text> <br>
                                        <v-col cols="12">
                                            <v-text-field
                                            label="Email*"
                                            required
                                            ></v-text-field>
                                        </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="dialog2 = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        bgcolor="matblue" 
                                        color="blue darken-1"
                                        text
                                        @click="dialog2 = false"
                                    >
                                        Add Employee
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                                </v-dialog>
                            </v-row>
                        
                        </div>
                    </v-card>
                    
                </v-row>
                <br>

                <v-row class="ma-5">
                    <h2>Current Employees</h2> <br>
                        <div class="block">
                            <v-row justify="center">
                                <v-row-item v-for="(employee, i) in employees"
                                :key="i"
                                :value="employee">
                                <v-col>
                                    <v-card  flat class="col pa-4">
                                    <v-row>
                                        <v-col cols="3">
                                            <v-avatar size="60">
                                            <img
                                                src="https://www.w3schools.com/howto/img_avatar.png"
                                                alt="John"
                                            >
                                            </v-avatar>
                                        </v-col>
                                        <v-col cols="9">
                                            <v-col-content>
                                               <b>{{ employee.first_name }} {{ employee.last_name }}</b> <br>
                                                {{ employee.email }} <br>
                                                {{ employee.phone }}
                                            </v-col-content>
                                        </v-col>
                                    </v-row>
                                     </v-card></v-col>
                                </v-row-item>
                            </v-row>
                        </div>
                </v-row>
             </v-row>   
            </transition>
            </v-container>
    </div>
</template>
<script>
export default {
    data: () => ({
      dialog: false,
      dialog2: false,
      employees: [{
                "id": 1,
                "first_name": "Kiley",
                "last_name": "Mildner",
                "email": "kmildner0@cdc.gov",
                "phone": "+353 380 181 4697"
                }, {
                "id": 2,
                "first_name": "Melicent",
                "last_name": "Hamblyn",
                "email": "mhamblyn1@usnews.com",
                "phone": "+27 396 208 2143"
                }, {
                "id": 3,
                "first_name": "Alison",
                "last_name": "Pryor",
                "email": "apryor2@dot.gov",
                "phone": "+233 619 532 1813"
                }, {
                "id": 4,
                "first_name": "Kailey",
                "last_name": "Skeech",
                "email": "kskeech3@a8.net",
                "phone": "+351 708 631 6483"
                }, {
                "id": 5,
                "first_name": "Orsa",
                "last_name": "Cranidge",
                "email": "ocranidge4@rakuten.co.jp",
                "phone": "+976 105 184 6876"
                }, {
                "id": 6,
                "first_name": "Desi",
                "last_name": "Shotbolt",
                "email": "dshotbolt5@reference.com",
                "phone": "+81 675 770 0769"
                }, {
                "id": 7,
                "first_name": "Gillie",
                "last_name": "Ivanchenkov",
                "email": "givanchenkov6@topsy.com",
                "phone": "+55 102 813 5449"
                }, {
                "id": 8,
                "first_name": "Nevile",
                "last_name": "Boyn",
                "email": "nboyn7@wix.com",
                "phone": "+86 621 936 6923"
                }, {
                "id": 9,
                "first_name": "Demetra",
                "last_name": "Di Gregorio",
                "email": "ddigregorio8@sun.com",
                "phone": "+86 903 370 1225"
                }, {
                "id": 10,
                "first_name": "Wolfy",
                "last_name": "Courtois",
                "email": "wcourtois9@disqus.com",
                "phone": "+86 436 106 4528"
                }],
    }),
}
</script>
<style scoped>
.col {
    width: 350px;
}
</style>
