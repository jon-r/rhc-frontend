import Vuex from 'vuex';

import {fetchFromAPI} from '../assets/js/globalData'

const LAYOUT_INIT = 'LAYOUT/INIT';

const global = {
  strict: process.env.NODE_ENV !== 'production',

  state: {
    layout: {
      navigation: [],
      content: [],
    },
    smtElse: 'ok'
  },

  getters: {
    getLayoutNavigation: state => state.layout.navigation
  },

  actions: {
    async nuxtServerInit({commit}, {req}) {
      let {data} = await fetchFromAPI('/layout/init');
      commit(LAYOUT_INIT, data);
    }
  },

  mutations: {
    [LAYOUT_INIT] (state, {content, navigation}) {
      state.layout = {
        ...state.layout,
        navigation,
        content
      }
    }
  }
}

const createStore = () => new Vuex.Store({
  modules: {
    global
  }
})

export default createStore;
