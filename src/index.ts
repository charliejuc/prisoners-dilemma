import { titForTatFactory } from "./players/TitForTat";
import { versusTournament } from "./tournament";
import { Player } from "./types/Player";
import { generatePlayerCooperateSmoothed } from "./utils/GeneratePlayer";
import { twoPlayersVersus } from "./versus/TwoPlayersVersus";

const noise = 0.1;

const p1 = titForTatFactory({
  noise,
});
const players = Array.from({ length: 200 }).reduce(
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

const resultPlayers = versusTournament(twoPlayersVersus)(players, {
  maxTurnsMean: 200,
  iterations: 30,
  reproductionRate: 15,
});

console.log(resultPlayers.slice(0, 5));
