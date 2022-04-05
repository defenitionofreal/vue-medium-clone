import axios from '@/api/axios'

const getTag = () => {
    return axios.get('/tags').then(response => response.data.tags)
}

export default {
    getTag
}