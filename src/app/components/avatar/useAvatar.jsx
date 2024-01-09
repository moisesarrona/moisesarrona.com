import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { ANIMATIONS, AVATAR_PATH, DRACO_PATH } from '../../core/data/avatarData';

const useAvatar = () => {
  const canvasRef = useRef();
  const modelRef = useRef();
  const mixerRef = useRef();
  const currentAnimation = useRef();
  const prevAnimation = useRef();
  const actionsRef = useRef();
  const cameraRef = useRef();

  /**
   * Init model in threejs
   */
  useEffect(() => {
    /**
     * Init properties to scene threejs
     * @returns scene: scene Scene, camera: PerspectiveCamera, renderer: WebGLRenderer
     */
    const initScene = () => {
      //Get canvas properties
      const canvas = canvasRef.current;
      const { clientWidth: width, clientHeight: height } = canvas;

      //Envirement to Threejs
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(72, width / height, 0.5, 1000);
      const renderer = new THREE.WebGLRenderer();

      //Properties to model
      canvas.appendChild(renderer.domElement);
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      camera.position.set(0, 0, 10);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      cameraRef.current = camera;

      //Lights to model
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(1, 1, 2);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      return { scene, camera, renderer, canvas }
    }

    /**
     * Load model from gltf file
     */
    const loadModel = () => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(DRACO_PATH);
      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);
      gltfLoader.load(AVATAR_PATH, (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -8, 0);
        scene.add(model);
        animationsBuild(gltf);
        animationPlay(ANIMATIONS.FLICKER, false);
        modelRef.current = model;
      })
    }

    /**
     * Renderer scene and camera in every frame
     */
    const animate = () => {
      if (mixerRef.current) {
        mixerRef.current.update(0.02)
      }
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      cameraRef.current = camera;
    }

    /**
     * Update scene dimentions when resize window
     */
    const resizeModel = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      cameraRef.current = camera;
      animationPlay(ANIMATIONS.SAY_YES, true);
    }

    /**
     * Build all model animations
     * @param {object} gltf model file with all properties
     */
    const animationsBuild = (gltf) => {
      const mixer = new THREE.AnimationMixer(gltf.scene);
      const actions = [];
      gltf.animations.forEach(clip => {
        const action = mixer.clipAction(clip);
        actions.push(action)
      });
      actionsRef.current = actions;
      mixerRef.current = mixer;
    }

    /**
     * Move model when mouse move in window
     * @param {object} event event from click in windows
     */
    const onMouseMove = (event) => {
      event.preventDefault();

      if (modelRef.current) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        const targetRotationY = (mouseX * Math.PI) / 2;
        const targetRotationX = -(mouseY * Math.PI) / 2;

        gsap.to(modelRef.current.rotation, {
          y: targetRotationY * 0.15,
          x: targetRotationX * 0.06,
          duration: 0.5,
        });

        // const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
        // vector.unproject(cameraRef.current);
        // const dir = vector.sub(cameraRef.current.position).normalize();
        // const distance = -cameraRef.current.position.z / dir.z;
        // const pos = cameraRef.current.position.clone().add(dir.multiplyScalar(distance));

        // gsap.to(directionalLight.position, {
        //   x: pos.x,
        //   y: pos.y,
        //   z: pos.z + 2,
        //   duration: 0.5,
        // });
      }

    }

    /**
     * Generate particle and add animation
     */
    const generateParticles = () => {
      const cubeGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
      const cubeMaterial = new THREE.MeshStandardMaterial({
        color: 0x288b7c,
        wireframe: true,
        opacity: 0.4,
        transparent: true,
      });

      const particleCount = 800;
      const cubes = [];

      for (let i = 0; i < particleCount; i++) {

        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        cube.position.set(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        );

        cube.rotation.set(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        );

        cubes.push(cube);
        scene.add(cube);

        gsap.to(cube.rotation, {
          x: cube.rotation.x + Math.PI * 4,
          y: cube.rotation.y + Math.PI * 4,
          z: cube.rotation.z + Math.PI * 4,
          duration: 50,
          repeat: -1,
          ease: 'linear',
        });
      }
    }

    const { scene, camera, renderer, canvas } = initScene();

    loadModel();
    animate();
    generateParticles();
    window.addEventListener('resize', resizeModel);
    window.addEventListener('mousemove', onMouseMove);


    /**
     * Clean up functions
     */
    return () => {
      renderer.domElement.remove();
      renderer.dispose();
      window.removeEventListener('resize', resizeModel);
      window.removeEventListener('mousemove', onMouseMove);
    }
  }, []);

  /**
   * Play model animation identity if animation is emote
   * @param {number} index animation index from ANIMATIONS
   * @param {boolean} emote emote to play one time
   */
  const animationPlay = (index, emote) => {
    prevAnimation.current = currentAnimation.current;
    currentAnimation.current = actionsRef.current[index];

    if (prevAnimation.current === currentAnimation.current && prevAnimation.current) {
      prevAnimation.current.fadeOut(0.2);
    }

    if (emote) {
      currentAnimation.current.clampWhenFinished = true;
      currentAnimation.current.loop = THREE.LoopOnce;
    }

    currentAnimation.current.reset();
    currentAnimation.current.fadeIn(0.02);
    currentAnimation.current.play();
  }

  return { canvasRef, modelRef, cameraRef, animationPlay }
}

export default useAvatar