import { randomUUID } from "crypto";
import { Decision, Player } from "../types/Player";

export class TitForTat extends Player {
  readonly id = randomUUID();
  readonly name = "Tit For Tat";

  decide(decisions: Decision[]): Decision {
    const isFirst = decisions.length < 2;
    if (isFirst) {
      return {
        id: randomUUID(),
        cooperate: this.cooperate,
        player: this,
        turn: decisions.length,
      };
    }

    const previousDecision = decisions.at(-1);

    if (previousDecision == null) {
      throw new Error("Must have a previous decision.");
    }

    return {
      id: randomUUID(),
      cooperate: previousDecision.cooperate,
      player: this,
      turn: decisions.length,
    };
  }
}
