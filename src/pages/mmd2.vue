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
const skyScene = new THREE.Object3D()
const clock = new THREE.Clock()

export default {
  routeInfo: {
    meta: {
      title: '还是你的笑容最可爱',
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
      // renderer.outputEncoding = THREE.sRGBEncoding
      // renderer.toneMapping = THREE.ACESFilmicToneMapping
      // renderer.shadowMap.type = THREE.PCFSoftShadowMap

      container = document.getElementById('container')
      container.appendChild(renderer.domElement)

      // 透视
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        20000
      )
      camera.position.set(0, 100, 200)

      // 创建场景
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xf2f2f2)
      // 直接给场景添加皮肤
      // scene.add(skyScene)
      // this.addSky()

      // 点光
      const lightIntensity = 1
      const lightFar = 20
      const decay = 10
      const pointLights = [
        {
          position: [-8.5, 5, -3],
          color: 0xffbb53,
          lightFar: lightFar,
          lightIntensity: lightIntensity,
          decay: decay,
        },
        {
          position: [8.8, 5, -5.2],
          color: 0xffbb53,
          lightFar: lightFar,
          lightIntensity: lightIntensity,
          decay: decay,
        },
        {
          position: [18.5, -3, 36.5],
          color: 0xffbb53,
          lightFar: lightFar,
          lightIntensity: lightIntensity,
          decay: decay,
        },
        {
          position: [18.5, -3, 36.5],
          color: 0xffbb53,
          lightFar: lightFar,
          lightIntensity: lightIntensity,
          decay: decay,
        },
        {
          position: [28, -3, 36.5],
          color: 0xffbb53,
          lightFar: lightFar,
          lightIntensity: lightIntensity,
          decay: decay,
        },
        {
          position: [-28, -3, 36.5],
          color: 0xffbb53,
          lightFar: lightFar,
          lightIntensity: lightIntensity,
          decay: decay,
        },
        {
          position: [-18.5, -3, 36.5],
          color: 0xffbb53,
          lightFar: lightFar,
          lightIntensity: lightIntensity,
          decay: decay,
        },
        {
          position: [-20, 80, 60],
          color: 0xffffff,
          lightFar: 200,
          lightIntensity: 1,
          decay: 1,
        },
      ]
      pointLights.forEach(o => {
        const pointLight = new THREE.PointLight(
          o.color,
          o.lightIntensity,
          o.lightFar,
          o.decay
        )
        pointLight.position.set(...o.position)
        pointLight.castShadow = true
        scene.add(pointLight)
        // scene.add(new THREE.PointLightHelper(pointLight, 2))
      })

      // 均匀光
      scene.add(new THREE.AmbientLight(0xcfcfff, 0.5))

      // mmd
      const loader = new MMDLoader()

      helper = new MMDAnimationHelper({
        afterglow: 2.0,
      })
      helper.enable('animation', false)
      helper.enable('cameraAnimation', false)

      const mmdMaterial = {
        model: './model/胡桃/胡桃.pmx',
        motion: ['./motion/你的笑容动作+表情完整整合.vmd'],
        audio: './audio/还是你的笑容最可爱.mp3',
        stage: './stage/大喜场景/大喜场景.pmx',
      }

      // 加载角色
      loader.loadWithAnimation(mmdMaterial.model, mmdMaterial.motion, function(mmd) {
        const mesh = mmd.mesh
        mesh.castShadow = true
        // mesh.receiveShadow = true
        mesh.position.set(0, 0, 25)
        scene.add(mesh)
        helper.add(mesh, {
          animation: mmd.animation,
          physics: true,
        })

        // const ikHelper = helper.objects.get(mesh).ikSolver.createHelper()
        // scene.add(ikHelper)

        helper.enable('ik', false)

        // 加载背景音乐
        const listener = new THREE.AudioListener()
        camera.add(listener)
        bgm = new THREE.PositionalAudio(listener)
        new THREE.AudioLoader().load(mmdMaterial.audio, function(buffer) {
          bgm.setBuffer(buffer)
          bgm.setRefDistance(50)
          bgm.setLoop(true)
          mesh.add(bgm)
        })
      })

      // 加载舞台
      new MMDLoader().load(mmdMaterial.stage, function(mesh) {
        mesh.position.set(0, 0, 0)
        // mesh.castShadow = true
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
      orbitControls.maxDistance = 3000
      orbitControls.target.set(0, 15, 0)
      orbitControls.listenToKeyEvents(window)
      orbitControls.keys = {
        LEFT: 'KeyA',
        UP: 'KeyW',
        RIGHT: 'KeyD',
        BOTTOM: 'KeyS',
      }

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
    // 天空
    addSky() {
      const vertexShader =
        'varying vec3 vWorldPosition;void main() {vec4 worldPosition = modelMatrix * vec4( position, 1.0 );vWorldPosition = worldPosition.xyz;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}'
      const fragmentShader =
        'uniform vec3 topColor;uniform vec3 bottomColor;uniform float offset;uniform float exponent;varying vec3 vWorldPosition;void main() {float h = normalize( vWorldPosition + offset ).y;gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );}'
      const uniforms = {
        topColor: { type: 'c', value: new THREE.Color(0x000000) },
        bottomColor: { type: 'c', value: new THREE.Color(0x0077ff) },
        offset: { type: 'f', value: 500 },
        exponent: { type: 'f', value: 1 },
      }

      const skyGeo = new THREE.SphereBufferGeometry(4000, 32, 15)
      const skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide,
      })

      skyScene.add(new THREE.Mesh(skyGeo, skyMat))
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
