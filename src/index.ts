import * as $ from 'jquery';
import { Size, Point } from 'paper';

import { Renderer } from './renderer';
import { Grid } from './grid'
import { Circle } from './circle'
import { Automata } from './automata';
import { Move, Direction } from './move';

$(function () {
  let circle = new Circle(new Point(10, 10))
  let circles = [circle]
    .concat(circle.blockingPoints().map((point) => new Circle(point)))
    .concat(circle.neighborhoodPoints().map((point) => new Circle(point)));

  let gridOffset = new Point(-10, 0);
  let gridSize = new Size(30, 30);
  let gridSpacing = 10;

  let grid = new Grid(gridOffset, gridSize);
  let automata = new Automata(grid, circles);

  // TODO: why do all .render() calls seem to be happening twice 🤔

  let renderer = new Renderer(gridSpacing);
  renderer.render(grid, automata);

  setInterval(function () {
    automata.iterate(
      (iteration, circleCoords) => iteration % 3,
      (iteration, chosenCircle) => new Move(Direction.CCW, (iteration % 3) + 1)
    );

    renderer.render(grid, automata);
  }, 1000);
});