<template>
  <mcv-article-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
  />
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'
import {mapState} from "vuex"
import {actionsType} from "@/store/modules/createArticle"

export default {
  name: "McvCreateArticle",
  components: {McvArticleForm},
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  methods: {
    onSubmit(articleInput) {
      this.$store.dispatch(actionsType.createArticle, {articleInput}).then(
          article => {
           this.$router.push({name: 'article', params: {slug: article.slug}})
          }
      )
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createArticle.isSubmitting,
      validationErrors: state => state.createArticle.validationErrors
    })
  }
}
</script>