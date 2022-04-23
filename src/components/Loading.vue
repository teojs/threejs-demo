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
  methods: {
    checkEmail(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入邮箱'))
      }
      const reg =
        /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    },
    checkMobile(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入手机号'))
      }
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    },
  },
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
  .author{
    font-size: 40px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 20px;
  }
}
</style>
