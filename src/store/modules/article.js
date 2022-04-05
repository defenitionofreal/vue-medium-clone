import articleApi from "@/api/article";

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationsType = {
    getArticleStart: '[feed] Get article Start',
    getArticleSuccess: '[feed] Get article Success',
    getArticleFailure: '[feed] Get article Failure',

    deleteArticleStart: '[feed] delete article Start',
    deleteArticleSuccess: '[feed] delete article Success',
    deleteArticleFailure: '[feed] delete article Failure',
}

export const actionsType = {
    getArticle: '[feed] Get article',
    deleteArticle: '[feed] Delete article'
}

const mutations = {
    // get
    [mutationsType.getArticleStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationsType.getArticleSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationsType.getArticleFailure](state) {
        state.isLoading = false
    },
    // delete
    // delete описывать смысла нету так как они только удают
    // но инициализировать мутации нужно для того чтобы использовать
    [mutationsType.deleteArticleStart]() {},
    [mutationsType.deleteArticleSuccess]() {},
    [mutationsType.deleteArticleFailure]() {}
}

const actions = {
    [actionsType.getArticle](context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationsType.getArticleStart, slug)  // второй параметр slug просто чтобы видеть во vuex payload
            articleApi
                .getArticle(slug)
                .then(article => {
                    context.commit(mutationsType.getArticleSuccess, article)
                    resolve(article)
                })
                .catch(() => {
                    context.commit(mutationsType.getArticleFailure)
                })
        })
    },
    // delete
    [actionsType.deleteArticle](context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationsType.deleteArticleStart)
            articleApi
                .deleteArticle(slug)
                .then(() => {
                    context.commit(mutationsType.deleteArticleSuccess)
                    resolve()
                })
                .catch(() => {
                    context.commit(mutationsType.deleteArticleFailure)
                })
        })
    },
}

export default {
    state,
    actions,
    mutations
}