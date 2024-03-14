import { titForTatFactory } from "./players/TitForTat";
import { Player } from "./types/Player";
import { cartesianProduct } from "./utils";
import { generatePlayer } from "./utils/GeneratePlayer";
import { twoPlayersVersus } from "./versus/TwoPlayersVersus";

const noise = 0;

const p1 = titForTatFactory({
  noise,
});
const players = Array.from({ length: 200 }).reduce(
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
const playersCartesianProduct = cartesianProduct(players, players);

const versusResults = playersCartesianProduct.map(([p1, p2]) =>
  twoPlayersVersus({
    maxTurnsMean: 500,
  })(p1, p2)
);

const playersSortedByPoints = players.sort((a, b) => b.points - a.points);

console.log(playersSortedByPoints.slice(0, 10));
