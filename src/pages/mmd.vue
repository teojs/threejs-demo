<template>
  <div id="container" />
  <button
    id="startButton"
    @click="play">
    播放/暂停
  </button>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper.js'
let camera
let scene
let renderer
let orbitControls
let helper
let ready = false
const clock = new THREE.Clock()

const skyScene = new THREE.Object3D()

export default {
  routeInfo: {
    meta: {
      title: 'Pages3d',
    },
    icon: 'el-icon-menu',
    hidden: true,
    sort: 1,
  },
  components: {},
  data() {
    return {
      isStarted: false,
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.$nextTick(() => {
      window.Ammo().then(AmmoLib => {
        window.Ammo = AmmoLib
        this.init()
        this.animate()
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
      ready = !ready
    },
    init() {
      // 创建渲染器，添加抗锯齿
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true
      // renderer.outputEncoding = THREE.sRGBEncoding
      // renderer.toneMapping = THREE.ACESFilmicToneMapping
      // renderer.shadowMap.type = THREE.PCFSoftShadowMap

      this.container = document.getElementById('container')
      this.container.appendChild(renderer.domElement)

      // 透视
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        20000
      )

      camera.position.set(0, 20, 60)

      // 创建场景
      scene = new THREE.Scene()

      // 直接给场景添加皮肤
      // scene.background = new THREE.Color(0xffffff)

      const listener = new THREE.AudioListener()
      camera.add(listener)
      scene.add(skyScene)

      // // 光照探针
      // const lightProbe = new THREE.LightProbe()
      // scene.add(lightProbe)

      // 点光
      const pointLight = new THREE.PointLight(0xffffff, 1, 150)
      pointLight.position.set(50, 100, -40)
      pointLight.castShadow = true
      scene.add(pointLight)
      scene.add(new THREE.PointLightHelper(pointLight, 1))

      // 均匀光
      scene.add(new THREE.AmbientLight(0xffffff, 0.6))

      // mmd
      // const audioParams = { delayTime: (160 * 1) / 30 }
      const audioParams = { delayTime: 0 }
      const loader = new MMDLoader()

      helper = new MMDAnimationHelper({
        afterglow: 2.0,
      })

      // 加载角色
      loader.loadWithAnimation(
        './image/mmd/宵宫/宵宫.pmx',
        ['./image/vmd/倾杯.vmd'],
        function(mmd) {
          const mesh = mmd.mesh
          // mesh.position.set(0, -10, 0)
          mesh.castShadow = true
          mesh.receiveShadow = true
          scene.add(mesh)

          helper.add(mesh, {
            animation: mmd.animation,
            physics: true,
          })

          // 加载运镜

          loader.loadAnimation(
            ['./image/vmd/倾杯_相机.vmd'],
            camera,
            function(cameraAnimation) {
              // helper.add(camera, {
              //   animation: cameraAnimation,
              // })

              new THREE.AudioLoader().load(
                './image/audio/倾杯.wav',
                function(buffer) {
                  const audio = new THREE.Audio(listener).setBuffer(buffer)

                  helper.add(audio, audioParams)
                  scene.add(mesh)

                  // ready = true
                }
              )
            }
          )

          const ikHelper = helper.objects.get(mesh).ikSolver.createHelper()
          ikHelper.visible = false
          scene.add(ikHelper)

          const physicsHelper = helper.objects.get(mesh).physics.createHelper()
          physicsHelper.visible = false
          scene.add(physicsHelper)
        }
      )

      // 加载舞台

      new MMDLoader().load(
        './image/stage/简约时尚舞台/Stage.pmx',
        function(mesh) {
          // mesh.scale.set(0.1, 0.1, 0.1)
          mesh.position.set(0, 0, 50)
          mesh.castShadow = true
          mesh.receiveShadow = true
          scene.add(mesh)
        }
      )

      // 镜头控制器
      orbitControls = new OrbitControls(camera, renderer.domElement)
      orbitControls.enableDamping = true
      orbitControls.dampingFactor = 0.05
      orbitControls.rotateSpeed = 0.3
      orbitControls.zoomSpeed = 2
      orbitControls.enablePan = true

      // this.animate()

      window.addEventListener('resize', this.onWindowResize)
    },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)

      this.render()
    },
    render() {
      if (ready) {
        helper.update(clock.getDelta())
      }
      renderer.render(scene, camera)
    },
    animate() {
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
  position: fixed;
  bottom: 100px;
  left: 50%;
  margin-left: -100px;
  background: #fff;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #000;
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 10px 20px;
}
</style>
