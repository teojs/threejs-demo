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

let camera, scene, renderer, orbitControls, dragControls, pointSprite, bicycle
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
    this.render()
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
      // renderer.outputEncoding = THREE.sRGBEncoding
      // renderer.toneMapping = THREE.ACESFilmicToneMapping

      this.container = document.getElementById('container')
      this.container.appendChild(renderer.domElement)

      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        20000
      )

      camera.position.set(0, 0, 5)

      // 创建场景
      scene = new THREE.Scene()

      // 加载立方体皮肤
      const textureCube = new THREE.CubeTextureLoader()
        .setPath('./image/box/')
        .load([
          'scene1_pano2_f.jpg',
          'scene1_pano2_b.jpg',
          'scene1_pano2_u.jpg',
          'scene1_pano2_d.jpg',
          'scene1_pano2_l.jpg',
          'scene1_pano2_r.jpg',
        ])

      // 直接给场景添加皮肤
      // scene.background = textureCube

      scene.add(skyScene)
      this.addSky()

      this.textureLoader = new THREE.TextureLoader()
      // 加载立方体皮肤
      const boxF = this.textureLoader.load('./image/box/scene1_pano2_f.jpg')
      const boxB = this.textureLoader.load('./image/box/scene1_pano2_b.jpg')
      const boxL = this.textureLoader.load('./image/box/scene1_pano2_l.jpg')
      const boxR = this.textureLoader.load('./image/box/scene1_pano2_r.jpg')
      const boxU = this.textureLoader.load('./image/box/scene1_pano2_u.jpg')
      const boxD = this.textureLoader.load('./image/box/scene1_pano2_d.jpg')

      // 全景场景
      const geometry = new THREE.BoxGeometry(100, 100, 100, 8, 8, 8)
      // 按z轴翻转
      geometry.scale(1, 1, -1)
      const skyTexture = [
        new THREE.MeshBasicMaterial({ map: boxR }),
        new THREE.MeshBasicMaterial({ map: boxL }),
        new THREE.MeshBasicMaterial({ map: boxU }),
        new THREE.MeshBasicMaterial({ map: boxD }),
        new THREE.MeshBasicMaterial({ map: boxF }),
        new THREE.MeshBasicMaterial({ map: boxB }),
      ]
      // 渲染贴图
      const skyMesh = new THREE.Mesh(geometry, skyTexture)
      skyMesh.name = '全景盒子'
      scene.add(skyMesh)

      // 光照探针
      const lightProbe = new THREE.LightProbe()
      scene.add(lightProbe)

      // 直射光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
      directionalLight.position.set(100, 100, 100)
      scene.add(directionalLight)

      // 均匀光
      scene.add(new THREE.AmbientLight(0xffffff, 0.2))

      // // 渲染一个盒子作参照物
      // const box = new THREE.BoxGeometry()
      // const cube = new THREE.Mesh(box, [
      //   new THREE.MeshBasicMaterial({ map: boxR }),
      //   new THREE.MeshBasicMaterial({ map: boxL }),
      //   new THREE.MeshBasicMaterial({ map: boxU }),
      //   new THREE.MeshBasicMaterial({ map: boxD }),
      //   new THREE.MeshBasicMaterial({ map: boxF }),
      //   new THREE.MeshBasicMaterial({ map: boxB }),
      // ])
      // // cube.position.z = -10
      // scene.add(cube)

      // 反光球体
      const ballSphereGeometry = new THREE.SphereGeometry(1, 64, 32)
      const bollMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0,
        envMap: textureCube,
        envMapIntensity: 1,
      })
      const ball = new THREE.Mesh(ballSphereGeometry, bollMaterial)
      // ball.position.z = -2
      ball.name = '反光球体'
      scene.add(ball)

      // 添加一个问号标点
      const pointMap = new THREE.TextureLoader().load('./image/point.png')
      const pointMaterial = new THREE.SpriteMaterial({
        map: pointMap,
        color: 0xffffff,
      })
      pointSprite = new THREE.Sprite(pointMaterial)
      pointSprite.scale.set(1, 1, 1)
      pointSprite.position.set(0, 1.5, 0)
      pointSprite.name = '问号标点1'
      scene.add(pointSprite)

      // 添加一个问号标点2
      const pointSprite1 = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: new THREE.TextureLoader().load('./image/point.png'),
          color: 0xffffff,
        })
      )
      pointSprite1.scale.set(1, 1, 1)
      pointSprite1.position.set(10, 10, 10)
      pointSprite1.name = '问号标点2'
      scene.add(pointSprite1)

      // 添加一辆自行车
      const loader = new GLTFLoader()
      loader.load('./image/Bicycle.glb', gltf => {
        bicycle = gltf.scene.children[0]
        bicycle.scale.set(1, 1, 1)
        bicycle.position.set(0, -50, 0)
        bicycle.name = '自行车'
        scene.add(bicycle)
      })

      // 镜头控制器
      orbitControls = new OrbitControls(camera, renderer.domElement)
      orbitControls.enableDamping = true
      orbitControls.dampingFactor = 0.1
      orbitControls.rotateSpeed = -0.3
      orbitControls.zoomSpeed = 2
      // orbitControls.minDistance = 1
      // orbitControls.maxDistance = 30
      orbitControls.enablePan = true
      orbitControls.autoRotate = true
      orbitControls.autoRotateSpeed = 0.1

      // // 拖动控制器
      // const dragControls = new DragControls([ball], camera, renderer.domElement)
      // dragControls.addEventListener('drag', this.render)

      this.animate()

      window.addEventListener('resize', this.onWindowResize)
      window.addEventListener('mousemove', this.raycasterEventEnd, false)
    },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)

      this.render()
    },
    render() {
      bicycle && (bicycle.rotation.y += 0.01)
      renderer.render(scene, camera)
    },
    animate() {
      requestAnimationFrame(this.animate)
      orbitControls.update()

      this.render()
    },
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
    raycasterEventEnd(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children)
      if (intersects.length > 0) {
        const object = intersects[0].object
        console.log(object.name)
        if (object.name === '问号标点1') {
          pointSprite.scale.set(2, 2, 2)
        } else if (object.name === '问号标点2') {
          console.log('问号标点2')
        } else {
          pointSprite.scale.set(1, 1, 1)
        }
      }
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
