import React, { FC, useState } from 'react';

import './App.css';
import p5Types, { Vector } from 'p5'; // Import this for typechecking and intellisense
import Sketch from 'react-p5';

type BoidProps = {
  p5: p5Types
}
class Boid {
  p5: p5Types;

  position: Vector;

  velocity: Vector;

  acceleration: Vector;

  maxForce: number;

  maxSpeed: number;

  constructor (props: BoidProps) {
    this.p5 = props.p5;
    // eslint-disable-next-line max-len
    this.position = props.p5.createVector(props.p5.random(props.p5.width), props.p5.random(props.p5.height));
    this.velocity = p5Types.Vector.random2D();
    this.acceleration = props.p5.createVector();
    this.maxForce = 1;
    this.maxSpeed = 4;
    this.show();
  }

  edges() {
    if (this.position.x > this.p5.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.p5.width;
    }
    if (this.position.y > this.p5.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.p5.height;
    }
  }

  // align(boids) {
  //   const perceptionRadius = 50;
  //   const steering = this.p5.createVector();
  //   let total = 0;
  //   for (const other of boids) {
  //     const d = dist(
  //       this.position.x,
  //       this.position.y,
  //       other.position.x,
  //       other.position.y,
  //     );
  //     if (other != this && d < perceptionRadius) {
  //       steering.add(other.velocity);
  //       total++;
  //     }
  //   }
  //   if (total > 0) {
  //     steering.div(total);
  //     steering.setMag(this.maxSpeed);
  //     steering.sub(this.velocity);
  //     steering.limit(this.maxForce);
  //   }
  //   return steering;
  // }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
    this.edges();
    this.show();
  }

  show() {
    this.p5.strokeWeight(2);
    this.p5.stroke(255);
    this.p5.point(this.position.x, this.position.y);
  }
}

const App:FC = function() {
  const [count] = useState<number>(100);
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

  const draw = () => {
    flock.forEach((boid) => boid.update());
  };

  return (
    <Sketch className="wall" setup={setup} draw={draw} />
  );
};

export default App;
