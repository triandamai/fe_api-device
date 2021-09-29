
/***
 * Author PT Cexup Telemedicine
 * Made by Trian Damai
 * 29 Jan 2021 - 10:14
 *
 */
import ApiService from "@/services/api.service";
import {Promise} from "es6-promise";

const GET_DATA_MASTER = `GET_DATA_MASTER`;
const POST_DATA_MASTER = `POST_MASTER_DATA`;
const PUT_DATA_MASTER = `PUT_MASTER_DATA`;
const DELETE_DATA_MASTER = `DELETE_MASTER_DATA`;

export const ACTION_GET_DATA_MASTER = `master/${GET_DATA_MASTER}`;
export const ACTION_POST_DATA_MASTER = `master/${POST_DATA_MASTER}`;
export const ACTION_PUT_DATA_MASTER = `master/${PUT_DATA_MASTER}`;
export const ACTION_DELETE_DATA_MASTER = `master/${DELETE_DATA_MASTER}`;

const PUSH_DATA = `ADD_NEW_DATA`;
const REPLACE_DATA = `REPLACE_DATA`;
const REMOVE_DATA = `REMOVE_DATA`;
const INCREMENT_PAGE = `INCREMENT`;

export const MUTATION_ADD_DATA_MASTER = `master/${PUSH_DATA}`;
export const MUTATION_PUT_DATA_MASTER = `master/${REPLACE_DATA}`;
export const MUTATION_DELETE_DATA_MASTER = `master/${REMOVE_DATA}`;

export const TYPE_HOSPITAL = "TYPE_HOSPITAL"
export const TYPE_DEVICE = "TYPE_DEVICE"
export const TYPE_API = "TYPE_API"
export const TYPE_USER = "TYPE_USER"
export const TYPE_MEASUREMENT = "TYPE_MEASUREMENT"


