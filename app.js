// Three.js setup
let scene, renderer, controller, controls;
const canvas = document.getElementById('controllerCanvas');
const frontShell = document.getElementById('front-shell');
const buttonColor = document.getElementById('button-color');
const thumbstick = document.getElementById('thumbstick');

// Initialize Three.js scene
function init() {
    // Create scene
    scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 1.5, 3);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(400, 400);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // OrbitControls for interaction
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    // Load 3D model
    const loader = new THREE.GLTFLoader();
    loader.load('C:\Users\Jaspreet\OneDrive\Desktop\Codes\Testing\controller.glb', (gltf) => {
        controller = gltf.scene;
        controller.scale.set(1.5, 1.5, 1.5);
        scene.add(controller);
        updatePreview();  // Show default view
        animate(camera);  // Start animation/render loop
    });
}

// Animation/render loop
function animate(camera) {
    requestAnimationFrame(() => animate(camera));
    controls.update();  // Allow user to control the model view
    renderer.render(scene, camera);
}

// Function to update controller appearance
function updatePreview() {
    // Update front shell
    const shellColor = frontShell.value;
    updateMaterial(controller, 'frontShell', shellColor);

    // Update button color
    const buttonMatColor = buttonColor.value;
    updateMaterial(controller, 'buttons', buttonMatColor);

    // Handle thumbstick (styles or colors can be adjusted based on options)
    const thumbstickStyle = thumbstick.value;
    // Implement thumbstick style change if the model supports it
    // (You can toggle visibility or swap parts in the model)
}

// Function to update material
function updateMaterial(model, partName, color) {
    if (!model) return;
    model.traverse((child) => {
        if (child.isMesh && child.name.includes(partName)) {
            child.material.color.set(color);
        }
    });
}

// Event listeners to handle customization changes
frontShell.addEventListener('change', updatePreview);
buttonColor.addEventListener('change', updatePreview);
thumbstick.addEventListener('change', updatePreview);

// Start Three.js scene
init();
