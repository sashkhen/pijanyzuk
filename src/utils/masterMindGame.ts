import { v4 as uuidv4 } from "uuid";

import { COLOR_SETS } from "../consts";
import { getRandomIntFromInterval } from "./base";

type GameOptions = {
  options: string[];
  sequenceLength?: number;
  uniqueOnly?: boolean;
  maxAttemptsCount?: number;
};

export enum MatchWeight {
  POSITION = 2,
  VALUE = 1,
  NONE = 0,
}

const OPTIONS_COUNT = 6;
const SEQUENCE_LENGTH = 4;
const ATTEMPTS_COUNT = 7;
const OPTIONS = COLOR_SETS[1];

class MasterMindGame {
  id: string;
  options: string[];
  originalSequence: string[];
  maxAttemptsCount: number;
  attempts: string[][];
  results: number[][];
  currentSequence: (string | undefined)[];
  activeIndex: number;

  constructor(params?: GameOptions) {
    const {
      options,
      sequenceLength = SEQUENCE_LENGTH,
      uniqueOnly = false,
      maxAttemptsCount = ATTEMPTS_COUNT,
    } = params || {};

    this.id = uuidv4();
    this.options =
      options ||
      OPTIONS ||
      this.generateBlankSequence(OPTIONS_COUNT).map((_, i) => `${i + 1}`);
    this.originalSequence = this.generateSequence(
      this.options,
      sequenceLength,
      uniqueOnly
    );
    this.maxAttemptsCount = maxAttemptsCount;
    this.attempts = [];
    this.results = [];
    this.currentSequence = this.generateBlankSequence(sequenceLength);
    this.activeIndex = 0;
  }

  submitSequence() {
    if (this.isSequenceValid) {
      const sequence = [...this.currentSequence] as string[];

      this.attempts.push(sequence);
      this.results.push(this.calculateResult(sequence));
      this.currentSequence = this.generateBlankSequence(
        this.currentSequence.length
      );
      this.setActive(0);
    }

    return this;
  }

  setNextActive() {
    this.activeIndex = this.getNextActiveIndex();
    return this;
  }

  setActive(index: number) {
    this.activeIndex = index;
    return this;
  }

  updateIndex(index: number, value: string) {
    const nextSequence = [...this.currentSequence];
    nextSequence[index] = value;
    this.currentSequence = nextSequence;
    return this;
  }

  clearIndex(index: number) {
    const nextSequence = [...this.currentSequence];
    nextSequence[index] = undefined;
    this.currentSequence = nextSequence;
    return this;
  }

  get isSequenceValid() {
    return (
      this.currentSequence.filter(Boolean).length ===
      this.currentSequence.length
    );
  }

  get isGameWon() {
    return this.results.some((attempt) =>
      attempt.every((r) => r === MatchWeight.POSITION)
    );
  }

  get isGameOver() {
    return this.isGameWon || this.attempts.length >= this.maxAttemptsCount;
  }

  private calculateResult(attempt: string[]) {
    const positionMatches = attempt.map((value, i) => {
      return this.originalSequence[i] === value ? MatchWeight.POSITION : 0;
    });

    const originalValues = this.originalSequence.reduce((acc, value, i) => {
      return positionMatches[i] ? acc : [...acc, value];
    }, [] as string[]);
    const attemptValues = attempt.reduce((acc, value, i) => {
      return positionMatches[i] ? acc : [...acc, value];
    }, [] as string[]);

    const valueMatches = attemptValues.map((value) => {
      const index = originalValues.findIndex((v) => v === value);

      if (index === -1) {
        return MatchWeight.NONE;
      }

      originalValues.splice(index, 1);
      return MatchWeight.VALUE;
    });

    return [...positionMatches.filter(Boolean), ...valueMatches].sort();
  }

  private generateSequence(
    options: string[],
    length: number,
    uniqueOnly?: boolean
  ): string[] {
    const colorsPool = [...options];

    return Array.from(Array(length)).map(() => {
      const index = getRandomIntFromInterval(0, colorsPool.length - 1);

      if (uniqueOnly) {
        return colorsPool.splice(index, 1)[0];
      }

      return colorsPool[index];
    });
  }

  generateBlankSequence(length: number): undefined[] {
    return Array.from(Array(length));
  }

  private getNextActiveIndex(options?: {
    sequence?: (string | undefined)[];
    index?: number;
  }): number {
    const { sequence = this.currentSequence, index = this.activeIndex } =
      options || {};

    if (sequence.every((item) => !!item)) {
      return index;
    }

    let nextIndex = index + 1;

    if (nextIndex === sequence.length) {
      const emptyIndex = sequence.findIndex((item) => !item);
      return emptyIndex !== -1 ? emptyIndex : index;
    }

    if (!sequence[nextIndex]) {
      return nextIndex;
    }

    return this.getNextActiveIndex({ sequence, index: nextIndex });
  }
}

export default MasterMindGame;
