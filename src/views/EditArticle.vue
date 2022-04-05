<template>
  <div>
    <mcv-loading v-if="isLoading"/>
    <mcv-article-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'
import {mapState} from "vuex"
import {actionsType} from "@/store/modules/editArticle"
import McvLoading from "@/components/Loading"

export default {
  name: "McvEditArticle",
  components: {McvLoading, McvArticleForm},
  // вместо data используес initialValues в computed так как зависимаые данные
  // data() {
  //   return {
  //     initialValues: {
  //       title: '',
  //       description: '',
  //       body: '',
  //       tagList: []
  //     }
  //   }
  // },
  computed: {
    ...mapState({
      isSubmitting: state => state.editArticle.isSubmitting,
      validationErrors: state => state.editArticle.validationErrors,
      isLoading: state => state.editArticle.isLoading,
      article: state => state.editArticle.article
    }),
    initialValues() {
      if (!this.article) {
        return null
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      }
    }
  },
  // mounted для того чтобы зафетчит данные article
  // при инициализации этого компонента
  mounted() {
    this.$store.dispatch(actionsType.getArticle, {
      slug: this.$route.params.slug
    })
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug
      this.$store
          .dispatch(actionsType.updateArticle, {slug, articleInput})
          .then(article => {
           this.$router.push({name: 'article', params: {slug: article.slug}})
          }
      )
    }
  }
}
</script>