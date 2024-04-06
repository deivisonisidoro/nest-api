import { Right } from './Right';

/**
 * Represents the Left side of an Either type.
 */
export class Left<L, R> {
  value: L;

  /**
   * Constructs a new Left instance.
   * @param {L} value - The value to be wrapped as Left.
   */
  constructor(value: L) {
    this.value = value;
  }

  /**
   * Checks if this instance represents the Left side.
   * @returns {boolean} true if this instance is Left, false otherwise.
   */
  isLeft(): this is Left<L, R> {
    return true;
  }

  /**
   * Checks if this instance represents the Right side.
   * @returns {boolean} true if this instance is Right, false otherwise.
   */
  isRight(): this is Right<L, R> {
    return false;
  }
}
