import { faker } from "@faker-js/faker";
import { titForTatFactory } from "./players/TitForTat";
import { Player } from "./types/Player";
import { Versus } from "./types/Versus";
import { cartesianProduct } from "./utils";
import { generatePlayer } from "./utils/GeneratePlayer";
import { twoPlayersVersus } from "./versus/TwoPlayersVersus";

const noise = 0.1;

const p1 = titForTatFactory({
  noise,
});
const players = Array.from({ length: 200 }).reduce(
  (acc: Player[]) => {
    acc.push(
      generatePlayer({
        noise,
        cooperate: faker.number.float({ min: 0, max: 0.42 + Number.EPSILON }),
      })
    );
    return acc;
  },
  [p1]
);

const versusTournament =
  (versus: Versus, _log = console.log) =>
  (
    players: Player[],
    options: {
      iterations: number;
      maxTurnsMean: number;
    }
  ): Player[] => {
    const maxI = options.iterations;
    let i = maxI;
    let p = players;
    let resultPlayers: Player[] = [];
    while (i--) {
      _log("Running loop:", maxI - i);

      const playersCartesianProduct = cartesianProduct(p, p);

      playersCartesianProduct.forEach(([p1, p2]) =>
        versus({
          maxTurnsMean: options.maxTurnsMean,
        })(p1, p2)
      );

      resultPlayers = p.sort((a, b) => b.points - a.points);
      const newPlayers = resultPlayers.slice(0, 100).map((p) => p.copy());
      p = resultPlayers.slice(0, -100).concat(newPlayers);

      _log("Best player in loop:", resultPlayers[0]);
    }

    return resultPlayers;
  };

const resultPlayers = versusTournament(twoPlayersVersus)(players, {
  maxTurnsMean: 200,
  iterations: 10,
});

console.log(resultPlayers.slice(0, 5));
