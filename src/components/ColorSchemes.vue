<template>
  <div class="row ">
    <div class="col-md-12">
      <div class="scheme-wrapper">
          <h2>RGB</h2>
          <div
            class="image-wrapper"
            @mousemove="(e) => this.showColor({ event: e, scheme: 'rgb' })"
            @mouseout="() => rgb=null">
            <img :src="image" ref="rgb" id="rgb">
          </div>

      </div>
    </div>
    <div class="col-md-12">
      <div class="scheme-wrapper">
        <h2>CMYK</h2>
        <div class="image-wrapper" @mousemove="(e) => this.showColor({ event: e, scheme: 'cmyk' })">
          <img :src="image" ref="cmyk" id="cmyk">
        </div>
      </div>
    </div>
    <div class="col-md-24 scheme-stats" v-if="color">
      <div class="color-block" :style="{background: color.rgb}" />
      <h2 class="color-label">{{color.label}}</h2>
    </div>

    <div class="col-md-3">
      <div class="scheme-wrapper">
        <div class="image-wrapper">
          <img :src="image" ref="hsl" id="hsl">
        </div>
        <at-slider v-model="yellow" :min="-100" :max="100"></at-slider>
      </div>
    </div>
  </div>
</template>

<script>
import generateCanvas from '../utils/generate-canvas';
import fetchYellowPixels from '../utils/fetch-yellow-pixels';
import calculateMouseoverColor from '../utils/calculate-mouseover-color';
import setYellowsLight from '../utils/set-yellows-light';

export default {
  props: ['image'],
  data () {
    return {
      color: null,
      yellows: [],
      yellow: 0
    }
  },
  mounted() {
    this.$refs['rgb'].onload = () => this.$refs['rgb'].replaceWith(generateCanvas(this.$refs['rgb']));
    this.$refs['cmyk'].onload = () => this.$refs['cmyk'].replaceWith(generateCanvas(this.$refs['cmyk']));

    this.$refs['hsl'].onload = () => {
      this.$refs['hsl'].replaceWith(generateCanvas(this.$refs['hsl']))

      const canvas = document.querySelector('#hsl'),
        ctx = canvas.getContext("2d")

      fetchYellowPixels(canvas)
        .then(yellows => this.yellows = yellows);
    };
  },
  methods: {
    showColor({ event, scheme }) {
      const canvas = document.querySelector(`#${scheme}`);

      this.color = calculateMouseoverColor({ event, scheme, canvas });
    }
  },
  watch: {
    yellow() {
      const canvas = document.querySelector(`#hsl`);

      console.log(this.yellow);

      setYellowsLight({ canvas, yellows: this.yellows, light: this.yellow });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.image-wrapper {
  display: flex;

  flex-direction: column;
}

.scheme-wrapper {
  border: $typical-border;
  border-radius: 7.5px;
  margin: 5px;

  h2 {
    text-align: center;
  }

  img {
    width: 100%;
    height: auto;
  }
}

.scheme-stats {
  margin: 10px 0;
  background: $teal-50;
  border: $typical-border;
  border-radius: 7.5px;
  padding: 10px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  .color-block {
    width: 150px;
    height: 150px;
    border-radius: 10px;
  }

  .color-label {
    width: 275px;
  }
}
</style>
