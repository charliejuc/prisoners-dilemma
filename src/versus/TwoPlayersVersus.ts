import { Decision, Player, sumPointsToPlayers } from "../types/Player";
import { Versus } from "../types/Versus";

export const twoPlayersVersus: Versus =
  (options: { maxTurnsMean: number }) =>
  (
    p1: Player,
    p2: Player
  ): {
    players: [Player, Player];
    turns: number;
    _meta: {
      maxTurnsPairs: number;
    };
  } => {
    const maxTurnsOffset = Math.floor(options.maxTurnsMean * 0.1);
    const maxTurnsBase = options.maxTurnsMean - maxTurnsOffset;

    const maxTurnsPairs =
      maxTurnsBase + Math.floor(maxTurnsOffset * 2 * Math.random());
    const decisions: Decision[] = [];
    while (true) {
      const decision1 = p1.turn(decisions);
      const decision2 = p2.turn(decisions);

      decisions.push(decision1);
      decisions.push(decision2);

      sumPointsToPlayers(decision1, decision2);

      if (decision2.turn / 2 > maxTurnsPairs) {
        break;
      }
    }

    return {
      players: [p1, p2],
      turns: decisions.length / 2,
      _meta: {
        maxTurnsPairs,
      },
    };
  };
