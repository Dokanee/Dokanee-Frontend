import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light:  {
        primary: '#2c3e50',
        secondary: '#1aae88',
        accent: '#009688',
        error: '#f44336',
        warning: '#607d8b',
        info: '#4caf50',
        success: '#2196f3',
        boxblue: '#428bca',
        greensea: '#16a085',
        peterriver: '#3498db',
        'sun-flower': '#f1c40f',
        'alizarin': '#e74c3c',
        'dk-grey': '#2c3e50'
        },
    },
  },
});
