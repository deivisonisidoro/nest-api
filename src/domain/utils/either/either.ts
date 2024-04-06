import { Left } from './Left';
import { Right } from './Right';

/**
 * Represents a type that can hold either a Left or Right value.
 */
export type Either<L, R> = Left<L, R> | Right<L, R>;

/**
 * Constructs a new Either instance holding a Left value.
 * @param {L} l - The value to be wrapped as Left.
 * @returns {Either<L, R>} A new Either instance containing the Left value.
 */
export const left = <L, R>(l: L): Either<L, R> => {
  return new Left(l);
};

/**
 * Constructs a new Either instance holding a Right value.
 * @param {R} r - The value to be wrapped as Right.
 * @returns {Either<L, R>} A new Either instance containing the Right value.
 */
export const right = <L, R>(r: R): Either<L, R> => {
  return new Right(r);
};
