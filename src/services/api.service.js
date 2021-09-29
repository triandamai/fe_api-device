/***
 * Author PT Cexup Telemedicine
 *
 * Made by Trian Damai
 *
 * 26 Sep 2021 - 19:11
 *
 */
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import {errorInterceptor, responseInterceptor} from "@/services/httpInterceptors"

/**
 * Service to call HTTP request via Axios
 */

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.interceptors.response.use(responseInterceptor, errorInterceptor)

        this.setHeader();
    },

    /**
     * Set the default HTTP request headers
     *
     */
    setHeader() {
        Vue.axios.defaults.baseURL = "http://localhost:8000";
        Vue.axios.defaults.headers.common["X-Api-Key"] = "SECRET"
        Vue.axios.defaults.headers.common["Content-Type"] = "application/json"
        Vue.axios.defaults.headers.common["Accept"] = "application/json"
        Vue.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"


    },
    query(resource, params) {
        return Vue.axios.get(resource, params);
    },
    /**
     * @param resource
     */
    get(resource) {
        // if(slug){
        //   return Vue.axios.get(`${resource}/${slug}`);
        // }
        return Vue.axios.get(
            `${resource}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });

    },

    /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @returns {*}
     */
    post(resource, params) {
        return Vue.axios.post(`${resource}`, params,
            {
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
    },

    /**
     * Send the UPDATE HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params,
            {
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
    },

    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    put(resource, params) {
        return Vue.axios.put(`${resource}`, params,
            {
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
    },

    /**
     * Send the DELETE HTTP request
     * @param resource
     * @returns {*}
     */
    delete(resource) {
        return Vue.axios.delete(resource);
    },
};

export default ApiService;
