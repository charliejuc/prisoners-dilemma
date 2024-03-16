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
    const playerCopy = new ConfigurablePlayer(this.name, this.probabilities);
    playerCopy.setPoints(this.points);

    return playerCopy;
  }

  protected getPreviousDecision(decisions: Decision[]): Decision | null {
    const decision = decisions.at(-1) ?? null;

    if (decision?.player.id === this.id) {
      return decisions.at(-2) ?? null;
    }

    return decision;
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

    const previousDecision = this.getPreviousDecision(decisions);

    if (previousDecision == null) {
      throw new Error("Must have a previous decision.");
    }

    const decision = previousDecision.cooperate;

    return decision;
  }

  turn(decisions: Decision[]): Decision {
    const decision = this.decide(decisions);
    const decisionWithNoise =
      Math.random() < this.probabilities.noise ? !decision : decision;

    return {
      id: randomUUID(),
      cooperate: decisionWithNoise,
      player: this,
      turn: decisions.length,
    };
  }

  toJSON(): {
    id: string;
    name: string;
    points: number;
    probabilities: Probabilities;
  } {
    return {
      id: this.id,
      name: this.name,
      points: this.points,
      probabilities: this.probabilities,
    };
  }
}
