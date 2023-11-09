import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ANIMATIONS, AVATAR_PATH} from '../../core/data/avatarData'

const Avatar = () => {
  const canvasRef = useRef();
  const modelRef = useRef();
  const mixerRef = useRef();
  const currentAnimation = useRef();
  const prevAnimation = useRef();
  const actions = [];

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
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.5, 1000);
      const renderer = new THREE.WebGLRenderer();

      //Properties to model
      canvas.appendChild(renderer.domElement);
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      camera.position.set(0, 0, 10);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      //Lights to model
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(1, 1, 2);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      return {scene, camera, renderer, canvas}
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
        animationPlay(ANIMATIONS.FLICKER, false)
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
    }

    /**
     * Update scene dimentions when resize window
     */
    const resizeModel = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      animationPlay(ANIMATIONS.SAY_YES, true);
    }

    /**
     * Build all model animations
     * @param {object} gltf model file with all properties
     */
    const animationsBuild = (gltf) => {
      const mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach(clip => {
        const action = mixer.clipAction(clip);
        actions.push(action)
      });
      mixerRef.current = mixer;
    }

    const {scene, camera, renderer, canvas} = initScene();

    loadModel();
    animate();
    window.addEventListener('resize', resizeModel);

    /**
     * Clean up functions
     */
    return () => {
      renderer.domElement.remove();
      renderer.dispose();
      window.removeEventListener('resize', resizeModel);
    }
  }, [])

  /**
   * Play model animation identity if animation is emote
   * @param {number} index animation index from ANIMATIONS
   * @param {boolean} emote emote to play one time
   */
  const animationPlay = (index, emote) => {
    prevAnimation.current = currentAnimation.current
    currentAnimation.current = actions[index];

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

  return (
    <>
      <div ref={canvasRef}
      className='canvas__avatar'
      onClick={() => animationPlay(ANIMATIONS.SAY_NO, true)}></div>
    </>
  )
}

export default Avatar