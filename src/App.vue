<template>
  <div id="app">
    <div class="grand-wrapper">
      <image-uploader v-if="!image" v-model="image" />
      <color-schemes v-if="image" :image="image" />
      <div class="row clear-wrapper" v-if="image">
        <div class="col-md-24 flex-end">
          <at-button
            type="error"
            @click="() => image = null">
            Clear image
            <span class="icon icon-x"/>
          </at-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageUploader from './components/ImageUploader'
import HelloWorld from './components/HelloWorld'
import ColorSchemes from './components/ColorSchemes'

export default {
  name: 'app',
  data () {
    return {
      image: null
    }
  },
  components: {
    ImageUploader,
    ColorSchemes
  }
}
</script>

<style lang="scss">
@import 'styles/variables';

body {
  padding: 30px 15px;
  background: #E0F2F1;
}

#app {
  .grand-wrapper {
    $width: 1200px;
    min-width: $width;
    max-width: $width;
    padding: 15px;
    border: $typical-border;
    background: $white;
    border-radius: 10px;
    margin: 0 auto;

    .clear-wrapper {
      margin-top: 1em;
    }
  }
}
</style>
