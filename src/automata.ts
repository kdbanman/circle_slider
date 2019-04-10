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

  getJoinedCircleCoords(circle: Circle): Iterable<Point> {
    let existingCircleCoords = this.circles.map((circle) => circle.getPosition());

    return circle.neighborhoodPoints().filter((point) => existingCircleCoords.indexOf(point));
  }

  getLegalMovePoints(circle: Circle, joinedCircle: Circle): MoveMap {
    let circleCoord = circle.getPosition();

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
    chooseJoinedCircle: (iteration: number, joinedCircleCoords: Iterable<Point>) => number,
    chooseDesiredMove: (iteration: number, chosenCircle: Circle) => Move
    ): Circle {
    let chosenCircle = this.getChosenCircle(chooseCircle);

    let chosenJoinedCircle = this.getChosenJoinedCircle(chosenCircle, chooseJoinedCircle);

    let legalMoves = this.getLegalMovePoints(chosenCircle, chosenJoinedCircle);
    let desiredMove = chooseDesiredMove(this.iteration, chosenCircle);

    if (legalMoves.has(desiredMove)) {
      let newCoord = legalMoves.get(desiredMove);
      chosenCircle.setPosition(newCoord);
    }

    this.iteration++;
    return null;
  }

  private getChosenCircle(chooseCircle: (iteration: number, circleCoords: Iterable<Point>) => number) {
    let circleCoords = this.getCircleCoords();
    let chosenCircleIndex = chooseCircle(this.iteration, circleCoords);
    let chosenCircle = this.circles[chosenCircleIndex];
    return chosenCircle;
  }

  private getChosenJoinedCircle(chosenCircle: Circle, chooseJoinedCircle: (iteration: number, joinedCircleCoords: Iterable<Point>) => number) {
    let joinedCirclesCoords = this.getJoinedCircleCoords(chosenCircle);
    let chosenJoinedCircleIndex = chooseJoinedCircle(this.iteration, joinedCirclesCoords);
    let chosenJoinedCircleCoord = joinedCirclesCoords[chosenJoinedCircleIndex];
    let chosenJoinedCircle = this.circles.find((circle) => circle.getPosition().equals(chosenJoinedCircleCoord));
    return chosenJoinedCircle;
  }
}

export { Automata }