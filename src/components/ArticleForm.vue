<template>
<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <mcv-validation-errors v-if="errors" :validation-errors="errors" />
        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Article title" v-model="title">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Article description" v-model="description">
            </fieldset>
            <fieldset class="form-group">
            <textarea class="form-control form-control-lg" placeholder="Article body" v-model="body">
            </textarea>
              </fieldset>
            <fieldset class="form-group">
              <input class="form-control" type="text" placeholder="Article tags" v-model="tagList">
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="submit" :disabled="isSubmitting">
              Publish Article
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import McvValidationErrors from "@/components/ValidationErrors"

export default {
  name: "McvArticleForm",
  components: {McvValidationErrors},
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data() {
    // для create можно было бы оставить пустыми значения ' ',
    // но для update this.initialValues...
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' ')
    }
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' ')
      }
      this.$emit('articleSubmit', form)
    }
  }
}
</script>