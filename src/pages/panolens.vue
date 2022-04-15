<template>
  <div id="container" />
  <div id="info">
    我是一条提示语
  </div>
</template>

<script>
import * as THREE from 'three'
import * as PANOLENS from 'panolens'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  routeInfo: {
    meta: {
      title: 'PagesPanolens',
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
    this.$nextTick(() => {
      this.container = document.getElementById('container')
      this.panorama = new PANOLENS.ImagePanorama('./image/skyTexture_2.jpg')
      this.viewer = new PANOLENS.Viewer({
        container: this.container,
        controlBar: false,
        // autoRotate: true,
        rotateSpeed: 100,
        dampingFactor: 1,
        momentum: false,
        // horizontalView: true,
        output: 'console',
      })
      this.viewer.add(this.panorama)
      this.viewer.outputPosition()

      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      this.camera.position.set(0, 30, 100)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))

      const infospot1 = new PANOLENS.Infospot(350, './image/point.png')
      infospot1.position.set(-959.15, -677.86, -4853.72)
      // infospot1.addHoverText('船')
      infospot1.addEventListener('click', function(e) {
        console.log(e)
      })
      infospot1.addHoverElement(document.getElementById('info'), 280)
      this.panorama.add(infospot1)

      // 渲染一个盒子作参照物
      this.box = new THREE.SphereGeometry(1, 32, 16)
      // this.boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      this.boxMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./image/skyTexture.jpg'),
      })
      this.cubeMesh = new THREE.Mesh(this.box, this.boxMaterial)
      this.cubeMesh.position.z = -5
      this.cubeMesh.position.x = -10
      this.cubeMesh.name = '盒子'
      this.panorama.add(this.cubeMesh)

      // 加载地标模型
      const colladaLoader = new GLTFLoader()
      colladaLoader.load('./image/anchor.gltf', object => {
        object.scene.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            child.material.metalness = 0.8
            child.name.includes('黄') &&
              (child.material.color = new THREE.Color(0xfffc00))
          }
        })
        object.scene.rotation.y = Math.PI / 2
        object.scene.position.x = 5
        object.scene.position.z = -4
        object.scene.addEventListener('click', function(e) {
          console.log(e)
        })
        this.panorama.add(object.scene)
      })
      // this.panorama.addEventListener('click', event => {
      //   console.log(event)
      //   this.cubeMesh.position.x = 10
      // })

      this.imageLittlePlanet = new PANOLENS.ImageLittlePlanet(
        './image/skyTexture.jpg'
      )
    })
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {},
  computed: {},
  watch: {},
}
</script>

<style scoped lang='less'>
#container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  cursor: move;
}
#info {
  background: white;
  width: 100px;
  padding: 10px 20px;
  border-radius: 4px;
  display: none;
}
</style>
