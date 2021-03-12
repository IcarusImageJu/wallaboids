import { FC, useState } from 'react';

import p5Types from 'p5';
import Sketch from 'react-p5';
import './index.css';
import Boid from './boid';

const Canvas:FC = function() {
  const [count] = useState<number>(350);
  const [flock, setFlock] = useState<Boid[]>([]);
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.colorMode('hsb', 360, 100, 100, 1);
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    const pool = [];
    for (let i = 0; i < count; i += 1) {
      pool.push(new Boid({ p5 }));
    }
    setFlock(pool);
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    flock.forEach((boid) => boid.update(flock));
  };

  return (
    <Sketch key={`${new Date()}`} className="wall" setup={setup} draw={draw} />
  );
};

export default Canvas;
