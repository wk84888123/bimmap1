<template>
    <div @mousemove='onDocumentMouseMove'>
        <v-spacer id="container"></v-spacer>
    </div>
</template>

<script>
  // import *as THREE from '_three@0.122.0@three'
  import *as THREE from 'three'
  import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
  import {GUI} from 'three/examples/jsm/libs/dat.gui.module'
  import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
  import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
  // import $ from'jquery';
  // import {GLTFLoader} from'three/examples/jsm/loaders/GLTFLoader'
  // import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
  // import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


  export default {
    name: "Threejs",
    data() {
      return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null,
        controls: null,
        THREE: null,
        raycaster:null,
        mouseVector:null,
        object:null,
        INTERSECTED:null,
        gui:null,
      }
    },
    methods: {
      init: function () {
        //  var camera;
        //   var scene;
        //   var renderer;
        //   var mesh;
        //   var controls;
        //   var THREE;
        //   var raycaster;
        //   var mouseVector;
        // var object;
        //   var INTERSECTED;
        //   var gui;
        let container = document.getElementById('container');
        container.style.height = window.innerHeight - 56 + 'px';

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
        this.camera.position.z = 1;

        //定义变量
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2();


        /**
         * 相机设置
         */
        let width = container.clientWidth; //窗口宽度
        let height = container.clientHeight; //窗口高度
        /**透视投影相机对象*/
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 200000);
        this.camera.position.set(10000, 10000, 2000); //设置相机位置
        this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)


        let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        let material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);


        //辅助轴
        let AxesHelper = new THREE.AxesHelper(6000);
        this.scene.add(AxesHelper);

        this.gui=new GUI();
        this.gui.domElement.style="position:absolute;right:0px";
        /**
         * 光源设置
         */
          //点光源
        let point = new THREE.PointLight(0xffffff);
        point.position.set(4000, 2000, 3000); //点光源位置
        this.scene.add(point); //点光源添加到场景中
        //环境光
        let ambient = new THREE.AmbientLight(0x444444);
        this.scene.add(ambient);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);


      },
      animate: function () {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
      },
      ObjectLoader: async function (url) {
        let loader = new THREE.ObjectLoader();

        loader.load(url, async obj => {
          obj.position.x = 0;
          obj.position.y = 0;
          obj.position.z = 0;
          obj.scale.x = 0.2;
          obj.scale.y = 0.2;
          obj.scale.z = 0.2;
          this.object=obj;
          console.log(this.object);
          this.scene.add(obj);
        });

      },
      OBJLoader: function () {
        let mtMaterial = new MTLLoader();
        mtMaterial.load('/model/pj1.json', function (materials) {
          let object = new OBJLoader();
          object.setMaterials(materials);
          object.load('/model/pj1.json', function (obj) {
            this.scene.add(obj);
          });
        });
      },
      getIntersects(x, y) {
        let container = document.getElementById('container');

        x = (x / container.clientWidth) * 2 - 1;
        y = -(y / container.clientHeight) * 2 + 1;
        this.mouseVector.set(x, y);
        this.raycaster.setFromCamera(this.mouseVector, this.camera);
        return this.raycaster.intersectObject(this.object, true);
      },
        onDocumentMouseMove(event) {
          event.preventDefault();
          const intersects = this.getIntersects(event.layerX, event.layerY);

          if (intersects.length > 0) {

            console.log(intersects);
            if (this._data.INTERSECTED != intersects[0].object) {

              if (this._data.INTERSECTED) this._data.INTERSECTED.material.emissive.setHex(this._data.INTERSECTED.currentHex);

              this._data.INTERSECTED = intersects[0].object;
              this._data.INTERSECTED.currentHex = this._data.INTERSECTED.material.emissive.getHex();
              this._data.INTERSECTED.material.emissive.setHex(0xff0000);

              window.layer.closeAll();
              let id=this._data.INTERSECTED.name;


              let uuid=this._data.INTERSECTED.uuid;
              console.log(uuid);
              let xPos = event.layerX + "px";
              let yPos = event.layerY + "px";
              window.layer.open({
                type: 1,
                title: false,
                closeBtn: 0, //不显示关闭按钮
                shade: [0],
                area: ['200px', '100px'],
                offset: [yPos, xPos], //右下角弹出
                time: 1000, //2秒后自动关闭
                anim: 0,
                skin: 'myskin',
                content: id, //iframe的url，no代表不显示滚动条

              });
            }


          } else {

            if (this._data.INTERSECTED) this._data.INTERSECTED.material.emissive.setHex(this._data.INTERSECTED.currentHex);

            this._data.INTERSECTED = null;

          }
        },
    },
    mounted() {
      this.init();
      this.animate();
      // this.ObjectLoader('/model/bq2-1.json');
      this.ObjectLoader('/model/bq2-2.json');
    }
  }
</script>

<style scoped>
    #container {
        height: 550px;
        width: 100%;
    }
</style>