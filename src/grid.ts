import { Point, Size, Matrix } from 'paper'
import { Circle } from './circle';

class Grid {
  circles: Circle[];
  offset: Point;
  size: Size;
  spacing: number;

  constructor(circles: Circle[], offset: Point, size: Size, spacing: number) {
    this.circles = circles;
    this.offset = offset;
    this.size = size;
    this.spacing = spacing;
  }

  getCircles(): Circle[] {
    return this.circles;
  }

  *getPoints(): Iterable<Point> {
    for (let x = this.offset.x; x < this.size.width; x++) {
      for (let y = this.offset.y; y < this.size.height; y++) {
        yield new Point(x, y);
      }
    }
  }
}

export { Grid }