import { Point } from 'paper'

const canonical_neighborhood_deltas = [
  new Point(1, 0),
  new Point(0, 1),
  new Point(-1, 1),
  new Point(-1, 0),
  new Point(0, -1),
  new Point(1, -1),
];

const canonical_blocker_deltas = [
  new Point(1, 1),
  new Point(-1, 2),
  new Point(-2, 1),
  new Point(-1, -1),
  new Point(1, -2),
  new Point(2, -1),
];

class Circle {
  private position: Point;

  constructor(position: Point) {
    this.position = position;
  }

  getPosition(): Point {
    return this.position;
  }

  neighborhoodPoints(): Point[] {
    return canonical_neighborhood_deltas.map((delta) => this.position.add(delta));
  }

  blockingPoints(): Point[] {
    return canonical_blocker_deltas.map((delta) => this.position.add(delta));
  }
}

export { Circle }