import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  username: 'admin',
  password: '123456',
};

const mutations = {

};

const getters = {};

const actions = {};

export default new Vuex.Store(state, mutations, getters, actions);