import httpClient from './httpClient.js'
import globalState from './globalstate.js'

export default class AxiosBaseService {
    request(url, method, params) {
        if (params == null) params = {};

        if (method == 'post' || method == 'POST') {
            return httpClient.request({
                url: url,
                method: method,
                // headers: { 'content-type': 'application/x-www-form-urlencoded' },
                baseURL: globalState.serviceBaseUrl,
                data: params,
                withCredentials: false,
            })
        } else {
            return httpClient.request({
                url: url,
                method: method,
                // withCredentials: true ,
                baseURL: globalState.serviceBaseUrl,
                params: params
            })
        }

    }
}