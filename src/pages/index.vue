<template>
  <div id="container" />
  <div class="options">
    <label for="">
      <div>lookAt</div>
      <input
        v-model="lookAt.x"
        min="-5000"
        max="5000"
        type="range">
      <input
        v-model="lookAt.y"
        min="-5000"
        max="5000"
        type="range">
      <input
        v-model="lookAt.z"
        min="-5000"
        max="5000"
        type="range">
    </label>
    <label for="">
      <div>cameraPos</div>
      <input
        v-model="cameraPos.x"
        min="-5000"
        max="5000"
        type="range">
      <input
        v-model="cameraPos.y"
        min="-5000"
        max="5000"
        type="range">
      <input
        v-model="cameraPos.z"
        min="-1000"
        max="1000"
        type="range">
    </label>
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  name: 'Home',
  routeInfo: {
    meta: {
      title: '首页',
    },
    sort: 1,
  },
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      mouseZ: 3,
      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2,

      lookAt: {
        x: 0,
        y: 0,
        z: -600,
      },
      cameraPos: {
        x: 0,
        y: 0,
        z: 0,
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      this.container = document.getElementById('container')
      window.addEventListener('resize', this.onWindowResize, false)
      document.addEventListener('mousemove', this.onMouseMove, false)
      document.addEventListener('wheel', this.onMouseWheel, false)

      // 创建渲染器，添加抗锯齿
      this.renderer = new THREE.WebGLRenderer({ antialias: true })

      // 设置像素比
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.shadowMap.enabled = true

      this.container.appendChild(this.renderer.domElement)

      // 创建场景
      this.scene = new THREE.Scene()

      // 全景场景
      const geometry = new THREE.SphereGeometry(600, 60, 60)
      // 按z轴翻转
      geometry.scale(1, 1, -1)
      // 添加贴图：全景图
      const skyTexture = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./image/skyTexture_2.jpg'),
      })

      // 渲染贴图
      this.mesh = new THREE.Mesh(geometry, skyTexture)

      this.scene.add(this.mesh)

      // 渲染一个盒子作参照物
      const box = new THREE.BoxGeometry()
      const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      const cube = new THREE.Mesh(box, boxMaterial)
      cube.position.z = -100

      this.scene.add(cube)

      // 摄像机
      this.camera = new THREE.PerspectiveCamera(
        60, // 视野大小
        window.innerWidth / window.innerHeight, // 视野比例
        1,
        2000
      )
      // 设置摄像机位置
      this.camera.position.set(
        this.cameraPos.x,
        this.cameraPos.y,
        this.cameraPos.z
      )
      // this.camera.target = new THREE.Vector3(0, 0, 0)
      // this.camera.position.z = 0
      // this.camera.focalLength = 3

      const animate = () => {
        requestAnimationFrame(animate)
        this.render()
      }
      animate()
    },

    render() {
      // this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.1
      // this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.1
      // this.camera.position.z += (this.mouseZ - this.camera.position.z) * 0.1
      this.lookAt.x += (-this.mouseX - this.lookAt.x) * 0.1
      this.lookAt.y += (this.mouseY - this.lookAt.y) * 0.1
      // this.cameraPos.z += (this.mouseZ - this.cameraPos.z) * 0.1
      // this.camera.lookAt(this.scene.position)
      this.camera.lookAt(this.lookAt.x, this.lookAt.y, this.lookAt.z)
      this.camera.position.set(
        this.cameraPos.x,
        this.cameraPos.y,
        this.cameraPos.z
      )
      this.renderer.render(this.scene, this.camera)
    },

    onMouseMove(event) {
      this.mouseX = event.clientX - this.windowHalfX
      this.mouseY = event.clientY - this.windowHalfY
    },

    onMouseWheel(event) {
      this.camera.fov += event.deltaY * 0.05
      this.camera.updateProjectionMatrix()
    },

    // 窗口改变重新渲染
    onWindowResize() {
      this.windowHalfX = window.innerWidth / 2
      this.windowHalfY = window.innerHeight / 2
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
  },
}
</script>
<style lang="less" scoped>
.options {
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: #ffffff;
}
</style>
