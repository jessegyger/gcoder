function setup3js(buildPlateX = 256, buildPlateY = 256) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000);
	const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);


/////////BUILDPLATE TRANSPARENT BOTTOM////////////////
const cubeGeometry = new THREE.BoxGeometry(buildPlateX, buildPlateY, 1);

// Material for the grid (top side of the build plate)
const gridMaterial = new THREE.MeshBasicMaterial({
    color: 0x27292e,
    transparent: true,
    opacity: 1, // Adjust opacity for the top side
    side: THREE.FrontSide, // Only render from the top
});

// Material for the bottom side of the build plate (fully transparent)
const bottomMaterial = new THREE.MeshBasicMaterial({
    color: 0x27292e, // Any color, but opacity makes it invisible
    transparent: true,
    opacity: 0.8, // Fully transparent
    side: THREE.BackSide, // Only render from the bottom
});

// Create a material array for the cube
const materials = [
    bottomMaterial, // -X face
    bottomMaterial, // +X face
    bottomMaterial, // -Y face
    bottomMaterial, // +Y face
    gridMaterial,   // Top face (+Z)
    bottomMaterial, // Bottom face (-Z)
];

// Apply the grid texture to the top face material
const canvas = document.createElement('canvas');
canvas.width = buildPlateX; // Use buildPlateX here
canvas.height = buildPlateY; // Use buildPlateY here
const ctx = canvas.getContext('2d');

// Draw the grid on the canvas
ctx.fillStyle = '#33353a';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.lineWidth = 1;
ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
for (let i = 0; i <= buildPlateX; i += 10) { // Use buildPlateX here
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, buildPlateY); // Use buildPlateY here
    ctx.stroke();
}
for (let i = 0; i <= buildPlateY; i += 10) { // Use buildPlateY here
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(buildPlateX, i); // Use buildPlateX here
    ctx.stroke();
}

// Create and configure the texture
const gridTexture = new THREE.CanvasTexture(canvas);
gridTexture.repeat.set(1, 1);
gridTexture.wrapS = THREE.RepeatWrapping;
gridTexture.wrapT = THREE.RepeatWrapping;

gridMaterial.map = gridTexture;
gridMaterial.needsUpdate = true;

// Create the cube with the materials array
const cube = new THREE.Mesh(cubeGeometry, materials);
///////////////////////////////////////////////////////////////


    // Rotate cube by 90 degrees around Z-axis
    cube.rotation.z = Math.PI / 2;

    const DEFAULT_POSITION = {
        cube: { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: Math.PI / 2 },
        camera: { x: 70, y: 0, z: 500 }, 
        zoom: 0.5
    };

    camera.position.set(
        DEFAULT_POSITION.camera.x, 
        DEFAULT_POSITION.camera.y, 
        DEFAULT_POSITION.camera.z
    );    


const arrowLength = 30;
const arrowThickness = 0.5;

// Adjust arrow origins based on new rotation and translation
const xDir = new THREE.Vector3(0, -1, 0); // Flip X direction to point down
const xOrigin = new THREE.Vector3(-(buildPlateX / 2), buildPlateY / 2, 0.51);
const xArrow = new THREE.ArrowHelper(xDir, xOrigin, arrowLength, 0xFF0000);
cube.add(xArrow);

const yDir = new THREE.Vector3(1, 0, 0); // Flip Y direction to point right
const yOrigin = new THREE.Vector3(-(buildPlateX / 2), buildPlateY / 2, 0.51);
const yArrow = new THREE.ArrowHelper(yDir, yOrigin, arrowLength, 0x00FF00);
cube.add(yArrow);

const zDir = new THREE.Vector3(0, 0, 1); // Z remains unchanged
const zOrigin = new THREE.Vector3(-(buildPlateX / 2), buildPlateY / 2, 0.51);
const zArrow = new THREE.ArrowHelper(zDir, zOrigin, arrowLength, 0x0000FF);
cube.add(zArrow);

scene.add(cube);

	////Nozzle////
    const nozzleGeometry = new THREE.ConeGeometry(2, 10, 32);
    const nozzleMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    const nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial);

    nozzle.rotation.set(-Math.PI / 2, 0, 0); // Rotated 90 degrees around X (to point down) and 180 around Z
    nozzle.position.set(-(buildPlateX / 2), buildPlateY / 2, 5.5); // Position nozzle at new origin
    cube.add(nozzle);



    let angleX = DEFAULT_POSITION.cube.rotX, 
        angleY = DEFAULT_POSITION.cube.rotY, 
        angleZ = DEFAULT_POSITION.cube.rotZ;
    let positionX = DEFAULT_POSITION.cube.x, 
        positionY = DEFAULT_POSITION.cube.y;
    let zoom = DEFAULT_POSITION.zoom;
    let isDragging = false;
    let previousMouseX = null, previousMouseY = null;

    camera.position.z = zoom * 500;

