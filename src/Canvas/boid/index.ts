import p5Types, { Vector } from 'p5';

export type BoidProps = {
    p5: p5Types
  }
export default class Boid {
    p5: p5Types;

    position: Vector;

    velocity: Vector;

    acceleration: Vector;

    maxForce: number;

    maxSpeed: number;

    trailSize: number;

    trails: Vector[];

    perceptionRadius: number;

    size: number;

    sOffset: number;

    constructor (props: BoidProps) {
      this.p5 = props.p5;
      this.position = p5Types.Vector.random2D();
      this.position.set(props.p5.random(0, props.p5.width), props.p5.random(0, props.p5.height));
      this.velocity = p5Types.Vector.random2D();
      this.velocity.set(props.p5.random(2, 4));
      this.acceleration = p5Types.Vector.random2D();
      this.maxForce = 1;
      this.maxSpeed = 4;
      this.show(this.position);
      this.trails = [];
      this.perceptionRadius = 50;
      this.trailSize = 100;
      this.size = 2;
      this.sOffset = 3;
    }

    // Detect edges
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

    // Be consious of other boids
    flocking(flock: Boid[]) {
      const alignement = new p5Types.Vector();
      const separation = new p5Types.Vector();
      const cohesion = new p5Types.Vector();
      let total = 0;

      flock.forEach((otherBoid) => {
        const d = this.p5.dist(
          this.position.x,
          this.position.y,
          otherBoid.position.x,
          otherBoid.position.y,
        );
        if (otherBoid !== this && d < this.perceptionRadius) {
          // cohesion
          cohesion.add(otherBoid.position);
          // separation
          const diff = p5Types.Vector.sub(this.position, otherBoid.position);
          diff.div(d * d);
          separation.add(diff);
          // alignement
          alignement.add(otherBoid.velocity);
          total += 1;
        }
      });

      if (total > 0) {
        // cohesion
        cohesion.div(total);
        cohesion.sub(this.position);
        cohesion.setMag(this.maxSpeed);
        cohesion.sub(this.velocity);
        cohesion.limit(this.maxForce);
        cohesion.mult(0.8);
        this.acceleration.add(cohesion);
        // separation
        separation.div(total);
        separation.setMag(this.maxSpeed);
        separation.sub(this.velocity);
        separation.limit(this.maxForce);
        separation.mult(0.9);
        this.acceleration.add(separation);
        // alignement
        alignement.div(total);
        alignement.setMag(this.maxSpeed);
        alignement.sub(this.velocity);
        alignement.limit(this.maxForce);
        alignement.mult(0.9);
        this.acceleration.add(alignement);
      }
    }

    // Let a path
    trail() {
      const { position } = this;

      if (this.trails.length > this.trailSize - 1) {
        this.trails.pop();
      }

      this.trails = [position.copy(), ...this.trails];

      this.trails.forEach((trail, index) => {
        this.show(trail, index);
      });
    }

    // Compute Boid
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

    // Show me
    show(position: Vector, age:number = 0) {
      this.p5.strokeWeight(this.size - ((this.size / this.trailSize) * age));
      const center = new p5Types.Vector();
      center.set(this.p5.width / 2, this.p5.height / 2);
      const h = this.p5.degrees(
        position.angleBetween(center),
      );
      // Push offset to be more light
      const s = ((age * this.sOffset) / this.trailSize) * 100;
      // Play with B instead of Opacity cause we're on pitch black background
      const b = 100 - ((100 / this.trailSize) * age);
      this.p5.stroke(h, s, b);
      this.p5.point(position.x, position.y);
    }
}
