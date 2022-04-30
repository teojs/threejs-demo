<template>
  <div class="list">
    <router-link
      v-for="(item, index) in list"
      :key="index"
      :to="item.locLink"
      class="list-item">
      <img
        :src="item.img"
        :alt="item.title">
      <div class="title">
        {{ item.title }}
      </div>
    </router-link>
    <div
      v-for="(item, index) in 3"
      :key="'blank' + index"
      class="list-item blank" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  routeInfo: {
    meta: {
      title: '首页',
    },
  },
  data() {
    return {
      list: [
        {
          title: '我的网页是MMD做的',
          img: '/image/我的网页是MMD做的.png',
          locLink: '/mmd1',
          bLink: '',
        },
        {
          title: '我的网页是MMD做的',
          img: '/image/我的网页是MMD做的.png',
          locLink: '/mmd1',
          bLink: '',
        },
        {
          title: '我的网页是MMD做的',
          img: '/image/我的网页是MMD做的.png',
          locLink: '/mmd1',
          bLink: '',
        },
        {
          title: '我的网页是MMD做的',
          img: '/image/我的网页是MMD做的.png',
          locLink: '/mmd1',
          bLink: '',
        },
      ],
    }
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.list {
  max-width: 1500px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .list-item {
    width: 22%;
    margin: 30px 10px;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0 20px 20px 2px #e5e5e5;
    overflow: hidden;
    &.blank {
      box-shadow: none;
    }
    // &:hover {
    //   img {
    //     transform: scale(1.1);
    //   }
    // }
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .title {
      padding: 10px;
    }
  }
}
@media screen and (max-width: 1200px) {
  .list {
    .list-item {
      width: 30%;
    }
  }
}
@media screen and (max-width: 900px) {
  .list {
    .list-item {
      width: 47%;
    }
  }
}
@media screen and (max-width: 670px) {
  .list {
    width: 100%;
    flex-direction: column;
    .list-item {
      width: 100%;
      margin: 30px 0;
    }
  }
}
</style>
