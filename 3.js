function setup3js() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const cubeGeometry = new THREE.BoxGeometry(256, 256, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x27292e, transparent: true, opacity: 1 });

    const gridSize = 256;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#33353a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
    for (let i = 0; i <= gridSize; i += 10) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, gridSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(gridSize, i);
        ctx.stroke();
    }

    const gridTexture = new THREE.CanvasTexture(canvas);
    gridTexture.repeat.set(1, 1);
    gridTexture.wrapS = THREE.RepeatWrapping;
    gridTexture.wrapT = THREE.RepeatWrapping;

    cubeMaterial.map = gridTexture;
    cubeMaterial.needsUpdate = true;

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    const buildPlateSize = 256;
    const arrowLength = 30;
    const arrowThickness = 0.5;

    const DEFAULT_POSITION = {
        cube: { x: -70, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0 },
        camera: { z: 500 },
        zoom: .5
    };

    const xDir = new THREE.Vector3(1, 0, 0);
    const xOrigin = new THREE.Vector3(-128, -128, 0.51);
    const xArrow = new THREE.ArrowHelper(xDir, xOrigin, arrowLength, 0xFF0000);
    cube.add(xArrow);

    const yDir = new THREE.Vector3(0, 1, 0);
    const yOrigin = new THREE.Vector3(-128, -128, 0.51);
    const yArrow = new THREE.ArrowHelper(yDir, yOrigin, arrowLength, 0x00FF00);
    cube.add(yArrow);

    const zDir = new THREE.Vector3(0, 0, 1);
    const zOrigin = new THREE.Vector3(-128, -128, 0.51);
    const zArrow = new THREE.ArrowHelper(zDir, zOrigin, arrowLength, 0x0000FF);
    cube.add(zArrow);

    scene.add(cube);

    cube.position.set(DEFAULT_POSITION.cube.x, DEFAULT_POSITION.cube.y, DEFAULT_POSITION.cube.z);
    cube.rotation.set(DEFAULT_POSITION.cube.rotX, DEFAULT_POSITION.cube.rotY, DEFAULT_POSITION.cube.rotZ);

    const nozzleGeometry = new THREE.ConeGeometry(2, 10, 32);
    const nozzleMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    const nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial);

    nozzle.rotation.set(-Math.PI / 2, 0, 0);
    nozzle.position.set(-128, -128, 5.5);
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
    }

    function renderIfNeeded() {
        renderer.render(scene, camera);
    }

    function setupEventListeners(element) {
        let isRightClickDragging = false;
        element.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                isDragging = true;
                previousMouseX = event.clientX;
                previousMouseY = event.clientY;
            } else if (event.button === 2) {
                isRightClickDragging = true;
                previousMouseX = event.clientX;
                previousMouseY = event.clientY;
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            isRightClickDragging = false;
            previousMouseX = null;
            previousMouseY = null;
        });

        window.addEventListener('mousemove', (event) => {
            if (isDragging && previousMouseX !== null && previousMouseY !== null) {
                const deltaX = event.clientX - previousMouseX;
                const deltaY = event.clientY - previousMouseY;

                if (event.shiftKey) {
                    angleZ += deltaX * 0.01;
                    angleX += deltaY * 0.01;
                } else {
                    const panScale = camera.position.z / 600;
                    positionX -= -deltaX * 0.3 * panScale / zoom;
                    positionY -= deltaY * 0.3 * panScale / zoom;
                }

                updateTransformations();
                previousMouseX = event.clientX;
                previousMouseY = event.clientY;
                renderIfNeeded();
            }
        });


        
        document.getElementById('home-button').addEventListener('click', () => {
            if (!cube || !camera || !renderer || !scene) {
                console.error("cube, camera, renderer, or scene is not defined.");
                return;
            }

            cube.rotation.set(0, 0, 0);
            cube.position.set(0, 0, 0);
            camera.position.set(0, 0, 500);
            camera.lookAt(0, 0, 0);


            if (camera.isOrthographicCamera) {
                camera.zoom = 1; 
                camera.updateProjectionMatrix();
            }

            renderer.render(scene, camera);

        });


        element.addEventListener('wheel', (event) => {
            zoom -= event.deltaY * 0.0003;
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
