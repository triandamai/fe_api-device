/***
 * Author PT Cexup Telemedicine
 *
 * Made by Trian Damai
 *
 * 26 Sep 2021 - 19:11
 *
 * catch every response
 * step intercept
 * 1. check status code
 *  1.2 check method(if method==GET check if the request should recursif because pagination)
 * 2. check if contains erros or just message
 * and should return
 * {
 *     "success":boolean,
 *     "data":any,
 *     "message":string,
 *     "shouldNext":boolean,
 * }
 * **/

/**
 * response interceptor
 * all request (2xx) before passing to `store` will be filter first in this interceptor
 * @param response
 *
 ***/
export const responseInterceptor = (response) => {

    //if all process didn't pass
    return {
        success: true,
        data: [],
        message: "",

    }
}
/**
 * error interceptor
 * all request fail (4xx,5xx) before passing to `store` will be filter first in this interceptor
 * @param error
 *
 ***/
export const errorInterceptor = (error) => {
    //  console.log("error",error.response)


    return Promise.resolve({
        success: false,
        data: [],
        message: "",
        shouldNext: false
    })
}