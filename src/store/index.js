import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  token: '',
};

const mutations = {
  addToken(state, token) {
    state.token = token;
  }
};

const getters = {};

const actions = {};

export default new Vuex.Store({ state, mutations, getters, actions });