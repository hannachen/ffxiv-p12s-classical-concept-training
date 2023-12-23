import {Canvas} from '@react-three/fiber';
import {Box} from './Shapes/Box';
import {Pyramid} from './Shapes/Pyramid';
import {Icosahedron} from './Shapes/Icosahedron';

export default function Stage() {
  return (
    <Canvas
      camera={{
        fov: 50,
        near: 0.1,
        far: 1000,
        position: [0, 2, 10],
        zoom: 2,
      }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
      <Pyramid position={[-3, 0.15, 0]} />
      <Icosahedron position={[3, -0.15, 0]} />
    </Canvas>
  );
}
