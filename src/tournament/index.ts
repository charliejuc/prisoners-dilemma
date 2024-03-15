import { Player } from "../types/Player";
import { Versus } from "../types/Versus";
import { cartesianProduct } from "../utils";

export const versusTournament =
  (versus: Versus, _log = console.log) =>
  (
    players: Player[],
    options: {
      iterations: number;
      maxTurnsMean: number;
      reproductionRate: number;
    }
  ): Player[] => {
    const maxI = options.iterations;
    let i = maxI;
    let resultPlayers = players.slice();
    while (i--) {
      const loopIndex = maxI - i;
      _log("Running loop:", loopIndex);

      const playersCartesianProduct = cartesianProduct(
        resultPlayers,
        resultPlayers
      );

      playersCartesianProduct.forEach(([p1, p2]) =>
        versus({
          maxTurnsMean: options.maxTurnsMean,
        })(p1, p2)
      );

      resultPlayers.sort((a, b) => b.points - a.points);
      const newPlayers = resultPlayers
        .slice(0, options.reproductionRate)
        .map((p) => p.copy());
      resultPlayers = resultPlayers
        .slice(0, -options.reproductionRate)
        .concat(newPlayers);

      _log("Best player in loop:", resultPlayers[0]);
    }

    return resultPlayers;
  };
