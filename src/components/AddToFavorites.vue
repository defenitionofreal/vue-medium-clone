<template>
  <button
      :class="{
      'btn': true,
      'btn-sm': true,
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic}"
      @click="handleLike">
  <i class="ion-heart" />
      <span>&nbsp; {{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import {actionsType} from "@/store/modules/addToFavorites"

export default {
  name: "McvAddToFavorites",
  // пропсы которые мы индевицировали снаружи
  props: {
    isFavorited: {
      type: Boolean,
      required: true
    },
    articleSlug: {
      type: String,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount
    }
  },
  methods: {
    handleLike() {
      // отправка запроса
      this.$store.dispatch(actionsType.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic
      })
      //console.log('handle like')
      if(this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic -= 1
      }else {
        this.favoritesCountOptimistic += 1
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic
    }
  }
}
</script>