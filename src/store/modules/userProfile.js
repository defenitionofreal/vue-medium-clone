import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationsType = {
  getUserProfileStart: '[userProfile] Get user profile start',
  getUserProfileSuccess: '[userProfile] Get user profile success',
  getUserProfileFailure: '[userProfile] Get user profile failure'
}

export const actionsType = {
  getUserProfile: '[userProfile] Get user profile'
}

const mutations = {
  [mutationsType.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationsType.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationsType.getUserProfileFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionsType.getUserProfile](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationsType.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then(userProfile => {
          context.commit(mutationsType.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationsType.getUserProfileFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}