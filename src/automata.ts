import { Point } from 'paper';

import { Circle } from './circle';
import { Grid } from './grid';
import { Move, Direction } from './move';
import { MoveMap } from './move_map';

class Automata {
  grid: Grid;
  circles: Circle[];

  iteration: number;

  constructor(grid: Grid, circles: Circle[]) {
    this.grid = grid;
    this.circles = circles;

    this.iteration = 0;
  }

  getCircleCoords(): Iterable<Point> {
    return this.circles.map((circle) => circle.getPosition())
  }

  getLegalMovePoints(circleCoord: Point): MoveMap {
    // for each joined circle
    // find relative max and min neighbors around joined circle - those are blockers C_k
    // find relative max and min blockers around joined circle - those are blockers B_k

    let moveMap = new MoveMap();
    moveMap.set(new Move(Direction.CCW, 1), new Point(15, 15))
    moveMap.set(new Move(Direction.CCW, 2), new Point(16, 16))
    moveMap.set(new Move(Direction.CCW, 3), new Point(16, 17))

    return moveMap;
  }

  iterate(
    chooseCircle: (iteration: number, circleCoords: Iterable<Point>) => number,
    chooseDesiredMove: (iteration: number, chosenCircle: number) => Move
  ): Circle {
    let circleCoords = this.getCircleCoords();
    let circleIndex = chooseCircle(this.iteration, circleCoords);

    let chosenCircleCoord: Point = circleCoords[circleIndex];
    let legalMoves = this.getLegalMovePoints(chosenCircleCoord);
    let desiredMove = chooseDesiredMove(this.iteration, circleIndex);
    console.log(legalMoves);
    console.log(desiredMove);
    console.log(desiredMove.toKey());
    console.log(legalMoves.has(desiredMove));

    if (legalMoves.has(desiredMove)) {
      let newCoord = legalMoves.get(desiredMove);
      console.log("moving to " + newCoord);
      this.circles[circleIndex].setPosition(newCoord);
    }

    this.iteration++;
    return null;
  }
}

export { Automata }