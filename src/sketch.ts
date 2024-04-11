import p5 from "p5";
import { setup, draw, mousePressed } from "./main";

/**
 * @param {p5} p
 */
export const sketch = (p: p5) => {
  p.setup = () => {
    // Define your initial environment props & other stuff here
    setup(p);
  };

  p.draw = () => {
    // Define render logic for your sketch here
    draw(p);
  };
  p.mousePressed = () => {
    mousePressed(p);
  };
};
