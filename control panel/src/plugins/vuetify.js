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
        primary: '#021324',
        secondary: '#1aae88',
        accent: '#009688',
        error: '#f44336',
        warning: '#607d8b',
        info: '#4caf50',
        success: '#2196f3',
        matyellow: '#FFC107',
        matgreen: '#25AA94',
        matblue: '#2196F3',
        matred: '#F44336',
        greensea: '#009688',
        peterriver: '#2e76af',
        'sun-flower': '#8463bf',
        'alizarin': '#ff5722',
        'dk-grey': '#4f5e6f',
        'green-sea-btn' : '#0889a1'
        },
    },
  },
});
