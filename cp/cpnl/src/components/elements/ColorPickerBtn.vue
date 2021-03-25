<template>
    <div>
        <v-card
                     width="80"
                     height="60"
                     @click.stop="dlg =! dlg"
                     :color=form.primaryColor
                     >

                     </v-card>
                      <v-dialog v-model="dlg" max-width="300px">
                        <v-card
                        
                        >
            <v-card-title style="background-color:#EBEEF0">
            <span class="headline">{{headerText}}</span>
          </v-card-title>
 <v-color-picker
  dot-size="6"
  hide-mode-switch
  mode="rgba"
  v-model=form.primaryColor
></v-color-picker>
<v-card-actions>
 <v-btn depressed color="blue darken--3 white--text" @click="dlg = false">Ok</v-btn>

</v-card-actions>
                        </v-card>
                    
                      </v-dialog>
    </div>
</template>
<script>
export default {
    props: ["headText",],
    data(){
        return{
            dlg: false,
            clr: "ffffffff",

        }
    }
}
</script>