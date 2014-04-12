/*global document, window, XMLHttpRequest, console, THREE, requestAnimationFrame, THREEx*/
var container = document.getElementById("three"),
    cHeight = window.getComputedStyle(container).height;
cHeight = cHeight.substring(0, cHeight.length - 2);

var viewAngle = 45,
    aspect = window.innerWidth / cHeight,
    near = 0.1,
    far = 1000;

var camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize(window.innerWidth, cHeight);
container.appendChild(renderer.domElement);

var geometry = new THREE.CubeGeometry(2, 2, 2);
var cubeMaterial1 = new THREE.MeshLambertMaterial({
    color: 0xff9900,
});
var cubeMaterial2 = new THREE.MeshBasicMaterial({
    color: 0xff9900,
    wireframe: true
});
var cube = new THREE.Mesh(geometry, cubeMaterial1);
scene.add(cube);

cube.mToggle = function () {
    if (this.material == cubeMaterial1) {
        this.material = cubeMaterial2;
    } else {
        this.material = cubeMaterial1;
    }
};

var light = new THREE.PointLight(0xffff00);
light.position.set(10, 0, 10);
scene.add(light);

camera.position.z = 5;

var particleCount = 100,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
            "assets/images/particle.png"
        ),
        blending: THREE.AdditiveBlending,
        transparent: true
    });

for (var p = 0; p < particleCount; p++) {
    //randomize particle positions
    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);
    particle.velocity = new THREE.Vector3(
        0, // x
        -Math.random(), // y: random vel
        0); // z
    // add it to the geometry
    particles.vertices.push(particle);
}
var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);

particleSystem.sortParticles = true;

scene.add(particleSystem);

container.addEventListener("mouseover", function(){cube.mToggle();});
container.addEventListener("mouseout", function(){cube.mToggle();});

function render() {
    requestAnimationFrame(render);
    particleSystem.rotation.y += 0.01;

    var pCount = particleCount - 1;
    while (pCount) {

        // get the particle
        var particle =
            particles.vertices[pCount];

        // check if we need to reset
        if (particle.y < -200) {
            particle.y = 200;
            particle.y = 0;
        }

        // update the velocity with
        // a splat of randomniz
        // particle.velocity.x -= Math.random() * 0.1;

        // and the position
        particle.add(particle.velocity);
        pCount--;
    }

    // flag to the particle system
    // that we've changed its vertices.
    particleSystem.geometry.__dirtyVertices = true;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
render();

THREEx.WindowResize(renderer, camera);