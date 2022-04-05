import axios from "axios";
import {getItem} from "@/helpers/persistantStorage"

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

// чтобы передать jwtToken на все запросы
axios.interceptors.request.use(config => {
    const token = getItem('accessToken')
    const authorizationToken = token ? `Token ${token}` : ''
    config.headers.Authorization = authorizationToken  // записать в header
    return config
})

export default axios