import feedApi from "@/api/feed";

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationsType = {
    getFeedStart: '[feed] Get Feed Start',
    getFeedSuccess: '[feed] Get Feed Success',
    getFeedFailure: '[feed] Get Feed Failure',
}

export const actionsType = {
    getFeed: '[feed] Get Feed'
}

const mutations = {
    // квадратные скобки для того чтобы выбрать ключ
    [mutationsType.getFeedStart](state) {
        state.isLoading = true
        state.errors = null
        state.data = null
    },
    [mutationsType.getFeedSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationsType.getFeedFailure](state) {
        state.isLoading = false
    },
}

const actions = {
    // второй параметр это параметры
    // воторым параметром предаю урл внутри компонента
    // иначе мы не будем знать с какого урл фетчить данные
    // так как мы их не передаем как в auth, а принимаем
    // {} исполуьзется дисктруктуризация, это позволяет получить локальную переменную внутри объекта
    [actionsType.getFeed](context, {apiUrl}){
        return new Promise(resolve => {
            context.commit(mutationsType.getFeedStart)
            feedApi.getFeed(apiUrl)
                .then(response => {
                    context.commit(mutationsType.getFeedSuccess, response.data) // сохранение внутри состояния
                    resolve(response.data) // для того чтобы получить эти данные внутри компонента
                })
                .catch(() => {
                    context.commit(mutationsType.getFeedFailure)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}