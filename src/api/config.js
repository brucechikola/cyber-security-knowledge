import { useSelector } from "react-redux"

const vars = {
    server: 'http://89.58.45.133:1337/api',
    local: 'http://localhost:1337/api'
}




export const Respond = (status = false, response = '') => {
    let data = { 'status': status }
    status ? data['data'] = response : data['error'] = response
    return data
}
export const SetHeaders = (additional_headers = '', is_file_upload = false) => {
    const { token } = useSelector(state => state.auth.session)
    let h = {
        Authorization: `Bearer ${token}`,
        ...additional_headers
    }
    if (is_file_upload) {
        h['Content-Type'] = 'multipart/form-data'
    }
    return h
}
export const GetToken = () => {
    const { token } = useSelector(state => state.auth.session)
    return token
}
export const GetUser = () => {
    const { user } = useSelector(state => state.auth.session)
    return user
}

export let API_CONFIG = {
    request_type: 'GET',
    base_endpoint: vars.server,
    request_endpoint: '',
    headers: {},
    body: '',
    request_types: {
        get: 'GET',
        post: 'POST',
        put: 'PUT',
        update: 'UPDATE',
        delete: 'DELETE',
    },
    status_codes: {
        success: 200,
        not_found: 404,
        server_error: 500,
        request_error: 501,
    },
    endpoint_extensions: {
        auth: '/auth/local',
        user: '/auth/local/register',
        locations: '/locations?populate=province,criminal_activities.criminal_activity_type',
        new_location: '/locations?populate=*',
        provinces: '/provinces',
        criminal_activity_types: '/criminal-activity-types?populate=criminal_activities.criminal_activity_type,criminal_activities.location',
        criminal_activities: '/criminal-activities?populate=*',
        locations_delete: '/locations/',
        criminal_activity_types_delete: '/criminal-activity-types/',
        criminal_activities_delete: '/criminal-activities/',
    },

}

// call this function to configure your API Request
export const API_SETUP = (params) => {
    const { request_type, headers, body, endpoint_extension } = params
    API_CONFIG.request_endpoint = endpoint_extension
    API_CONFIG.request_type = API_CONFIG.request_types[request_type.toLowerCase().trim()]
    API_CONFIG.headers = headers || ''
    API_CONFIG.body = body || ''
    return API_CONFIG
}