<template>
<div>
  <!-- Tabs for toggling between feed, article lists -->
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="isLoggedIn">
              <router-link :to="{name: 'yourFeed'}" class="nav-link"
                           :class="{active: routeName === 'yourFeed'}">
                Your Feed
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'globalFeed'}" class="nav-link"
              :class="{active: routeName === 'globalFeed'}">
                Global Feed
              </router-link>
            </li>
            <li class="nav-item" v-if="tagName">
              <router-link :to="{name: 'tag'}" class="nav-link"
              :class="{active: routeName === 'tag'}">
                <i class="ion-pound"></i> {{ tagName }}
              </router-link>
            </li>
          </ul>
        </div>
</div>
</template>

<script>
import {mapGetters} from "vuex"
import {gettersType} from "@/store/modules/auth"

export default {
  name: "McvFeedToggler",
  // в пропс передается внутрь tagName из другого компанента, пропс принимает вообщем
  props: {
    tagName: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: gettersType.isLoggedIn
    }),
    routeName(){
      return this.$route.name
    }
  }
}
</script>