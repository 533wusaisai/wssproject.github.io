import Vue from 'vue';
import Vuex from 'vuex';
import Admin from './modules/admin';

Vue.use(Vuex);

let store=new Vuex.Store({
    modules:{
        admin:Admin
    }
})
export default store;
