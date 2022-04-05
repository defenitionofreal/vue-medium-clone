import { createStore } from 'vuex'
import auth from "@/store/modules/auth"
import feed from '@/store/modules/feed'
import tag from '@/store/modules/tag'
import article from '@/store/modules/article'
import createArticle from '@/store/modules/createArticle'
import editArticle from '@/store/modules/editArticle'
import settings from "@/store/modules/settings"
import addToFavorites from "@/store/modules/addToFavorites"
import userProfile from "@/store/modules/userProfile"

export default createStore({
  state: {},
  mutations: {},
  actions: {
  },
  modules: {
    auth,
    feed,
    tag,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorites,
    userProfile
  }
})
