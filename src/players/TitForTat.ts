import { randomUUID } from "crypto";
import { Decision, Player } from "../types/Player";

export class TitForTat extends Player {
  readonly id = randomUUID();
  readonly name = "Tit For Tat";

  protected decide(decisions: Decision[]): boolean {
    const isFirst = decisions.length < 2;
    if (isFirst) {
      return this.cooperate;
    }

    const previousDecision = decisions.at(-1);

    if (previousDecision == null) {
      throw new Error("Must have a previous decision.");
    }

    return previousDecision.cooperate;
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
