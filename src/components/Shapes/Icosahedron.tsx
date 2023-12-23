import { type Mesh, MathUtils, type Group, type IcosahedronGeometry } from 'three';
import { useRef, useState, useEffect } from 'react';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

export function Icosahedron(props: ThreeElements['group']) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    // meshRef.current.rotation.set(0, 0, (delta * 0.35) + Math.PI / 2);
    // meshRef.current.rotation.x += (meshRef.current.rotation.x - delta) * 0.35;
    groupRef.current.rotation.y += delta * 0.35;
    // meshRef.current.rotation.x += MathUtils.lerp(
    //   1,
    //   delta * 0.35,
    //   1
    // );
    // meshRef.current.rotation.y += MathUtils.lerp(
    //   meshRef.current.rotation.x,
    //   meshRef.current.rotation.y,
    //   delta * 0.35,
    // );
    // meshRef.current.rotateOnAxis(new Vector3(-(Math.PI / 2), 1, 0), delta * 0.35);
  });

  // Set shape rotation
  // useEffect(() => {
  //   // shapeRef.current.rotateX(Math.PI / 2); // 90 degrees
  //   // shapeRef.current.rotateY(-Math.PI / 2);
  // }, [shapeRef]);

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <group ref={groupRef} {...props}>
      <mesh
        ref={meshRef}
        scale={active ? 1.5 : 1}
        rotation={[1, 0, 0]}
        onClick={(event) => {
          setActive(!active);
        }}
        onPointerOver={(event) => {
          setHover(true);
        }}
        onPointerOut={(event) => {
          setHover(false);
        }}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'black'} opacity={0.8} transparent />
        <Edges threshold={2} color="#36a4ff" />
      </mesh>
    </group>
  );
}
