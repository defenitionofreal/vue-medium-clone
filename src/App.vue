<template>
  <div>
    <mcv-topbar/>
  </div>
  <router-view/>
</template>

<script>
import McvTopbar from '@/components/Topbar'
import {actionsType} from "@/store/modules/auth"

export default {
  name: "McvApp",
  components: {
    McvTopbar
  },
  mounted() {
    return this.$store.dispatch(actionsType.getCurrentUser)  // компоненты mounted вызываются во всем DOM
  }
}
</script>
