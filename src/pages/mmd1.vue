<template>
  <div id="container" />
  <button
    id="startButton"
    @click="play" />
  <loading
    v-if="process !== '0%'"
    :process="process" />
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
let container
let camera
let scene
let renderer
let orbitControls
let helper
let playing = false
let bgm
const clock = new THREE.Clock()

export default {
  routeInfo: {
    meta: {
      title: '我的MMD是网页做的',
    },
    hidden: true,
    sort: 1,
  },
  components: {},
  data() {
    return {
      isStarted: false,
      process: '100%',
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.$nextTick(() => {
      window.Ammo().then(AmmoLib => {
        this.init()
      })
    })
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {
    play() {
      if (!this.hasInit) {
        this.animate()
      }

      playing = !playing
      helper.enable('cameraAnimation', playing)
      helper.enable('animation', playing)
      if (bgm) {
        if (bgm.isPlaying) {
          bgm.pause()
        } else {
          bgm.play()
        }
      }
    },
    init() {
      // 创建渲染器，添加抗锯齿
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        logarithmicDepthBuffer: true,
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true

      container = document.getElementById('container')
      container.appendChild(renderer.domElement)

      // 透视
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        20000
      )
      camera.position.set(0, 15, 20)

      // 创建场景
      scene = new THREE.Scene()
      // 直接给场景添加皮肤
      scene.background = new THREE.Color(0xffffff)

      // 点光
      const pointLight = new THREE.PointLight(0xffffff, 1, 150)
      pointLight.position.set(50, 100, -40)
      pointLight.castShadow = true
      scene.add(pointLight)
      scene.add(new THREE.PointLightHelper(pointLight, 1))

      // 均匀光
      scene.add(new THREE.AmbientLight(0xffffff, 0.8))

      // mmd
      const loader = new MMDLoader()

      helper = new MMDAnimationHelper({
        afterglow: 2.0,
      })
      helper.enable('animation', false)
      helper.enable('cameraAnimation', false)

      // 加载角色
      loader.loadWithAnimation(
        './model/心海/珊瑚宫心海.pmx',
        ['./motion/我的悲伤是水做的.vmd'],
        function(mmd) {
          const mesh = mmd.mesh
          mesh.castShadow = true
          mesh.receiveShadow = true
          scene.add(mesh)
          helper.add(mesh, {
            animation: mmd.animation,
            physics: true,
          })

          // 加载音乐
          const listener = new THREE.AudioListener()
          camera.add(listener)
          bgm = new THREE.PositionalAudio(listener)
          new THREE.AudioLoader().load(
            './audio/我的悲伤是是水做的.mp3',
            function(buffer) {
              bgm.setBuffer(buffer)
              bgm.setRefDistance(20)
              bgm.setLoop(true)
              mesh.add(bgm)
            }
          )
        }
      )

      // 加载运镜
      loader.loadAnimation(
        ['./camera/我的悲伤是水做的_镜头_胶龙兽.vmd'],
        camera,
        function(cameraAnimation) {
          helper.add(camera, {
            animation: cameraAnimation,
          })
        }
      )

      // 加载舞台

      new MMDLoader().load('./stage/简约时尚舞台/Stage.pmx', function(mesh) {
        mesh.position.set(0, 0, 50)
        mesh.castShadow = true
        mesh.receiveShadow = true
        scene.add(mesh)
      })

      // 镜头控制器
      orbitControls = new OrbitControls(camera, renderer.domElement)
      orbitControls.enableDamping = true
      orbitControls.dampingFactor = 0.2
      orbitControls.rotateSpeed = 0.6
      orbitControls.zoomSpeed = 2
      orbitControls.enablePan = true
      orbitControls.target.set(0, 15, 0)

      THREE.DefaultLoadingManager.onProgress = (
        url,
        itemsLoaded,
        itemsTotal
      ) => {
        this.process = 100 - (itemsLoaded / itemsTotal) * 100 + '%'
        if (this.process === '0%') {
          this.animate()
        }
      }

      const api = {
        camera: true,
      }
      const gui = new GUI()
      gui.add(api, 'camera').onChange(function() {
        helper.enable('cameraAnimation', api.camera)
      })

      window.addEventListener('resize', this.onWindowResize)
    },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)

      this.render()
    },
    render() {
      helper.update(clock.getDelta())
      renderer.render(scene, camera)
    },
    animate() {
      this.hasInit = true

      requestAnimationFrame(this.animate)

      orbitControls.update()

      this.render()
    },
  },
  computed: {},
  watch: {},
}
</script>

<style scoped lang='less'>
#container {
  font-size: 0;
  position: relative;
}
#startButton {
  width: 50px;
  height: 50px;
  background: url(/image/icon_play.png) no-repeat center center / cover;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  // opacity: 0;
  transition: 0.3s;
  &:hover {
    opacity: 1;
  }
}
</style>
