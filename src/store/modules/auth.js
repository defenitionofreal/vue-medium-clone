import authApi from '@/api/auth'   // почем или откуда authApi
import {setItem} from "@/helpers/persistantStorage"

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
    isLoading: false // для компонентов которые хотят показать loader
}

// export для экспортирования функции
// префикс [auth] для уникальности мутаций (во vuex удобно использовать если много мутаций)
// эти Types создаются для уникальности в нашем модуле так как все мутации и прочее глобальные
export const mutationsType = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    // loginStart: '[auth] loginStart',
    // loginSuccess: '[auth] loginSuccess',
    // loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',

    updateCurrentUserStart: '[auth] updateCurrentUserStart',
    updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
    updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

    logout: '[auth] logout'
}

export const actionsType = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    updateCurrentUser: '[auth] updateCurrentUser',

    logout: '[auth] logout'
}

export const gettersType = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}


// getters для того чтобы уменьшить дублирование кода
// вычислять значения на основание store
// можно переиспользовать без дублирования кода на часто используемые вещи
const getters = {
    [gettersType.currentUser]: state => {
        return state.currentUser
    },
    [gettersType.isLoggedIn]: state => {
        return Boolean(state.isLoggedIn) // bool для точго чтобы был выбор между true/false
    },
    [gettersType.isAnonymous]: state => {
        return state.isAnonymous === false //
    }
}

const mutations = {
    // квадратные скобки для того чтобы выбрать ключ
    [mutationsType.registerStart](state) {
        state.isSubmitting = true
        state.validationErrors = null  // чтобы ошибки не продолжали висеть
    },
    [mutationsType.registerSuccess](state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationsType.registerFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationsType.getCurrentUserStart](state) {
        state.isLoading = false
    },
    [mutationsType.getCurrentUserSuccess](state, payload) {
        state.isLoading = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationsType.getCurrentUserFailure](state) {
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
    },

    [mutationsType.updateCurrentUserStart]() {},
    [mutationsType.updateCurrentUserSuccess](state, payload) {
        state.currentUser = payload
    },
    [mutationsType.updateCurrentUserFailure]() {},

    [mutationsType.logout](state) {
        state.currentUser = null
        state.isLoggedIn = false
    }
}
// что такое resolve
const actions = {
    [actionsType.register](context, credentials){
        return new Promise(resolve => {
            context.commit(mutationsType.registerStart)
            authApi
                .register(credentials)  // credentials - данные
                .then(response => {
                    context.commit(mutationsType.registerSuccess, response.data.user) // успешная отправка
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result =>{
                    context.commit(mutationsType.registerFailure, result.response.data.errors) // обработка ошибок
                })

        })
    },

    [actionsType.login](context, credentials){
        return new Promise(resolve => {
            context.commit(mutationsType.registerStart)
            authApi
                .login(credentials)
                .then(response => {
                    context.commit(mutationsType.registerSuccess, response.data.user)
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result =>{
                    context.commit(mutationsType.registerFailure, result.response.data.errors)
                })

        })
    },

    [actionsType.getCurrentUser](context){
        return new Promise(resolve => {
            context.commit(mutationsType.getCurrentUserStart)
            authApi
                .getCurrentUser()
                .then(response => {
                    context.commit(mutationsType.getCurrentUserSuccess, response.data.user)
                    resolve(response.data.user)
                })
                .catch(() =>{
                    context.commit(mutationsType.getCurrentUserFailure)
                })

        })
    },

    [actionsType.updateCurrentUser](context, {currentUserInput}){
        return new Promise(resolve => {
            context.commit(mutationsType.updateCurrentUserStart)
            authApi
                .updateCurrentUser(currentUserInput)
                .then(user => {
                    context.commit(mutationsType.updateCurrentUserSuccess, user)
                    resolve(user)
                })
                .catch(result =>{
                    context.commit(mutationsType.updateCurrentUserFailure,
                        result.response.data.errors)
                })

        })
    },

    [actionsType.logout](context) {
        return new Promise(resolve => {
            setItem('accessToken', '')
            context.commit(mutationsType.logout)
            resolve()
        })
    }
}

// регистрация
export default {
    state,
    mutations,
    actions,
    getters
}