import { FC, useState } from 'react';

import p5Types, { Vector } from 'p5'; // Import this for typechecking and intellisense
import Sketch from 'react-p5';
import './index.css';

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

  trails: Vector[];

  constructor (props: BoidProps) {
    this.p5 = props.p5;
    this.position = p5Types.Vector.random2D();
    this.position.setMag(props.p5.random(props.p5.width, props.p5.height));
    this.velocity = p5Types.Vector.random2D();
    this.velocity.setMag(props.p5.random(2, 4));
    this.acceleration = p5Types.Vector.random2D();
    this.maxForce = 1;
    this.maxSpeed = 4;
    this.show(this.position);
    this.trails = [];
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

  align(flock: Boid[]) {
    const perceptionRadius = 50;
    const steering = new p5Types.Vector();
    let total = 0;
    flock.forEach((otherBoid) => {
      const d = this.p5.dist(
        this.position.x,
        this.position.y,
        otherBoid.position.x,
        otherBoid.position.y,
      );
      if (otherBoid !== this && d < perceptionRadius) {
        steering.add(otherBoid.velocity);
        total += 1;
      }
    });

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(flock: Boid[]) {
    const perceptionRadius = 50;
    const steering = new p5Types.Vector();
    let total = 0;
    flock.forEach((otherBoid) => {
      const d = this.p5.dist(
        this.position.x,
        this.position.y,
        otherBoid.position.x,
        otherBoid.position.y,
      );
      if (otherBoid !== this && d < perceptionRadius) {
        const diff = p5Types.Vector.sub(this.position, otherBoid.position);
        diff.div(d * d);
        steering.add(diff);
        total += 1;
      }
    });

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(flock: Boid[]) {
    const perceptionRadius = 50;
    const steering = new p5Types.Vector();
    let total = 0;
    flock.forEach((otherBoid) => {
      const d = this.p5.dist(
        this.position.x,
        this.position.y,
        otherBoid.position.x,
        otherBoid.position.y,
      );
      if (otherBoid !== this && d < perceptionRadius) {
        steering.add(otherBoid.position);
        total += 1;
      }
    });

    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flocking(flock: Boid[]) {
    const alignement = this.align(flock);
    const sepration = this.separation(flock);
    const cohesion = this.cohesion(flock);

    alignement.mult(0.9);
    sepration.mult(0.9);
    cohesion.mult(0.8);

    this.acceleration.add(alignement);
    this.acceleration.add(sepration);
    this.acceleration.add(cohesion);
  }

  trail() {
    const { position } = this;

    if (this.trails.length > 9) {
      this.trails.pop();
    }

    this.trails = [position.copy(), ...this.trails];

    this.trails.forEach((trail) => {
      this.show(trail);
    });
  }

  update(flock: Boid[]) {
    this.edges();
    this.flocking(flock);

    this.trail();

    this.position.add(this.velocity);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
    this.show(this.position);
  }

  show(position: Vector) {
    this.p5.strokeWeight(2);
    this.p5.stroke(255);
    this.p5.point(position.x, position.y);
  }
}

const Canvas:FC = function() {
  const [count] = useState<number>(500);
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
    <Sketch className="wall" setup={setup} draw={draw} />
  );
};

export default Canvas;
