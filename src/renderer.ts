import * as paper from 'paper';

import { Point, Matrix } from 'paper';

import { Grid } from './grid';
import { Automata } from './automata'

class Renderer {

  private spacing: number;
  private toHexMatrix: Matrix;
  private toEuclideanMatrix: Matrix;

  constructor(spacing: number) {
    paper.setup(<HTMLCanvasElement>document.getElementById('automataView'));
    this.spacing = spacing;

    this.toHexMatrix = (new Matrix(1, 0, 0, 1, 0, 0))
      .skew(30, 0)
      .scale(1, Math.sin(Math.PI / 3))
      .scale(this.spacing);

    this.toEuclideanMatrix = this.toHexMatrix.inverted();
  }

  private toHexCoord(euclideanCoord: Point): Point {
    return this.toHexMatrix.transform(euclideanCoord);
  }

  private toEuclideanCoord(hexCoord: Point): Point {
    return this.toEuclideanMatrix.transform(hexCoord);
  }

  private *hexCoords(euclideanCoords: Iterable<Point>): Iterable<Point> {
    for (let euclideanCoord of euclideanCoords) {
      yield this.toHexCoord(euclideanCoord);
    }
  }

  render(grid: Grid, automata: Automata) {
    paper.project.clear();

    for (let pointCoord of this.hexCoords(grid.getPointCoords())) {
      let pointShape = paper.Shape.Circle(pointCoord, 1);
      pointShape.strokeColor = '#CCC';
    }

    let euclideanCircleCoords = automata.getCircleCoords();
    for (let circleCoord of this.hexCoords(euclideanCircleCoords)) {
      let circleShape = paper.Shape.Circle(circleCoord, this.spacing / 2);
      circleShape.strokeColor = '#black';
    }

    paper.view.draw();
  }
}

export { Renderer };