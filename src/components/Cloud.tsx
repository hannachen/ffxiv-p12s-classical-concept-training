import {useFrame} from '@react-three/fiber';
import {Vector3} from "three";
import {Cloud} from "@react-three/drei";

export function Puffycloud({ seed, vec = new Vector3(), ...props }) {
  useFrame((state, delta) => {
  })
  return (
    <group {...props}>
      <Cloud seed={seed} fade={30} speed={0.1} growth={4} segments={40} volume={6} opacity={0.6} bounds={[4, 3, 1]} />
      <Cloud seed={seed + 1} fade={30} position={[0, 1, 0]} speed={0.5} growth={4} volume={10} opacity={1} bounds={[6, 2, 1]} />
    </group>
  )
}
