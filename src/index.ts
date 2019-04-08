import * as $ from 'jquery';
import { Size, Point } from 'paper';

import { Renderer } from './renderer';
import { Grid } from './grid'
import { Circle } from './circle'

$(function () {
  let circle = new Circle(new Point(10, 10))
  let circles = [circle]
    .concat(circle.blockingPoints().map((point) => new Circle(point)))
    .concat(circle.neighborhoodPoints().map((point) => new Circle(point)));

  let gridOffset = new Point(-10, 0);
  let gridSize = new Size(30, 30);
  let gridSpacing = 10;

  let grid = new Grid(circles, gridOffset, gridSize, gridSpacing);

  new Renderer(10).render(grid);
});