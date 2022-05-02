<template>
  <div class="list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="list-item">
      <img
        :src="item.img"
        :alt="item.title">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="buttons">
        <router-link
          :to="item.locLink"
          class="button">
          在线看
        </router-link>
        <a
          class="button"
          :href="item.bLink"
          target="_blank"> B站看 </a>
      </div>
    </div>
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
          bLink: 'https://www.bilibili.com/video/BV1Yr4y1J7Kj/',
        },
        {
          title: '还是你的笑容最可爱',
          img: '/image/还是你的笑容最可爱.png',
          locLink: '/mmd2',
          bLink: 'https://www.bilibili.com/video/BV1Nu411r7vs/',
        },
        {
          title: '危险派对',
          img: '/image/危险派对.png',
          locLink: '/mmd3',
          bLink: 'https://www.bilibili.com/video/BV1Pi4y1U7Az/',
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
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .title {
      padding: 10px;
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #ededed;
      .button {
        padding: 10px 0;
        text-align: center;
        font-size: 16px;
        flex: 1;
        &:first-child {
          border-right: 1px solid #ededed;
        }
        &:hover {
          background: #ededed;
        }
      }
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
