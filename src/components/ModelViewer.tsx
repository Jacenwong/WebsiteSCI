import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';
import { applyMedicalDeviceColors } from '../utils/modelColors';

export const ModelViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Transparent background so CSS layers can show through
    scene.background = null;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3); // Much closer to the model

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // Force fixed width for wider 3D model (extended to 1100px)
    const renderWidth = 1100;
    const renderHeight = 400;
    renderer.setSize(renderWidth, renderHeight);
    renderer.shadowMap.enabled = false; // Disabled shadows for cleaner view
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);

    // Lighting setup (matching ScrollRotate3D)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = false; // Disabled shadows
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 0.5, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    
    // Ground plane removed for cleaner view

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false; // Disabled auto-rotation - model stays still
    controls.autoRotateSpeed = 0.3; // Slower rotation for better viewing
    controls.minDistance = 5; // Fixed minimum distance
    controls.maxDistance = 5; // Fixed maximum distance (same as min = no zoom)
    controls.enablePan = true; // Allow panning
    controls.enableZoom = false; // Disable zooming
    controls.enableRotate = true; // Allow rotation

            // Add a test cube first (will be removed when model loads)
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshPhongMaterial({ color: 0x006d8f });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(0, 0, 0);
            scene.add(cube);

    // Load the GLB/GLTF model
    const loader = new GLTFLoader();
    loader.load(
      `${import.meta.env.BASE_URL}ReboModel1.glb`, // Try GLB first
      (gltf) => {
        console.log('✅ GLB Model loaded successfully:', gltf);
        const model = gltf.scene;
        console.log('Model scene:', model);
        console.log('Number of children:', model.children.length);

        // Check if model has any geometry
        let hasGeometry = false;
        let meshCount = 0;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.geometry) {
            hasGeometry = true;
            meshCount++;
            console.log(`Found mesh ${meshCount} with geometry:`, child.geometry);
            console.log(`Mesh vertices: ${child.geometry.attributes.position?.count || 'unknown'}`);
          }
        });

        console.log(`Total meshes found: ${meshCount}`);

        if (!hasGeometry) {
          console.warn('⚠️ Model loaded but has no geometry, keeping test cubes');
          setError('Model loaded but has no visible geometry - showing test cubes instead');
          setLoading(false);
          return;
        }

        // Remove the test cube
        scene.remove(cube);

        // Apply medical device colors using shared function
        applyMedicalDeviceColors(model, 'ModelViewer');

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        console.log('Model bounding box:', { center, size });
        console.log('Box size:', size);

        // Try alternative centering approach for nested structures
        const mesh = model.getObjectByProperty('type', 'Mesh');
        if (mesh) {
          console.log('Found mesh child, centering based on mesh geometry');
          const meshBox = new THREE.Box3().setFromObject(mesh);
          const meshCenter = meshBox.getCenter(new THREE.Vector3());
          mesh.position.sub(meshCenter); // recenters the actual mesh
        } else {
          model.position.sub(center); // Center the model normally
        }

        // Apply uniform scaling to fit model into scene
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDim; // Back to original scale
        model.scale.setScalar(scale);
        
        // Set default starting rotation (270 degrees around X-axis)
        // Users can rotate freely from this position, it won't snap back until refresh
        model.rotation.x = (3 * Math.PI) / 2; // 270 degrees in radians

        // Recalculate bounding box after scaling and centering
        const newBox = new THREE.Box3().setFromObject(model);
        const newSize = newBox.getSize(new THREE.Vector3());
        const newCenter = newBox.getCenter(new THREE.Vector3());

        // Move model so bottom sits at y=0
        const bottomY = newBox.min.y;
        model.position.y -= bottomY; // Adjust upward

        // Camera distance to fit model based on size
        const fitHeightDistance = newSize.y / (2 * Math.atan((Math.PI * camera.fov) / 360));
        const fitWidthDistance = newSize.x / (2 * Math.atan((Math.PI * camera.fov) / 360));
        const distance = Math.max(fitHeightDistance, fitWidthDistance);

        camera.position.set(1, newSize.y * 0.5, distance * 1.2);
        camera.lookAt(1, newSize.y * 0.5, 0);

        controls.target.set(1, newSize.y * 0.5, 0);
        controls.update();
        
        console.log('🔍 DEBUGGING MODEL VISIBILITY:');
        console.log('Model position after centering:', model.position);
        console.log('Model scale applied:', scale);
        console.log('Model final size:', newSize);
        console.log('Model bottom Y (should be at y=0):', newBox.min.y);
        console.log('Camera distance:', distance);
        console.log('Camera position:', camera.position);
        console.log('Camera target:', controls.target);
        console.log('Ground plane added at y=0 for reference');

        console.log('Model scale:', scale);
        console.log('Scale factor:', scale);

            // Materials are now handled by the shared applyMedicalDeviceColors function

        scene.add(model);
        setLoading(false);
      },
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100;
        setProgress(percent);
        console.log('Loading progress:', percent + '%');
      },
      (error) => {
        console.error('❌ Error loading GLB model:', error);
        console.error('Error details:', {
          message: error.message,
          type: error.type,
          target: error.target
        });
        
        // Try GLTF file as fallback
        console.log('Trying GLTF file as fallback...');
        loader.load(
          '/ReboModel1.gltf',
          (gltf) => {
            console.log('✅ GLTF Model loaded successfully:', gltf);
            const model = gltf.scene;
            console.log('Model scene:', model);
            console.log('Number of children:', model.children.length);

            // Check if model has any geometry
            let hasGeometry = false;
            let meshCount = 0;
            model.traverse((child) => {
              if (child instanceof THREE.Mesh && child.geometry) {
                hasGeometry = true;
                meshCount++;
                console.log(`Found mesh ${meshCount} with geometry:`, child.geometry);
                console.log(`Mesh vertices: ${child.geometry.attributes.position?.count || 'unknown'}`);
              }
            });

            console.log(`Total meshes found: ${meshCount}`);

            if (!hasGeometry) {
              console.warn('⚠️ Model loaded but has no geometry, keeping test cube');
              setError('Model loaded but has no visible geometry - showing test cube instead');
              setLoading(false);
              return;
            }

            // Remove the test cube
            scene.remove(cube);

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            console.log('GLTF Model bounding box:', { center, size });
            console.log('GLTF Box size:', size);

            // Try alternative centering approach for nested structures (GLTF)
            const mesh = model.getObjectByProperty('type', 'Mesh');
            if (mesh) {
              console.log('Found GLTF mesh child, centering based on mesh geometry');
              const meshBox = new THREE.Box3().setFromObject(mesh);
              const meshCenter = meshBox.getCenter(new THREE.Vector3());
              mesh.position.sub(meshCenter); // recenters the actual mesh
            } else {
              model.position.sub(center); // Center the model normally
            }

            // Apply uniform scaling to fit model into scene
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 5 / maxDim; // Back to original scale
            model.scale.setScalar(scale);
            
            // Set default starting rotation (270 degrees around X-axis) - GLTF
            // Users can rotate freely from this position, it won't snap back until refresh
            model.rotation.x = (3 * Math.PI) / 2; // 270 degrees in radians

            // Recalculate bounding box after scaling and centering
            const newBox = new THREE.Box3().setFromObject(model);
            const newSize = newBox.getSize(new THREE.Vector3());
            const newCenter = newBox.getCenter(new THREE.Vector3());

            // Move model so bottom sits at y=0
            const bottomY = newBox.min.y;
            model.position.y -= bottomY; // Adjust upward

            // Camera distance to fit model based on size
            const fitHeightDistance = newSize.y / (2 * Math.atan((Math.PI * camera.fov) / 360));
            const fitWidthDistance = newSize.x / (2 * Math.atan((Math.PI * camera.fov) / 360));
            const distance = Math.max(fitHeightDistance, fitWidthDistance);

            camera.position.set(0, newSize.y * 0.5, distance * 1.2);
            camera.lookAt(0, newSize.y * 0.5, 0);

            controls.target.set(0, newSize.y * 0.5, 0);
            controls.update();

            console.log('GLTF Model scale:', scale);
            console.log('GLTF Camera distance:', distance);

            // Materials are now handled by the shared applyMedicalDeviceColors function

            scene.add(model);
            setLoading(false);
          },
          (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setProgress(percent);
            console.log('GLTF Loading progress:', percent + '%');
          },
          (gltfError) => {
            console.error('❌ Error loading GLTF model:', gltfError);
            setError(`Failed to load both GLB and GLTF models: ${error.message || 'Unknown error'}`);
            setLoading(false);
          }
        );
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = 1100;
      const height = 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    >
      
      {/* 3D Viewer */}
      <div
        ref={containerRef}
        className="h-[400px] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center backdrop-blur-sm relative bg-sky-200/30 dark:bg-black/30"
        style={{ 
          minHeight: '400px', 
          width: '1100px', 
          maxWidth: 'none', 
          marginLeft: '-210px',
          position: 'relative'
        }}
      >
        {/* Background Layers - Exact same as HeroSection */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 z-[-2]" />
        <div className="absolute inset-0 bg-sky-200/30 dark:bg-black/30 bg-sky-100/40 dark:bg-primary/10 z-[-2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300/20 to-transparent dark:from-primary/20 dark:to-transparent z-[-2]" />
        {loading && (
          <div className="text-white text-center relative z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p>Loading 3D Model...</p>
            <p className="text-sm text-gray-400 mt-2">{Math.round(progress)}%</p>
          </div>
        )}
        {error && (
          <div className="text-red-400 text-center relative z-10">
            <p className="text-lg font-semibold mb-2">⚠️ {error}</p>
            <p className="text-sm">Check the browser console for more details.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};