function updateTransformations() {
        cube.rotation.set(angleX, angleY, angleZ);
        cube.position.set(positionX, positionY, 0);
        camera.position.z = zoom * 500;
        camera.updateProjectionMatrix();
        
        // Add raycasting update
        if (typeof mouse !== 'undefined' && (mouse.x !== 0 || mouse.y !== 0)) {
            updateRaycasting();
        }
    }

    function renderIfNeeded() {
        renderer.render(scene, camera);
    }

    function setupEventListeners(element) {
    let isRightClickDragging = false;
    let rightClickStartX = null, rightClickStartY = null;		
		
    element.addEventListener('mousedown', (event) => {
        if (event.button === 0) {
            isDragging = true;
            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
        } else if (event.button === 2) {
            isRightClickDragging = true;
            rightClickStartX = event.clientX;
            rightClickStartY = event.clientY;
            event.preventDefault(); // Prevent context menu
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        isRightClickDragging = false;
        previousMouseX = null;
        previousMouseY = null;
        rightClickStartX = null;
        rightClickStartY = null;
    });


    window.addEventListener('mousemove', (event) => {
        if (isDragging && previousMouseX !== null && previousMouseY !== null) {
            const deltaX = event.clientX - previousMouseX;
            const deltaY = event.clientY - previousMouseY;

            if (event.shiftKey) {
                // Left-click + shift key rotation logic
                angleZ += deltaX * 0.01;
                angleX += deltaY * 0.01;
            } else {
    				
                const currentZ = camera.position.z;
    			let panSpeed = .2
                positionX += deltaX * panSpeed;
                positionY -= deltaY * panSpeed;
            }

            updateTransformations();
            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
            renderIfNeeded();
        } else if (isRightClickDragging && rightClickStartX !== null && rightClickStartY !== null) {
            const deltaX = event.clientX - rightClickStartX;
            const deltaY = event.clientY - rightClickStartY;

            // Apply the same rotation logic for right-click
            angleZ += deltaX * 0.01;
            angleX += deltaY * 0.01;

            updateTransformations();
            rightClickStartX = event.clientX;
            rightClickStartY = event.clientY;
            renderIfNeeded();
        }
    });




    element.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    element.addEventListener('wheel', (event) => {
        zoom -= event.deltaY * 0.0002;
        zoom = Math.max(0.01, Math.min(100, zoom));
        updateTransformations();
        renderIfNeeded();
        event.preventDefault();
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderIfNeeded();
    });

    document.getElementById('home-button').addEventListener('click', () => {
        positionX = DEFAULT_POSITION.cube.x;
        positionY = DEFAULT_POSITION.cube.y;
        angleX = DEFAULT_POSITION.cube.rotX;
        angleY = DEFAULT_POSITION.cube.rotY;
        angleZ = DEFAULT_POSITION.cube.rotZ;
        zoom = DEFAULT_POSITION.zoom;

        updateTransformations();
        renderIfNeeded();
    });


    // Touch event listeners for tablets
    element.addEventListener('touchstart', onTouchStart, { passive: false });
    element.addEventListener('touchmove', onTouchMove, { passive: false });
    element.addEventListener('touchend', onTouchEnd);

    let touchStartX = 0, touchStartY = 0;
    let lastTouchX = 0, lastTouchY = 0;

    function onTouchStart(event) {
        event.preventDefault();
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        lastTouchX = touchStartX;
        lastTouchY = touchStartY;
        isDragging = true; // Assuming we want to use the same flag for touch
    }

    // Define a zoom sensitivity variable
    let zoomSensitivity = 0.0002; // Adjust this value to change zoom speed

    function onTouchMove(event) {
            event.preventDefault();
            if (event.touches.length === 1) { // Single touch for panning
                const touch = event.touches[0];
                const currentX = touch.clientX;
                const currentY = touch.clientY;
                const deltaX = currentX - lastTouchX;
                const deltaY = currentY - lastTouchY;

                const panSpeed = 0.2; // Adjust for sensitivity
                positionX += deltaX * panSpeed;
                positionY -= deltaY * panSpeed;

                // Update last touch positions for next iteration
                lastTouchX = currentX;
                lastTouchY = currentY;
            } else if (event.touches.length === 2) { // Two touches for zooming
                const touch1 = event.touches[0];
                const touch2 = event.touches[1];

                // Previous touch points
                const prevTouch1 = { x: lastTouchX, y: lastTouchY };
                const prevTouch2 = { x: event.touches[1].clientX, y: event.touches[1].clientY };

                // Zoom based on the distance between touches
                const prevDistance = Math.hypot(prevTouch2.x - prevTouch1.x, prevTouch2.y - prevTouch1.y);
                const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
                const zoomDelta = (currentDistance - prevDistance) * zoomSensitivity;
                zoom -= zoomDelta;
                zoom = Math.max(0.01, Math.min(100, zoom));

                // Update last touch positions for next iteration
                lastTouchX = touch1.clientX;
                lastTouchY = touch1.clientY;
            } else if (event.touches.length >= 3) { // Three or more touches for orbiting
                const touch = event.touches[0];
                const currentX = touch.clientX;
                const currentY = touch.clientY;
                const deltaX = currentX - lastTouchX;
                const deltaY = currentY - lastTouchY;

                const orbitSpeed = 0.01;
                angleZ += deltaX * orbitSpeed;
                angleX += deltaY * orbitSpeed;
                angleX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, angleX));

                lastTouchX = currentX;
                lastTouchY = currentY;
            }

            updateTransformations();
            renderIfNeeded();

            // Update mouse position for raycasting based on first touch
            if (event.touches.length > 0) {
                const rect = renderer.domElement.getBoundingClientRect();
                const touch = event.touches[0];
                mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
                updateRaycasting();
            }
        }


        function onTouchEnd(event) {
            isDragging = false;
        }

        
    }

    return {
        scene,
        camera,
        renderer,
        cube,
        updateTransformations,
        renderIfNeeded,
        setupEventListeners,
        DEFAULT_POSITION,
        nozzle,
        angleX, angleY, angleZ, positionX, positionY, zoom, isDragging,
        previousMouseX, previousMouseY
    };
}
