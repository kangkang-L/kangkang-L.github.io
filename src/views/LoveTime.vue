<template>
  <div>
    <h1 id="h1"></h1>
    <canvas></canvas>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

onMounted(() => {
  const canvas = document.querySelector("canvas")
  const ctx = canvas.getContext("2d")

  let ww = ref(0)
  let wh = ref(0)

  const onResize = () => {
    ww.value = canvas.width = window.innerWidth
    wh.value = canvas.height = window.innerHeight
  }

  ctx.strokeStyle = "red"
  ctx.shadowBlur = 25
  ctx.shadowColor = "hsla(0, 100%, 60%,0.5)"

  let precision = ref(100)
  let hearts = ref([])
  let mouseMoved = ref(false)

  const onMove = (e) => {
    mouseMoved.value = true;
    if (e.type === "touchmove") {
      hearts.value.push(new Heart(e.touches[0].clientX, e.touches[0].clientY));
      hearts.value.push(new Heart(e.touches[0].clientX, e.touches[0].clientY));
    } else {
      hearts.value.push(new Heart(e.clientX, e.clientY));
      hearts.value.push(new Heart(e.clientX, e.clientY));
    }
  }

  const Heart =  function (x, y) {
    this.x = x || Math.random() * ww.value;
    this.y = y || Math.random() * wh.value;
    this.size = Math.random() * 2 + 1;
    this.shadowBlur = Math.random() * 10;
    this.speedX = (Math.random() + 0.2 - 0.6) * 8;
    this.speedY = (Math.random() + 0.2 - 0.6) * 8;
    this.speedSize = Math.random() * 0.05 + 0.01;
    this.opacity = 1;
    this.vertices = [];
    for (let i = 0; i < precision.value; i++) {
      const step = (i / precision.value - 0.5) * (Math.PI * 2);
      const vector = {
        x: (15 * Math.pow(Math.sin(step), 3)),
        y: -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
      }
      this.vertices.push(vector);
    }
  }

  Heart.prototype.draw = function () {
    this.size -= this.speedSize;
    this.x += this.speedX;
    this.y += this.speedY;
    ctx.save();
    ctx.translate(-1000, this.y);
    ctx.scale(this.size, this.size);
    ctx.beginPath();
    for (let i = 0; i < precision.value; i++) {
      const vector = this.vertices[i];
      ctx.lineTo(vector.x, vector.y);
    }
    ctx.globalAlpha = this.size;
    ctx.shadowBlur = Math.round((3 - this.size) * 10);
    ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";
    ctx.shadowOffsetX = this.x + 1000;
    ctx.globalCompositeOperation = "screen"
    ctx.closePath();
    ctx.fill()
    ctx.restore();
  };


  const render = (a) => {
    requestAnimationFrame(render);

    hearts.value.push(new Heart())
    ctx.clearRect(0, 0, ww.value, wh.value);
    for (let i = 0; i < hearts.value.length; i++) {
      hearts.value[i].draw();
      if (hearts.value[i].size <= 0) {
        hearts.value.splice(i, 1);
        i--;
      }
    }
  }


  onResize();
  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", onMove);
  window.addEventListener("resize", onResize);
  requestAnimationFrame(render);


  const time = (obj, futimg) => {
    const nowtime = new Date().getTime(); // 现在时间转换为时间戳
    const futruetime = new Date(futimg).getTime(); // 未来时间转换为时间戳
    const msec = nowtime - futruetime; // 毫秒 未来时间-现在时间
    const time = (msec / 1000);  // 毫秒/1000
    const day = parseInt(String(time / 86400)); // 天  24*60*60*1000
    const hour = parseInt(String(time / 3600)) - 24 * day;    // 小时 60*60 总小时数-过去的小时数=现在的小时数
    const minute = parseInt(String(time % 3600 / 60)); // 分 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
    const second = parseInt(String(time % 60));  // 以60秒为一整份 取余 剩下秒数
    obj.innerHTML = "宝贝：我已经爱了你<br>" + day + "天" + hour + "小时" + minute + "分" + second + "秒" + "了<br><span>我非常爱你！虽然你无法体会到我的真心，<br>但是我的心中，你是永远的唯一的爱人！我已经学会忘了自己，却无法忘记你。</span>"

    return true;
  }

  const starttime = () => {
    time(h1, '2018,10,30');     // 在一起的时间
    const ptimer = setTimeout(starttime, 1000); // 添加计时器
  }
  starttime()
})
</script>

<style scoped>
h1 {
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  font-family: 'Love Ya Like A Sister', cursive;
  font-size: 40px;
  color: #c70012;
  padding: 0 20px;
}

h1 span {
  font-size: 20px;
}
</style>