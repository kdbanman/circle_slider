import { Point, Size } from 'paper'

class Grid {
  offset: Point;
  size: Size;

  constructor(offset: Point, size: Size) {
    this.offset = offset;
    this.size = size;
  }

  *getPointCoords(): Iterable<Point> {
    for (let x = this.offset.x; x < this.size.width; x++) {
      for (let y = this.offset.y; y < this.size.height; y++) {
        yield new Point(x, y);
      }
    }
  }
}

export { Grid }