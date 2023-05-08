import { API_CONFIG, API_SETUP, Respond, SetHeaders } from "api/config"
import axios from "axios"
export default class Execute {
    configure(props) {
        const { request_type = 'GET', headers = {}, body = {}, endpoint_extension } = props
        if (!endpoint_extension) {
            console.error("Please provide endpoint extension parameter object in 'get' function: e.g:: new Execute().get({endpoint_extension:'/your_file'})")
            return
        }
        API_SETUP({
            request_type: request_type,
            endpoint_extension: endpoint_extension,
            headers: headers,
            body: body
        })
    }
    async request() {
        API_CONFIG.headers['Content-Type'] = 'application/json'
        const url = `${API_CONFIG.base_endpoint}${API_CONFIG.request_endpoint}`
        switch (API_CONFIG.request_type) {
            case API_CONFIG.request_types.get:
                return await axios.get(url, { headers: API_CONFIG.headers })
            case API_CONFIG.request_types.post:
                return await axios.post(url, API_CONFIG.body, { headers: API_CONFIG.headers })
            case API_CONFIG.request_types.update:
                return await axios.put(url, { headers: API_CONFIG.headers, body: JSON.stringify(API_CONFIG.body) })
            case API_CONFIG.request_types.delete:
                return await axios.delete(url, { headers: API_CONFIG.headers, body: JSON.stringify(API_CONFIG.body) })
            default:
                console.error("Unknown request type")
                break;
        }
    }
    async get(params) {
        this.configure({
            request_type: API_CONFIG.request_types.get,
            endpoint_extension: params.endpoint_extension,
            headers: params.headers
        })
        return this.request().then(resolve => {
            if (resolve.status === API_CONFIG.status_codes.success) {
                return Respond(true, resolve.data.data)
            }
            else return Respond(false, resolve)
        }).catch(err => {
            return Respond(false, err)
        });
    }
    async post(params) {
        this.configure({
            request_type: API_CONFIG.request_types.post,
            endpoint_extension: params.endpoint_extension,
            body: params.body,
            headers: params.headers
        })
        return this.request().then(resolve => {
            if (resolve.status === API_CONFIG.status_codes.success) {
                return Respond(true, resolve.data)
            }
            else return Respond(false, resolve)
        }).catch(err => {
            return Respond(false, err)
        });
    }
    async update(params) {
        console.log("updating")
    }
    async delete(params) {
        console.log("deleting")
    }

    async uploadFile(params) {
        // axios.defaults.headers.common['Authorization'] = params.headers.Authorization
        console.log(params.file)
        // return
        try {
            const formData = new FormData();
            formData.append('files', params.file);
            console.log(formData)
            return
            this.configure({
                request_type: API_CONFIG.request_types.post,
                endpoint_extension: API_CONFIG.endpoint_extensions.upload,
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return await this.request().then(resolve => {
                console.log(resolve)
            })
        } catch (error) {
            console.error(error);
        }
    }
}