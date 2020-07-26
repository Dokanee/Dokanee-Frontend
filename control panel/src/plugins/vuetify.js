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
        primary: '#1565c0',
        secondary: '#00bcd4',
        accent: '#009688',
        error: '#f44336',
        warning: '#607d8b',
        info: '#4caf50',
        success: '#2196f3'
        },
    },
  },
});
