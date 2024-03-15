import { faker } from "@faker-js/faker";
import { titForTatFactory } from "./players/TitForTat";
import { Player } from "./types/Player";
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
        cooperate: faker.number.float({ min: 0, max: 0.3 + Number.EPSILON }),
      })
    );
    return acc;
  },
  [p1]
);

const maxI = 3;
let i = maxI;
let p = players;
let resultPlayers: Player[] = [];
while (i--) {
  console.log("Running loop:", maxI - i);

  const playersCartesianProduct = cartesianProduct(p, p);

  playersCartesianProduct.forEach(([p1, p2]) =>
    twoPlayersVersus({
      maxTurnsMean: 200,
    })(p1, p2)
  );

  resultPlayers = p.sort((a, b) => b.points - a.points);
  p = resultPlayers.slice(0, -50);
}

console.log(resultPlayers.slice(0, 5));
