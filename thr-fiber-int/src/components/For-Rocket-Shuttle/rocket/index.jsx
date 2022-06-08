import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useSpring, animated, config } from "@react-spring/three";

const Rocket = () => {
  const rocketRef = useRef([]).current;
  const rotateyRef = useRef(new THREE.Vector3(0, 1, 0)).current;
  const rocketRef2 = useRef()  //控制火箭抖动的ref
  const rocket = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL +
      "models_for_rocketshuttle/falcon_9_spacex_rocket/scene.gltf"
    // (xhr) => {
    //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    // }
  );
  const { nodes, materials } = rocket;
  const [active, setActive] = useState(true);

  useLayoutEffect(() => {
    try {
      if (rocket) {
        rocketRef.push(rocket);
      }
      console.log(rocketRef);
      rocketRef[0].scene.scale.set(0.005, 0.005, 0.005);

      rocketRef[0].scene.rotation.set(1.5, 0, 0); //变成横的
      rocketRef[0].scene.rotateOnAxis(rotateyRef, 90); //绕自身旋转到字体正面显示
      // rocketRef[0].scene.position.set(0, 0, -4);
      rocketRef[0].scene.updateMatrix();
    } catch (error) {
      console.error();
    }

    return () => {
      rocket.scene.remove();
      rocket.scene.dispose();
      console.log("111");
    };
  }, [rocket, rocketRef, rotateyRef]);

  const props = useSpring({
    position:active?[0, 0, -4]:[0, 0, 8],
    config: config.molasses, //{ mass: 1, tension: 280, friction: 120 }
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
     rocketRef2.current.rotation.y = Math.sin(t / 4) / 8
    rocketRef2.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
    rocketRef2.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  return (
    <animated.group
      ref={rocketRef2}
      dispose={null}
      position={props.position}
      onClick={(event) => {
        setActive(!active);
      }}
    >
      <primitive object={rocket.scene} />
    </animated.group>
  );
};

export default Rocket;