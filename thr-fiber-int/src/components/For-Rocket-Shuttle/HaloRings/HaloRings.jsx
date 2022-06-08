import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { useRingLampsStore } from "@/store/store";

const HaloRings = (props) => {
  const earthRef = useRef();
  const SmalllightsRef = useRef();
  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + "models_for_rocketshuttle/halo_ring/scene.gltf"
  );
  const { visiablevalue } = useRingLampsStore((state) => state.ringLampsState);
  //  const [earthRing] = useMemo(() => { const earthRing = nodes["MaterialFBXASC032FBXASC0352142146801"]
  //   return [earthRing]
  // }, [nodes])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    earthRef.current.rotation.z = t;
    SmalllightsRef.current.rotation.z = -t * 3;
    earthRef.current.rotation.x = THREE.MathUtils.lerp(
      earthRef.current.rotation.x,
      Math.cos(t / 2) / 10 + 0.25,
      0.1
    );
    earthRef.current.rotation.y = THREE.MathUtils.lerp(
      earthRef.current.rotation.y,
      Math.sin(t / 4) / 10,
      0.1
    );
  });

  return (
    <group
      rotation-x={-0.5}
      position={[0, 0, 0]}
      scale={[0.007, 0.007, 0.007]}
      castShadow
      receiveShadow
      dispose={null}
    >
      {/* 灯光 */}
      <mesh
        visible={visiablevalue}
        geometry={nodes["LIGHTKRAFTFBXASC032GRAVITONFBXASC032"].geometry}
        material={materials.LIGHTKRAFTFBXASC032GRAVITONFBXASC032}
      />
      {/* 内环表面地图 */}
      <mesh 
        ref={earthRef}
        geometry={nodes["MaterialFBXASC032FBXASC0352142146801"].geometry}
        material={materials.MaterialFBXASC032FBXASC0352142146801}
      />
      {/*外环圈  */}
      <mesh
        geometry={nodes["MaterialFBXASC032FBXASC0352142147988"].geometry}
        material={materials.MaterialFBXASC032FBXASC0352142147988}
      />
      {/* 灯轴 */}
      <mesh
        geometry={nodes["MaterialFBXASC032FBXASC0352142150746"].geometry}
        material={materials.MaterialFBXASC032FBXASC0352142150746}
      />

      <mesh
        ref={SmalllightsRef}
        geometry={nodes["MaterialFBXASC032FBXASC0352142150746_1"].geometry}
        material={materials.MaterialFBXASC032FBXASC0352142150746}
      />
      <mesh
        geometry={nodes["MaterialFBXASC032FBXASC0352142150746_2"].geometry}
        material={materials.MaterialFBXASC032FBXASC0352142150746}
      />
    </group>
  );
};

export default HaloRings;

useGLTF.preload(
  process.env.PUBLIC_URL + "models_for_rocketshuttle/halo_ring/scene.gltf"
);