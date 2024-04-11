/**
  Python comes with a turtle module that is a great graphical way for introducing programming to kids. 
  The turtle starts at (0, 0) on an x-y plane, and you can move the turtle around and change the direction its facing. 
  When the turtle moves, it leaves a line trail behind it that appears on a canvas.
  With these movement APIs, users can draw shapes and even complex ones by leveraging loops.

  Implement a Turtle class in JavaScript that simulates the movement of a turtle. The turtle starts at (0, 0) facing north, and has the following methods:
    forward(distance): Moves the turtle forward by distance units in the direction it is facing.
    backward(distance): Moves the turtle backward by distance units while facing the same direction.
    left(): Rotates the turtle in-place 90 degrees to the left, changing only the direction it is facing.
    right(): Rotates the turtle in-place 90 degrees to the right, changing only the direction it is facing.
    position(): Returns the coordinates of the turtle as [x, y].
 */

/*-----------------------------用例测试-----------------------------------*/
const turtle = new Turtle();
turtle.position(); // [0, 0]
turtle.forward(1); // Position: [0, 1]
turtle.backward(1); // Position: [0, 0]
turtle.right(); // Position remains unchanged
turtle.forward(2); // Position: [2, 0] because it moved 2 units to the right.

// Methods can also be chained.
turtle.right().right().forward(5); // Position: [-3, 0] because it turned 180 degrees and moved 5 units forward (towards the left).

/* ---------------------------- Soltion -------------------------------- */
const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;
const NUMBER_OF_CARDINAL_DIRECTIONS = 4;

class Turtle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = NORTH;
  }

  /**
   * @param {number} distance Distance to move forward while facing the current direction.
   * @return {Turtle}
   */
  forward(distance) {
    this._move(distance);
    return this;
  }

  /**
   * @param {number} distance Distance to move backward while facing the current direction.
   * @return {Turtle}
   */
  backward(distance) {
    this._move(-distance);
    return this;
  }

  _move(distance) {
    switch (this.direction) {
      case NORTH:
        this.y += distance;
        break;
      case EAST:
        this.x += distance;
        break;
      case SOUTH:
        this.y -= distance;
        break;
      case WEST:
        this.x -= distance;
        break;
    }
    return this;
  }

  /**
   * Turns the turtle left.
   * @return {Turtle}
   */
  left() {
    // Wrap around behavior.
    this.direction =
      (this.direction - 1 + NUMBER_OF_CARDINAL_DIRECTIONS) %
      NUMBER_OF_CARDINAL_DIRECTIONS;
    return this;
  }

  /**
   * Turns the turtle right.
   * @return {Turtle}
   */
  right() {
    // Wrap around behavior.
    this.direction =
      (this.direction + 1 + NUMBER_OF_CARDINAL_DIRECTIONS) %
      NUMBER_OF_CARDINAL_DIRECTIONS;
    return this;
  }

  /**
   * @return {[number, number]} Coordinates [x, y]
   */
  position() {
    return [this.x, this.y];
  }
}

/**
Turning via left() and right():
    When the turtle is facing north (0), turning left will make the turtle face west (3). There are a total of 4 cardinal directions. 
    With the use of the modulo operator, 
      we can conveniently calculate the new direction the turtle will be facing by subtracting 1 (turning left), 
      or adding 1 (turning right) and then taking the modulo of 4 on the new value. 
    Using an integer from 0-3 for the direction, makes it convenient to implement the turning logic. 
    To improve readability, we define const for these directions.
 */
