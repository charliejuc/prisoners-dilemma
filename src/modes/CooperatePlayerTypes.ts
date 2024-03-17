import { versusTournament } from "../tournament";
import { Player } from "../types/Player";
import {
  generatePlayerBad,
  generatePlayerGood,
  generatePlayerReactive,
} from "../utils/GeneratePlayer";
import { twoPlayersVersus } from "../versus/TwoPlayersVersus";

export const cooperatePlayerTypes = (options?: {
  badPlayersLength?: number;
  goodPlayersLength?: number;
  reactivePlayersLength?: number;
  noise?: number;
  maxTurnsMean?: number;
  iterations?: number;
  reproductionRate?: number;
  maxPointsDifferencePercentage?: number;
}): Player[] => {
  const noise = options?.noise ?? 0.1;

  const badPlayersLength = options?.badPlayersLength ?? 33;
  const goodPlayersLength = options?.goodPlayersLength ?? 33;
  const reactivePlayersLength = options?.reactivePlayersLength ?? 33;
  const badPlayers = Array.from({ length: badPlayersLength }).reduce(
    (acc: Player[]) => {
      acc.push(
        generatePlayerBad({
          noise,
        })
      );
      return acc;
    },
    []
  );
  const goodPlayers = Array.from({ length: goodPlayersLength }).reduce(
    (acc: Player[]) => {
      acc.push(
        generatePlayerGood({
          noise,
        })
      );
      return acc;
    },
    []
  );
  const reactivePlayers = Array.from({ length: reactivePlayersLength }).reduce(
    (acc: Player[]) => {
      acc.push(
        generatePlayerReactive({
          noise,
        })
      );
      return acc;
    },
    []
  );
  const players = [...badPlayers, ...goodPlayers, ...reactivePlayers];

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
