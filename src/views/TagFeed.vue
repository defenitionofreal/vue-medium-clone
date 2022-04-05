<template>
  <div class="home-page">
    <mcv-banner/>
  <div class="container page">
    <div class="row">
      <!-- Main view - contains tabs & article list -->
      <div class="col-md-9">
        <mcv-feed-toggler :tag-name="tagName"/>
        <mcv-feed :api-url="apiUrl"/>
      </div>
      <!-- Sidebar where popular tags are listed -->
      <div class="col-md-3">
        <div class="sidebar">
          <mcv-tag />
        </div>
      </div>
      <!-- End the row & container divs -->
    </div>
  </div>
</div>
</template>

<script>
import McvFeed from '@/components/Feed'
import McvTag from "@/components/Tag"
import McvBanner from "@/components/Banner"
import McvFeedToggler from "@/components/FeedToggler"

export default {
  name: "McvTagFeed",
  components: {McvFeedToggler, McvBanner, McvTag, McvFeed},
  computed: {
    tagName() {
      return this.$route.params.slug
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`
    }
  }
}
</script>