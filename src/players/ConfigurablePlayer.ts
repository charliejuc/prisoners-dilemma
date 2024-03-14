import { randomUUID } from "crypto";
import { Decision, Player } from "../types/Player";

export interface Probabilities {
  noise: number;
  cooperate: number;
  noCooperate: number;
}
export class ConfigurablePlayer extends Player {
  readonly id = randomUUID();
  readonly name: string;
  readonly probabilities: Probabilities;

  constructor(name: string, probabilities: Probabilities) {
    super();
    this.name = name;
    this.probabilities = probabilities;
  }

  copy(): Player {
    return new ConfigurablePlayer(this.name, this.probabilities);
  }

  protected decide(decisions: Decision[]): boolean {
    const isFirst = decisions.length < 2;
    if (isFirst) {
      return Math.random() >= this.probabilities.noCooperate;
    }

    if (Math.random() < 0.5) {
      if (Math.random() < this.probabilities.noCooperate) {
        return this.noCooperate;
      }

      if (Math.random() < this.probabilities.cooperate) {
        return this.cooperate;
      }
    } else {
      if (Math.random() < this.probabilities.cooperate) {
        return this.cooperate;
      }

      if (Math.random() < this.probabilities.noCooperate) {
        return this.noCooperate;
      }
    }

    const previousDecision = decisions.at(-1);

    if (previousDecision == null) {
      throw new Error("Must have a previous decision.");
    }

    const decision =
      Math.random() >= this.probabilities.noise
        ? previousDecision.cooperate
        : !previousDecision.cooperate;

    return decision;
  }

  turn(decisions: Decision[]): Decision {
    const decision = this.decide(decisions);

    return {
      id: randomUUID(),
      cooperate: decision,
      player: this,
      turn: decisions.length,
    };
  }
}
