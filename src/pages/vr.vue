<template>
  <div id="container" />
</template>

<script>
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
export default {
  name: 'Home',
  routeInfo: {
    meta: {
      title: '首页',
    },
    sort: 1,
  },
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
      this.animate()
    })
  },
  methods: {
    init() {
      this.container = document.getElementById('container')

      // 创建渲染器，添加抗锯齿
      this.renderer = new THREE.WebGLRenderer({ antialias: true })

      // 设置像素比
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.shadowMap.enabled = true

      this.container.appendChild(this.renderer.domElement)

      // 创建场景
      this.scene = new THREE.Scene()

      this.textureLoader = new THREE.TextureLoader()

      // 加载立方体皮肤
      const boxF = this.textureLoader.load('./image/box/scene1_pano2_f.jpg')
      const boxB = this.textureLoader.load('./image/box/scene1_pano2_b.jpg')
      const boxL = this.textureLoader.load('./image/box/scene1_pano2_l.jpg')
      const boxR = this.textureLoader.load('./image/box/scene1_pano2_r.jpg')
      const boxU = this.textureLoader.load('./image/box/scene1_pano2_u.jpg')
      const boxD = this.textureLoader.load('./image/box/scene1_pano2_d.jpg')

      // 全景场景
      // const geometry = new THREE.SphereGeometry(600, 60, 60)
      const geometry = new THREE.BoxGeometry(600, 600, 600)
      // 按z轴翻转
      geometry.scale(1, 1, -1)
      // 添加贴图：全景图
      // const skyTexture = new THREE.MeshBasicMaterial({
      //   map: this.textureLoader.load('./image/skyTexture_2.jpg'),
      // })
      const skyTexture = [
        new THREE.MeshBasicMaterial({ map: boxR }),
        new THREE.MeshBasicMaterial({ map: boxL }),
        new THREE.MeshBasicMaterial({ map: boxU }),
        new THREE.MeshBasicMaterial({ map: boxD }),
        new THREE.MeshBasicMaterial({ map: boxF }),
        new THREE.MeshBasicMaterial({ map: boxB }),
      ]
      // 渲染贴图
      this.mesh = new THREE.Mesh(geometry, skyTexture)

      this.scene.add(this.mesh)

      // 渲染一个盒子作参照物
      const box = new THREE.BoxGeometry()
      // const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      // const cube = new THREE.Mesh(box, boxMaterial)
      const cube = new THREE.Mesh(box, [
        new THREE.MeshBasicMaterial({ map: boxR }),
        new THREE.MeshBasicMaterial({ map: boxL }),
        new THREE.MeshBasicMaterial({ map: boxU }),
        new THREE.MeshBasicMaterial({ map: boxD }),
        new THREE.MeshBasicMaterial({ map: boxF }),
        new THREE.MeshBasicMaterial({ map: boxB }),
      ])
      // cube.position.z = -100

      this.scene.add(cube)

      // 摄像机
      this.camera = new THREE.PerspectiveCamera(
        70, // 视野大小
        window.innerWidth / window.innerHeight, // 视野比例
        1,
        2000
      )
      // 设置摄像机位置
      this.camera.position.set(0, 0, 10)

      this.createControls(this.camera)
    },

    animate() {
      requestAnimationFrame(this.animate)

      this.controls.update()

      // stats.update()

      this.render()
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },

    createControls(camera) {
      this.controls = new TrackballControls(camera, this.renderer.domElement)
      this.controls.rotateSpeed = 2
      this.controls.zoomSpeed = 1.2
      this.controls.panSpeed = 0.8
      this.controls.dynamicDampingFactor = 0.1
      this.controls.maxDistance = 600

      this.controls.keys = ['KeyA', 'KeyS', 'KeyD']
    },
  },
}
</script>
<style lang="less" scoped>
#container {
  font-size: 0;
}
</style>
