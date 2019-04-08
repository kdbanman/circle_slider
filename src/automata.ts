import { Circle } from './circle';
import { Grid } from './grid';

class Automata {
  grid: Grid;
  iteration: number;

  constructor(grid: Grid) {
    this.grid = grid;
    this.iteration = 0;
  }

  iterate(
    chooseCircle: (iteration: number) => number,
    chooseDesiredMove: (iteration: number, chosenCircle: number) => number
  ): Circle {
    let circleIndex = chooseCircle(this.iteration);
    let desiredMove = chooseDesiredMove(this.iteration, circleIndex);

    // apply move

    this.iteration++;
    return null;
  }
}

export { Automata }