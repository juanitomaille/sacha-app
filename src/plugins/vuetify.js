import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import fr from 'vuetify/es5/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { fr },
      current: 'fr',
    },
    theme: { dark: true ,
                themes: {
                  light: {
                    primary: '#23C48E',
                    secondary: '#23C48E',
                    accent: '#23C48E',
                    error: '#D3435C',
                  },
                  dark: {
                    primary: '#23C48E',
                    secondary: '#23C48E',
                    tertiary:'#23C48E',
                    accent: '#23C48E',
                    error: '#D3435C',
                    base: '#182026',
                    info: '#2196F3',
                    anchor: '#8c9eff',
                    success: '#4CAF50',
                    warning: '#FFC107',
                    lighten5: '#f5f8fa',
                    lighten4: '#ebf1f5',
                    lighten3: '#e1e8ed',
                    lighten2: '#d8e1e8',
                    lighten1: '#ced9e0',
                    darken1: '#202b33',
                    darken2: '#293742',
                    darken3: '#30404d',
                    darken4: '#394b59',
                  },
                },
    },
});
