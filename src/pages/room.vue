<template>
  <div id="container" />
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

let camera,
  scene,
  renderer,
  orbitControls,
  dragControls,
  pointSprite,
  bicycle,
  meteorMaterial,
  cubeCamera,
  mirrorCamera
const mouse = new THREE.Vector2(1, 1)
const skyScene = new THREE.Object3D()
const startPoint = []
const raycaster = new THREE.Raycaster()
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
    return {}
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.init()
    this.animate()
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {
    init() {
      // 创建渲染器，添加抗锯齿
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.shadowMap.type = THREE.PCFSoftShadowMap

      this.container = document.getElementById('container')
      this.container.appendChild(renderer.domElement)

      // 透视
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        20000
      )

      camera.position.set(0, 8, 12)

      // 创建场景
      scene = new THREE.Scene()

      // 直接给场景添加皮肤
      // scene.background = textureCube

      scene.add(skyScene)
      // this.addMeteor()

      // 光照探针
      const lightProbe = new THREE.LightProbe()
      scene.add(lightProbe)

      // // 平行光
      // const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      // directionalLight.position.set(2, 5, 2)
      // directionalLight.castShadow = true
      // scene.add(directionalLight)
      // scene.add(new THREE.DirectionalLightHelper(directionalLight, 1))

      // 点光
      const pointLight = new THREE.PointLight(0xffffff, 2)
      pointLight.position.set(0, 0, 0)
      pointLight.castShadow = true
      scene.add(pointLight)
      // scene.add(new THREE.PointLightHelper(pointLight, 1))

      // 均匀光
      scene.add(new THREE.AmbientLight(0xffffff, 2))

      // 镜像摄像头
      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
        generateMipmaps: true,
        minFilter: THREE.UVMapping,
      })
      mirrorCamera = new THREE.CubeCamera(0.1, 20000, cubeRenderTarget)
      mirrorCamera.position.set(0, 0, 0)
      scene.add(mirrorCamera)

      // 房子
      const loader = new GLTFLoader()
      loader.load('./image/myroom.gltf', gltf => {
        const model = gltf.scene.children[0]
        model.scale.set(10, 10, 10)
        model.position.set(0, 0, 0)
        model.name = '房子'
        scene.add(model)
      })

      // 镜头控制器
      orbitControls = new OrbitControls(camera, renderer.domElement)
      orbitControls.enableDamping = true
      orbitControls.dampingFactor = 0.05
      orbitControls.rotateSpeed = -0.3
      orbitControls.zoomSpeed = 2
      orbitControls.enablePan = true

      window.addEventListener('resize', this.onWindowResize)
    },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)

      this.render()
    },
    render() {
      renderer.render(scene, camera)
    },
    animate() {
      requestAnimationFrame(this.animate)

      orbitControls.update()

      mirrorCamera && mirrorCamera.update(renderer, scene)

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
}
video {
  position: absolute;
  left: -2000px;
  top: -2000px;
}
</style>
