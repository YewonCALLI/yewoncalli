const canvasElement = document.getElementById("canvas");

import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/OBJLoader.js";
import { EffectComposer } from "https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/ShaderPass.js";

// Define a basic pixelation shader
const PixelShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: null },
    pixelSize: { value: 1 },
  },
  vertexShader: `
varying highp vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  fragmentShader: `
uniform sampler2D tDiffuse;
uniform float pixelSize;
uniform vec2 resolution;
varying highp vec2 vUv;
void main(){
    vec2 dxy = pixelSize / resolution;
    vec2 coord = dxy * floor(vUv / dxy);
    gl_FragColor = texture2D(tDiffuse, coord);
}
`,
};
let scene, camera, renderer, controls, points;
let pointSize = 0.1;
let grow = true;
let verticesArray = [];
let selectedIndices = new Set(); // 선택된 점의 인덱스 저장
let animationAmplitude = 0.1; // 애니메이션의 최대 진폭

let composer, pixelPass;

init();
animate();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 9;
  camera.position.y = 4;
  camera.position.x = -5;

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  canvasElement.appendChild(renderer.domElement);

  // Setup composer
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  // Adding pixelation effect
  pixelPass = new ShaderPass(PixelShader);
  pixelPass.uniforms["resolution"].value = new THREE.Vector2(
    window.innerWidth,
    window.innerHeight
  );
  pixelPass.uniforms["pixelSize"].value = 2; // Example pixel size
  composer.addPass(pixelPass);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(-3, 3, 0);

  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  createGridHelpers();

  var img = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("assets/model/coordinate2.png"),
    transparent: true,
    opacity: 0.9,
  });
  img.map.needsUpdate = true; //ADDED
  img.transparent = true;

  var img2 = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture("assets/model/coordinate1.png"),
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
    doubleSide: true,
  });
  img2.map.needsUpdate = true; //ADDED
  img2.transparent = true;

  const material = new THREE.LineBasicMaterial({ color: 0x000000 });

  const points = [];
  points.push(new THREE.Vector3(-10, -4, -10));
  points.push(new THREE.Vector3(-10, 16, -10));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);
  scene.add(line);

  const points4 = [];
  points4.push(new THREE.Vector3(-10, -4, -10));
  points4.push(new THREE.Vector3(-10, -4, 10));
  const geometry4 = new THREE.BufferGeometry().setFromPoints(points4);
  const line4 = new THREE.Line(geometry4, material);
  scene.add(line4);

  const points2 = [];
  for (let i = 0; i <= 20; i++) {
    points2.push(new THREE.Vector3(-9.5, -4 + i, -10));
    points2.push(new THREE.Vector3(-10.5, -4 + i, -10));
    const geometry = new THREE.BufferGeometry().setFromPoints(points2);
    scene.add(new THREE.Line(geometry, material));
    points2.pop();
    points2.pop();
  }

  const points3 = [];
  for (let i = 0; i <= 20; i++) {
    points3.push(new THREE.Vector3(-10.5, -4, -10 + i));
    points3.push(new THREE.Vector3(-9.5, -4, -10 + i));
    const geometry = new THREE.BufferGeometry().setFromPoints(points3);
    scene.add(new THREE.Line(geometry, material));
    points3.pop();
    points3.pop();
  }

  // plane
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), img);
  plane.overdraw = true;
  plane.position.y = -4;
  plane.position.x = 2;
  plane.position.z = -10.5;
  scene.add(plane);

  var plane2 = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), img2);
  plane2.overdraw = true;
  plane2.rotation.z = Math.PI / 2;
  plane2.rotation.x = -Math.PI / 2;
  plane2.position.y = -4.5;
  plane2.position.x = -11.5;
  plane2.position.z = -7;
  scene.add(plane2);

  const loader = new OBJLoader();
  loader.load(
    "assets/model/Heart.obj",
    function (object) {
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          const vertices = child.geometry.attributes.position.array;
          createVertexPoints(vertices);
        }
      });
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log("An error happened");
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  if (points) {
    if (pointSize > 0.15 || pointSize < 0.05) grow = !grow;
    pointSize += grow ? 0.001 : -0.001;
    points.material.size = pointSize;

    // 흘러내리는 듯한 애니메이션 적용
    const positions = points.geometry.attributes.position.array;
    selectedIndices.forEach((index) => {
      positions[index * 3 + 1] =
        verticesArray[index * 3 + 1] +
        Math.sin(Date.now() * 0.002) * animationAmplitude;
    });
    points.geometry.attributes.position.needsUpdate = true;
  }

  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    renderer.setSize(sizes.width, sizes.height)
  })


  controls.update();
  composer.render();
}

function createVertexPoints(vertices) {
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xff0000, // 빨간색
    size: pointSize,
  });

  const pointsGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(vertices);
  pointsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  verticesArray = vertices.slice(); // 원본 위치 복사
  points = new THREE.Points(pointsGeometry, pointsMaterial);
  scene.add(points);

  // 무작위 점 선택
  for (let i = 0; i < positions.length / 3; i++) {
    if (Math.random() < 0.05) {
      // 10% 확률로 선택
      selectedIndices.add(i);
    }
  }
}

function createGridHelpers() {
  const size = 20;
  const divisions = 20;
  const colorCenterLine = 0x2eff2e;
  const colorGrid = 0x2eff2e;

  const gridHelperXY = new THREE.GridHelper(
    size,
    divisions,
    colorCenterLine,
    colorGrid
  );
  const gridHelperXZ = new THREE.GridHelper(
    size,
    divisions,
    colorCenterLine,
    colorGrid
  );
  const gridHelperYZ = new THREE.GridHelper(
    size,
    divisions,
    colorCenterLine,
    colorGrid
  );

  gridHelperXY.position.y = -size / 5;
  gridHelperXZ.rotation.x = Math.PI / 2;
  gridHelperXZ.position.y = size / 2 - size / 5;
  gridHelperXZ.position.z = -size / 2;
  gridHelperYZ.rotation.z = Math.PI / 2;
  gridHelperYZ.position.x = size / 2;
  gridHelperYZ.position.y = size / 2 - size / 5;

  scene.add(gridHelperXY);
  scene.add(gridHelperXZ);
  scene.add(gridHelperYZ);
}
