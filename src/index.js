import * as THREE from 'three'
// 导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.5, 100);

camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体、材质
const cubeGeometry = new THREE.BoxGeometry();
const cubeMetrial = new THREE.MeshBasicMaterial({color: 0xff0000});

// 根据几何体、材质 创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMetrial);

// 将几何体添加到场景中
// scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webgl渲染的canvas挂载到body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染出来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}


var loader = new GLTFLoader();
loader.load('/room.gltf', function ( gltf ) {
   
    gltf.scene.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.material.emissive =  child.material.color;
            child.material.emissiveMap = child.material.map ;
        }
    });
    scene.add(gltf.scene)

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

},)

render();


// https://blog.csdn.net/qq_35377699/article/details/83539581