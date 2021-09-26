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
 *  1.2 check method(if method==GET check if the request should recursive because pagination)
 * 2. check if contains errors or just message
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
export const responseInterceptor = ({config,data,status,headers,request}) => {

    console.log(data)
    console.log(config)
    console.log(headers)
    console.log(request)

    if(status===200||status ===201){
        return {
            success: data.code === 200 || data.code === 201,
            data:data.data,
            message: data.message
        }
    }

    if(status === 400){
        return {
            success: false,
            data: {
                status:status,
                header:headers,
                request:request
            },
            message:"Error"
        }
    }
    //if all process didn't pass
    return {
        success: false,
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

    return Promise.resolve({
        success: false,
        data: [],
        message: error.message
    })
}