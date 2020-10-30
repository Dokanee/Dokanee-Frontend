<template>
<div>
    <v-app >
        <v-main>
            <v-container class="pa-0 fill-height signupin-bg"  fluid>
                <v-row class="fill-height">
                    <v-col>
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer class="py-2 transparent" color=''>
            <span class="ma-auto overline">&copy; 2020 | Dokanee.com.bd</span>
        </v-footer>
    </v-app>
</div>
    
</template>
<script>
export default {
    
}
</script>
<style scoped>
.signupin-bg{
    background: #ebeef0;
    background: -webkit-linear-gradient(-45deg,#00b0ff ,#8bc34a);
}
.tansparent{
    background: transparent !important;
    color: white !important;
    text-align: center;
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
</style>