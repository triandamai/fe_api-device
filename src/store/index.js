/***
 * Author PT Cexup Telemedicine
 *
 * Made by Trian Damai
 *
 * 26 Sep 2021 - 19:11
 *
 */
import Vue from "vue";
import Vuex from "vuex";
// import 'es6-promise/auto';
import layout from "./modules/layout";
import menu from "./modules/menu";
import auth from "./modules/auth";
import master from "./modules/master";
import rekening from "./modules/rekening";
import system from "./modules/system";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadingtable: true,
        isOnline: true,
        notifConnection: false
    },
    mutations: {
        // eslint-disable-next-line no-unused-vars
        setLoading(state, isloading) {
            state.loadingtable = isloading
        },
        setConnection(state, isOnline) {
            state.isOnline = isOnline
            state.notifConnection = true
        },
        showNotif(state, show) {
            state.notifConnection = show
        },
        changeLang(state, payload) {
            localStorage.setItem("currentLanguage", payload.id);
            localStorage.setItem("currentLanguageIcon", payload.icon);
            window.location.reload();
        },

    },
    actions: {
        setLang({commit}, payload) {
            commit("changeLang", payload);
        }
    },
    modules: {
        layout,
        menu,
        auth,
        master,
        system,
    }
});

export * from "./modules/layout";
export * from "./modules/menu";
export * from "./modules/auth";
export * from "./modules/master";