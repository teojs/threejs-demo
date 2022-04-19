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

let camera,
  scene,
  renderer,
  orbitControls,
  dragControls,
  pointSprite,
  bicycle,
  meteorMaterial,
  cubeCamera
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
      renderer.shadowMap.type = THREE.PCFSoftShadowMap

      this.container = document.getElementById('container')
      this.container.appendChild(renderer.domElement)

      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        20000
      )

      camera.position.set(0, 4, 6)

      // 创建场景
      scene = new THREE.Scene()

      // 直接给场景添加皮肤
      // scene.background = textureCube

      scene.add(skyScene)
      // this.addSky()
      // this.addMeteor()

      // 光照探针
      const lightProbe = new THREE.LightProbe()
      scene.add(lightProbe)

      // 平行光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 4)
      directionalLight.position.set(5, 5, 5)
      directionalLight.castShadow = true
      scene.add(directionalLight)
      scene.add(new THREE.DirectionalLightHelper(directionalLight, 1))

      // // 点光
      // const pointLight = new THREE.PointLight(0xffffff, 1)
      // pointLight.position.set(-10, 10, -10)
      // pointLight.castShadow = true
      // scene.add(pointLight)
      // scene.add(new THREE.PointLightHelper(pointLight, 1))

      // 均匀光
      scene.add(new THREE.AmbientLight(0xffffff, 2))

      // 平面
      const planeGeo = new THREE.PlaneGeometry(20, 20)
      const stageGeo = new THREE.CylinderGeometry(4, 4, 0.1, 32)
      const stageMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
      const stage = new THREE.Mesh(stageGeo, stageMaterial)
      stage.position.set(0, 0, 0)
      stage.receiveShadow = true
      scene.add(stage)

      const plane = new THREE.Mesh(planeGeo, stageMaterial)
      plane.rotation.x = -Math.PI / 2
      plane.receiveShadow = true
      scene.add(plane)

      // 添加一辆自行车
      const loader = new GLTFLoader()
      loader.load('./image/Bicycle.glb', gltf => {
        bicycle = gltf.scene.children[0]
        bicycle.scale.set(0.1, 0.1, 0.1)
        bicycle.position.set(0, 0.1, 0)
        bicycle.name = '自行车'
        bicycle.castShadow = true
        bicycle.receiveShadow = true
        scene.add(bicycle)
      })

      // 反光球体
      const ballSphereGeometry = new THREE.SphereGeometry(1, 64, 32)
      const bollMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0,
        envMapIntensity: 1,
      })
      const ball = new THREE.Mesh(ballSphereGeometry, bollMaterial)
      ball.position.set(2, 1, 2)
      ball.scale.set(0.3, 0.3, 0.3)
      ball.castShadow = true
      ball.name = '反光球体'
      scene.add(ball)

      // 镜头控制器
      orbitControls = new OrbitControls(camera, renderer.domElement)
      orbitControls.enableDamping = true
      orbitControls.dampingFactor = 0.1
      orbitControls.rotateSpeed = 0.3
      orbitControls.zoomSpeed = 2
      // orbitControls.minDistance = 1
      // orbitControls.maxDistance = 30
      orbitControls.enablePan = true
      // orbitControls.autoRotate = true
      // orbitControls.autoRotateSpeed = 0.1

      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256)
      cubeRenderTarget.texture.type = THREE.HalfFloatType

      cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget)

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

      // 流星雨
      // meteorMaterial.uniforms.time.value += 0.01
      // if (meteorMaterial.uniforms.time.value >= 3) {
      //   meteorMaterial.uniforms.time.value = -Math.random()
      // }
      // const forword = camera.getWorldDirection(new THREE.Vector3(0, 0, 0))
      // const right = forword.cross(camera.up)
      // const downLeft = right.add(camera.up)
      // meteorMaterial.uniforms.direction.value = downLeft

      renderer.render(scene, camera)
    },
    animate() {
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
        bottomColor: { type: 'c', value: new THREE.Color(0x98a856) },
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
    // 流星雨
    addMeteor() {
      const m = {}
      m.uniforms = {
        map: {
          type: 't',
          value: null,
        },
        offsetRepeat: {
          type: 'v4',
          value: new THREE.Vector4(0, 0, 1, 1),
        },
        time: {
          type: 'f',
          value: 0,
        },
        color: {
          type: 'c',
          value: new THREE.Color(16777215),
        },
        size: {
          type: 'f',
          value: 0.5,
        },
        scale: {
          type: 'f',
          value: 500,
        },
        direction: {
          type: 'v3',
          value: new THREE.Vector3(0, 0, 1),
        },
      }
      m.vertexShader =
        'uniform float time;' +
        'uniform float size;' +
        'uniform float scale;' +
        'uniform vec3 direction; ' +
        'attribute float pulseSpeed; ' +
        'attribute float orbitSpeed; ' +
        'attribute float orbitSize;' +
        'void main() { ' +
        'vec3 animatedPosition = position;' +
        'animatedPosition.xyz += direction * time * orbitSize;' +
        'vec3 transformed = vec3( animatedPosition ); ' +
        'vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 ); ' +
        ' gl_Position =  projectionMatrix * mvPosition; ' +
        'float animatedSize = size * ( scale / - mvPosition.z ); ' +
        'animatedSize *= 1.0 + sin(time * pulseSpeed);' +
        ' gl_PointSize = animatedSize;' +
        ' }'
      m.fragmentShader =
        'uniform sampler2D map; uniform vec4 offsetRepeat; uniform vec3 color; void main() { gl_FragColor = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy ); gl_FragColor.rgb *= color.rgb; }'

      let e, t, n, i, o, a, s, r, l, c, u, d, p, h
      for (
        h = new THREE.TextureLoader(),
        p = h.load('./image/meteor.png'),
        o = 150,
        e = new THREE.BufferGeometry(),
        c = new Float32Array(3 * o),
        u = new Float32Array(o),
        a = new Float32Array(o),
        s = new Float32Array(o),
        t = n = 0,
        d = o;
        d >= 0 ? d > n : n > d;
        t = d >= 0 ? ++n : --n
      ) {
        l = 3 * t
        c[l] = 1000 * Math.random() - 500
        c[l + 1] = 1000 * Math.random() - 500
        c[l + 2] = 1000 * Math.random() - 500
        u[t] = 1 + 1 * Math.random()
        a[t] = -60 - 150 * Math.random()
        s[t] = -2 - 4 * Math.random()
        e.setAttribute('position', new THREE.BufferAttribute(c, 3))
        e.setAttribute('pulseSpeed', new THREE.BufferAttribute(u, 1))
        e.setAttribute('orbitSize', new THREE.BufferAttribute(a, 1))
        e.setAttribute('orbitSpeed', new THREE.BufferAttribute(s, 1))
        i = new THREE.ShaderMaterial({
          uniforms: THREE.UniformsUtils.clone(m.uniforms),
          vertexShader: m.vertexShader,
          fragmentShader: m.fragmentShader,
          blending: THREE.AdditiveBlending,
          transparent: true,
        })
        i.uniforms.map.value = p
        i.uniforms.size.value = 8
        r = new THREE.Points(e, i)
        scene.add(r)
        scene.children.pop()
        scene.children.unshift(r)
        meteorMaterial = i
      }
    },
    raycasterEventEnd(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children)
      if (intersects.length > 0) {
        const object = intersects[0].object
        console.log(object.name)
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
