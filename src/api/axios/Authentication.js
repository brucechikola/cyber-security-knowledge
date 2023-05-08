import Execute from "./Execute"
import { API_CONFIG, Respond } from "api/config"
export default class Authentication {
    async authenticate(parameters) {
        const ex = new Execute()
        return ex.post({
            endpoint_extension: API_CONFIG.endpoint_extensions.auth,
            body: parameters.body
        }).then(resolve => {
            if (resolve.status) {
                return Respond(true, {
                    token: resolve.data.jwt,
                    user: resolve.data.user
                })
            }
            else {
                return Respond(false, resolve)
            }
        }).catch(r => {
            return Respond(false, r)
        })
    }
}