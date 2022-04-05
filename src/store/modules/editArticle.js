import articleApi from "@/api/article"

const state = {
    isSubmitting: false, // чтобы задисэйблить кнопку
    validationErrors: null,
    isLoading: false,
    article: null // чтобы пототм использовать эти данные внутри формы
}

export const mutationsType = {
    updateArticleStart: '[updateArticle] update article Start',
    updateArticleSuccess: '[updateArticle] update article Success',
    updateArticleFailure: '[updateArticle] update article Failure',
    // get для того что при начали сначали мы хотим зафетчить article и пототм уже апдейтить
    getArticleStart: '[updateArticle] get article Start',
    getArticleSuccess: '[updateArticle] get article Success',
    getArticleFailure: '[updateArticle] get article Failure',
}

export const actionsType = {
    updateArticle: '[updateArticle] Update article',
    getArticle: '[updateArticle] Get article'
}

const mutations = {
    // update
    [mutationsType.updateArticleStart](state) {
        state.isSubmitting = true
    },
    [mutationsType.updateArticleSuccess](state) {
        state.isSubmitting = false
    },
    [mutationsType.updateArticleFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },
    // get
    [mutationsType.getArticleStart](state) {
        state.isLoading = true
    },
    [mutationsType.getArticleSuccess](state, payload) {
        state.isLoading = false
        state.article = payload
    },
    [mutationsType.getArticleFailure](state) {
        state.isLoading = false
    }
}

const actions = {
    [actionsType.updateArticle](context, {slug, articleInput}){
        return new Promise(resolve => {
            context.commit(mutationsType.updateArticleStart)
            articleApi
                .updateArticle(slug, articleInput)
                .then(article => {
                    context.commit(mutationsType.updateArticleSuccess, article)
                    resolve(article)
                })
                .catch(result => {
                    context.commit(mutationsType.updateArticleFailure,
                        result.response.data.errors)
                })
        })
    },
    // get
    [actionsType.getArticle](context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationsType.getArticleStart)
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
    }
}

export default {
    state,
    actions,
    mutations
}