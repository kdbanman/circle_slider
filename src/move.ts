
enum Direction {
  CW,
  CCW
}

class Move {
  readonly direction: Direction;
  readonly distance: number;

  /**
   *
   * @param {Direction} direction
   *  The direction to move around the circle.
   * @param {number} distance
   *  The number of positions to move around the circle.
   *  An integer between 1 and 5 (inclusive).
   *  Each increment is a step of π/6 or 30°
   */
  constructor(direction: Direction, distance: number) {
    if (distance < 1 || distance > 5) {
      throw new Error('Distance must be from 1 to 5 (inclusive)');
    }

    this.direction = direction;
    this.distance = distance;
  }

  toKey(): string {
    let directionString = this.direction === Direction.CW ? 'CW' : 'CCW';
    return `${this.distance}${directionString}`;
  }

  static key(direction: Direction, distance: number): string {
    return new Move(direction, distance).toKey();
  }
}

export {
  Direction,
  Move
}