<template>
  <div>
    <div class="intro">
      <el-image :src="avatarPath" fit="cover" />
      <div class="text">
        <div class="title">恋爱简介</div>
        <div class="time">2018/10/30-forever</div>
        <div class="content">
          暂无简介
        </div>
      </div>
    </div>
    <div class="modules">
      <div v-for="item in moduleList" :key="item.url" :style="{width: item.width || '400px'}" class="module-item" @click="goToItem(item)">
        <el-image :src="item.imgPath" fit="fill" />
        <div class="smallTitle">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()

const avatarPath = new URL('@/assets/avatarPath.jpg', import.meta.url).href
const goToItem = (item) => {
  $router.push(item.url)
}
const moduleList = [{
  imgPath: new URL('@/assets/_U1A1207.JPG', import.meta.url).href,
  title: '恋爱计时',
  url: '/loveTime',
  width: '200px'
}]
</script>

<style scoped lang="scss">
::v-deep {
  .el-image__inner {
    width: 100%;
    height: 100%;
  }
}
.intro {
  width: 100%;
  height: 40vh;
  background: pink;
  position: relative;
  .el-image {
    width: 180px;
    height: 200px;
    border-radius: 100px;
    overflow: hidden;
    position: absolute;
    top: 10vh;
    left: 20vw;
  }
  .text {
    position: absolute;
    top: 10vh;
    left: calc(20vw + 250px);
    .title {
      font-size: 30px;
      font-weight: 900;
      color: skyblue;
    }
    .time {
      margin: 10px 0;
      font-size: 20px;
    }
    .content {
      border: 2px dotted greenyellow;
      width: 50vw;
      height: 180px;
      padding: 20px;
    }
  }
}
.modules {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px;
  background: skyblue;
  .module-item {
    width: 400px;
    height: 300px;
    margin: 20px;
    border: 2px dotted greenyellow;
    border-radius: 30px;
    overflow: hidden;
    cursor: pointer;
    .el-image {
      width: 100%;
      height: calc(100% - 40px);
    }
    .smallTitle {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: antiquewhite;
    }
  }
}
</style>