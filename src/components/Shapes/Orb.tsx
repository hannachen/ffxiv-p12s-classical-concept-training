import {useRef, useMemo} from 'react';
import {useFrame, type ThreeElements} from '@react-three/fiber';
import {Group} from 'three';
import {Sphere} from '@react-three/drei';
import {EffectComposer, Bloom} from '@react-three/postprocessing';

import type {BaseShapeProps} from '../../utils/types';

export type OrbProps = BaseShapeProps & ThreeElements['group'];

export function Orb({
  speedMultipler = 0.35,
  onHover = (e) => {},
  debug = false,
  ...groupProps
}: OrbProps) {
  const orbRef = useRef<Group>(null!);

  const data = useMemo(() => {
    return new Array(15).map((_, i) => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      z: Math.random() * 100 - 50,
      s: Math.random() + 10,
    }));
  }, []);

//   useFrame((state) => {
//     orbRef.current.position.x = x + Math.sin((state.clock.getElapsedTime() * s) / 2);
//     orbRef.current.position.y = y + Math.sin((state.clock.getElapsedTime() * s) / 2);
//     orbRef.current.position.z = z + Math.sin((state.clock.getElapsedTime() * s) / 2);
//   });

  //   useFrame((state, delta) => (orbRef.current.rotation.y += delta * speedMultipler));

  return (
    <group ref={orbRef} {...groupProps}>
      <scene>
        <ambientLight />
        <Sphere scale={0.1} position={[0, 0, 0]}>
          <meshStandardMaterial color="white" />
        </Sphere>
      </scene>
      <EffectComposer>
        <Bloom luminanceThreshold={1} intensity={0.15} levels={9} mipmapBlur />
      </EffectComposer>
    </group>
  );
}
