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
    const random = Math.random();
    if (isFirst) {
      return random >= this.probabilities.noCooperate;
    }

    // this "cumulative" is to get the actual configured probability
    const cumulativeCooperate =
      this.probabilities.noCooperate + this.probabilities.cooperate;

    if (random < this.probabilities.noCooperate) {
      return this.noCooperate;
    }

    if (random < cumulativeCooperate) {
      return this.cooperate;
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
