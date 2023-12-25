import {Vector3} from 'three';

import {useLayoutEffect, useRef} from 'react';

interface LineProps {
  color?: string;
  start: number[];
  end: number[];
}

export function Line({start, end, color = 'white'}: LineProps) {
  const lineRef = useRef(null!);

  useLayoutEffect(() => {
    lineRef.current.geometry.setFromPoints(
      [start, end].map((point) => new Vector3(...point))
    );
  }, [start, end]);

  return (
    <>
      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial attach="material" color="white" />
      </line>
    </>
  );
}
