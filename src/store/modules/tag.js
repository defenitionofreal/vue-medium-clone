import tagApi from "@/api/tag";

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationsType = {
    getTagStart: '[feed] Get Tag Start',
    getTagSuccess: '[feed] Get Tag Success',
    getTagFailure: '[feed] Get Tag Failure',
}

export const actionsType = {
    getTag: '[feed] Get Tag'
}

const mutations = {
    [mutationsType.getTagStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationsType.getTagSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationsType.getTagFailure](state) {
        state.isLoading = false
    },
}

const actions = {
    [actionsType.getTag](context){
        return new Promise(resolve => {
            context.commit(mutationsType.getTagStart)
            tagApi
                .getTag()
                .then(tags => {
                    context.commit(mutationsType.getTagSuccess, tags)
                    resolve(tags)
                })
                .catch(() => {
                    context.commit(mutationsType.getTagFailure)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}