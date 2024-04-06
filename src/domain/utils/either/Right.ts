import { Left } from './Left';

/**
 * Represents the Right side of an Either type.
 */
export class Right<L, R> {
  value: R;

  /**
   * Constructs a new Right instance.
   * @param {R} value - The value to be wrapped as Right.
   */
  constructor(value: R) {
    this.value = value;
  }

  /**
   * Checks if this instance represents the Left side.
   * @returns {boolean} true if this instance is Left, false otherwise.
   */
  isLeft(): this is Left<L, R> {
    return false;
  }

  /**
   * Checks if this instance represents the Right side.
   * @returns {boolean} true if this instance is Right, false otherwise.
   */
  isRight(): this is Right<L, R> {
    return true;
  }
}
