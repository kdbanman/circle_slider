import { Point } from 'paper';

import { Move } from './move';

class MoveMap {
  private map: Map<String, Point>;

  constructor() {
    this.map = new Map<String, Point>();
  }

  get(move: Move): Point {
    return this.map.get(move.toKey());
  }

  set(move: Move, point: Point) {
    this.map.set(move.toKey(), point);
  }

  has(move: Move): boolean {
    return this.map.has(move.toKey());
  }
}

export { MoveMap }