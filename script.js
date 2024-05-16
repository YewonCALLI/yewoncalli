import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OBJLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/loaders/OBJLoader.js';

let scene, camera, renderer, heartMesh;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Load OBJ model
    const loader = new OBJLoader();
    loader.load(
        'path_to_your_heart_model.obj', // Path to your OBJ file
        function (obj) {
            // Apply some material if needed
            const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
            heartMesh = new THREE.Points(obj.children[0].geometry, material);
            scene.add(heartMesh);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened');
        }
    );

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
    if (heartMesh) {
        heartMesh.rotation.x += 0.01;
        heartMesh.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}