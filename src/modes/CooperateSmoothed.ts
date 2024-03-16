import { titForTatFactory } from "../players/TitForTat";
import { versusTournament } from "../tournament";
import { Player } from "../types/Player";
import { generatePlayerCooperateSmoothed } from "../utils/GeneratePlayer";
import { twoPlayersVersus } from "../versus/TwoPlayersVersus";

export const cooperateSmoothed = (options?: {
  noise?: number;
  maxTurnsMean?: number;
  iterations?: number;
  reproductionRate?: number;
  playersLength?: number;
  maxPointsDifferencePercentage?: number;
}): Player[] => {
  const noise = options?.noise ?? 0.1;

  const playersLength = options?.playersLength ?? 100;
  const p1 = titForTatFactory({
    noise,
  });
  const players = Array.from({ length: playersLength - 1 }).reduce(
    (acc: Player[]) => {
      acc.push(
        generatePlayerCooperateSmoothed({
          noise,
        })
      );
      return acc;
    },
    [p1]
  );

  const resultPlayers = versusTournament(twoPlayersVersus)({
    players,
    iterations: options?.iterations ?? 40,
    maxTurnsMean: options?.maxTurnsMean ?? 400,
    reproductionRate: options?.reproductionRate ?? 3,
    maxPointsDifferencePercentage:
      options?.maxPointsDifferencePercentage ?? 0.08,
  });

  return resultPlayers;
};
