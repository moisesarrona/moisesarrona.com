import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ANIMATIONS, AVATAR_PATH} from '../../core/data/avatarData'

const useAvatar = () => {
  const canvasRef = useRef();
  const modelRef = useRef();
  const mixerRef = useRef();
  const currentAnimation = useRef();
  const prevAnimation = useRef();
  const actionsRef = useRef();
  const cameraRef = useRef();

  const timeLine = new gsap.timeline();

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
      const { clientWidth: width, clientHeight: height} = canvas;

      //Envirement to Threejs
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, width / height, 0.5, 1000);
      const renderer = new THREE.WebGLRenderer();

      //Properties to model
      canvas.appendChild(renderer.domElement);
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      camera.position.set(0, 0, 10);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      cameraRef.current = camera;
      const fog = new THREE.Fog(0x000000, 1, 3000);
      scene.fog = fog;

      //Lights to model
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2.6);
      directionalLight.position.set(1, 1, 2);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      // const spotlight = new THREE.SpotLight(0xffffff, 3, 10, Math.PI / 4, 1);
      // spotlight.position.set(0, 0, 5);
      // scene.add(spotlight);

      return { scene, camera, renderer, canvas }
    }

    /**
     * Load model from gltf file
     */
    const loadModel = () => {
      const load = new GLTFLoader();
      load.load(AVATAR_PATH, (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -8, 0);
        scene.add(model);
        animationsBuild(gltf);
        animationPlay(ANIMATIONS.FLICKER, false);
        modelRef.current = model;
        moveModelWhenStart();
      })
    }

    /**
     * Renderer scene and camera in every frame
     */
    const animate = () => {
      if (mixerRef.current) {
        mixerRef.current.update(0.020)
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
      actionsRef.current =  actions;
      mixerRef.current = mixer;
    }

    /**
     *  Add aimation in Y when scene start
     */
    const moveModelWhenStart = () => {
      if (modelRef.current) {
        timeLine.from(modelRef.current.position, {
          y: -25,
          duration: 1,
          ease: 'power4.inOut'
        });
      }
    };

    /**
     * Move model when mouse move in window
     * @param {object} event event from click in windows
     */
    const onMouseMove = (event) => {
      event.preventDefault();
    
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

      // gsap.to(spotlight.position, {
      //   x: pos.x,
      //   y: pos.y,
      //   z: pos.z + 2,
      //   duration: 0.5,
      // });

    }
    
    const { scene, camera, renderer, canvas } = initScene();

    loadModel();
    animate();
    moveModelWhenStart();
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