const state = {
    dataHospital:[],
    dataApi:[],
    dataUser:[],
    dataDevice:[],
    dataMeasurement:[],
    page:0
};
const getters = {};
const actions = {
    /***
     * get data
     * and add data to array with synchronized
     * @param type
     * @param slug
     * @param {commit,state}
     * @returns promise true/false
     */
    [GET_DATA_MASTER]({commit}, {type,slug=""}) {
        return new Promise((resolve) => {

            ApiService.get(`${populateEndpoint(type,"GET")}${slug}`)
                .then(({success, data, shouldNext}) => {

                    if (success) {
                        if (shouldNext) {
                            commit(INCREMENT_PAGE, {type: type});
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }

                    commit(PUSH_DATA, {
                        type: type,
                        data: data,
                    });
                })
        });
    },
    /***
     * send data to server
     * @param commit
     * @param type
     * @param body
     * save data to server the add to array store
     * @returns {success,message}

     */
    [POST_DATA_MASTER]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.post(`${populateEndpoint(type,"POST")}`, body)
                .then(({success, data, message}) => {
                    console.log(success)
                    console.log(data)
                    resolve({success: success, message: message});
                    if (success) {

                        commit(PUSH_DATA, {
                            type: type,
                            data: data,
                        });
                    }
                })
        });
    },
    /****
     * Put data master
     * @params {type,body}
     * update data to server the notify the data was changed
     * @returns
     */
    [PUT_DATA_MASTER]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.put(`${populateEndpoint(type,"PUT")}/${body.id}`, body)
                .then(({success, data, message}) => {
                    resolve({success: success, message: message});
                    if (success) {
                        commit(REPLACE_DATA, {
                            type: type,
                            data: data,
                            oldData: body,
                        });

                    }
                })
        });
    },
    /***
     * delete data
     * @param {type,path,body}
     * @returns delete data by id
     * @returns if success it will update data no need reload data from service
     * @param type
     * @param body
     */
    [DELETE_DATA_MASTER]({commit}, {type, body}) {
        return new Promise((resolve) => {
            ApiService.delete(`${populateEndpoint(type,"DELETE")}/${body.id}`)
                .then(({success, message}) => {
                    resolve({success: success, message: message});
                    if (success) {
                        commit(REMOVE_DATA, {
                            type: type,
                            data: body,
                        });
                    }
                })
        });
    },
};
const mutations = {

    [INCREMENT_PAGE](state) {
        state.page = +1
    },
    /***
     * adding data to each state
     * @param {type,data,page}
     * @returns data will be add one -by one
     * @param state
     */
    [PUSH_DATA](state, {type, data}) {
        //assume the data is array
        data.forEach((element)=>{
            const exist = () =>{
                if(type === TYPE_HOSPITAL)return   state.dataHospital.some(hospital=>hospital.id === element.id)
                if(type === TYPE_USER)return state.dataUser.some(user=>user.id === element.id)
                if(type === TYPE_DEVICE) return state.dataDevice.some(device=> device.id === element.id)
                if(type === TYPE_API) return state.dataApi.some(api=>api.id === element.id)
                if(type === TYPE_MEASUREMENT) return state.dataMeasurement.some(measurement=> measurement.id === element.id)
                return false
            }

            let isExist = exist()
            if(!isExist){
                if(type === TYPE_HOSPITAL){
                    state.dataHospital.push(element)
                }
                if(type === TYPE_USER){
                    state.dataUser.push(element)
                }
                if(type === TYPE_DEVICE){
                    state.dataDevice.push(element)
                }
                if(type === TYPE_API){
                    state.dataApi.push(element)
                }
                if(type === TYPE_MEASUREMENT){
                    state.dataMeasurement.push(element)
                }
            }
        })

    },
    /***
     * Update data
     * @params {state,type,data,oldData}
     * update item inside array state data
     * @return replace the old data
     */
    [REPLACE_DATA](state, {type, data, oldData}) {
        const index = ()=>{
            if (type === TYPE_HOSPITAL) return state.dataHospital.map(hospital=>hospital.id).indexOf(oldData.id)
            if(type === TYPE_API)return state.dataApi.map(api=>api.id).indexOf(oldData.id)
            if(type === TYPE_DEVICE) return state.dataDevice.map(device=>device.id).indexOf(oldData.id)
            if(type === TYPE_USER) return state.dataUser.map(user=>user.id).indexOf(oldData.id)
            if (type === TYPE_MEASUREMENT) return state.dataMeasurement.map(measurement=> measurement.id).indexOf(oldData.id)
            return undefined
        }
        let idx = index()
        if(idx){
            if(type === TYPE_HOSPITAL)
                Object.assign(state.dataHospital[index],data)

            if(type === TYPE_API)
                Object.assign(state.dataApi[index],data)

            if(type === TYPE_DEVICE)
                Object.assign(state.dataDevice[index],data)

            if(type === TYPE_USER)
                Object.assign(state.dataUser[index],data)

            if(type === TYPE_MEASUREMENT)
                Object.assign(state.dataMeasurement[index],data)

        }
    },
    /***
     * delete data y index
     * @params {state,type,data}
     * @return remove data by index
     */
    [REMOVE_DATA](state, {type, data}) {
        const index = () => {
            if (type === TYPE_HOSPITAL) return state.dataHospital.map(hospital => hospital.id).indexOf(data.id)
            if(type === TYPE_API) return state.dataApi.map(api=>api.id).indexOf(data.id)
            if(type === TYPE_DEVICE) return state.dataDevice.map(device=>device.id).indexOf(data.id)
            if(type === TYPE_USER) return state.dataUser.map(user=>user.id).indexOf(data.id)
            if(type === TYPE_MEASUREMENT) return state.dataMeasurement.map(measurement=>measurement.id).indexOf(data.id)
        }
        let idx = index()
        if(idx){
            if(type === TYPE_HOSPITAL)
                state.dataHospital.splice(idx,1)

            if(type === TYPE_API)
                state.dataHospital.splice(idx,1)

            if(type === TYPE_DEVICE)
                state.dataHospital.splice(idx,1)

            if(type === TYPE_USER)
                state.dataHospital.splice(idx,1)

            if(type === TYPE_MEASUREMENT)
                state.dataHospital.splice(idx,1)
        }

    }

}

/**
 * get EndPoint base on type
 * @return String
 * **/
const populateEndpoint=(type,method)=>{

    const route =(suffix)=>{
        if (type === TYPE_HOSPITAL) return `/api/hospital${suffix}`
        if(type === TYPE_USER) return `/api/user${suffix}`
        if(type === TYPE_DEVICE) return `/api/device${suffix}`
        if(type === TYPE_MEASUREMENT) return `/api/measurement${suffix}`
        if(type === TYPE_API) return `/api/api-key${suffix}`
    }

    if(method === "GET") {
       return route('s')
    }else if (method === "POST"){
       return route('')
    }else if(method === "PUT"){
        return route('')
    }else if(method === "DELETE"){
        return route('')
    }
    return "unknown"
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
