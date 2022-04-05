// здесь не создаем состояния

import favoritesApi from "@/api/addToFavorites"

export const mutationsType = {
    addToFavoritesStart: '[addToFavorites] add to favorites Start',
    addToFavoritesSuccess: '[addToFavorites] add to favorites Success',
    addToFavoritesFailure: '[addToFavorites] add to favorites Failure'
}

export const actionsType = {
    addToFavorites: '[addToFavorites] add to favorites'
}

const mutations = {
    // регестрируем мутации
    // пустыми так как нету состояния
    // нужны для того чтобы видитеть во vuex что все правильно работает
    [mutationsType.addToFavoritesStart](){},
    [mutationsType.addToFavoritesSuccess](){},
    [mutationsType.addToFavoritesFailure](){},
}

const actions = {
    [actionsType.addToFavorites](context, {slug, isFavorited}) {
        return new Promise(resolve => {
            context.commit(mutationsType.addToFavoritesStart)
            const promise = isFavorited
                ? favoritesApi.removeFromFavorites(slug)
                : favoritesApi.addToFavorites(slug)
            promise.then(article => {
                context.commit(mutationsType.addToFavoritesSuccess, article)
                resolve(article)
            }).catch(() => {
                context.commit(mutationsType.addToFavoritesFailure)
            })
        })
    }
}

export default {
    mutations,
    actions
}