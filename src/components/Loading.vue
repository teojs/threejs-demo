<template>
  <div class="loading">
    <div class="process">
      <div
        class="process-bar"
        :style="{ width: process }" />
    </div>
    <div class="author">
      梦游狮
    </div>
  </div>
</template>

<script>
export default {
  props: {
    process: {
      type: String,
      default: '100%',
    },
  },
  data() {
    return {}
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {},
  computed: {},
  watch: {},
}
</script>

<style scoped lang='less'>
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .process {
    width: 688px;
    max-width: 80%;
    height: 300px;
    background: url(/image/loading.png) no-repeat center center / contain;
    position: relative;
    .process-bar {
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      background: #ffffff;
      transition: 0.3s;
    }
  }
  .author {
    font-size: 40px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 20px;
  }
}
</style>
