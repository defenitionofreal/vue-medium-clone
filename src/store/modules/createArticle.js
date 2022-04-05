import articleApi from "@/api/article"

const state = {
    isSubmitting: false, // чтобы задисэйблить кнопку
    validationErrors: null
}

export const mutationsType = {
    createArticleStart: '[createArticle] create article Start',
    createArticleSuccess: '[createArticle] create article Success',
    createArticleFailure: '[createArticle] create article Failure',
}

export const actionsType = {
    createArticle: '[createArticle] Create article'
}

const mutations = {
    [mutationsType.createArticleStart](state) {
        state.isSubmitting = true
    },
    [mutationsType.createArticleSuccess](state) {
        state.isSubmitting = false
    },
    [mutationsType.createArticleFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

const actions = {
    [actionsType.createArticle](context, {articleInput}){
        return new Promise(resolve => {
            context.commit(mutationsType.createArticleStart)
            articleApi
                .createArticle(articleInput)
                .then(article => {
                    context.commit(mutationsType.createArticleSuccess, article)
                    resolve(article)
                })
                .catch(result => {
                    context.commit(mutationsType.createArticleFailure,
                        result.response.data.errors)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}