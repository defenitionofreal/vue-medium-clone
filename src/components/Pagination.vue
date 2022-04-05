<template>
<div>
  <ul class="pagination">
    <!--
     :class - специальный атрибут vue
     -->
    <li
        v-for="page in pages" :key="page"
        class="page-item"
        :class="{active: currentPage === page}"
    >
      <!--
      здесь передаем урл как path так как в пропсах у нас url
      query - параметры которые мы присоединяем к урл
      -->
      <router-link
          :to="{path: url, query: {page: page}}"
          class="page-link">
        {{ page }}
      </router-link>
    </li>
  </ul>
</div>
</template>

<script>
import {range} from "@/helpers/utils"

export default {
  name: "McvPagination",
  // props входные параметры для компонента пагинации
  props: {
    total: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    pages() {
      // math.ceil округление к большему
      const pagesCount = Math.ceil(this.total / this.limit)
      return range(1, pagesCount)
    }
  }
}
</script>