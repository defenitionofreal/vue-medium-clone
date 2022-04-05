import axios from '@/api/axios'
// почему без export?
const register = credentials => {
    return axios.post('/users', {user: credentials})
}

const login = credentials => {
    return axios.post('/users/login', {user: credentials})
}

// данные не передаю так как accessToken буду получать напрямую через axios
const getCurrentUser = () => {
    return axios.get('/user')
}

const updateCurrentUser = currentUserInput => {
    return axios
        .put('/user', {user: currentUserInput})
        .then(response => response.data.user)
}

export default {
    register,
    login,
    getCurrentUser,
    updateCurrentUser
}