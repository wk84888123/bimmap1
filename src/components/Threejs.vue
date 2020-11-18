<template>
    <div @mousemove='onDocumentMouseMove' @dblclick="openLayer">
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

      }
    },
    methods: {
      init: function () {
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
        // let AxesHelper = new THREE.AxesHelper(6000);
        // this.scene.add(AxesHelper);

        this.gui=new GUI();
        this.gui.domElement.style="position:absolute;right:0px";
        /**
         * 光源设置
         */
          //点光源
        let point = new THREE.PointLight(0xffffff);
        point.position.set(7000, 7000, 7000); //点光源位置
        this.scene.add(point); //点光源添加到场景中
        //环境光
        let ambient = new THREE.AmbientLight(0x44444444);
        this.scene.add(ambient);

        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(400, 200, 300);
        this.scene.add(directionalLight);
        // 方向光2
        directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(-400, -200, -300);
        this.scene.add(directionalLight);
        // let light =new THREE.DirectionalLight(0xffffff,2)
        // light.position.set(20,20,50);
        //
        // light=new THREE.DirectionalLight(0xffffff,2);
        // light.position.set();

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0xb9d3ff, 1);

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
        mtMaterial.load('/model/bqtestobj.mtl', (materials) =>{
          let object = new OBJLoader();
          object.setMaterials(materials);
          object.load('/model/bqtestobj.obj', (obj) =>{
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

            if (this._data.INTERSECTED != intersects[0].object) {

              if (this._data.INTERSECTED) this._data.INTERSECTED.material.emissive.setHex(this._data.INTERSECTED.currentHex);

              this._data.INTERSECTED = intersects[0].object;
              this._data.INTERSECTED.currentHex = this._data.INTERSECTED.material.emissive.getHex();
              this._data.INTERSECTED.material.emissive.setHex(0xff0000);

              // console.log(id);
              // let data;
              // let uuid=this._data.INTERSECTED.uuid;
              // for(let items of this.object.children){
              //   if(items.uuid===uuid){
              //     data=items.userData;
              //   }
              // }
              //
              // let data_arr=[],i=0;
              // for(let a in data){
              //
              //   data_arr[i++]=a+"";
              //   this.layerContent(a+"");
              //   data_arr[i++]=data[""+a]+"";
              //   this.layerContent(data[""+a]+"");
              // }
              // i=0;
              //
              // console.log(data_arr);

              // let str=JSON.stringify(data);
            //   let xPos = event.layerX + "px";
            //   let yPos = event.layerY + "px";
            //   window.layer.open({
            //     type: 1,
            //     title: id,
            //     closeBtn: 1, //不显示关闭按钮
            //     shade: [0.3],
            //     area: ['300px', '200px'],
            //     offset: [yPos, xPos], //右下角弹出
            //     time: 5000, //2秒后自动关闭
            //     anim: 0,
            //     skin: 'myskin',
            //     scrollbar:false,
            //     content: str, //iframe的url，no代表不显示滚动条
            //
            //   });
            }


          } else {

            if (this._data.INTERSECTED) this._data.INTERSECTED.material.emissive.setHex(this._data.INTERSECTED.currentHex);

            this._data.INTERSECTED = null;

          }
        },
      openLayer:function () {
        if(!this._data.INTERSECTED){
          alert("未选中对象");
          return false;
        }
        let data;

        let name=this._data.INTERSECTED.name;

        for(let items of this.object.children){
          if(items.name===name){
            data=items.userData;
          }
        }
        console.log("data");
        console.log(data);
        let data_a=[],i=0;
        for(let key in data){
          data_a[i++]=key+':'+data[key]+'\n';
          // console.log(data_a);
        }
        i=0;
        console.log(data_a);
        console.log(data_a.join(''));
        this.layerContent(data_a.join('<br>'));


      },
      layerContent(data) {
        let xPos = event.layerX + "px";
        let yPos = event.layerY + "px";

        console.log(data);

        let html = data
        ;

        window.layer.open({
          type: 0,
          title: data.name,
          closeBtn: 1, //不显示关闭按钮
          shade: [0],
          area: ['200px', '300px'],
          offset: [yPos, xPos], //右下角弹出
          // time: 2000, //2秒后自动关闭
          anim: 0,
          scrollbar: true,
          skin: 'myskin',
          content: html, //iframe的url，no代表不显示滚动条

        });
      }
    },
    mounted() {
      this.camera;
      this.scene;
      this.renderer;
      this.mesh;
      this.controls;
      this.THREE;
      this.raycaster;
      this.mouseVector;
      this.object;
      this.INTERSECTED;
      this.gui;
      this.init();
      this.animate();
      this.ObjectLoader('/model/bq.json');
      // this.OBJLoader();
    }
  }
</script>

<style scoped>
    #container {
        height: 550px;
        width: 100%;
    }
</style>