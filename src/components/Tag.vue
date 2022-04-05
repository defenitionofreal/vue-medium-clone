<template>
<div>
  <p>Popular Tags</p>
          <mcv-loading v-if="isLoading" />
          <mcv-error v-if="error" />
          <div v-if="popularTags">
            <div class="tag-list">
              <router-link
                  v-for="tag in popularTags"
                  :key="tag"
                  :to="{name: 'tag', params: {slug: tag}}"
                  class="tag-default tag-pill">
                {{ tag }}
              </router-link>
          </div>
          </div>
          <div v-else>
            No tags are here... yet.
          </div>
</div>
</template>

<script>
import {mapState} from "vuex"
import {actionsType} from "@/store/modules/tag"
import McvLoading from "@/components/Loading"
import McvError from "@/components/Error"

export default {
  name: "McvTag",
  components: {McvLoading, McvError},
  computed: {
    ...mapState({
      isLoading: state => state.tag.isLoading,
      popularTags: state => state.tag.data,
      error: state => state.tag.error
    })
  },
  mounted() {
    this.$store.dispatch(actionsType.getTag)
  }
}
</script>