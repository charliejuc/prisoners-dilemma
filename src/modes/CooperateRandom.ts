import { titForTatFactory } from "../players/TitForTat";
import { versusTournament } from "../tournament";
import { Player } from "../types/Player";
import { generatePlayer } from "../utils/GeneratePlayer";
import { twoPlayersVersus } from "../versus/TwoPlayersVersus";

export const cooperateRandom = (options?: {
  noise?: number;
  maxTurnsMean?: number;
  iterations?: number;
  reproductionRate?: number;
  playersLength?: number;
}): Player[] => {
  const noise = options?.noise ?? 0.1;

  const playersLength = options?.playersLength ?? 100;
  const p1 = titForTatFactory({
    noise,
  });
  const players = Array.from({ length: playersLength - 1 }).reduce(
    (acc: Player[]) => {
      acc.push(
        generatePlayer({
          noise,
        })
      );
      return acc;
    },
    [p1]
  );

  const resultPlayers = versusTournament(twoPlayersVersus)({
    players,
    iterations: options?.iterations ?? 20,
    maxTurnsMean: options?.maxTurnsMean ?? 200,
    reproductionRate: options?.reproductionRate ?? 2,
  });

  return resultPlayers;
};