<template>
  <div class="row">
    <div class="col-md-24 uploader-btns-wrapper">
      <at-button size="large" type="warning" class="spongebob-btn" @click="() => $emit('input', sponge)">Upload Spongebob</at-button>
      <div class="upload-btn-wrapper">
        <at-button size="large" hollow>Upload Image <span class="icon icon-image"></span></at-button>
        <input type="file" @change="onFileChange">
      </div>

    </div>
  </div>
</template>

<script>
import sponge from '../assets/sponge.png'

export default {
  name: 'image-uploader',
  props: ['value'],
  data () {
    return {
      sponge
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        this.$emit('input', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.uploader-btns-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spongebob-btn {
  margin-right: 10px;
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;

  button {
    background: $teal-50;
  }

  input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
</style>
