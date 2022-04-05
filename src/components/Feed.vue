<template>
<div>

  <mcv-loading v-if="isLoading" />
  <mcv-error v-if="error" />

  <div v-if="feed">
    <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
      <div class="article-meta">
        <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
          <img :src="article.author.image"/>
        </router-link>
        <div class="info">
          <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}"
          class="author">
          {{ article.author.image }}
        </router-link>
          <span class="date">{{ article.createdAt }}</span>
        </div>
        <div class="pull-xs-right">
          <mcv-add-to-favorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
          />
        </div>
      </div>
      <router-link :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <mcv-tag-list :tags="article.tagList" />
      </router-link>
    </div>
    <mcv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"/>
  </div>

</div>
</template>

<script>
import {mapState} from "vuex" // данные из vuex
import {actionsType} from "@/store/modules/feed"
import McvPagination from '@/components/Pagination'
import {limit} from "@/helpers/vars"
import {stringify, parseUrl} from 'query-string'
import McvLoading from "@/components/Loading"
import McvError from "@/components/Error"
import McvTagList from "@/components/TagList"
import McvAddToFavorites from "@/components/AddToFavorites"

export default {
  name: "McvFeed",
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  components: {
    McvError,
    McvLoading,
    McvPagination,
    McvTagList,
    McvAddToFavorites
  },
  data() {
    return {
      limit,
      url: '/'
    }
  },
  // почему dispatch actions в mounted, а не в methods
  mounted() {
     this.fetchFeed()
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * limit - limit
    }
  },
  // watch для того чтобы перезагружать данные при измненении
  // в нашем случае currentPage когда меняется страница
  // apiUrl для того чтобы на странице профиля во вкладках перезагружались данные
  watch: {
    currentPage() {
      console.log('Page changed')
      this.fetchFeed()
    },
    apiUrl() {
      this.fetchFeed()
    }
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query  // добавляем квери параметры в урл
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      // второй параметр так как принимаем данные
    // apiUrl доступен так как в GlobalFeed мы его прогнали <mcv-feed :api-url="apiUrl"/>
    this.$store.dispatch(actionsType.getFeed, {apiUrl: apiUrlWithParams})
    }
  },
}
</script>